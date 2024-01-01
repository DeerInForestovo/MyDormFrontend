<script setup>
import yuzu from "@/assets/yuzu.png"
import {ChatRound, Delete} from "@element-plus/icons-vue";
</script>

<template>
  <div class="comment">
    <el-row type="flex">
      <el-col :span="3">
        <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu"/>
        <!--根据userId获取头像-->
        <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
      </el-col>

      <el-col :span="21">
        <div class="username" style="display: flex; align-items: center;">
          <el-space>
            <div>
              {{ comment.name }}
            </div>
            <div :style="{color: 'grey'}">
              {{ comment.date }}
            </div>
          </el-space>
          <button @click="chooseReply(null)">
            <el-icon>
              <ChatRound/>
            </el-icon>
          </button>
          <button v-if="isCurrentUser(comment.id)" @click="deleteComment(comment.commentId)">
            <el-icon>
              <Delete/>
            </el-icon>
          </button>
        </div>
        <div class="info">
          <div class="content">{{ comment.content }}</div>
          <el-divider></el-divider>
        </div>

        <div v-if="comment.replies.length">
          <div v-for="reply in comment.replies">
            <el-row>
              <el-col :span="3">
                <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu"/>
              </el-col>
              <el-col :span="21">
                <div class="username" style="display: flex; align-items: center;">

                  {{ reply.name }}
                  <div :style="{color: 'grey'}">
                    {{ reply.date }}
                  </div>
                  <button @click="chooseReply(reply.name)">
                    <el-icon>
                      <ChatRound/>
                    </el-icon>
                  </button>
                </div>
                <div class="info">
                  <div v-if="reply.toUser === ''">
                    {{ reply.content }}
                  </div>
                  <div v-else>
                    Reply to {{ reply.toUser }}: {{ reply.content }}
                  </div>
                </div>
                <el-divider></el-divider>
              </el-col>
            </el-row>
          </div>
        </div>

        <div v-show="flagId === comment.commentId">
          <el-row type="flex">
            <el-col :span="3">
              <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu"/>
              <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
            </el-col>
            <el-col :span="21">
              <input type="text" v-model="reply.content"/>
              <button @click="addReply">
                <el-icon>
                  <ChatRound/>
                </el-icon>
              </button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment', 'currentUserId', 'flagId', 'roomId'],
  addReplyUsername: null,
  data() {
    return {
      reply: {
        commentId: null,
        roomId: null,
        username: null,
        name: null,
        content: "",
        replyToCommentId: null,
        replyToUsername: null,
        replyToName: null,
        unread: false
      },
    }

  },

  methods: {
    isCurrentUser(userId) {
      return userId === this.currentUserId;
    },
    chooseReply(username) {
      console.log(this.comment.commentId);
      this.reply.replyToName = username;
      this.$emit('choose-reply', this.comment.commentId);
    },
    addReply() {
      this.reply.roomId = this.roomId;
      this.reply.replyToCommentId = this.comment.commentId;
      this.reply.replyToUsername = this.addReplyUsername;
      // 存到后端当中

    },
    deleteReply(commentId) {
      // 从后端中删除
    },
    deleteComment(commentId) {
      // // 调用后端接口删除评论
      // // 例如使用 Axios 进行异步请求
      // axios.delete(`/api/comments/${commentId}`)
      //     .then(response => {
      //       // 删除成功的处理逻辑
      //     })
      //     .catch(error => {
      //       console.error('Failed to delete comment:', error);
      //     });
    },
  },
};
</script>

<style scoped>
</style>