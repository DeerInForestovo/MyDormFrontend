<script setup>
import GameCardsStack from "@/components/decorations/GameCard/components/GameCardsStack.vue";
import ProfileCard from "@/components/ProfileComponents/ProfileCard.vue";
import {ref} from "vue";
</script>

<script>
import {ref} from "vue";
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      recommendedMembers: [],
      currentRecommendation: null,
      teamInfo: {}
    }
  },

  mounted() {
    this.refreshTeamInfo()
    this.refreshRecommendedMembers()
  },

  methods: {
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

    refreshRecommendedMembers() {
      axiosFunctions.methods.recommendRoommate(this.$store.state.username, 0, 100)
          .then(response => {
            this.recommendedMembers = response.data;
            this.recommendedMembers = this.recommendedMembers.map(user => user.username)
            this.currentRecommendation = this.recommendedMembers[0]
          })
          .catch(response => {console.log(response)})
    },

    inviteMember(username) {
      axiosFunctions.methods.sendInvitation(this.username, username, this.teamInfo.code)
          .then((response) => {
            ElNotification({
              title: 'Success!',
              message: 'Invitation has been sent.',
              type: "success",
            })
          }).catch((response) => {
        ElNotification({
          title: 'Failed!',
          message: response.response.data,
          type: "error",
        })
        console.log(response)
      })
    },

    shiftToNext() {
      this.recommendedMembers.shift()
      this.currentRecommendation = this.recommendedMembers[0]
    }
  }
}
</script>

<template>
  <el-row>
    <!--    Profile    -->
    <el-col :span="17">
      <div v-if="this.currentRecommendation">
        <ProfileCard :username="this.currentRecommendation"/>
      </div>
    </el-col>
    <!--    Card Stack    -->
    <el-col :span="7">
      <div style="position: relative">
        <br>
        <br>
        <br>
        <div style="height: 250px">
          <GameCardsStack :usernameArray="this.recommendedMembers" @shift="shiftToNext"/>
        </div>
        <el-button type="primary"
                   :disabled="!this.recommendedMembers.length"
                   @click="inviteMember(this.currentRecommendation)"
                   style="position: absolute;
                          left: 50%;
                          transform: translateX(-50%);"
        >
          Invite
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
</style>