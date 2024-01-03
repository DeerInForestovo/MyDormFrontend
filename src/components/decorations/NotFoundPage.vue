<script setup>

</script>

<template>
  <div class="center-container">
    <el-card class="box-card">
      <div class="text-center">
        <h1>404 Not Found</h1>
        <img src="../../assets/maki.png" height="248" width="248" alt=""/>
        <p>The page you are looking for does not exist.</p>
      </div>
      <div class="text-center">
        <el-button type="primary" @click="this.$router.back()">Back</el-button>
        <el-button type="success" @click="this.$router.push('/home')">Home</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box-card {
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2em;
}

p {
  font-size: 1em;
}


</style>