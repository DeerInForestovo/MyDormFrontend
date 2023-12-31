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
        notificationList: [
          {
            subject: "通知主题1",
            content: "通知内容1",
            time: "10:10"
          },
          {
            subject: "通知主题2",
            content: "通知内容2",
            time: "时间2"
          }],
        replyList:[],
        teamList:[]
        //replyList = this.$store.state.replyList
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.refreshNotifications()
      // })
      // this.fetchNotificationList();
    },
    methods: {
      refreshNotifications() {
        if (this.username == null) {
          return;
        }
        //database -> list
        axiosFunctions.methods.getMessageList(this.form.username, this.$store.state.token)
            .then(response => {
              if (response.data.username !== this.form.username) {
                console.log(response)
                ElNotification({
                  title: 'Failed',
                  message: 'Failed to get user info (response = ' + response.data.username + ', this = ' + this.form.username + ').',
                  type: 'error',
                })
              }
              this.form = response.data
              // form -> store
              if (this.username === this.$store.state.username) {
                this.$store.commit('setProfileInfo', this.form.name)
              }
            }).catch(response => {
          console.log(response)
          ElNotification({
            title: 'Failed',
            message: 'Failed to get user info. Does it exits?',
            type: 'error',
          })
        })

      },
      deleteNotification(index) {
        // 删除指定索引处的通知
        this.notificationList.splice(index, 1);
        //TODO: 给后端发送删除的请求
      }
    },
    watch:{
      username(){
        this.refreshNotifications();
      }
    }
  }
</script>

<template>
  <el-card>
    <el-collapse>
      <el-collapse-item>
        <template #title>
          <el-text size = "small" tag = "b"> Notification{{}}</el-text>
        </template>
        <el-card>
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <el-text size = "small" tag = "b"> Notification{{}}</el-text>
                <div @click.stop = "showCollapse()" >
                  <el-button :icon = "Delete" size="small" text />
                </div>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <el-text size = "small" tag = "b"> Reply{{}}</el-text>
        </template>
        <el-card>
          <div v-if = "replyList.length === 0 ">
              <el-empty description="No message">
              </el-empty>
          </div>
          <div v-else>
            <el-collapse>
              <el-collapse-item v-for="(reply, index) in replyList" :key="index" >
              </el-collapse-item>
            </el-collapse>
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
</style>