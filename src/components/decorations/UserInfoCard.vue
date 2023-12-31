<script setup>
</script>

<script>
export default {
  props: {
    username: {
      required: true
    }
  },

  data() {
    return {
      username: this.props.username
    }
  }
}
</script>

<template>
  <el-text> {{ this.username }}</el-text>
</template>

<style scoped>
</style>