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
  async mounted() {
    try {
      const zoneResponse = await axiosFunctions.methods.getRoomFromZone(this.$store.state.zoneId);
      console.log(zoneResponse);
      const rooms = zoneResponse.data;

      // Building the initial buildingMap with reduced information.
      let buildingMap = rooms.reduce((acc, room) => {
        if (!acc[room.buildingId]) {
          acc[room.buildingId] = {
            buildingId: room.buildingId,
            buildingName: room.buildingName,
            description: '', // Will be filled later
            buildingCoordinate: '', // Will be filled later
          };
        }
        return acc;
      }, {});

      // Fetch additional information for each building.
      for (let buildingId in buildingMap) {
        try {
          const buildingResponse = await axiosFunctions.methods.getSingleBuilding(buildingId);
          // Assuming buildingResponse.data contains 'description' and 'coordinates'
          buildingMap[buildingId].description = buildingResponse.data.description;
          buildingMap[buildingId].buildingCoordinate = buildingResponse.data.buildingCoordinate;
        } catch (error) {
          console.error(`Failed to fetch data for building ${buildingId}:`, error);
        }
      }

      // Convert the buildingMap object to an array for the Vue component.
      this.buildings = Object.values(buildingMap);
      console.log(this.buildings)
      this.cards = this.buildings.map(building => ({
        id: building.buildingId,
        title: building.buildingName,
        content: building.description,
        buildingCoordinate: building.buildingCoordinate, // Now including coordinates
      }));

    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  },
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