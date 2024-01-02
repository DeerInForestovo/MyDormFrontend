<script setup>
import Card from './BuildingInfoCard.vue';
</script>

<template>
  <!--  这个是用来强制 computed 的  -->
  <div v-show="false"> {{zoneName}} </div>

  <el-container>
    <el-header class="text-animation">
      <span>Buildings</span>
    </el-header>
    <el-main>
      <div class="card-container">
        <Card v-for="card in cards" :key="card.id" :card="card"/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axiosFunctions from "@/utils/api";

export default {
  name: 'Buildings',
  data() {
    return {
      buildings: [],
      cards: [],
    }
  },
  computed: {
    zoneName() {
      let zoneId = this.$store.state.zoneId
      if (zoneId)
        axiosFunctions.methods.getRoomFromZone(zoneId)
            .then((response) => {
              // console.log(response)
              // 从房间信息中提取建筑信息
              const rooms = response.data;

              // 使用reduce方法来构建一个以buildingId为键，building对象为值的映射
              const buildingMap = rooms.reduce((acc, room) => {
                // 如果此buildingId尚未在累加器对象中创建，则创建它
                if (!acc[room.buildingId]) {
                  acc[room.buildingId] = {
                    buildingId: room.buildingId,
                    buildingName: room.buildingName,
                    // 假设description是一个静态的字符串，或者您可以从room对象中获取它
                    description: "Description of " + room.buildingName,
                  };
                }
                return acc;
              }, {});
              // console.log(buildingMap);
              // 从建筑映射对象中提取值以创建建筑数组
              this.buildings = Object.values(buildingMap);

              this.cards = this.buildings.map(
                  (building) => ({
                    id: building.buildingId,
                    title: building.buildingName,
                    content: building.description,
                  })
              )
            }).catch((response) => {
          console.log(response)
        })
      return this.$store.state.zoneName
    }
  }
}
</script>

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

@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -.5em;
    opacity: 0;
  }
  40% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -.5em;
    opacity: 0;
  }
  40% {
    opacity: .6;
  }
  100% {
    opacity: 1;
  }
}

.text-animation {
  animation: tracking-in-expand 1s ease-in-out;
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
}
</style>