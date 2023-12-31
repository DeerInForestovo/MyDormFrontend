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
        // create account
        // ...
        console.log(this.studentInfoForm)
        // clear input form
        this.studentInfoForm = {}
        // notification
        ElNotification({
          type: 'success',
          title: 'Success!',
          message: 'A new account has been created.'
        })
      }
    },

    getCheckInput(inputCheck) {
      this.infoFormCheck = inputCheck;
    },

    uploadFileOnClick() {

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