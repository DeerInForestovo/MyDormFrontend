<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";

export default {
  data() {
    return {
      allMajor: [],

    }
  },

  mounted() {
    axiosFunctions.methods.getAllMajor()
        .then(response => this.allMajor = response.data)
        .catch(response => console.log(response.response.data))
  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Set Zone
      </el-text>
    </template>


  </el-card>
</template>

<style scoped>
</style>