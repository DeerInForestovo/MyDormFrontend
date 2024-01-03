<script setup>
const defaultTime = [
  new Date(2000, 1, 1, 9, 0, 0),
  new Date(2000, 2, 1, 17, 0, 0),
]
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      allZones: [],
      allTasks: [],
      form: {
        selectionTaskName: '',
        description: '',
        timeRange: ['', ''],
        startTime: null,
        endTime: null,
        zones: [],
      },

      rules: {
        selectionTaskName: [
          {required: true, message: 'Please input task name'}
        ],
        zones: [
          {required: true, message: 'Please select at least one zone'}
        ],
        timeRange: [
          {required: true, message: 'Please select the time range'},
          {validator: this.timeRangeValidator, trigger: 'blur'}
        ]
      },
    }
  },

  methods: {
    getAllZones() {
      axiosFunctions.methods.getAllZones()
          .then(response => {
            this.allZones = response.data
          }).catch(response => {
        console.log(response)
      })
    },

    getAllTasks() {
      axiosFunctions.methods.getAllTasks()
          .then(response => {
            this.allTasks = response.data
            console.log(this.allTasks)
          }).catch(response => {
        console.log(response)
      })
    },

    timeRangeValidator(rule, value, callback) {
      if (!value) {
        callback(new Error('Please select the time range'))
      } else {
        let start = value[0], end = value[1]
        if (!start || !end) {
          callback(new Error('Please select the time range'))
        } else {
          if (Number(new Date(start)) <= Number(new Date()))
            callback(new Error('The begin time should be earlier than now'))
          callback()
        }
      }
    },

    release() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.startTime = this.form.timeRange[0]
          this.form.endTime = this.form.timeRange[1]
          axiosFunctions.methods.releaseTask(this.form)
              .then(response => {
                ElNotification({
                  type: 'success',
                  title: 'Success!',
                  message: 'A new task has been released.',
                })
                this.form = {
                  selectionTaskName: '',
                  description: '',
                  timeRange: ['', ''],
                  startTime: null,
                  endTime: null,
                  zones: [],
                }
              })
              .catch(response => {
                ElNotification({
                  type: 'error',
                  title: 'Failed!',
                  message: response.response.data,
                })
              })
        }
      })
    },

    exportResult(taskId) {
      axiosFunctions.methods.exportResult(taskId)
          .then(response => {
            console.log(response.data)
            let blob = response.data
            let downLoadUrl = window.URL.createObjectURL(
                new Blob([blob])
            );
            let a = document.createElement("a");
            a.download = "SelectionTask_" + taskId + "_Result.csv";
            a.href = downLoadUrl;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
          .catch(response => {
            ElNotification({
              type: 'error',
              title: 'Failed!',
              message: response.response.data,
            })
          })
    },

    deleteTask(taskId) {
      axiosFunctions.methods.deleteTask(taskId)
          .then(response => {
            ElNotification({
              type: 'success',
              title: 'Success!',
              message: 'Successfully deleted.',
            })
            this.getAllTasks()
          })
          .catch(response => {
            ElNotification({
              type: 'error',
              title: 'Failed!',
              message: response.response.data,
            })
          })
    }
  },

  mounted() {
    this.getAllZones()
    this.getAllTasks()
  }
}
</script>

<template>
  <div class="Cards">
    <el-card shadow="hover">
      <template #header>
        <el-text tag="b"> Release a Selection Task</el-text>
      </template>

      <el-form
          label-width="auto"
          size="small"
          :model="form"
          ref="form"
          :rules="rules"
          @submit.native.prevent
      >
        <el-form-item label="Task Name" prop="selectionTaskName" style="width: 500px">
          <el-input v-model="form.selectionTaskName"/>
        </el-form-item>

        <el-form-item label="Description" prop="description" style="width: 500px">
          <el-input v-model="form.description" type="textarea"/>
        </el-form-item>

        <el-form-item label="Zones" prop="zones">
          <el-select
              style="width: 400px"
              multiple
              filterable
              v-model="form.zones"
          >
            <el-option
                v-for="zone in this.allZones"
                :key="zone.zoneId"
                :label="zone.zoneName"
                :value="zone.zoneId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Time Range" prop="timeRange" style="width: 500px">
          <el-date-picker
              v-model="form.timeRange"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time"
              unlink-panels
              :default-time="defaultTime"
              value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="release"> Release</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

  <div class="Cards">
    <el-card shadow="hover">
      <template #header>
        <el-text tag="b">
          Tasks
        </el-text>
      </template>

      <el-table :data="this.allTasks">
        <el-table-column label="ID" prop="selectionTaskId" width="50"/>
        <el-table-column label="Start Time" prop="startTime" width="200"/>
        <el-table-column label="End Time" prop="endTime" width="200"/>
        <el-table-column label="Zones">
          <template #default="scope">
            <el-space wrap>
              <el-tag v-for="zone in scope.row.zones"> {{ zone.zoneName }}</el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="400">
          <template #default="scope">
            <el-space>
              <el-button type="success" @click="exportResult(scope.row.selectionTaskId)">
                Export
              </el-button>
              <el-button type="danger" @click="deleteTask(scope.row.selectionTaskId)">
                Delete
              </el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.Cards {
  margin: 1%;
  width: 95%;
}
</style>