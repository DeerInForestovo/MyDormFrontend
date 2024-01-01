<script setup>

</script>

<script>
export default {
  data() {
    return {
      zones: [],
    }
  },

  mounted() {

  }
}
</script>

<template>
  <div class="Cards">
    <el-card shadow="hover">
      <template #header>
        <el-text tag="b"> Release a Selection Task </el-text>
      </template>

      <p>
        <el-text tag="b">
          1. Select zones for this selection task
        </el-text>
      </p>




    </el-card>
  </div>
</template>

<style scoped>
.Cards {
  margin: 1%;
  width: 95%;
}
</style>