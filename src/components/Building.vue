<script setup>
import {defineProps} from 'vue';
import Card from './RoomComponents/Card.vue';
import BuildingDetail from '@/components/RoomComponents/BuildingDetail.vue';

const props = defineProps({
  name: String,
});

const cards = [
  {
    //id是buildingid
    id: 1,
    title: 'BuidingName',
    content: 'Buiding info',
  },
  {
    id: 2,
    title: 'Card 2',
    content: 'This is the content of card 2',
  },
  {
    id: 3,
    title: 'Card 3',
    content: 'This is the content of card 3',
  },
];
</script>

<template>
  <el-container>
    <!--    <div>-->
    <!--      <button @click="goBack">返回</button>-->
    <!--    </div>-->
    <!--    buidings-->

    <el-header class="text-animation" v-if="!showBuilding">
      Buidings
    </el-header>
    <el-main>
      <div class="card-container" v-if="!showBuilding">
        <Card v-for="card in cards" :key="card.id" :card="card" @card-clicked="handleCardClicked"/>
      </div>

      <!--    floors-->
      <div>
        <div>
          <!--        <Card v-for="building in buildings" :key="building.id" :card="building" @showBuildingDetails="showBuildingDetails(building.id)" />-->
          <BuildingDetail v-if="selectedBuildingId !== null && showBuilding && !showRoom"
                          :buildingId="selectedBuildingId" @buildingDetail-clicked="handleRoomClicked"/>
          <Room v-if="selectedRoomId !== null && showRoom" :roomID="selectedRoomId"/>
        </div>
      </div>
    </el-main>
  </el-container>
  <button v-if="showBuilding||showRoom" @click="toggleVisibility">back</button>
</template>
<script>
import BuildingDetail from "@/components/RoomComponents/BuildingDetail.vue";
import Room from "@/components/RoomComponents/Room.vue";

export default {
  name: 'Building',
  components: {
    BuildingDetail,
    Room,
  },
  props: {
    changeBuildingId: {
      required: true,
      default: null,
    },
  },
  data() {
    return {
      selectedBuildingId: null,
      selectedRoomId: null,
      showBuilding: false,
      showRoom: false,
      buildings: [/* your building data */],
    };
  },
  mounted() {
    console.log('selectedBuildingId:', this.selectedBuildingId);
    console.log('changeBuildingId:', this.changeBuildingId);
    if (this.changeBuildingId>0) {
      this.selectedBuildingId=this.changeBuildingId;
      this.showBuildingDetails(this.selectedBuildingId);
    }
  },
  watch: {
    // 监听 selectedBuildingId 的变化
    // 如果你也想监听 changeBuildingId 的变化
    changeBuildingId(newValue) {
      console.log('123123')
      if (newValue > 0) {
        this.selectedBuildingId = newValue;
        this.showBuildingDetails(this.selectedBuildingId);
        console.log('selectedBuildingId!!!!!!!!:', this.selectedBuildingId);
        console.log('changeBuildingId!!!!!!!!:', this.changeBuildingId);
      }
    }
  },
  methods: {
    showBuildingDetails(buildingId) {
      this.selectedBuildingId = buildingId;
      this.showBuilding = true;
      console.log('changeBuildingId------:', this.changeBuildingId);
    },
    showRoomDetails(roomId) {
      this.selectedRoomId = roomId;
      this.showRoom = true;
    },
    handleCardClicked(card) {
      // 在这里处理接收到的卡片信息
      console.log('Card clicked:', card);
      this.showBuildingDetails(card);
      // 可以在这里执行其他逻辑，比如更新父组件的状态或执行其他操作
    },
    handleRoomClicked(room) {
      // 在这里处理接收到的卡片信息
      console.log('RoomComponents clicked:', room);
      this.showRoomDetails(room);
      // 可以在这里执行其他逻辑，比如更新父组件的状态或执行其他操作
    },
    toggleVisibility() {
      if (this.showRoom) {
        this.showRoom = false;
      } else if (this.showBuilding) {
        this.showBuilding = false;
      }
    },
  },
};
</script>
<style scoped>

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
</style>
<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--// export default {-->
<!--//   methods: {-->
<!--//     goBack() {-->
<!--//       this.$router.go(-1); // 执行回退操作，返回上一个页面-->
<!--//     }-->
<!--//   }-->
<!--// }-->
<!--</script>-->
<!--<script>-->
<!--import Card from './Card.vue';-->

<!--export default {-->
<!--  components: {-->
<!--    Card,-->
<!--  },-->
<!--  props: {-->
<!--    name: String,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      cards: [-->
<!--        {-->
<!--          id: 1,-->
<!--          title: 'Card 1',-->
<!--          content: 'This is the content of card 1',-->
<!--        },-->
<!--        {-->
<!--          id: 2,-->
<!--          title: 'Card 2',-->
<!--          content: 'This is the content of card 2',-->
<!--        },-->
<!--        {-->
<!--          id: 3,-->
<!--          title: 'Card 3',-->
<!--          content: 'This is the content of card 3',-->
<!--        },-->
<!--      ],-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->