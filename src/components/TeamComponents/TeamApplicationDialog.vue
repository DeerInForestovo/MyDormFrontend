<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      teamApplicationDialogInput: {
        inputInviteCode: null
      },
    }
  },

  methods: {
    joinTeam() {
      let code = this.teamApplicationDialogInput.inputInviteCode
      if (!code) return
      this.teamApplicationDialogInput = {}
      axiosFunctions.methods.sendTeamApplication(this.$store.state.username, code)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Team application has been sent successfully.',
              type: "success",
            })
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.message,
          type: "error",
        })
      })
    },
  }
}
</script>

<template>
  <el-dialog style="width: 600px; height: auto" title="Apply for Team">
    <el-form
        ref="teamApplicationDialogInput"
        :model="teamApplicationDialogInput"
        label-width="auto"
        label-position="right"
        @submit.native.prevent
    >
      <el-form-item label="Invite Code" prop="inputInviteCode">
        <el-input style="width: 300px" v-model="teamApplicationDialogInput.inputInviteCode"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button round type="primary" @click="joinTeam"> Apply</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>