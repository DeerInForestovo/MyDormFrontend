<script setup>
import {Refresh} from "@element-plus/icons-vue"
import axiosFunctions from "@/utils/api";
</script>

<script>
import {ref} from "vue";

export default {
  data() {
    return {
      username: ref(''),
      name: ref(''),

      invitations: [],
      applications: [],
    }
  },

  mounted() {
    this.refreshNotifications()
  },

  methods: {
    refreshNotifications() {

    },

    acceptInvitation(username) {

    },

    refuseInvitation(username) {

    },

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
      <el-table-column prop="time" label="Time" min-width="100"/>
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
</el-card>
</template>

<style scoped>
</style>