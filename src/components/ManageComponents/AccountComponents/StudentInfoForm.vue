<script setup>
</script>

<script>
  export default {
    data() {
      return {
        rules: {
          username: [
            {required: true}
          ],
          name: [
            {required: true}
          ],
          password: [
            {required: true}
          ],
          gender: [
            {required: true}
          ]
        }
      }
    },

    props: {
      form: null
    },

    methods: {
      checkInput() {
        this.$refs['form'].validate((valid) => {
          this.$emit('checkInput', valid)
        })
      }
    }
  }
</script>

<template>
  <el-form
      label-width="auto"
      style="width: 50%"
      :rules="rules"
      :model="form"
      ref="form"
      @change="checkInput"
      hide-required-asterisk
      @submit.native.prevent
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio label="MALE"> MALE </el-radio>
        <el-radio label="FEMALE"> FEMALE </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password"/>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>