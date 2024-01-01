<script setup>
import Anon from "@/assets/Anon.png";
import axiosFunctions from "@/utils/api";

</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      stars: this.$store.state.stars,
      username: this.$store.state.username
    }
  },
  methods: {
    Delete(roomId) {
      axiosFunctions.methods.removeStar(this.username, roomId).then((response) => {
        ElNotification({
          title: "Success!",
          type: "success",
          message: "You have removed this room from your favourite rooms!",
        })
        this.stars =this.stars.filter(room => room.roomId !== roomId);
        console.log(response)
      }).catch((response) => {
        ElNotification({
          title: "Failed",
          type: "error",
          message: "Failed to remove this room from your favourite rooms!",
        })
        console.log('Failed to remove this room from your favourite rooms!')
        console.log(response)
      })
    }
  }
}
</script>
<template>
  <el-card style="width: 90%; margin: 1%;" shadow="hover">
    <div class="favorite-list">
      <el-card v-for="(room, index) in stars" :key="index" class="favorite-card">
        <el-image :src="axiosFunctions.methods.getResourceByFilename(room.roomPicturePath)" class="Images">
          <template #error>
            <div class="image-slot">
            </div>
          </template>
        </el-image>
        <br>
        <br>
        <div>
          <el-text tag="b"> {{room.roomName}} </el-text>
          <div class="bottom">
            <el-button @click="this.$router.push({path: '/home/room/' + room.roomId, props: ['room.roomId']})" type="text">Check</el-button>
            <el-button text class="button" @click="new Delete(room.roomId)">Delete</el-button>
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