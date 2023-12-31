<script setup>
// const floors=[
//   { id: 1, name: '1st Floor' },
//   { id: 2, name: '2nd Floor' },
//   { id: 3, name: '3rd Floor' },
// ];
// const rooms=[
//   { id: 1, name: 'Room A', floor: 1 },
//   { id: 2, name: 'Room B', floor: 1 },
//   { id: 3, name: 'Room C', floor: 2 },
//   { id: 4, name: 'Room D', floor: 2 },
//   { id: 5, name: 'Room E', floor: 3 },
//   { id: 6, name: 'Room F', floor: 3 },
// ];
// import { ref } from 'vue'
// const value = ref('')
//
// const options = [
//   {
//     value: 'Option1',
//     label: 'Option1',
//   },
//   {
//     value: 'Option2',
//     label: 'Option2',
//   },
//   {
//     value: 'Option3',
//     label: 'Option3',
//   },
//   {
//     value: 'Option4',
//     label: 'Option4',
//   },
//   {
//     value: 'Option5',
//     label: 'Option5',
//   },
// ]
</script>

<script>
// import {Cache as axios} from "three";
import {ref} from 'vue';

export default {
  name: 'BuildingDetail',
  props: {
    buildingId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // floors: [],
      selectedBy: 'Floor',
      selectedFloor: '',
      selectedCapacity: '',
      showRoom: false,
      capacities: [],
      //这里的id和楼层数相同
      floors: [
        {id: 1, name: '1st Floor'},
        {id: 2, name: '2nd Floor'},
        {id: 3, name: '3rd Floor'},
      ],
      //这里的id是roomID
      rooms: [
        {id: 1, name: 'Room A', floor: 1, capacity: 1, teamID: 111},
        {id: 2, name: 'Room B', floor: 1, capacity: 2, teamID: null},
        {id: 3, name: 'Room C', floor: 2, capacity: 3, teamID: null},
        {id: 4, name: 'Room D', floor: 2, capacity: 4, teamID: null},
        {id: 5, name: 'Room E', floor: 3, capacity: 4, teamID: null},
        {id: 6, name: 'Room F', floor: 3, capacity: 4, teamID: null},
      ],
      options: [
        {
          value: 'Floor',
          label: 'Floor',
        },
        {
          value: 'Capacity',
          label: 'Capacity',
        },
        {
          value: 'Available',
          label: 'Available',
        },
      ]
    };
  },
  created() {
    // Extract unique capacity values from rooms data
    this.capacities = [...new Set(this.rooms.map(room => room.capacity))];
  },
  methods: {
    // Filters
    filteredRooms(floorId) {
      return this.rooms.filter(room => room.floor === floorId);
    },
    filteredCapacity(capacity) {
      return this.rooms.filter(room => room.capacity === capacity);
    },

    // Database related
    selectRoom() {

    },
  },
  computed: {
    filteredAvailable() {
      return this.rooms.filter(room => room.teamID === null);
    },
  },
}
</script>

<template>
  <el-container>
    <div class="select">
      <el-space>
        <span> Filter by: </span>
        <el-select v-model="selectedBy" placeholder="Filter by" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-space>
    </div>

    <div class="tabs-container" style="width: 100%" v-if="selectedBy === 'Floor'">
      <el-table :data="floors" style="width: 100%; margin-top: 50px;">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table :data="filteredRooms(props.row.id)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"/>
              <el-table-column prop="capacity" label="Capacity"/>
              <el-table-column label="State">
                <template v-slot="scope">
                  <span> {{ scope.row.teamID ? 'Occupied' : 'Available' }} </span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template v-slot="scope">
                  <el-button @click="" type="text"> Details </el-button>
                  <el-button @click="selectRoom(scope.row.id)" type="text"> Select </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Floor"/>
      </el-table>
    </div>

    <div class="tabs-container" style="width: 100%" v-if="selectedBy === 'Capacity'">
      <el-table :data="capacities" style="width: 100%; margin-top: 50px;">
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table :data="filteredCapacity(props.row)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"/>
              <el-table-column prop="capacity" label="Capacity"/>
              <el-table-column prop="teamID" label="State">
                <template v-slot="scope">
                  <span> {{ scope.row.teamID ? 'Occupied' : 'Available' }} </span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template v-slot="scope">
                  <el-button @click="" type="text">Details</el-button>
                  <el-button @click="selectRoom(scope.row.id)" type="text">Select</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="Capacity">
          <template v-slot="{ row }">
            {{ `Capacity: ${row}` }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="tabs-container" style="width: 100%" v-if="selectedBy === 'Available'">
      <div style="margin-top: 50px;">
        <el-table :data="filteredAvailable" style="width: 100%">
          <el-table-column prop="name" label="Room Name"/>
          <el-table-column prop="capacity" label="Capacity"/>
          <el-table-column prop="teamID" label="State">
            <template v-slot="scope">
              <span> {{ scope.row.teamID ? 'Occupied' : 'Available' }} </span>
            </template>
          </el-table-column>
          <el-table-column label="Actions">
            <template v-slot="scope">
              <el-button @click="" type="text">Details</el-button>
              <el-button @click="" type="text">Select</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-container>
</template>

<style scoped>
button {
  --color: rgb(33 150 243);
  font-family: inherit;
  display: inline-block;
  width: 4em;
  height: 2em;
  line-height: 1.9em;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color .5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);
}

button:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
}

button:hover {
  color: #fff;
}

button:before {
  top: 100%;
  left: 100%;
  transition: all .7s;
}

button:hover:before {
  top: -30px;
  left: -30px;
}

button:active:before {
  background: #0720c4;
  transition: background 0s;
}

::v-deep .el-tabs__nav-scroll {
  width: 100% !important;
  margin: 0 auto !important;
}

.select {
  position: absolute; /* 使用绝对定位 */
  right: 0; /* 将容器定位到页面的右侧 */
}
</style>