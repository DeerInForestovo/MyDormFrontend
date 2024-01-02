<script setup>
import Card from './BuildingInfoCard.vue';
</script>

<template>
  <!--  这个是用来强制 computed 的  -->
  <div v-show="false"> {{ zoneId }}</div>

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
    zoneId() {
      if (this.$store.state.zoneId)
        axiosFunctions.methods.getRoomFromZone(this.$store.state.zoneId)
            .then(response => {
              const rooms = response.data;
              const buildingIdList = new Set(rooms.map(room => room.buildingId))
              axiosFunctions.methods.getAllBuildings()
                  .then(response => {
                    let buildings = response.data
                    buildings = buildings.filter(building => buildingIdList.has(building.buildingId))
                    this.cards = buildings.map(building => ({
                      id: building.buildingId,
                      title: building.buildingName,
                      content: building.description,
                      buildingCoordinate: building.buildingCoordinate,
                    }));
                  })
                  .catch(response => {
                    console.log(response)
                  })
            })
            .catch(response => {
              console.log(response)
            })
      return this.$store.state.zoneId
    }
  },

  mounted() {

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