<script setup>
</script>

<script>
import axiosFunctions from "@/utils/api";

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
      floors: [],
      //这里的id是roomID
      rooms: [],
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
  mounted() {
    axiosFunctions.methods.getRoomFromZone(this.$store.state.zoneId)
        .then((response) => {
          // 假设response.data是上述房间信息的数组
          const buildingRooms = response.data.filter(room => room.buildingId === 1);

          // 提取楼层信息
          const floors = [...new Set(buildingRooms.map(room => room.floor))]
              .sort((a, b) => a - b) // 对楼层进行排序
              .map(floor => ({ id: floor, name: `${floor}st Floor` })); // 转换为所需格式


          // 转换房间信息为所需格式
          const rooms = buildingRooms.map(room => ({
            id: room.roomId,
            name: room.roomName,
            floor: room.floor,
            capacity: room.capacity, // capacity 和 teamID 信息需要从房间详情中获取
            teamID: room.teamId, // 此处假设为null，需要实际数据来替代
          }));

          // 保存转换后的数据到组件的data属性
          this.floors = floors;
          this.rooms = rooms;
          this.capacities = [...new Set(this.rooms.map(room => room.capacity))];

        }).catch((error) => {
      console.error(error);
    });
  }
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
      <div style="margin-top: 50px">
        <el-collapse v-model="rooms">
          <el-collapse-item v-for="floor in floors" :name="floor.id" :key="floor.id">
            <template #title>
              {{ floor.name }} <!-- 楼层名称 -->
            </template>

            <el-table :data="filteredRooms(floor.id)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"></el-table-column>
              <el-table-column prop="capacity" label="Capacity"></el-table-column>
              <el-table-column prop="teamID" label="State">
                <template #default="scope">
                  <span> {{ scope.row.teamID ? 'Occupied' : 'Available' }} </span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template #default="scope">
                  <el-space wrap>
                    <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text">Details</el-button>
                    <el-button @click="selectRoom(scope.row.id)" type="text" :disabled="scope.row.teamID !== null">
                      Select
                    </el-button>
                  </el-space>

                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="tabs-container" style="width: 100%" v-if="selectedBy === 'Capacity'">
      <div style="margin-top: 50px">
        <el-collapse v-model="rooms">
          <el-collapse-item v-for="(capacity, index) in capacities" :name="`collapse-${index}`" :key="index">
            <template #title>
              {{ `Capacity: ${capacity}` }} <!-- 容量信息 -->
            </template>

            <el-table :data="filteredCapacity(capacity)" style="width: 100%">
              <el-table-column prop="name" label="Room Name"></el-table-column>
              <el-table-column prop="capacity" label="Capacity"></el-table-column>
              <el-table-column prop="teamID" label="State">
                <template #default="scope">
                  <span> {{ scope.row.teamID ? 'Occupied' : 'Available' }} </span>
                </template>
              </el-table-column>
              <el-table-column label="Actions">
                <template #default="scope">
                  <el-space wrap>
                    <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text">Details</el-button>
                    <el-button @click="selectRoom(scope.row.id)" type="text" :disabled="scope.row.teamID !== null">
                      Select
                    </el-button>
                  </el-space>

                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>

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

              <el-space wrap>
                <el-button @click="this.$router.push('/home/room/' + scope.row.id)" type="text">Details</el-button>
                <el-button @click="" type="text">Select</el-button>
              </el-space>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-container>
</template>

<style scoped>


.select {
  position: absolute; /* 使用绝对定位 */
  right: 0; /* 将容器定位到页面的右侧 */
}
</style>