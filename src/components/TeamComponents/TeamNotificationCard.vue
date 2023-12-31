<script setup>
import {Refresh} from "@element-plus/icons-vue"
</script>

<script>
export default {
  data() {
    return {
      // global variables
      isTeamLeader: this.$store.state.isTeamLeader,

      // local variables
      invitations: [],
      applications: [],
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.refreshNotifications()
    })
  },

  methods: {
    refreshNotifications() {
      this.invitations = [
        {
          username: 5,
          name: 'Umiri',
        },
      ]
      this.applications = [
        {
          username: 6,
          name: 'Mutsumi',
        },
      ]
    },

    acceptInvitation(username) {

    },

    refuseInvitation(username) {

    },

    acceptApplication(username) {

    },

    refuseApplication(username) {

    }

  }
}

</script>

<template>
  <el-card shadow="hover" style="margin: 1%">
    <template #header>
      <el-space>
        <el-text size="large" tag="b"> Notifications</el-text>
        <el-button :icon="Refresh" size="small" text @click="refreshNotifications"/>
      </el-space>
    </template>

    <!--  Invitations  -->
    <p>
      <el-text size="large" tag="b"> Invitations</el-text>
    </p>
    <el-table :data="invitations" style="width: 100%">
      <el-table-column prop="username" label="ID" min-width="100"/>
      <el-table-column prop="name" label="Name" min-width="100"/>
      <el-table-column label="Operation" min-width="200">
        <template #default="scope">
          <el-space>
            <el-popconfirm
                width="280px"
                title="Sure to accept this invitation?"
                @confirm="acceptInvitation(scope.row.username)">
              <template #reference>
                <el-button type="success" size="small"> Accept</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm
                width="280px"
                title="Sure to refuse this application?"
                @confirm="refuseInvitation(scope.row.username)">
              <template #reference>
                <el-button type="danger" size="small"> Refuse</el-button>
              </template>
            </el-popconfirm>
          </el-space>
        </template>
      </el-table-column>
    </el-table>

    <el-divider/>

    <!--  Applications  -->
    <p>
      <el-text size="large" tag="b"> Applications</el-text>
    </p>
    <el-table :data="applications" style="width: 100%">
      <el-table-column prop="username" label="ID" min-width="100"/>
      <el-table-column prop="name" label="Name" min-width="100"/>
      <el-table-column label="Operation" min-width="200">
        <template #default="scope">
          <el-space>
            <el-popconfirm
                width="280px"
                title="Sure to accept this application?"
                @confirm="acceptApplication(scope.row.username)">
              <template #reference>
                <el-button type="success" size="small" :disabled="!isTeamLeader"> Accept</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm
                width="280px"
                title="Sure to refuse this invitation?"
                @confirm="refuseApplication(scope.row.username)">
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