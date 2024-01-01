<script setup>
import {
  ChatDotRound,
  ChatRound,
  House,
  Iphone,
  Moon,
  Opportunity,
  Picture,
  Promotion,
  Refresh,
  Star,
  Sunny,
  User,
  View
} from "@element-plus/icons-vue"
import {computed, ref} from 'vue'

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
</script>

<script>
import axiosFunctions from '@/utils/api'
import {ElNotification} from "element-plus";
import getUserProfile from "@/components/ProfileComponents/getUserProfile";

export default {
  data() {
    return {
      form: {
        username: null,
        name: null,
        sid: null,
        profilePhotoUrl: null,
        gender: null,
        sleepTime: null,
        wakeUpTime: null,
        major: null,
        intro: null,
        preferRoomSize: null,
        phoneNumber: null,
        qqNumber: null,
        wechatAccount: null,
        hobbies: [],
      }
    }
  },
  mounted() {
    this.refreshProfile()
  },
  methods: {
    refreshProfile() {
      if (this.username === null) {
        return;
      }
      getUserProfile(this.username, (data) => {
        this.form = data
      })
    },
  },
  props: {
    username: {
      required: false,
      default: null,
    }
  },
  watch: {
    username() {
      this.refreshProfile()
    }
  }
}
</script>
<template>
  <el-card style="width: 90%; margin: 1%" shadow="hover">
    <el-row>
      <el-col :span="6">
        <div style="width: 80%">
          <el-image :src="axiosFunctions.methods.getResourceByFilename(this.form.profilePhotoUrl)" :fit="'contain'">
            <template #error>
              <div class="image-slot">
                <el-icon size="xxx-large">
                  <Picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-col>
      <el-col :span="18">
        <div style="display: inline-block; vertical-align: top; width: 90%">
          <el-button :icon="Refresh" size="small" text @click="refreshProfile" style="vertical-align: middle"/>
          <br>
          <el-descriptions :column="3" title="Basic Information" direction="vertical">
            <el-descriptions-item label="Name">
              <template #label>
                <div class="cell-item">
                  Name
                  <el-icon :style="iconStyle">
                    <user/>
                  </el-icon>
                </div>
              </template>
              {{ form.name }}
            </el-descriptions-item>
            <el-descriptions-item label="Student ID">
              <template #label>
                <div class="cell-item">
                  Student ID
                  <el-icon :style="iconStyle">
                    <View/>
                  </el-icon>
                </div>
              </template>
              {{ form.sid }}
            </el-descriptions-item>
            <el-descriptions-item label="Gender">
              <template #label>
                <div class="cell-item">
                  Gender
                  <el-icon :style="iconStyle">
                    <user/>
                  </el-icon>
                </div>
              </template>
              {{ form.gender }}
            </el-descriptions-item>
            <el-descriptions-item label="Telephone">
              <template #label>
                <div class="cell-item">
                  Telephone
                  <el-icon :style="iconStyle">
                    <iphone/>
                  </el-icon>
                </div>
              </template>
              {{ form.phoneNumber }}
            </el-descriptions-item>
            <el-descriptions-item label="QQ">
              <template #label>
                <div class="cell-item">
                  QQ
                  <el-icon :style="iconStyle">
                    <ChatRound/>
                  </el-icon>
                </div>
              </template>
              {{ form.qqNumber }}
            </el-descriptions-item>
            <el-descriptions-item label="Wechat">
              <template #label>
                <div class="cell-item">
                  Wechat
                  <el-icon :style="iconStyle">
                    <ChatDotRound/>
                  </el-icon>
                </div>
              </template>
              {{ form.wechatAccount }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider/>

          <el-descriptions :column="2" title="Preference" direction="vertical">
            <el-descriptions-item label="Major">
              <template #label>
                <div class="cell-item">
                  Major
                  <el-icon :style="iconStyle">
                    <Opportunity/>
                  </el-icon>
                </div>
              </template>
              {{ form.major }}
            </el-descriptions-item>
            <el-descriptions-item label="Preferred Room Size">
              <template #label>
                <div class="cell-item">
                  Preferred Room Size
                  <el-icon :style="iconStyle">
                    <House/>
                  </el-icon>
                </div>
              </template>
              {{ form.preferRoomSize }}
            </el-descriptions-item>
            <el-descriptions-item label="Sleeping Time">
              <template #label>
                <div class="cell-item">
                  Sleeping Time
                  <el-icon :style="iconStyle">
                    <Moon/>
                  </el-icon>
                </div>
              </template>
              {{ form.sleepTime }}
            </el-descriptions-item>
            <el-descriptions-item label="Wake up Time">
              <template #label>
                <div class="cell-item">
                  Wake up Time
                  <el-icon :style="iconStyle">
                    <Sunny/>
                  </el-icon>
                </div>
              </template>
              {{ form.wakeUpTime }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider/>

          <el-descriptions :column="1" style="width: auto" title="Interest" direction="vertical">
            <el-descriptions-item label="Hobby">
              <template #label>
                <div class="cell-item">
                  Hobby
                  <el-icon :style="iconStyle">
                    <Star/>
                  </el-icon>
                </div>
              </template>
              <el-space wrap>
                <el-tag v-for="hobby in form.hobbies">
                  {{ hobby.name }}
                </el-tag>
              </el-space>
            </el-descriptions-item>
            <el-descriptions-item label="Description">
              <template #label>
                <div class="cell-item">
                  Description
                  <el-icon :style="iconStyle">
                    <Promotion/>
                  </el-icon>
                </div>
              </template>
              {{ form.intro }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
</style>