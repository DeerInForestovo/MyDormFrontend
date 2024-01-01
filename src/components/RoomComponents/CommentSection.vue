<script setup>
import yuzu from "@/assets/yuzu.png"
import {ChatRound, Position} from "@element-plus/icons-vue";
</script>

<template>
  <el-card style="width: 90%; margin: 20px;" shadow="hover">
    <el-row type = "flex" :gutter = "30">
      <el-col :span = "3">
        <el-avatar shape="square" :size="30" :fit="fill" :src="yuzu" />
        <!--    <el-avatar shape="square" :size="30" :fit="fill" :src="comment.user.avatar" />-->
      </el-col>
      <el-col :span = "21">
        <el-row>
          <el-input
              type="textarea"
              :rows="2"
              placeholder="Please input the comment."
              v-model="newComment.content">
          </el-input>
        </el-row>
        <el-row justify="end">
          <el-button type="text" @click="addComment">
            <el-icon >
              <Position/>
            </el-icon>
          </el-button>
        </el-row>

      </el-col>
    </el-row>
    <el-divider></el-divider>

    <div class="comment-section">
      <div class="comment-list">
        <el-scrollbar class="scrollbar">
          <Comment
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              :current-user-id="currentUserId"
              :flag-id = "flagId"
              :room-id = "roomId"
              @choose-reply="handleComment"
          />
        </el-scrollbar>

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
/* 样式定义 */
.box {
  width: 1200px;
}


.scrollbar {
  height: 400px;
}

.is-horizontal {
  display: block;
}
/deep/ .is-horizontal {
  display: none;
}
.wrapper {
  width: 300px;
  border: 1px solid red;
  margin: 20px auto;
}

/*隐藏浏览器自带的水平滚动条*/
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}

</style>