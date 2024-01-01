<script setup>
import SettingCard from "@/components/ProfileComponents/SettingCard.vue";
</script>

<script>
import {ref} from "vue";

export default {
  data() {
    return {
      searchForm: {
        username: ''
      },
      studentInfoForm: {},
      searchUsername: null,
      settingCardVisible: ref(false)
    }
  },

  methods: {
    searchButtonOnClick() {
      this.searchUsername = this.searchForm.username
      console.log('search')
      console.log(this.searchUsername)
      this.settingCardVisible = true
    },

    deleteAccount() {
    }
  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Manage Students
      </el-text>
    </template>

    <div>
      <div class="items">
        <el-form @submit.native.prevent>
          <el-form-item
              :model="searchForm"
              label-width="auto"
              label-position="right"
          >
            <el-form-item label="Student username" prop="username">
              <el-input style="width: 300px" v-model="searchForm.username"/>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>

      <div class="items">
        <el-button type="success" round @click="searchButtonOnClick"> Search</el-button>
      </div>

      <div class="items" v-if="this.settingCardVisible">
        <SettingCard
            :username="this.searchUsername"
            :isManager="true"
            @userNotExists="this.settingCardVisible=false"
        />
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.items {
  margin: 15px;
}
</style>