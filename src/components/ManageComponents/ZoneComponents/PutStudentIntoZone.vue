<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      allMajor: [],
      allZones: [],
      grades: [],
      form: {
        gender: null,
        major: null,
        grade: null,
      },
      students: [],
      selectedZone: null,
      selectedUsernames: [],

      rules: {
        gender: [
          {required: true}
        ]
      }
    }
  },

  methods: {
    searchStudent() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          axiosFunctions.methods.searchStudent(this.form)
              .then(response => {
                this.students = response.data
                ElNotification({
                  title: 'Success!',
                  message: 'Got ' + this.students.length + ' students.',
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
    },

    getSelection(students) {
      this.selectedUsernames = students.map(student => student.username)
    },

    setStudentsToZone() {
      axiosFunctions.methods.updateZoneUser(this.selectedUsernames, this.selectedZone)
          .then(response => {
            ElNotification({
              title: 'Success!',
              message: 'Students have been added to the zone.',
              type: 'success'
            })
            this.students = []
          })
          .catch(response => {
            ElNotification({
              title: 'Failed!',
              message: response.data.data,
              type: 'error'
            })
            console.log(response.data.data)
          })
    },
  },

  mounted() {
    axiosFunctions.methods.getAllMajor()
        .then(response => this.allMajor = response.data)
        .catch(response => console.log(response.response.data))
    axiosFunctions.methods.getAllZones()
        .then(response => this.allZones = response.data)
        .catch(response => console.log(response.response.data))
    for (let i = 2020; i <= 2050; ++i)
      this.grades.push(i)
  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Put Students into a Zone
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
      <el-form-item label="Major" prop="major" style="width: 500px">
        <el-select v-model="form.major" placeholder="Select">
          <el-option
              v-for="major in this.allMajor"
              :key="major.name"
              :label="major.name"
              :value="major.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Grade" prop="grade" style="width: 500px">
        <el-select v-model="form.grade" placeholder="Select">
          <el-option
              v-for="grade in this.grades"
              :key="grade"
              :label="grade"
              :value="grade"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Gender" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="MALE"> MALE</el-radio>
          <el-radio label="FEMALE"> FEMALE</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-button type="success" round @click="searchStudent">
      Search Students
    </el-button>

    <div v-if="this.students.length" style="margin-top: 20px">
      <p>
        <el-text tag="b">
          Student Info
        </el-text>
      </p>

      <el-table
          :data="this.students"
          @selectionChange="getSelection"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="Username" prop="username"/>
        <el-table-column label="Name" prop="name"/>
        <el-table-column label="Gender" prop="gender"/>
        <el-table-column label="Major" prop="major"/>
        <el-table-column label="Grade" prop="grade"/>
      </el-table>

      <p>
        <el-text tag="b">
          Select a Zone
        </el-text>
      </p>

      <el-space>
        <el-select v-model="this.selectedZone" placeholder="Select">
          <el-option
              v-for="zone in this.allZones"
              :key="zone.zoneId"
              :label="zone.zoneName"
              :value="zone.zoneId"
          />
        </el-select>
        <el-button type="success" round @click="setStudentsToZone">
          Set
        </el-button>
      </el-space>
    </div>
  </el-card>
</template>

<style scoped>
</style>