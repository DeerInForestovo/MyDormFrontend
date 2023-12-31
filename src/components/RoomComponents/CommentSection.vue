<script setup>
import yuzu from "@/assets/yuzu.png"
import {ChatRound} from "@element-plus/icons-vue";
</script>

<template>
  <el-card style="width: 90%; margin: 20px;" shadow="hover">
    <el-row type="flex">
      <el-col :span="3">
        <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu"/>
        <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
      </el-col>

      <el-col :span="15">
        <input type="text" v-model="newComment.content"/>
        <button @click="addComment">
          <el-icon>
            <ChatRound/>
          </el-icon>
        </button>
      </el-col>
    </el-row>

    <el-divider/>

    <div class="comment-section">
      <div class="comment-list">
        <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :current-user-id="currentUserId"
            :flag-id="flagId"
            :room-id="roomId"
            @choose-reply="handleComment"
        />
      </div>
    </div>

  </el-card>
</template>

<script>
import Comment from './Comment.vue';

export default {
  name: 'CommentSection',
  props: ['roomId'],
  components: {
    Comment,
  },
  data() {
    return {
      flagId: 0,
      newComment: {
        commentId: null,
        roomId: null,
        username: null,
        name: null,
        content: "",
        replyToCommentId: null,
        replyToUsername: null,
        replyToName: null,
        unread: false,
        replies: [],
        date: null
      },
      comments: [
        {
          commentId: 1,
          // replyToCommentId: 0,
          id: 123,
          name: 'John',
          avatar: 'john.jpg',
          date: null,
          replies: [
            {
              id: 123,
              name: 'John',
              content: "This is the reply to the first comment.",
              toUser: 'Alice',
              date: '10:10',
              // replyToCommentId: 1,
            },
            {
              id: 123,
              name: 'John',
              content: "This is the reply to the first comment.",
              toUser: '',
              date: '10:10',
              // replyToCommentId: 1,
            },
          ],
          content: 'This is the first comment.',
        },
        {
          commentId: 2,
          // replyToCommentId: 0,
          id: 456,
          name: 'Jane',
          avatar: 'jane.jpg',
          date: null,
          replies: [],
          toUser: 'Alice',
          content: 'Great post!',
        },
      ],
      currentUserId: 123, // 当前用户的ID，可根据实际情况进行修改或从登录状态中获取
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    handleComment(flagId) {
      this.flagId = flagId;
    },
    fetchComments() {
    },
    addComment() {
    },
  },
};
</script>

<style scoped>
</style>