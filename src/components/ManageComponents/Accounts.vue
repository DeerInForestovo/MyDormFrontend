<script setup>
import CreateAccountCard from "@/components/ManageComponents/AccountComponents/CreateAccountCard.vue";
import ManageAccountCard from "@/components/ManageComponents/AccountComponents/ManageAccountCard.vue";
import SetZone from "@/components/ManageComponents/AccountComponents/SetZone.vue";
</script>

<template>
  <div class="Cards">
    <CreateAccountCard/>
  </div>
  <div class="Cards">
    <ManageAccountCard/>
  </div>
  <div class="Cards">
    <SetZone/>
  </div>
</template>

<style scoped>
.Cards {
  margin: 1%;
  width: 95%;
}
</style>