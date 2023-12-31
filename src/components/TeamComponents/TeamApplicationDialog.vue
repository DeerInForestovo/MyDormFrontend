<script setup>
</script>

<script>
export default {
  data() {
    const inviteCodeValidator = (rule, value, callback) => {
      const re = /^[A-Z0-9]{5}$/
      if(!re.test(value)) return callback(new Error('Invalid invite code'))
      callback()
    }
    return {
      teamApplicationDialogInput: {},
      rules: {
        inputInviteCode: [
          { validator: inviteCodeValidator, trigger: 'blur' }
        ]
      },
    }
  },

  methods: {
    joinTeam() {
      this.$refs['teamApplicationDialogInput'].validate((valid) => {
        if (valid) {
          let code = this.teamApplicationDialogInput.inputInviteCode
          this.teamApplicationDialogInput = {}
          // send application to this code
          // ...
        }
      })
    },
  }
}
</script>

<template>
  <el-dialog style="width: 600px; height: auto" title="Search Team">
    <el-form
        ref="teamApplicationDialogInput"
        :model="teamApplicationDialogInput"
        :rules="rules"
        label-width="auto"
        label-position="right"
        @submit.native.prevent
    >
      <el-form-item label="Invite Code" prop="inputInviteCode">
        <el-input style="width: 300px" v-model="teamApplicationDialogInput.inputInviteCode" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button round type="primary" @click="joinTeam"> Search </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>