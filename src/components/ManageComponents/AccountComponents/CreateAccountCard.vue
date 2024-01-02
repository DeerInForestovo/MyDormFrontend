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

    uploadFileOnClick() {
      // TODO
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
    <el-button text class="Buttons" type="primary" @click="uploadFileOnClick">
      uploading a file
    </el-button>
    <el-button text plain @click="createByFileIntroductionVisible=true">
      <el-icon>
        <InfoFilled/>
      </el-icon>
    </el-button>
  </el-card>
</template>

<style scoped>

</style>