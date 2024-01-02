<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";
import {ref} from "vue";

export default {
  data() {
    return {
      allZones: [],
      allBuildings: [],
      form: {
        buildingId: null,
        floor: null,
      },
      rooms: [],
      selectedZone: null,
      selectedRooms: [],

      rules: {
        buildingId: [
          {required: true}
        ]
      }
    }
  },

  methods: {
    searchRoom() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          axiosFunctions.methods.getRoomFromBuilding(this.form.buildingId)
              .then(response => {
                this.rooms = response.data
                if (this.form.floor)
                  this.rooms = this.rooms.filter(room => room.floor === this.form.floor)
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

    getSelection(rooms) {
      this.selectedRooms = rooms.map(room => room.roomId)
    },

    setRoomsToZone() {
      axiosFunctions.methods.updateZoneRoom(this.selectedRooms, this.selectedZone)
          .then(response => {
            ElNotification({
              title: 'Success!',
              message: 'Rooms have been added to the zone.',
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
    },
  },

  mounted() {
    axiosFunctions.methods.getAllZones()
        .then(response => this.allZones = response.data)
        .catch(response => console.log(response.response.data))
    axiosFunctions.methods.getAllBuildings()
        .then(response => this.allBuildings = response.data)
        .catch(response => console.log(response.response.data))
  },

  computed: {
    floors() {
      if (!this.form.buildingId) return []
      let maxFloor = this.allBuildings.filter(building => building.buildingId === this.form.buildingId)[0].maxFloor
      console.log(this.form.buildingId)
      console.log(maxFloor)
      let f = []
      for (let i = 1; i <= maxFloor; ++i)
        f.push(i)
      return f
    }
  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Put Rooms into a Zone
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
      <el-form-item label="Building" prop="buildingId" style="width: 500px">
        <el-select v-model="this.form.buildingId" placeholder="Select">
          <el-option
              v-for="building in this.allBuildings"
              :key="building.buildingId"
              :label="building.buildingName"
              :value="building.buildingId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Floor" prop="floor" style="width: 500px">
        <el-select v-model="this.form.floor" placeholder="Select">
          <el-option
              v-for="floor in floors"
              :key="floor"
              :label="floor"
              :value="floor"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <el-button type="success" round @click="searchRoom">
      Search Room
    </el-button>

    <div v-if="this.rooms.length" style="margin-top: 20px">
      <p>
        <el-text tag="b">
          Room Info
        </el-text>
      </p>

      <el-table
          :data="this.rooms"
          @selectionChange="getSelection"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="Building" prop="buildingName"/>
        <el-table-column label="Floor" prop="floor"/>
        <el-table-column label="Name" prop="roomName"/>
        <el-table-column label="Capacity" prop="capacity"/>
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
        <el-button type="success" round @click="setRoomsToZone">
          Set
        </el-button>
      </el-space>
    </div>
  </el-card>
</template>

<style scoped>
</style>