<script setup>
import yuzu from "@/assets/yuzu.png"
import {ChatRound} from "@element-plus/icons-vue";
</script>

<template>
  <el-card style="width: 90%; margin: 20px;" shadow="hover">
    <el-row type = "flex">
      <el-col :span = "3">
        <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu" />
        <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
      </el-col>
      <el-col :span = "15">
        <input type="text" v-model="newComment.content" />
        <button @click="addComment">
          <el-icon >
            <ChatRound/>
          </el-icon>
        </button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="comment-section">
      <div class="comment-list">
        <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :current-user-id="currentUserId"
            :flag-id = "flagId"
            :room-id = "roomId"
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
          replies:[
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
    // 在组件挂载后，调用后端接口获取评论列表数据
    this.fetchComments();
  },
  methods: {
    handleComment(flagId){
      console.log('change Id: ', flagId);
      this.flagId = flagId;
      console.log('new flagId: ', this.flagId);
    },
    fetchComments() {
      // // 调用后端接口获取评论列表数据
      // axios.get('/api/comments')
      //     .then(response => {
      //       this.comments = response.data;
      //     })
      //     .catch(error => {
      //       console.error('Failed to fetch comments:', error);
      //     });
    },
    addComment() {
      // // 调用后端接口添加评论
      // // 例如使用 Axios 进行异步请求
      // axios.post('/api/comments', { content: this.newComment })
      //     .then(response => {
      //       // 添加评论成功的处理逻辑
      //       this.newComment = ''; // 清空输入框
      //       this.comments.unshift(response.data); // 将新增评论添加到评论列表的开头
      //     })
      //     .catch(error => {
      //       console.error('Failed to add comment:', error);
      //     });
    },
  },
};
</script>

<style scoped>
/* 样式定义 */
</style>