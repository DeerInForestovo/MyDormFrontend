<template>
  <div style="display: flex; align-items: center; margin-left: 10px">
    <el-image :src="dataUser['avatar_url']" fit="fill" style="
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 15px;
    "/>
    <el-link :href="dataUser['html_url']" style="font-size: large">
      {{ dataUser.name ? dataUser.name : dataUser.login }}
    </el-link>
  </div>
  <br>
</template>

<script>
// ref: https://github.com/GabrielBibiano/vue-github-profile
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com/users'
});

export default {
  props: ['user'],
  data() {
    return {
      dataUser: {},
      repos: {},
    }
  },
  mounted() {
    this.getUser(this.user)
  },
  methods: {
    getUser(user) {
      api.get(`/${user}`)
          .then((response) => {
            this.dataUser = response.data;
          })
          .catch((error) => {
          });
    }
  }
}
</script>

<style scoped>
</style>