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
      value: 'Floor',
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
  // mounted() {
  //   // 在组件挂载后，调用后端接口获取楼层和房间信息
  //   this.fetchBuildingData();
  // },
  methods: {
    // fetchBuildingData() {
    //   // 使用 buildingId 调用后端接口获取楼层和房间信息
    //   // 并将获取的数据赋值给 floors 和 rooms 变量
    //   // 例如使用 Axios 进行异步请求
    //   axios.get(`/api/buildings/${this.buildingId}`)
    //       .then(response => {
    //         this.floors = response.data.floors;
    //         this.rooms = response.data.rooms;
    //       })
    //       .catch(error => {
    //         console.error('Failed to fetch building data:', error);
    //       });
    // },
    selectFloor(floor) {
      this.selectedFloor = floor.id;
    },
    selectCapacity(capacity) {
      this.selectedCapacity = capacity;
    },
    filteredRooms(floorId) {
      return this.rooms.filter(room => room.floor === floorId);
    },
    filteredCapacity(capacity) {
      return this.rooms.filter(room => room.capacity === capacity);
    },
    emitBuildingInfo(roomID) {
      this.$emit('buildingDetail-clicked', roomID);
    },
  },
  computed: {


    filteredAvailable() {
      return this.rooms.filter(room => room.teamID === null);
    },
  },
  watch: {
    selectedCapacity(newCapacity) {
      console.log(newCapacity); // Log the selected capacity
    }
  }
};
</script>


<template>
  <el-container>
    <div class="select">
      Filter by:
      <el-select v-model="value" placeholder="Filter by" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="tabs-container" style="width: 100%" v-if="value === 'Floor'">
      <el-table :data="floors" style="width: 100%;margin-top: 50px;">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table :data="filteredRooms(props.row.id)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"></el-table-column>
              <el-table-column prop="capacity" label="Capacity"></el-table-column>
              <el-table-column prop="teamID" label="State">
                <template v-slot="scope">
                  <span v-if="scope.row.teamID != null">Occupied</span>
                  <span v-else>Available</span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template v-slot="scope">
                  <el-button @click="emitBuildingInfo(scope.row.id)" type="text">Details</el-button>
                  <el-button @click="selectRoom(scope.row.id)" type="text">Select</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <!-- 楼层列 -->
        <el-table-column prop="name" label="Floor"></el-table-column>
      </el-table>
    </div>
    <div class="tabs-container" style="width: 100%" v-if="value === 'Capacity'">
      <el-table :data="capacities" style="width: 100%;margin-top: 50px;">

        <!-- 展开行 -->
        <el-table-column type="expand">
          <template v-slot="props">
            <el-table :data="filteredCapacity(props.row)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"></el-table-column>
              <el-table-column prop="capacity" label="Capacity"></el-table-column>
              <el-table-column prop="teamID" label="State">
                <template v-slot="scope">
                  <span v-if="scope.row.teamID != null">Occupied</span>
                  <span v-else>Available</span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template v-slot="scope">
                  <el-button @click="emitBuildingInfo(scope.row.id)" type="text">Details</el-button>
                  <el-button @click="selectRoom(scope.row.id)" type="text">Select</el-button>
                </template>
              </el-table-column>

            </el-table>
          </template>
        </el-table-column>

        <!-- 容量列 -->
        <el-table-column label="Capacity">
          <template v-slot="{ row }">
            {{ `Capacity: ${row}` }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tabs-container" style="width: 100%" v-if="value === 'Available'">
      <div style="margin-top: 50px;">
        <el-table :data="filteredAvailable" style="width: 100%">
          <el-table-column prop="name" label="Room Name"></el-table-column>
          <el-table-column prop="capacity" label="Capacity"></el-table-column>
          <el-table-column prop="teamID" label="State">
            <template v-slot="scope">
              <span v-if="scope.row.teamID!=null">Occupied</span>
              <span v-else>Available</span>
            </template>

          </el-table-column>
          <el-table-column label="Actions">
            <!--                <template slot-scope="scope">-->
            <!--                  <el-button @click="emitBuildingInfo(scope.row.id)" type="text">Details</el-button>-->
            <!--                </template>-->
            <template v-slot="scope">
              <el-button @click="emitBuildingInfo(scope.row.id)" type="text">Details</el-button>
              <el-button @click="" type="text">Select</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-container>
</template>

<style scoped>
::v-deep .el-tabs__nav-scroll {
  width: 100% !important;
  margin: 0 auto !important;
}

.select {
  position: absolute; /* 使用绝对定位 */
  right: 0; /* 将容器定位到页面的右侧 */
}
</style>