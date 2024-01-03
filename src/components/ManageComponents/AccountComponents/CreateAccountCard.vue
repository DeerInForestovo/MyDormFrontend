<script setup>
import {InfoFilled} from "@element-plus/icons-vue"
import CreateByFileIntroduction from "@/components/ManageComponents/AccountComponents/CreateByFileIntroduction.vue"
import studentInfoFormComponent from "@/components/ManageComponents/AccountComponents/StudentInfoForm.vue"
import {ref} from "vue"

const createByFileIntroductionVisible = ref(false)

</script>

<script>
import {ref} from "vue";
import {ElNotification} from "element-plus";
import axiosFunctions from "@/utils/api";

export default {
  data() {
    return {
      studentInfoForm: {},
      infoFormCheck: false,
    }
  },

  methods: {
    createAccount() {
      if (this.infoFormCheck) {
        axiosFunctions.methods.createUser(this.studentInfoForm.username, this.studentInfoForm.password)
            .then(response => {
              axiosFunctions.methods.updateUserProfile(true, this.studentInfoForm.username, {
                username: this.studentInfoForm.username,
                name: this.studentInfoForm.name,
                gender: this.studentInfoForm.gender,
                preferRoomSize: 4,
              })
                  .then(response => {
                    ElNotification({
                      title: 'Success!',
                      message: "Account created.",
                      type: "success",
                    })
                    this.studentInfoForm = {}
                  })
                  .catch(response => {
                    ElNotification({
                      title: 'Failed',
                      message: 'Failed to set info:' + response.data,
                      type: 'error'
                    })
                    console.log(response)
                  })
            })
            .catch(response => {
              ElNotification({
                title: 'Failed',
                message: 'Failed to create account:' + response.data,
                type: 'error'
              })
              console.log(response)
            })
      }
    },

    getCheckInput(inputCheck) {
      this.infoFormCheck = inputCheck;
    },

    openFileDialog() {
      this.$refs.fileInput.click();
    },

    loadCSV(event) {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];
        if (this.isFileCSV(file)) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const csvContent = event.target.result;

            // console.log(csvContent['username']);
            console.log(csvContent);
            axiosFunctions.methods.batchCreatUser(csvContent).then((response) => {
              ElNotification({
                title: "Success!",
                type: "success",
                message: "You have created the users from the file!",
              })
              console.log(response);
            }).catch((response) => {
              ElNotification({
                title: "Failed",
                type: "error",
                message: "Failed to creat users.",
              })
              console.log(response)
            })
          };
          reader.readAsText(file);
        } else {
          alert('please choose the csv file!');
        }
      }
    },
    // 判断文件类型是否为CSV
    isFileCSV(file) {
      return file.type === 'text/json' || file.name.endsWith('.json');
    }
  }
}
</script>

<template>
  <!--  intro dialog  -->
  <CreateByFileIntroduction v-model="createByFileIntroductionVisible"/>

  <!--  Card  -->
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Create Student Accounts
      </el-text>
    </template>
    <el-text>
      Create a student account by filling up a form
    </el-text>
    <br><br>

    <studentInfoFormComponent :form="this.studentInfoForm" @checkInput="getCheckInput"/>

    <el-button type="success" round @click="createAccount"> Create</el-button>
    <br><br>
    <el-text>
      or create by
    </el-text>
    <input type="file" ref="fileInput" style="display: none" @change="loadCSV" accept=".json"/>
    <el-button text class="Buttons" type="primary" @click="openFileDialog">
      uploading a file
    </el-button>


    <!-- 显示按钮 -->

    <el-button text plain @click="createByFileIntroductionVisible=true">
      <el-icon>
        <InfoFilled/>
      </el-icon>
    </el-button>
  </el-card>
</template>

<style scoped>

</style>