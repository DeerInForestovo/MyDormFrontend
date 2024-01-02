<script setup>
  import {Refresh, Delete} from "@element-plus/icons-vue"
  import yuzu from "@/assets/yuzu.png";
</script>

<script>
  import axiosFunctions from '@/utils/api'
  import {ElNotification} from "element-plus";
  import {toRaw} from "@vue/reactivity";
  export default {
    data(){
      return{
        //TODO: 根据后端的list变量来传
        username: this.$store.state.username,
        Message: [],
        room: null,
      }
    },
    mounted() {
      this.refreshMessage();
    },
    methods: {
      //filter
      refreshMessage(){
        this.username = this.$store.state.username;
        axiosFunctions.methods.getUserNotification()
            .then(response => {
              console.log(response.data);
              this.Message= response.data.map(item=>({
                ...item,
                showDetail: false
              }));
              console.log(this.Message);
            }).catch(response => { // possibly user not exist
              console.log(response)
              ElNotification({
                title: 'Failed',
                message: 'Failed to get message.',
                type: 'error',
              })
        })
      },

      filterMessage(type){
        return this.Message.filter(message => message.type === type);
      },

      readMessage(commentId){
        axiosFunctions.methods.readComment(commentId).then((response) => {
          console.log(response);
          this.$router.push({path: 'room/' + this.room.roomId, props: ['this.room.roomId']});
          console.log("read the comment!");
        }).catch((response) => {
          console.log(response);
          console.log("failed to read the comment!");
        })
      },

      getRoomId(commentId){
        axiosFunctions.methods.getComment(commentId)
          .then(response => {
            this.room = response.data;
            this.readMessage(commentId);
            console.log(this.room);
          }).catch(response => { // possibly user not exist
            console.log(response)
            ElNotification({
              title: 'Failed',
              message: 'Failed to get message.',
              type: 'error',
            })
        })
      },

      gotoTeam(){
        this.$router.push({path : 'team_invitation'});
      },


      gotoRoom(commentId){
        this.getRoomId(commentId);
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
    <el-collapse v-model="Message">
      <el-collapse-item>
        <template #title>
          <el-text size = "small" tag = "b"> Notification</el-text>
        </template>
        <el-card>

          <div v-if = "filterMessage('NOTIFICATION').length === 0 ">
            <el-empty description="No message">
            </el-empty>
          </div>
          <div v-else>
            <div v-for="(reply, index) in filterMessage('NOTIFICATION')" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
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
          <div v-if = "filterMessage('REPLY').length === 0 ">
              <el-empty description="No message">
              </el-empty>
          </div>
          <div v-else>
            <div v-for="(reply, index) in filterMessage('REPLY')" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
                <el-button text @click="gotoRoom(reply.id)">check</el-button>
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
          <el-text size = "small" tag = "b"> Application{{}}</el-text>
        </template>
        <el-card>
          <div v-if = "filterMessage('APPLICATION').length === 0 ">
            <el-empty description="No message">
            </el-empty>
          </div>

          <div v-else>
            <div v-for="(reply, index) in filterMessage('APPLICATION')" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
                <el-button text @click="this.$router.push({path : 'team'});">check</el-button>
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
          <el-text size = "small" tag = "b"> Invitation{{}}</el-text>

        </template>
        <el-card>
          <div v-if = "filterMessage('INVITATION').length === 0 ">
            <el-empty description="No message">
            </el-empty>
          </div>
          <div v-else>
            <div v-for="(reply, index) in filterMessage('INVITATION')" :key="index">
              <div class="reply-header">
                <span>{{ reply.time }}</span>
                <el-button text @click="this.$router.push({path : 'team_invitation'});">check</el-button>
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