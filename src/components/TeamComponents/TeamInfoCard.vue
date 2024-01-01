<script setup>
import {CirclePlus, DocumentCopy, Promotion, Refresh} from "@element-plus/icons-vue"
import TeamApplicationDialog from "@/components/TeamComponents/TeamApplicationDialog.vue";
import teamApplicationDialog from "@/components/TeamComponents/TeamApplicationDialog.vue";
import {ref} from "vue";

const inviteMemberInput = ref('')
</script>

<script>
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      teamApplicationDialogVisible: false,

      // global variables
      username: this.$store.state.username,
      name: this.$store.state.name,

      teamID: this.$store.state.teamID,
      teamInviteCode: this.$store.state.teamInviteCode,
      teamLeaderName: this.$store.state.teamLeaderName,
      isTeamLeader: this.$store.state.isTeamLeader,

      // local variables
      teamMemberList: [],
    }
  },

  mounted() {
    this.refreshTeamInfo()
  },

  methods: {
    // ref: https://blog.csdn.net/qq_36380426/article/details/130757892
    async copyToClipboard(text) {
      ElNotification({
        title: 'Copied!',
        message: 'Copied "' + text + '" to your clipboard.',
      })
      await navigator.clipboard.writeText(text);
    },

    refreshTeamInfo() {
      
    },

    kickTeamMember() {

    },

    leaveTeam() {

    },

    createTeam() {

    },

    inviteMember() {

    }
  }
}
</script>

<template>
  <el-card shadow="hover" style="margin: 1%">
    <TeamApplicationDialog v-model="teamApplicationDialogVisible"/>
    <template #header>
      <el-space>
        <el-text size="large" tag="b"> My Team</el-text>
        <el-button :icon="Refresh" size="small" text @click="refreshTeamInfo"/>
      </el-space>
    </template>

    <!--  User Name  -->
    <p>
      <el-space>
        <el-text tag="b"> My Name:</el-text>
        <el-text> {{ name }}</el-text>
      </el-space>
    </p>

    <!--  My Zone  -->
    <p>
      <el-space>
        <el-text tag="b"> My Zone:</el-text>
        <el-text> {{ 'zone' }}</el-text>
      </el-space>
    </p>

    <el-divider/>

    <!--  If the user have a team   -->
    <div v-show="teamID">
      <!--  Team Invite Code  -->
      <p>
        <el-space>
          <el-text tag="b"> Team Invite Code:</el-text>
          <el-text> {{ teamInviteCode }}</el-text>
          <el-button :icon="DocumentCopy" size="small" text @click="copyToClipboard(teamInviteCode)"/>
        </el-space>
      </p>

      <!--  Team Leader  -->
      <p>
        <el-space>
          <el-text tag="b"> Team Leader:</el-text>
          <el-text> {{ teamLeaderName }}</el-text>
        </el-space>
      </p>

      <!--  RoomComponents  -->
      <p>
        <el-space>
          <el-text tag="b"> Selected Room:</el-text>
          <el-text> {{ 'room' }}</el-text>
        </el-space>
      </p>

      <!--  Team Member List  -->
      <p>
        <el-text tag="b"> Members:</el-text>
      </p>
      <el-table :data="teamMemberList" style="width: 100%">
        <el-table-column prop="username" label="ID" min-width="100"/>
        <el-table-column prop="name" label="Name" min-width="100"/>
        <el-table-column label="Operation" min-width="100">
          <template #default="scope">
            <el-popconfirm
                width="280px"
                title="Sure to remove this member?"
                @confirm="kickTeamMember(scope.row.username)">
              <template #reference>
                <el-button type="danger" size="small" :disabled="!isTeamLeader"> Kick</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--  Invite Member  -->
      <p>
        <el-space>
          <el-text tag="b"> Invite Member:</el-text>
          <el-input :v-model="inviteMemberInput" placeholder="Input Student ID"/>
          <el-button type="primary" :disabled="!this.isTeamLeader" @click="inviteMember"> Invite</el-button>
        </el-space>
      </p>

      <!--  Leave Team  -->
      <p>
        <el-space>
          <el-text tag="b"> Leave Team:</el-text>
          <el-popconfirm
              width="230px"
              title="Sure to leave this team?"
              @confirm="leaveTeam">
            <template #reference>
              <el-button type="danger"> Leave Team</el-button>
            </template>
          </el-popconfirm>
        </el-space>
      </p>
    </div>


    <!--  If the user have no team  -->
    <div v-show="!teamID">
      <el-text tag="b"> You are not in a team yet!</el-text>
      <br><br>
      <el-button type="primary" @click="createTeam">
        <el-space>
          <el-icon>
            <CirclePlus/>
          </el-icon>
          <span> Create a Team! </span>
        </el-space>
      </el-button>
      <el-button type="primary" @click="teamApplicationDialogVisible=true">
        <el-space>
          <el-icon>
            <Promotion/>
          </el-icon>
          <span> Apply for a Team! </span>
        </el-space>
      </el-button>
    </div>


  </el-card>
</template>

<style scoped>
</style>