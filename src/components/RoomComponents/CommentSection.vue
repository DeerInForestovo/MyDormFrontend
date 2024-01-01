<script setup>
import yuzu from "@/assets/yuzu.png"
import {ChatRound, Position} from "@element-plus/icons-vue";
</script>

<template>
  <el-card style="width: 90%; margin: 20px;" shadow="hover">
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
              v-for="comment in commentsList"
              :key="comment.id"
              :comment="comment"
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
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";
import {ref} from "vue"
export default {
  name: 'CommentSection',
  props: ['roomId', 'commentsList'],

  components: {
    Comment,
  },
  data() {
    return {
      flagId: 0,
      username: this.$store.state.username,
      newComment: {
        commentId: null,
        roomId: null,
        content: "",
        replyToCommentId: null,
        replyToUsername: null,
      },
      comments: [
        {
          commentId: 1,
          // replyToCommentId: 0,
          username: 'John',
          name :'',
          avatar: 'john.jpg',
          time: null,
          replies: [
            {
              id: 123,
              username: 'John',
              content: "This is the reply to the first comment.",
              toUser: 'Alice',
              time: '10:10',
              // replyToCommentId: 1,
            },
            {
              id: 123,
              username: 'John',
              content: "This is the reply to the first comment.",
              toUser: '',
              date: '10:10',
              // replyToCommentId: 1,
            },
          ],
          content: 'This is the first comment.',
        },
      ],
    };
  },
  mounted() {

  },
  methods: {
    handleComment(flagId) {
      this.flagId = flagId;
    },
    addComment() {
      this.newComment.roomId = this.roomId;
      this.newComment.replyToCommentId = null;
      this.newComment.replyToUsername = null;
      console.log(this.newComment.content);
      console.log(this.username);
      axiosFunctions.methods.postComment(this.username, this.newComment).then((response) => {
        ElNotification({
          title: "Success!",
          type: "success",
          message: "You have added the comment!",
        })
        this.newComment.content = "";

      }).catch((response) => {
        ElNotification({
          title: "Failed",
          type: "error",
          message: "Failed to add comment.",
        })
        console.log('Failed to add comment!')
        console.log(response)
      })

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