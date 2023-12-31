<script setup>
import image_SUSTech from '@/assets/SUSTech.png'
import image_SUSTech_Dark from '@/assets/SUSTech_Dark.png'
</script>

<template>
  <el-drawer title="Developers" direction="ltr">
    <!--          SUSTech - BlueArchive logo        -->
    <div class="HeaderImage">
      <el-image :src="isLight ? image_SUSTech : image_SUSTech_Dark" :fit="'contain'"/>
    </div>

    <!--    Repositories                            -->
    <h2> Github Repository </h2>
    <el-link href="https://github.com/DeerInForestovo/DormSelectionSystem" style="font-size: large" type="primary">
      Frontend
    </el-link>
    <el-text size="large"> &</el-text>
    <el-link href="https://github.com/IceLocke/MyDorm" style="font-size: large" type="primary"> Backend</el-link>

    <!--    Developers                              -->
    <h2> Frontend </h2>
    <GithubProfile user="DeerInForestovo"/>
    <GithubProfile user="cly1231"/>
    <GithubProfile user="bcright"/>
    <h2> Backend </h2>
    <GithubProfile user="IceLocke"/>
    <GithubProfile user="justincao03"/>
  </el-drawer>
</template>
<script>
import GithubProfile from "@/components/decorations/GithubProfile.vue"

export default {
  name: 'DeveloperInfo',
  components: {GithubProfile},
  props: {
    isLight: {
      required: true
    }
  },
}
</script>

<style scoped>
.HeaderImage {
  width: 150px;
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

</style>