<script setup>
</script>

<script>
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
                  <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text"> Details</el-button>
                  <el-button @click="selectRoom(scope.row.id)" type="text"> Select</el-button>
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
                  <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text">Details</el-button>
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
              <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text">Details</el-button>
              <el-button @click="selectRoom(scope.row.id)" type="text">Select</el-button>
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