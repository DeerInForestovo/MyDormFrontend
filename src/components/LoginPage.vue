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
        username: "",
        password: "",
      }
    }
  },

  methods: {
    loginAnimation(username) {
      // 执行切换页面的动画
      const element = document.getElementById('LoginPageId')
      element.classList.add('fadeOut')
      swal("Welcome!", "Welcome to MyDorm, user " + username, "success")
      setTimeout(() => {
        this.$router.push('/home')
      }, 1000)
    },

    login() {
      axiosFunctions.methods.login(this.loginForm.username, this.loginForm.password)
          .then(response => {
            setTimeout(() => {
              this.$store.commit('setUserLoginInfo', {
                username: response.data.username,
                token: response.data.token
              })
            }, 1000)
            this.loginDialogVisible = false
            this.loginAnimation(response.data.username)
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

    // already login?

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
    <div style="height: 150px">
      <el-form
          ref="LoginForm"
          label-position="right"
          label-width="auto"
          style="max-width: 460px"
          class="loginForm"
      >
        <el-form-item label="Username: ">
          <el-input v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item label="Password: ">
          <el-input type="password" v-model="loginForm.password"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login" style="float: right">Login</el-button>
    </div>
  </el-dialog>

  <!--  Login Page  -->
  <div class="LoginPage" id="LoginPageId">
    <div ref="vantaRef" style="width: 100%; height: 100%"></div>
    <div class="LoginPageContainer">
      <div class="LoginPageItems">
        <div style="margin-bottom: 50px">
          <el-text class="WelcomeMessage"> Welcome to MyDorm system!</el-text>
        </div>
        <div>
          <el-space>
            <div style="margin-right: 6vw" v-if="this.$store.state.token">
              <el-button @click="loginAnimation(this.$store.state.username)" type="primary" plain round size="large">
                <span>Continue with <span style="font-weight: bold">{{ this.$store.state.username }}</span></span>
              </el-button>
            </div>
            <div>
              <el-button @click="loginDialogVisible=true" type="primary" plain round size="large">
                {{ this.$store.state.token ? 'Login with another account' : 'Login' }}
              </el-button>
            </div>
          </el-space>
        </div>
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