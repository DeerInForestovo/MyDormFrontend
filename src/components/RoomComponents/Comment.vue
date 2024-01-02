<script setup>
import yuzu from "@/assets/yuzu.png"
import {Position, ChatRound, Delete, ChatDotRound} from "@element-plus/icons-vue";

</script>

<template>
  <div class="comment">
    <el-row type="flex" :gutter="30">
      <el-col :span = "3">
        <el-avatar shape="square" :size="30" :fit="fill" :src="axiosFunctions.methods.getResourceByFilename(this.comment.profilePhotoUrl)"/>
        <!--根据userId获取头像-->
        <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
      </el-col>

      <el-col :span="21">
        <div class="username" style="display: flex; align-items: center;">
          <el-space>
            {{ comment.name + "@" + comment.username }}
            <div :style="{color: 'grey'}">
              {{comment.time}}
            </div>
          </el-space>

          <el-button type="text" @click = "chooseReply(comment.username)">
            <el-icon>
              <ChatRound/>
            </el-icon>
          </el-button>
          <el-button type="text" v-if="isCurrentUser(comment.username)" @click="deleteComment(comment.commentId)" >

            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </div>
        <div class="info">
          <div class="content">{{ comment.content }}</div>
          <el-divider></el-divider>
        </div>

        <div v-if="comment.replies.length">

          <div v-for = "reply in comment.replies">
            <el-row :gutter = "30">
              <el-col :span = "3">
                <el-avatar shape="square" :size="30" :fit="fill" :src="axiosFunctions.methods.getResourceByFilename(reply.profilePhotoUrl)"/>

              </el-col>
              <el-col :span="21">
                <div class="username" style="display: flex; align-items: center;">
                  <el-space>
                    {{ reply.name + "@" + reply.username}}
                    <div :style="{color: 'grey'}">
                      {{reply.time}}
                    </div>
                  </el-space>

                  <el-button type="text" @click = "chooseReply(reply.username)">

                    <el-icon>
                      <ChatRound/>
                    </el-icon>
                  </el-button>

                  <el-button type="text" v-if="isCurrentUser(reply.username)" @click="deleteComment(reply.commentId)" >

                    <el-icon>
                      <Delete/>
                    </el-icon>
                  </el-button>
                </div>
                <div class="info">
                  <div v-if="reply.replyToName === ''">
                    {{ reply.content }}
                  </div>
                  <div v-else>
                    Reply to {{ reply.replyToName + "@" + reply.replyToUsername }}: {{ reply.content }}
                  </div>
                </div>
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </div>
        </div>

        <div v-show = "flagId === comment.commentId">
          <el-row type = "flex" :gutter = "30">
            <el-col :span = "3">
              <el-avatar shape="square" :size="30" :fit="fill" :src="axiosFunctions.methods.getResourceByFilename(this.$store.state.profilePhotoUrl)">
                <template #error>
                  <div class="image-slot">
                  </div>
                </template>
              </el-avatar>
              <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
            </el-col>
            <el-col :span = "21">
              <el-row>
                <el-input
                    type="textarea"
                    :rows="2"
                    v-model="reply.content">
                </el-input>
              </el-row>
              <el-row justify="end">
                <el-button type="text" @click="addReply">
                  <el-icon >
                    <Position/>
                  </el-icon>
                </el-button>
              </el-row>

            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  name: 'Comment',
  props: ['comment', 'flagId','roomId'],
  addReplyUsername: null,
  data(){
    return{
      username: this.$store.state.username,
      textarea: '',
      reply:{
        commentId: null,
        roomId: null,
        username: null,
        content: "",
        replyToCommentId: null,
        replyToUsername: null,
      },
    }

  },

  methods: {
    isCurrentUser(username) {
      return username === this.username;
    },
    chooseReply(username) {
      console.log(this.flagId);
      // console.log(this.comment.commentId);
      this.reply.replyToUsername = username;
      this.reply.replyToCommentId = this.comment.commentId;
      this.$emit('choose-reply', this.comment.commentId);
      console.log(this.flagId);
    },
    addReply() {
      this.reply.roomId = this.roomId;
      console.log(this.reply.roomId);
      axiosFunctions.methods.postComment(this.username, this.reply).then((response) => {
        ElNotification({
          title: "Success!",
          type: "success",
          message: "You have added the reply!",
        })
        this.reply.content="";
        this.$router.go(0);
        console.log(response)
      }).catch((response) => {
        ElNotification({
          title: "Failed",
          type: "error",
          message: "Failed to add reply.",
        })
        console.log('Failed to add reply!')
        console.log(response)
      })
    },
    deleteComment(commentId) {
      axiosFunctions.methods.deleteComment(this.username, commentId).then((response) => {
        ElNotification({
          title: "Success!",
          type: "success",
          message: "You have deleted the comment!",
        })
        this.$router.go(0);
      }).catch((response) => {
        ElNotification({
          title: "Failed",
          type: "error",
          message: "Failed to delete comment.",
        })
        console.log('Failed to delete comment!')
        console.log(response)
        this.$router.go(0);
      })
    },
  },
};
</script>

<style scoped>
</style>