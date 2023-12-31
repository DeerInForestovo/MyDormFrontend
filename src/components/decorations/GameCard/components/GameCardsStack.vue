<template>
  <div class="cards">
    <GameCard
        v-for="(username, index) in usernameArray"
        :key="username"
        :username="username"
        :is-current="index === 0"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped"
        @hideCard="$emit('shift');"
    />
  </div>
</template>

<script>
import GameCard from "../components/GameCard.vue";

export default {
  components: {
    GameCard
  },

  props: {
    usernameArray: {
      required: true
    }
  },

  methods: {
    handleCardAccepted() {
      // console.log("handleCardAccepted");
    },
    handleCardRejected() {
      // console.log("handleCardRejected");
    },
    handleCardSkipped() {
      // console.log("handleCardSkipped");
    },
  }
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
}
</style>
