<script setup>
</script>

<script>
import axiosFunctions from '@/utils/api'
import {ElNotification} from "element-plus";
import {ref} from "vue";
import swal from "sweetalert";
import * as THREE from 'three'
import WAVES from 'vanta/src/vanta.waves'

export default {
  data() {
    return {
      loginDialogVisible: ref(false),
      loginForm: {
        ID: "",
        password: "",
      }
    }
  },

  methods: {
    login() {
      axiosFunctions.methods.login(this.loginForm.ID, this.loginForm.password)
          .then(response => {
            this.$store.commit('setUserLoginInfo', {
              username: response.data.username,
              token: response.data.token
            })
            this.loginDialogVisible = false;
            // 执行切换页面的动画
            const element = document.getElementById('LoginPageId')
            element.classList.add('fadeOut')
            setTimeout(() => {this.$router.push('/home')}, 1000)
            swal("Success!", "Welcome to MyDorm, user " + this.$store.state.username, "success");
          }).catch(response => {
            console.log(response)
            ElNotification({
              title: 'Failed',
              message: 'Wrong username or password',
              type: 'error',
            })
          })
    }
  },

  mounted() {
    // login page background
    this.vantaEffect = WAVES({
      el: this.$refs.vantaRef,
      THREE: THREE
    })
    VANTA.WAVES({
      el: this.$refs.vantaRef,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
    })
  },

  unmounted() {
    // login page background
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}
</script>

<template>

<!--  Login Dialog  -->
  <el-dialog width="40%" title="Login" v-model="loginDialogVisible">
    <el-form
        ref="LoginForm"
        label-position="right"
        label-width="auto"
        style="max-width: 460px"
        class="loginForm"
    >
      <el-form-item label="ID：">
        <el-input v-model="loginForm.ID"/>
      </el-form-item>
      <el-form-item label="Password ：">
        <el-input type="password" v-model="loginForm.password"/>
      </el-form-item>
      <el-form-item style="margin-left: 50px">
        <el-button type="primary" @click="login">Login</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

<!--  Login Page  -->
  <div class="LoginPage" id="LoginPageId">
    <div ref="vantaRef" style="width: 100%; height: 100%"></div>
    <div class="LoginPageContainer">
      <div class="LoginPageItems">
        <el-text class="WelcomeMessage"> Welcome to MyDorm system!</el-text>
        <br><br>
        <el-button @click="loginDialogVisible=true" type="primary" plain round size="large">
          Click to login
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.LoginPage {
  width: 100vw;
  height: 100vh;
  position: absolute;
}

.LoginPageContainer {
  position: absolute;
  top: 0;
  left: 0;
}

.LoginPageItems {
  position: absolute;
  margin-top: 40vh;
  margin-left: 10vw;
}

.WelcomeMessage {
  font-family: "Bradley Hand ITC", serif;
  font-size: xxx-large;
  font-weight: bolder;
  white-space: nowrap;
  color: white;
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
    margin-top: 0;
  }
  100% {
    opacity: 0;
    margin-top: -100vh;
  }
}

.fadeOut {
  animation: fadeOutUp 1s forwards;
}
</style>