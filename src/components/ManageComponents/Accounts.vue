<script setup>
import CreateAccountCard from "@/components/ManageComponents/AccountComponents/CreateAccountCard.vue";
import ManageAccountCard from "@/components/ManageComponents/AccountComponents/ManageAccountCard.vue";
</script>

<template>
  <div class="Cards">
    <CreateAccountCard/>
  </div>
  <div class="Cards">
    <ManageAccountCard/>
  </div>
</template>

<style scoped>
.Cards {
  margin: 1%;
  width: 95%;
}
</style>