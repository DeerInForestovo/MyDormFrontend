<script setup>
import {Refresh} from "@element-plus/icons-vue"
</script>

<script>
import {ref} from "vue";
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      username: null,
      name: null,

      invitations: [],
    }
  },

  mounted() {
    this.refreshInvitations()
  },

  methods: {
    refreshInvitations() {
      axiosFunctions.methods.getTeamInvitation()
          .then(response => {
            this.invitations = response.data
            console.log(this.invitations)
          })
          .catch(response => {
            console.log(response)
          })
    },

    acceptInvitation(invitationId) {
      axiosFunctions.methods.acceptInvitation(this.username, invitationId)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Accepted invitation.',
              type: "success",
            })
            this.$router.push('/home/team')
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.data,
          type: "error",
        })
        console.log(response)
      })
    },

    refuseInvitation(invitationId, row) {
      axiosFunctions.methods.denyInvitation(this.username, invitationId)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Refused invitation.',
              type: "success",
            })
            this.invitations.splice(row)
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.data,
          type: "error",
        })
        console.log(response)
      })
    },
  }
}

</script>

<template>
  <el-card shadow="hover" style="margin: 1%">
    <template #header>
      <el-space>
        <el-text size="large" tag="b"> Notifications</el-text>
        <el-button :icon="Refresh" size="small" text @click="refreshInvitations"/>
      </el-space>
    </template>

    <!--  Invitations  -->
    <p>
      <el-text size="large" tag="b"> Invitations</el-text>
    </p>
    <el-table :data="invitations" style="width: 100%">
      <el-table-column prop="fromUsername" label="Username" min-width="100"/>
      <el-table-column prop="fromName" label="Name" min-width="100"/>
      <el-table-column prop="time" label="Time" min-width="100"/>
      <el-table-column label="Operation" min-width="200">
        <template #default="scope">
          <el-space>
            <el-popconfirm
                width="280px"
                title="Sure to accept this invitation?"
                @confirm="acceptInvitation(scope.row.invitationId)">
              <template #reference>
                <el-button type="success" size="small"> Accept</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm
                width="280px"
                title="Sure to refuse this application?"
                @confirm="refuseInvitation(scope.row.invitationId, scope.$index)">
              <template #reference>
                <el-button type="danger" size="small"> Refuse</el-button>
              </template>
            </el-popconfirm>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
</el-card>
</template>

<style scoped>
</style>