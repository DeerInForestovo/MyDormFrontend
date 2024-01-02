<script setup>
import {CirclePlus, DocumentCopy, Promotion, Refresh} from "@element-plus/icons-vue"
import TeamApplicationDialog from "@/components/TeamComponents/TeamApplicationDialog.vue";
import teamApplicationDialog from "@/components/TeamComponents/TeamApplicationDialog.vue";
</script>

<script>
import {ElNotification} from "element-plus";
import axiosFunctions from "@/utils/api";

export default {
  data() {
    return {
      teamApplicationDialogVisible: false,
      username: '',
      name: '',
      teamInfo: {
        teamId: null,
        code: null,
        leader: null,
        leaderUsername: null,
        zoneName: null,
        roomId: null,
        roomName: null,
        teamMembers: [
          {
            username: null,
            name: null,
          }
        ],
        teamApplications: [
          {
            applicationId: null,
            username: null,
            name: null,
            time: null,
          }
        ]
      },
      inviteMemberInput: '',
    }
  },

  mounted() {
    this.refreshTeamInfo()
    console.log(this.teamInfo)
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
      this.username = this.$store.state.username
      this.name = this.$store.state.name
      axiosFunctions.methods.getTeamInfo()
          .then((response) => {
            this.teamInfo = response.data
            console.log(this.teamInfo)
          }).catch((response) => {
        console.log(response)
      })
    },

    kickTeamMember(kickedUsername) {
      axiosFunctions.methods.kickMember(this.username, this.teamInfo.code, kickedUsername)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Kicked that member.',
              type: "success",
            })
            this.refreshTeamInfo()
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.response.data,
          type: "error",
        })
      })
    },

    leaveTeam() {
      axiosFunctions.methods.leaveTeam()
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'You have leaved the team.',
              type: "success",
            })
            this.refreshTeamInfo()
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.response.data,
          type: "error",
        })
        console.log(response)
      })
    },

    createTeam() {
      axiosFunctions.methods.createTeam()
          .then((response) => {
            ElNotification({
              type: "success",
              title: 'Success!',
              message: "Created team.",
            })
            this.refreshTeamInfo()
          })
    },

    inviteMember() {
      axiosFunctions.methods.sendInvitation(this.username, this.inviteMemberInput, this.teamInfo.code)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Invitation has been sent.',
              type: "success",
            })
            this.inviteMemberInput = ''
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.response.data,
          type: "error",
        })
        console.log(response)
      })
    },

    acceptApplication(applicationId) {
      if (this.username !== this.teamInfo.leaderUsername) {
        ElNotification({
          type: 'error',
          message: 'You are not the team leader!',
          title: 'Failed',
        })
      } else {
        axiosFunctions.methods.acceptApplication(this.username, applicationId)
            .then((response) => {
              ElNotification({
                title: 'Success!',
                message: 'Accepted this application.',
                type: "success",
              })
              this.refreshTeamInfo()
            }).catch((response) => {
          ElNotification({
            title: 'Failed!',
            message: response.response.data,
            type: "error",
          })
        })
      }
    },

    refuseApplication(applicationId, row) {
      if (this.username !== this.teamInfo.leaderUsername) {
        ElNotification({
          type: 'error',
          message: 'You are not the team leader!',
          title: 'Failed',
        })
      } else {
        axiosFunctions.methods.denyApplication(this.username, applicationId)
            .then((response) => {
              ElNotification({
                title: 'Success!',
                message: 'Refused this application.',
                type: "success",
              })
              this.teamInfo.teamApplications.splice(row)
            }).catch((response) => {
          ElNotification({
            title: 'Failed!',
            message: response.response.data,
            type: "error",
          })
        })
      }
    },

    deselectRoom() {
      axiosFunctions.methods.deselectRoom(this.$store.state.username, this.teamInfo.roomId)
          .then(response => {
            ElNotification({
              type: "success",
              message: "Deselected the room of your team",
              title: "Success!",
            })
            this.$router.go(0)
          })
          .catch((response) => {
            ElNotification({
              type: "error",
              message: response.response.data,
              title: "Failed!",
            })
          })
    }
  }
}
</script>

<template>
  <TeamApplicationDialog v-model="teamApplicationDialogVisible"/>
  <el-card shadow="hover" style="margin: 1%">
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
        <el-text> {{ teamInfo.zoneName }}</el-text>
      </el-space>
    </p>

    <el-divider/>

    <!--  If the user have a team   -->
    <div v-if="teamInfo.teamId">
      <!--  Team Invite Code  -->
      <p>
        <el-space>
          <el-text tag="b"> Team Invite Code:</el-text>
          <el-text> {{ teamInfo.code }}</el-text>
          <el-button :icon="DocumentCopy" size="small" text @click="copyToClipboard(teamInfo.code)"/>
        </el-space>
      </p>

      <!--  Team Leader  -->
      <p>
        <el-space>
          <el-text tag="b"> Team Leader:</el-text>
          <el-text> {{ teamInfo.leader }}</el-text>
        </el-space>
      </p>

      <!--  RoomComponents  -->
      <p>
        <el-space>
          <el-text tag="b"> Selected Room:</el-text>
          <el-text> {{ teamInfo.roomName }}</el-text>
          <el-popconfirm
              width="280px"
              title="Sure to deselect the room?"
              @confirm="deselectRoom">
            <template #reference>
              <el-button size="small" type="danger" :disabled="this.username !== this.teamInfo.leaderUsername"> Deselect </el-button>
            </template>
          </el-popconfirm>
        </el-space>
      </p>

      <!--  Team Member List  -->
      <p>
        <el-text tag="b"> Members:</el-text>
      </p>
      <el-table :data="teamInfo.teamMembers" style="width: 100%">
        <el-table-column prop="username" label="ID" min-width="100"/>
        <el-table-column prop="name" label="Name" min-width="100"/>
        <el-table-column label="Operation" min-width="100">
          <template #default="scope">
            <el-popconfirm
                width="280px"
                title="Sure to remove this member?"
                @confirm="kickTeamMember(scope.row.username)">
              <template #reference>
                <el-button type="danger" size="small" :disabled="username !== teamInfo.leaderUsername || username === scope.row.username"> Kick</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--  Invite Member  -->
      <p>
        <el-space>
          <el-text tag="b"> Invite Member:</el-text>
          <el-input v-model="inviteMemberInput" placeholder="Input username"/>
          <el-button type="primary" @click="inviteMember"> Invite</el-button>
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

      <el-divider/>

      <!--  Applications  -->
      <p>
        <el-text size="large" tag="b"> Applications</el-text>
      </p>
      <el-table :data="teamInfo.teamApplications" style="width: 100%">
        <el-table-column prop="username" label="Username" min-width="100"/>
        <el-table-column prop="name" label="Name" min-width="100"/>
        <el-table-column prop="time" label="Time" min-width="100"/>
        <el-table-column label="Operation" min-width="200">
          <template #default="scope">
            <el-space>
              <el-popconfirm
                  width="280px"
                  title="Sure to accept this application?"
                  @confirm="acceptApplication(scope.row.applicationId)">
                <template #reference>
                  <el-button type="success" size="small" :disabled="username !== teamInfo.leaderUsername"> Accept</el-button>
                </template>
              </el-popconfirm>

              <el-popconfirm
                  width="280px"
                  title="Sure to refuse this application?"
                  @confirm="refuseApplication(scope.row.applicationId, scope.$index)">
                <template #reference>
                  <el-button type="danger" size="small" :disabled="username !== teamInfo.leaderUsername"> Refuse</el-button>
                </template>
              </el-popconfirm>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!--  If the user have no team  -->
    <div v-else>
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