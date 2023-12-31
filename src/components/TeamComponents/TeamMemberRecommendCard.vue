<script setup>
import GameCardsStack from "@/components/decorations/GameCard/components/GameCardsStack.vue";
import ProfileCard from "@/components/ProfileComponents/ProfileCard.vue";
import {ref} from "vue";
</script>

<script>
import {ref} from "vue";

export default {
  data() {
    return {
      // global variables
      isTeamLeader: this.$store.state.isTeamLeader,

      // local variables
      recommendNumber: 3,
      recommendedMembers: [],  // List of {{recommendNumber}} usernames
      currentRecommendation: ref(0),
      temp: 1,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.refreshRecommendedMembers()
    })
  },

  methods: {
    refreshRecommendedMembers() {
      while (this.recommendedMembers.length < this.recommendNumber)
        this.recommendedMembers.push('user' + this.temp++)
        // TODO: do really recommendation here
      this.currentRecommendation = this.recommendedMembers[0]
    },

    inviteMember(username) {

    },

    shiftToNext() {
      this.recommendedMembers.shift()
      this.refreshRecommendedMembers()
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