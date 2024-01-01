<!--<script setup>-->
<!--// import { createApp } from 'vue';-->
<!--// import ElementPlus from 'element-plus';-->
<!--// import 'element-plus/lib/theme-chalk/index.css';-->
<!--//-->
<!--// const app = createApp({});-->
<!--// app.use(ElementPlus);-->
<!--// app.mount('#app');-->
<!--</script>-->
<script setup>
import {ref, onMounted, nextTick} from 'vue'
// import mapSvgFile from './MapComponents/MapSvg.svg'

const image = ref(null)
const canvas = ref(null);

const areas = [
  {
    id: 1,
    alt: "area1",
    coords: "733,1608,739,1627,796,1614,796,1594",
    shape: "poly"
  },
  // Add more areas if needed
];

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

  // 定义遮罩区域的坐标，根据缩放比例调整
  const coords = [733, 1608, 739, 1627, 796, 1614, 796, 1594].map(coord => coord * scale);

  // 绘制多边形遮罩
  ctx.beginPath();
  ctx.moveTo(coords[0], coords[1]);
  for (let i = 2; i < coords.length; i += 2) {
    ctx.lineTo(coords[i], coords[i + 1]);
  }
  ctx.closePath();

  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.fill();
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
  nextTick(() => {
    updateCanvasSize();
  });
});


</script>
<script>
export default {
  props: {
    changeBuildingId: Number,
  },
  methods: {
    handleAreaClick(buildingId) {
      // 触发自定义事件，将alt信息传递给父组件
      this.$router.push('/home/building/' + buildingId)
      // this.$emit('area-click', building);
      // console.log('changeBuildingId', this.changeBuildingId)
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
      <area target="_self" :alt="area.alt" :coords="area.coords" :shape="area.shape" v-for="area in areas"
            :key="area.id" @click="handleAreaClick(area.id)">
      <!--      <el-popover-->
      <!--          title="二期宿舍11栋"-->
      <!--          width="200"-->
      <!--          trigger="hover"-->
      <!--          content="这是弹出信息的内容">-->
      <!--        <area id="popover-area1" target="_self" alt="area2-11" href="" coords="733,1608,739,1627,796,1614,796,1594"-->
      <!--              shape="poly">-->
      <!--      </el-popover>-->
    </map>
  </div>

<!--  <el-popover ref="popover" placement="top" trigger="manual" v-show="popoverVisible">-->
<!--    <template #default>-->
<!--      &lt;!&ndash; 弹出框内容 &ndash;&gt;-->
<!--      <div>这是一个弹出框</div>-->
<!--    </template>-->
<!--  </el-popover>-->

</template>


<style scoped>
#popover {
  z-index: 9999; /* 设置较高的 z-index 值 */
}

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

.canvas-container {
  position: relative;
}

.canvas-overlay {
  pointer-events: none; /* 确保 Canvas 不阻止对图片的交互 */
}

</style>
<!--<script>-->
<!--export default {-->
<!--  methods: {-->
<!--    // 拖动图片-->
<!--    move(e) {-->
<!--      e.preventDefault();-->
<!--      // 获取元素-->
<!--      var left = document.querySelector(".left");-->
<!--      var img = document.querySelector(".img");-->
<!--      var x = e.pageX - img.offsetLeft;-->
<!--      var y = e.pageY - img.offsetTop;-->
<!--      // 添加鼠标移动事件-->
<!--      left.addEventListener("mousemove", move);-->

<!--      function move(e) {-->
<!--        img.style.left = e.pageX - x + "px";-->
<!--        img.style.top = e.pageY - y + "px";-->
<!--      }-->

<!--      // 添加鼠标抬起事件，鼠标抬起，将事件移除-->
<!--      img.addEventListener("mouseup", function () {-->
<!--        left.removeEventListener("mousemove", move);-->
<!--      });-->
<!--      // 鼠标离开父级元素，把事件移除-->
<!--      left.addEventListener("mouseout", function () {-->
<!--        left.removeEventListener("mousemove", move);-->
<!--      });-->
<!--    },-->
<!--    // 缩放图片-->
<!--    rollImg() {-->
<!--      /* 获取当前页面的缩放比 若未设置zoom缩放比，则为默认100%，即1，原图大小 */-->

<!--      var zoom = parseInt(this.$refs.imgDiv.style.zoom) || 100;-->
<!--      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动 */-->

<!--      zoom += event.wheelDelta / 12;-->
<!--      /* 最小范围 和 最大范围 的图片缩放尺度 */-->

<!--      if (zoom >= 80 && zoom < 500) {-->
<!--        this.$refs.imgDiv.style.zoom = zoom + "%";-->
<!--      }-->
<!--      return false;-->
<!--    }-->
<!--  }-->
<!--};-->
<!--<script>-->
<!--export default {-->
<!--  components: {-->
<!--    'el-popover': Popover-->
<!--  },-->
<!--  mounted() {-->
<!--    // 获取区域元素-->
<!--    const area = document.getElementById("popover-area1");-->

<!--    // 添加点击事件监听器-->
<!--    area.addEventListener("click", (event) => {-->
<!--      event.preventDefault(); // 阻止默认链接行为-->

<!--      // 在这里触发Popover组件的显示-->
<!--      this.$refs.popover.doShow();-->
<!--    });-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<script>-->
<!--  // 获取区域元素-->
<!--    // 在这里编写弹出气泡卡片的逻辑-->
<!--    var area = document.getElementById("popover-area1");-->

<!--    // 添加点击事件监听器-->
<!--    area.addEventListener("click", function(event) {-->
<!--      event.preventDefault(); // 阻止默认链接行为-->

<!--      // 可以使用 Element UI 中的 Popover 组件或其他类似的库来实现-->

<!--    // 例如，使用 Element UI 的 Popover 组件：-->
<!--    var popoverContent = "这是气泡卡片的内容";-->
<!--    var popoverElement = document.createElement("div");-->
<!--    popoverElement.innerHTML = popoverContent;-->
<!--    area.appendChild(popoverElement);-->
<!--    // 这里假设你已经引入了 Element UI 相关的样式和脚本-->
<!--  });-->
<!--</script>-->