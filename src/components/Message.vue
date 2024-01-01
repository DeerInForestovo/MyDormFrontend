<script setup>
  import {Refresh, Delete} from "@element-plus/icons-vue"
  import yuzu from "@/assets/yuzu.png";
</script>

<script>
  import axiosFunctions from '@/utils/api'
  import {ElNotification} from "element-plus";
  export default {
    data(){
      return{
        //TODO: 根据后端的list变量来传
        MessageList: [
          {
            type:1,
            content: "This is a notification.This is a notification.This is a notification.This is a notification.This is a notification.This is a notification.This is a notification.This is a notification.",
            id: 1,
            time: "10:10",
            showDetail: false,
          },
          {
            type:1,
            content: "This is a notification.",
            id: 2,
            time: "10:10",
            showDetail: false,
          },
          {
            type:1,
            content: "This is a reply.",
            id: 3,
            time: "10:10",
            showDetail: false,
          }],
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.refreshNotifications()
      // })
      // this.fetchNotificationList();
    },
    methods: {
      //filter
      filterMessage(type){
        return this.MessageList.filter(message => message.type === type);
      },
      refreshNotifications() {
        //database -> list

      },
      deleteMessage(index) {
        // 删除指定索引处的通知
      },
      toggleDetails(reply) {
        reply.showDetail = !reply.showDetail;
      }
    },
    watch:{
    }
  }
</script>

<template>
  <el-card>
    <el-collapse v-model="MessageList">
      <el-collapse-item>
        <template #title>
          <el-text size = "small" tag = "b"> Notification</el-text>
        </template>
        <el-card>

          <div v-if = "filterMessage(1).length === 0 ">
            <el-empty description="No message">
            </el-empty>
          </div>
          <div v-else>
            <div v-for="(reply, index) in filterMessage(1)" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
                <el-button @click="deleteMessage(index)" text>
                  <el-icon>
                    <Delete/>
                  </el-icon>
                </el-button>
              </div>
              <div
                  :class="{'ellipsis-text': !reply.showDetail}"
                  @click="toggleDetails(reply)"
              >
                {{ reply.content }}
              </div>
              <div v-if="!reply.showDetail" @click="toggleDetails(reply)" style="color: blue;">
                Show Details
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <el-text size = "small" tag = "b"> Reply{{}}</el-text>
        </template>
        <el-card>
          <div v-if = "filterMessage(2).length === 0 ">
              <el-empty description="No message">
              </el-empty>
          </div>
          <div v-else>
            <div v-for="(reply, index) in filterMessage(2)" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
                <el-button @click="deleteMessage(index)" text>
                  <el-icon>
                    <Delete/>
                  </el-icon>
                </el-button>
              </div>
              <div
                  :class="{'ellipsis-text': !reply.showDetail}"
                  @click="toggleDetails(reply)"
              >
                {{ reply.content }}
              </div>

              <div v-if="!reply.showDetail" @click="toggleDetails(reply)" style="color: blue;">
                Show Details
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </el-card>


</template>

<style scoped>
  .NotificationCard,
  .ReplyCard,
  .TeamCard{
    display: inline-block;
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 35px;
    width:350px;
    height: 550px;
  }
  .NotificationInfoCard{
    width: 300px;
    height: 100px;
  }
  .ep-collapse-item__arrow {
    flex: 1 0 auto;
    order: -1;
  }
  .title-line {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }

  .time-line {
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .ellipsis-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
</style>