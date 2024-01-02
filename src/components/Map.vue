<script setup>
import {ref, onMounted} from 'vue'
import axiosFunctions from "@/utils/api";
import {useStore} from 'vuex';

const store = useStore();
const zoneId = store.state.zoneId;

const image = ref(null)
const canvas = ref(null);

const areas = [
  {
    id: 1,
    alt: "area1",
    coords: "733,1608,739,1627,796,1614,796,1594",
  },
  {
    id: 2,
    alt: "area2",
    coords: "799,1558,802,1578,861,1568,854,1549",
  },
  {
    id: 3,
    alt: "area3",
    coords: "781,1657,772,1678,818,1691,835,1674",
  },
  // Add more areas if needed
];
let buildings = [];

// 更新 Canvas 尺寸以匹配图片
function updateCanvasSize() {
  const img = image.value;
  const cvs = canvas.value;

  cvs.width = img.offsetWidth;
  cvs.height = img.offsetHeight;

  drawMask(); // 传递缩放比例给 drawMask 函数
}

// 绘制遮罩
function drawMask(scale = 1) {
  const ctx = canvas.value.getContext('2d');
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);


// 遍历 areas 数组并绘制每个区域
  buildings.forEach(building => {
    // 解析每个区域的坐标并根据缩放比例调整
    const coords = building.coordinates.split(',').map(coordinates => parseInt(coordinates) * scale);

    // 绘制多边形遮罩
    ctx.beginPath();
    ctx.moveTo(coords[0], coords[1]);
    for (let i = 2; i < coords.length; i += 2) {
      ctx.lineTo(coords[i], coords[i + 1]);
    }
    ctx.closePath();

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fill();
  });
}

const rollImg = (e) => {
  let transform = image.value.style.transform
  let zoom = transform.indexOf("scale") !== -1 ? +transform.split("(")[1].split(")")[0] : 1
  zoom += e.wheelDelta / 1200
  if (zoom > 0.1 && zoom < 2) {
    image.value.style.transform = "scale(" + zoom + ")"
    canvas.value.style.transform = "scale(" + zoom + ")"
    updateCanvasSize(); // 更新 Canvas 尺寸
  }
}
const imgWrap = ref(null)
const moveImg = (e) => {
  let wrap = imgWrap.value
  let img = image.value
  let x = e.pageX - img.offsetLeft
  let y = e.pageY - img.offsetTop
  // 添加鼠标移动事件
  wrap.addEventListener('mousemove', move)

  function move(e) {
    img.style.left = e.pageX - x + 'px'
    img.style.top = e.pageY - y + 'px'
    canvas.value.style.left = e.pageX - x + 'px'
    canvas.value.style.top = e.pageY - y + 'px'
    updateCanvasSize();
  }

  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  img.addEventListener('mouseup', () => {
    wrap.removeEventListener('mousemove', move)
  })
  // 鼠标离开父级元素，把事件移除
  wrap.addEventListener('mouseout', () => {
    wrap.removeEventListener('mousemove', move)
  })
}


onMounted(() => {
  setTimeout(async () => {
    if (zoneId) {

      try {
        const zoneResponse = await axiosFunctions.methods.getRoomFromZone(zoneId);
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
        buildings = Object.values(buildingMap);

      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    }
  }, 500);
});


</script>
<script>
export default {
  props: {
    changeBuildingId: Number,
  },
  methods: {
    handleAreaClick(buildingId) {
      this.$router.push('/home/building/' + buildingId)
    }
  },
}
</script>

<template>
  <div class="wrap" ref="imgWrap" @mousewheel.prevent="rollImg">
    <!--    <img :src="mapSvgFile" class="img" usemap="#image-map" ref="image" alt="" @mousedown.prevent="moveImg">-->
    <img src="./MapComponents/MapSvg.svg" class="img" usemap="#image-map" ref="image" alt=""
         @mousedown.prevent="moveImg">
    <canvas ref="canvas" class="canvas-overlay"></canvas>
    <map name="image-map">
      <area target="_self"  :coords="building.coordinates" shape="poly" v-for="building in buildings"
            :key="building.buildingId" @click="handleAreaClick(building.buildingId)" alt="">
    </map>
  </div>
</template>


<style scoped>
.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img, .canvas-overlay {
  position: absolute;
  cursor: move;
}
.canvas-overlay {
  pointer-events: none; /* 确保 Canvas 不阻止对图片的交互 */
}
</style>