<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      form: {
        name: null,
        description: null,
      },

      rules: {
        name: [
          {required: true}
        ]
      }
    }
  },

  methods: {
    createZone() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axiosFunctions.methods.createZone(this.form)
              .then(response => {
                ElNotification({
                  title: 'Success!',
                  message: 'A new zone has been created',
                  type: 'success'
                })
              })
              .catch(response => {
                ElNotification({
                  title: 'Failed!',
                  message: response.data.data,
                  type: 'error'
                })
                console.log(response.data.data)
              })
        }
      })
    }
  }
}

</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Create a Zone
      </el-text>
    </template>

    <el-form
        label-width="auto"
        :rules="rules"
        :model="form"
        ref="form"
        @submit.native.prevent
        size="small"
    >
      <el-form-item label="Name" prop="name" style="width: 500px">
        <el-input v-model="this.form.name"/>
      </el-form-item>

      <el-form-item label="Description" prop="description" style="width: 500px">
        <el-input v-model="this.form.description"/>
      </el-form-item>
    </el-form>

    <el-button type="success" round @click="createZone">
      Create Zone
    </el-button>
  </el-card>
</template>

<style scoped>
</style>