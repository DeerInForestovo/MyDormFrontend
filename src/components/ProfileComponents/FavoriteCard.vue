<script setup>
import Anon from "@/assets/Anon.png";

</script>

<script>
export default {
  data() {
    return {
      // TODO: 根据后端的list变量来传
      FavoriteList: ["Room1", "Room2"]
    }
  },
  methods: {
    Check() {

    },
    Delete(index) {
      // 删除指定索引处的通知
      this.FavoriteList.splice(index, 1);
      // TODO: 给后端发送删除的请求
    }
  }
}
</script>
<template>
  <el-card style="width: 90%; margin: 1%;" shadow="hover">
    <div class="favorite-list">
      <el-card v-for="(favorite, index) in FavoriteList" :key="index" class="favorite-card">
        <el-image :src="Anon" class="Images"/>
        <br>
        <br>
        <div>
          <el-text tag="b"> {{favorite}} </el-text>
          <div class="bottom">
            <el-button text class="button" @click="Check">Check</el-button>
            <el-button text class="button" @click="Delete">Delete</el-button>
          </div>
        </div>
      </el-card>
    </div>

  </el-card>
</template>

<style scoped>

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.favorite-card {
  width: 270px;
  margin: 20px;
}

.favorite-list {
  display: flex;
  flex-wrap: wrap;
}

</style>