<script setup>
import CommentSection from './CommentSection.vue';
import {Refresh, HomeFilled, Picture} from "@element-plus/icons-vue";
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";
</script>

<script>
import axiosFunctions from '@/utils/api'
import {ElNotification} from "element-plus";

export default {
  name: 'Room',
  props: {
    roomId: {
      required: true,
    },
  },
  mounted() {
    this.refreshRoom();
  },
  data() {
    // 不要在这里定义 isHeartCheck, stars 否则有问题
    // 另外这里的元素初值最好都设置为 null, 在 mount 方法赋初值
    return {
      username: null,
      rooms: {
        roomPicturePath: null,
        comments: [],
      },
    }
  },

  methods: {
    toggleHeart() {
      if (!this.isHeartChecked) {
        axiosFunctions.methods.addStar(this.username, this.roomId).then((response) => {
          ElNotification({
            title: "Success!",
            type: "success",
            message: "You have added this room into your favourite rooms!",
          })
          this.$store.state.stars.push(this.rooms)
        }).catch((response) => {
          ElNotification({
            title: "Failed",
            type: "error",
            message: "Failed to add this room into your favourite rooms!",
          })
          console.log(response)
        })
      } else {
        axiosFunctions.methods.removeStar(this.username, this.roomId).then((response) => {
          ElNotification({
            title: "Success!",
            type: "success",
            message: "You have removed this room from your favourite rooms!",
          })
          this.$store.commit('setStarRoom', this.$store.state.stars.filter(star => Number(star.roomId) !== Number(this.roomId)))
        }).catch((response) => {
          ElNotification({
            title: "Failed",
            type: "error",
            message: "Failed to remove this room from your favourite rooms!",
          })
          console.log(response)
        })
      }
    },

    refreshRoom() {
      this.username = this.$store.state.username
      axiosFunctions.methods.getRoomInfo(this.roomId)
          .then(response => {
            this.rooms = response.data;
            console.log(this.rooms);
          }).catch(response => { // possibly user not exist
        console.log(response)
        ElNotification({
          title: 'Failed',
          message: 'Failed to get room info. Does it exist?',
          type: 'error',
        })
      })
    }
  },
  computed: {
    isHeartChecked() {
      return this.$store.state.stars.some(star => Number(star.roomId) === Number(this.roomId))
    }
  }
}
</script>

<template>
  <div>
    <div class="container">
      <el-card style="width: 90%; margin: 1%" shadow="hover">
        <el-space>
          <div>
            {{this.rooms.buildingName}}
            {{this.rooms.roomName}}
          </div>
          <div style="color: lightslategray">
            Floor: {{this.rooms.floor}}
          </div>
          <div style="color: lightslategray">
            Capacity: {{this.rooms.capacity}}
          </div>
        </el-space>
        <el-divider>
        </el-divider>
        <el-button :icon="Refresh" size="small" text @click="refreshRoom"/>


        <div class="hidden-sm-and-up">
          <el-image :src="axiosFunctions.methods.getResourceByFilename(this.rooms.roomPicturePath)" class="Images">
            <template #error>
              <div class="image-slot">
              </div>
            </template>
          </el-image>
        </div>
        <el-row>
          <el-col :xs="0" :sm="10" :md="10" :lg="10" :xl="10">
            <div class="hidden-xs-only">
              <el-image :src="axiosFunctions.methods.getResourceByFilename(this.rooms.roomPicturePath)" class="Images">
                <template #error>
                  <div class="image-slot">
                  </div>
                </template>
              </el-image>
            </div>
          </el-col>
          <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
            <CommentSection
                :room-id="roomId"
                :comments-list="this.rooms.comments"
                @refresh-CommentSection = "refreshRoom"
            />
            <!--change the roomId-->
          </el-col>
        </el-row>
        <div class="heart-container" title="Like" @click='toggleHeart'>
          <input type="checkbox" class="checkbox" id="Give-It-An-Id" v-model="isHeartChecked">
          <div class="svg-container">
            <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
              </path>
            </svg>
            <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg" v-show="isHeartChecked">
              <path
                  d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
              </path>
            </svg>
            <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg"
                 v-show="isHeartChecked">
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </el-card>
    </div>

  </div>

</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart-container {
  --heart-color: rgb(255, 91, 137);
  position: relative;
  width: 50px;
  height: 50px;
  transition: .3s;
}

.heart-container .checkbox {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.heart-container .svg-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart-container .svg-outline,
.heart-container .svg-filled {
  fill: var(--heart-color);
  position: absolute;
}

.heart-container .svg-filled {
  animation: keyframes-svg-filled 1s;
}

.heart-container .svg-celebrate {
  position: absolute;
  animation: keyframes-svg-celebrate .5s;
  animation-fill-mode: forwards;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
}

.heart-container .checkbox:checked ~ .svg-container .svg-filled {
  display: block
}

.heart-container .checkbox:checked ~ .svg-container .svg-celebrate {
  display: block
}

@keyframes keyframes-svg-filled {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(1);
    filter: brightness(1.5);
  }
}

@keyframes keyframes-svg-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 1;
    filter: brightness(1.5);
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
    display: none;
  }
}
</style>