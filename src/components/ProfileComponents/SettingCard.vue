<script setup>
import axiosFunctions from '@/utils/api'
import {Picture} from "@element-plus/icons-vue";
</script>

<script>
import axiosFunctions from '@/utils/api'
import {ElNotification} from "element-plus";
import {ref} from "vue";

export default {
  data() {
    return {
      username: null,
      form: {
        username: null,
        name: null,
        sid: null,
        profilePhotoUrl: null,
        gender: null,
        sleepTime: null,
        wakeUpTime: null,
        major: null,
        intro: null,
        preferRoomSize: null,
        phoneNumber: null,
        qqNumber: null,
        wechatAccount: null,
        hobbies: [],
      },
      passwordForm: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
      },
      majors: [],
      // Hobby
      newTag: '',
      rules: {
        newPassword: [
          {required: true, message: 'Please input the password', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: 'The length should be 6-18.',
            trigger: 'blur',
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
            message: 'The password must contain letters and numbers.',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {required: true, message: 'Please input the password again', trigger: 'blur'},
          {
            validator: this.validateConfirmPassword,
            trigger: 'blur',
          },
        ]
      }
    }
  },
  mounted() {
    console.log(this.$route)
    if (this.$route.fullPath.startsWith('/home/setting'))
      this.username = this.$store.state.username
    console.log(this.username)
    this.setToDefault();
  },

  methods: {
    save() { // change basic info (do not change the password)
      if (this.form.username === null) {
        return
      }
      this.$refs.form.validate((valid) => {
        if (!valid) return
        axiosFunctions.methods.updateUserProfile(this.isManager, this.form.username, this.form)
            .then((response) => {
              ElNotification({
                title: "Success!",
                type: "success",
                message: "You have updated the profile!",
              })
              this.$router.push('/home')  // 回到首页，会顺便更新store里的信息
            }).catch((response) => {
          ElNotification({
            title: "Failed",
            type: "error",
            message: response.data,
          })
          console.log(response)
        })
      })
    },

    uploadImage(file) {
      if (this.form.username === null) {
        return
      }
      const image = file.raw;
      if (image) {
        if (image.size > (500 * 1024)) {
          ElNotification({
            title: "Failed",
            type: "error",
            message: "Size of profile image should be less than 500 KB.",
          })
          return
        }
        axiosFunctions.methods.uploadResources('image', image)
            .then((response) => {
              console.log(response.data.url)
              axiosFunctions.methods.updateUserProfile(this.isManager, this.form.username,
                  {
                    username: this.form.username,
                    profilePhotoUrl: response.data.url,
                  }
              ).then((response) => {
                ElNotification({
                  title: "Success!",
                  type: "success",
                  message: "You have updated the profile image!",
                })
              }).catch((response) => {
                ElNotification({
                  title: "Failed",
                  type: "error",
                  message: response.data,
                })
                console.log(response)
              })
            }).catch((response) => {
          ElNotification({
            title: "Failed",
            type: "error",
            message: response.data,
          })
          console.log(response)
        })
      }
    },

    changePassword() {
      if (this.username === null) {
        return
      }
      this.$refs.passwordForm.validate((valid) => {
        if (!valid) return
        // TODO
      })
    },

    handleAvatarSuccess() {
    },  // do nothing

    setToDefault() { // Set the form to the user's info before any change
      if (this.username === null) {
        return
      }
      this.form.username = this.username
      // database -> form
      axiosFunctions.methods.getProfile(this.form.username)
          .then(response => {
            if (response.data.username !== this.form.username) {
              ElNotification({
                title: 'Failed',
                message: 'Failed to get user info (response = ' + response.data.username + ', this = ' + this.form.username + ').',
                type: 'error',
              })
              return
            }
            this.form = response.data
            console.log(this.form)
          }).catch(response => { // possibly user not exist
        console.log(response)
        ElNotification({
          title: 'Failed',
          message: response.data,
          type: 'error',
        })
        this.$emit('userNotExists')
      })
    },

    // Hobby
    includeHobby(hobbyName) {
      for (let hobby of this.form.hobbies)
        if (hobby.name === hobbyName)
          return true
      return false
    },

    addCustomTag() {
      const hobbyName = this.newTag.trim().toLowerCase();
      if (!hobbyName) {
        return
      } else if (this.includeHobby(hobbyName)) {
        ElNotification({
          title: 'Failed',
          type: 'error',
          message: 'Duplicated!',
        })
      } else {
        // backend
        // 1. 创建
        axiosFunctions.methods.createHobby(this.form.username, hobbyName)
            .then((response) => {
            }).catch((response) => {
        }).finally(() => {
          // 2. 查询编号
          let hobbyItem = {
            hobbyId: null,
            name: null,
            description: null,
          }
          axiosFunctions.methods.getHobbyIdByName(this.form.username, hobbyName)
              .then((response) => {
                hobbyItem = response.data
                // frontend
                this.newTag = '';
                this.form.hobbies.push(hobbyItem);
              }).catch((response) => {
            console.log(response)
          }).finally(() => {
            // 3. 加入用户爱好
            axiosFunctions.methods.userAddHobby(this.form.username, hobbyItem)
                .then((response) => {
                })
                .catch((response) => {
                  console.log(response)
                })
          })
        })
      }
    },

    removeTag(hobbyItem) {
      const index = this.form.hobbies.indexOf(hobbyItem);
      if (index > -1) {
        // frontend
        this.form.hobbies.splice(index, 1);
        // backend
        axiosFunctions.methods.userDeleteHobby(this.form.username, hobbyItem.hobbyId)
      }
    },

    // Password
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('The passwords entered do not match.'));
      } else {
        callback();
      }
    },
  },

  props: {
    username: {
      required: false,
      default: null,
    },
    isManager: {
      required: false,
      default: false,
    }
  },

  watch: {
    username() {
      this.setToDefault()
    }
  }
}
</script>

<template>
  <el-card style="width: 90%; margin: 1%;" shadow="hover">
    <el-row>
      <el-col :span="6">
        <div style="width: 90%">
          <el-tooltip
              content="Upload avatar (jpg/png and 500 KB at most)"
              placement="bottom-end"
          >
            <el-upload
                class="avatar-uploader"
                ref="profileAvatarUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="uploadImage"
                :auto-upload="false"
                accept="image/png, image/jpeg"
            >
              <el-image
                  :src="axiosFunctions.methods.getResourceByFilename(this.form.profilePhotoUrl)"
                  :fit="'contain'">
                <template #error>
                  <div class="image-slot">
                    <el-icon size="xxx-large">
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </el-upload>
          </el-tooltip>
        </div>
      </el-col>

      <el-col :span="14">
        <el-form label-width="auto" size="small" :model="form" :rules="rules" ref="form" @submit.native.prevent>
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" disabled/>
          </el-form-item>

          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" :disabled="!this.isManager"/>
          </el-form-item>

          <el-form-item label="Gender" prop="gender">
            <el-radio-group v-model="form.gender" :disabled="!this.isManager">
              <el-radio label="MALE"> MALE</el-radio>
              <el-radio label="FEMALE"> FEMALE</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--hobby-->
          <el-form-item label="Hobby">
            <div>
              <el-space wrap>
                <el-tag v-for="(tag, index) in form.hobbies" :key="index" closable @close="removeTag(tag)">
                  {{ tag.name }}
                </el-tag>
                <el-space>
                  <el-input v-model="newTag" @keydown.enter="addCustomTag" style="width: 100px"/>
                  <el-button @click="addCustomTag">Add</el-button>
                </el-space>
              </el-space>
            </div>
          </el-form-item>

          <!--Sleep time-->
          <el-form-item label="Sleep" prop="sleepTime">
            <el-time-picker
                format='HH:mm'
                value-format='HH:mm'
                v-model="form.sleepTime"
                label="Pick a time"
                placeholder="Pick a time"
                :picker-options="{
                    selectableRange : '00:00:00-23:59:00',
                    format: 'HH:mm'
                }"
                style="width: 100px"
            />
          </el-form-item>

          <!--Wake up time-->
          <el-form-item label="Wake up" prop="wakeUpTime">
            <el-time-picker
                format='HH:mm'
                value-format='HH:mm'
                v-model="form.wakeUpTime"
                label="Pick a time"
                placeholder="Pick a time"
                :picker-options="{
                    selectableRange : '00:00:00-23:59:00',
                    format: 'HH:mm'
                }"
                style="width: 100px"
            />
          </el-form-item>

          <!--major-->
          <el-form-item label="Major" prop='major'>
            <el-select
                v-model="form.major"
                placeholder="please select the major"
                :disabled="!this.isManager"
                style="width: 1000px"
            >
              <el-option
                  v-for="item in majors"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <!--telephone-->
          <el-form-item label="Telephone" prop="phoneNumber" style="width: 400px">
            <el-input v-model="form.phoneNumber"/>
          </el-form-item>

          <!--QQ-->
          <el-form-item label="QQ" prop="qqNumber" style="width: 400px">
            <el-input v-model="form.qqNumber"/>
          </el-form-item>

          <!--Wechat-->
          <el-form-item label="Wechat" prop="wechatAccount" style="width: 400px">
            <el-input v-model="form.wechatAccount"/>
          </el-form-item>

          <!--room size-->
          <el-form-item label="Preferred Room Size" prop="preferRoomSize">
            <el-radio-group v-model="form.preferRoomSize">
              <el-radio :label="2"> Two</el-radio>
              <el-radio :label="3"> Three</el-radio>
              <el-radio :label="4"> Four</el-radio>
              <el-radio :label="5"> Five</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- Description -->
          <el-form-item label="Description">
            <el-input v-model="form.intro"
                      type="textarea"
                      :autosize="{minRows: 2, maxRows: 5}"
                      maxlength="200"
                      show-word-limit
                      placeholder="No more than 200 characters"></el-input>
          </el-form-item>

          <el-button type="primary" @click="save">Save</el-button>

        </el-form>

        <el-divider/>

        <el-form label-width="auto" size="small" :model="passwordForm" :rules="rules" ref="passwordForm"
                 @submit.native.prevent>
          <el-form-item label="Old Password" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" placeholder="Old password" type="password" show-password
                      style="width: 500px"/>
          </el-form-item>
          <el-form-item label="New Password" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" placeholder="New password" type="password" show-password
                      style="width: 500px"/>
          </el-form-item>
          <el-form-item label="Confirm" prop="confirmPassword">
            <el-input v-model="passwordForm.confirmPassword" placeholder="Confirm the password" type="password"
                      show-password style="width: 500px"/>
          </el-form-item>
          <el-button type="primary" @click="changePassword">Change password</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>