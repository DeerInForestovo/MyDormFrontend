<script setup>
import ZoneInfo from "@/components/ManageComponents/ZoneComponents/ZoneInfo.vue";
import CreateZone from "@/components/ManageComponents/ZoneComponents/CreateZone.vue";
import PutStudentIntoZone from "@/components/ManageComponents/ZoneComponents/PutStudentIntoZone.vue";
import PutRoomIntoZone from "@/components/ManageComponents/ZoneComponents/PutRoomIntoZone.vue";
</script>

<template>
  <div class="Cards">
    <zone-info/>
  </div>
  <div class="Cards">
    <create-zone/>
  </div>
  <div class="Cards">
    <put-student-into-zone/>
  </div>
  <div class="Cards">
    <put-room-into-zone/>
  </div>
</template>

<style scoped>
.Cards {
  margin: 1%;
  width: 95%;
}
</style>