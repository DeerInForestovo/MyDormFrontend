<script setup>
import axiosFunctions from "@/utils/api";
import {Picture} from "@element-plus/icons-vue";
</script>

<script>
import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";
import {watch} from "vue";

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
      editRoomId: null,
      selectedByBuilding: null,
      selectedByFloor: null,
      showEdit: false,
      buildings:[],
      //这里的id和楼层数相同
      floors: [],
      //这里的id是roomID
      rooms: [],
      form:{},
    };
  },
  methods: {
    handleClick(roomId){
      this.editRoomId=roomId;
      this.showEdit=true;
      this.getRoomInfo();
    },
    handleAvatarSuccess() {
    },  // do nothing
    updateImage(file) {
      if (this.form.username === null) {
        return
      }
      const image = file.raw;
      if (image) {
        if (image.size > (500 * 1024)) {
          ElNotification({
            title: "Failed",
            type: "error",
            message: "Size of profile image should be less than 500 KB.",
          })
          return
        }
        axiosFunctions.methods.uploadResources('image', image)
            .then((response) => {
              this.form.roomPicturePath = response.data.url;
              axiosFunctions.methods.updateRoom(this.editRoomId, this.form
              ).then((response) => {
                ElNotification({
                  title: "Success!",
                  type: "success",
                  message: "You have updated the profile image!",
                })
              }).catch((response) => {
                ElNotification({
                  title: "Failed",
                  type: "error",
                  message: response.message,
                })
                console.log(response)
              })
            }).catch((response) => {
          ElNotification({
            title: "Failed",
            type: "error",
            message: response.message,
          })
          console.log(response)
        })
      }
    },
    getRoomInfo(){
      axiosFunctions.methods.getRoomInfo(this.editRoomId)
          .then(response => {
            console.log(response.data);
            this.form = response.data;
            console.log(this.form);
          }).catch(response => { // possibly user not exist
        console.log(response)
        ElNotification({
          title: 'Failed',
          message: 'Failed to get room info. Does it exist?',
          type: 'error',
        })
      })
    },
    save(){
      axiosFunctions.methods.updateRoom(this.editRoomId, this.form)
          .then(response => {
            ElNotification({
              title: "Success!",
              type: "success",
              message: "You have updated the roomInfo",
            });
            console.log(response);
            this.showEdit = false;
          }).catch(response => { // possibly user not exist
            console.log(response)
            ElNotification({
              title: 'Failed',
              message: 'Failed to update roomInfo',
              type: 'error',
            })
          })
    }
  },
  computed: {
    // Filtered rooms based on selected building and floor
    filteredRooms() {
      return this.rooms.filter(room => {
        return ( room.buildingId === this.selectedByBuilding) &&
            ( room.floor === this.selectedByFloor);
      });
    }
  },
  created() {
    axiosFunctions.methods.getAllBuildings()
        .then((response) => {
          this.buildings = response.data.map(building => ({
            value: building.buildingId,
            label: building.buildingName,
          }));
        }).catch((error) => {
      console.error(error);
    })
  },
  watch: {
    selectedByBuilding(newVal) {
      if (newVal !== null && newVal !== '') {
        axiosFunctions.methods.getRoomsFromBuilding(newVal)
            .then((response) => {
              // 假设response.data是上述房间信息的数组
              const buildingRooms = response.data;
              console.log(buildingRooms)
              // 提取楼层信息
              const floors = [...new Set(buildingRooms.map(room => room.floor))]
                  .sort((a, b) => a - b) // 对楼层进行排序
                  .map(floor => ({ value: floor, label: `${floor} Floor` })); // 转换为所需格式


              // 转换房间信息为所需格式
              const rooms = buildingRooms.map(room => ({
                id: room.roomId,
                name: room.roomName,
                floor: room.floor,
                capacity: room.capacity, // capacity 和 teamID 信息需要从房间详情中获取
                teamID: room.teamId, // 此处假设为null，需要实际数据来替代
                buildingId: room.buildingId,
              }));

              // 保存转换后的数据到组件的data属性
              this.floors = floors;
              this.rooms = rooms;

            }).catch((error) => {
          console.error(error);
        });
      }
    },
  },
  mounted() {

  }
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <el-text>
        Manage Dorms
      </el-text>
    </template>
    <div>
      <div class="m-4">
        <el-space>
          <el-space>
            <el-text>Select a building:</el-text>
            <el-select v-model="selectedByBuilding" placeholder="select" size="large">
              <el-option
                  v-for="item in buildings"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-space>
          <el-space>
            <el-text>Select a floor:</el-text>
            <el-select v-model="selectedByFloor" placeholder="select" size="large">
              <el-option
                  v-for="item in floors"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-space>
        </el-space>
      </div>
      <el-table :data="filteredRooms" style="width: 100%">
        <el-table-column prop="id" label="Room ID"></el-table-column>
        <el-table-column prop="name" label="Room Name"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <el-space wrap>
              <el-button @click="handleClick(scope.row.id)" type="text">Edit</el-button>
            </el-space>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <div v-if="this.showEdit" >
    <el-card style="width: 90%; margin: 1%;" shadow="hover">
      <el-row>
        <el-col :span="6">
          <div style="width: 90%">
            <el-tooltip
                content="Upload avatar (jpg/png and 500 KB at most)"
                placement="bottom-end"
            >
              <el-upload
                  class="avatar-uploader"
                  ref="profileAvatarUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-change="updateImage"
                  :auto-upload="false"
                  accept="image/png, image/jpeg"
              >
                <el-image
                    :src="axiosFunctions.methods.getResourceByFilename(this.form.roomPicturePath)"
                    :fit="'contain'">
                  <template #error>
                    <div class="image-slot">
                      <el-icon size="xxx-large">
                        <Picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </el-upload>
            </el-tooltip>
          </div>
        </el-col>

        <el-col :span="14">
          <el-form label-width="auto" size="small" :model="form"  ref="form" @submit.native.prevent>
            <el-form-item label="RoomId">
              <el-input v-model="this.editRoomId" disabled/>
            </el-form-item>

            <el-form-item label="RoomName">
              <el-input v-model="form.roomName"/>
            </el-form-item>

            <el-form-item label="Capacity">
              <el-input v-model="form.capacity"/>
            </el-form-item>

            <el-button type="primary" @click="save">Save</el-button>

          </el-form>

          <el-divider/>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
</style>