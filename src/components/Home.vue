<script setup>
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'

// import icons
import {
  InfoFilled,
  Message,
  Moon,
  Sunny,
  User,
  House,
  Tools,
  QuestionFilled,
  Search,
  OfficeBuilding
} from "@element-plus/icons-vue";

// import static images
import my_dorm_image from '@/assets/mydorm.png'
import my_dorm_image_collapse from '@/assets/mydorm-collapse.png'

// import components
import Introduction from "@/components/decorations/Introduction.vue"

// support Light-Dark mode switch
import {ref} from 'vue'
import DeveloperInfo from "@/components/decorations/DeveloperInfo.vue";

const isLight = ref(true)
const toggleDark = () => {
  // reference: https://blog.csdn.net/wanghu20150107010129/article/details/131110061
  isLight.value = !isLight.value
  const html = document.querySelector('html')
  if (html) {
    if (isLight.value) {
      html.classList.remove("dark")
      html.classList.add("light")
    } else {
      html.classList.remove("light")
      html.classList.add("dark")
    }
  }
}

// Info
const infoOnClick = ref(false)

// Intro
const introOnClick = ref(false)

// Menu
const handleOpen = (key, keyPath) => {
}
const handleClose = (key, keyPath) => {
}
const buildSubMenuJsonList = [
  {
    name: 'Me',
    icon: User,
    children: [
      {
        name: 'Profile',
        path: '/home/profile',
        props: ['username'],
      },
      {
        name: 'Setting',
        path: '/home/setting',
        props: ['username'],
      },
      {
        name: 'Favorite',
        path: '/home/favorite',
      }
    ]
  },
  {
    name: 'Team',
    icon: House,
    children: [
      {
        name: 'TeamInfo',
        path: '/home/team',
      },
      {
        name: 'Notification',
        path: '/home/team_notification',
      },
      {
        name: 'Recommendation',
        path: '/home/team_recommend',
      }
    ]
  },
  {
    name: 'Manage',
    icon: Tools,
    children: [
      {
        name: 'Student',
        path: '/home/manage_students',
      },
      {
        name: 'Dorms',
        path: '/home/manage_dorms',
      },
      {
        name: 'Options',
        path: '/home/manage_options',
      }
    ]
  }
]
const buildMenuItemJsonList = [
  {
    name: 'Message',
    icon: Message,
    path: '/home/message'
  },
  {
    name: 'Map',
    icon: Search,
    path: '/home/map',
  },
  {
    name: 'Dormitory',
    icon: OfficeBuilding,
    path: '/home/buildings',
  },
]
</script>

<script>
import {ref} from "vue"

export default {
  // ref: https://stackoverflow.com/questions/47219272/how-can-i-monitor-changing-window-sizes-in-vue
  name: 'MainPage',
  data() {
    return {
      // window size
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      ifCollapse: ref(false),

      // menu
      menuItemVisible: {},
      activateIndex: null,

      // dynamic route
      dynamicRouteDict: {}
    }
  },

  mounted() {
    // window size
    window.addEventListener('resize', this.onResize);
    this.onResize()

    // set activate index
    this.setActivateIndex()

    // build query dict
    this.dynamicRouteDict['username'] = this.$store.state.username

    // auto route to profile
    this.$router.push(this.buildRoute({path: '/home/profile', props: ['username']}))
  },

  unmounted() {
    // window size
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      if (this.ifCollapse !== (this.windowWidth < 1000)) {
        this.ifCollapse = !this.ifCollapse;
      }
    },

    setActivateIndex() {
      this.activateIndex = this.$route.path
    },

    buildRoute(item) {
      let path = item.path
      if (item.props) path += '/' + item.props.map((name) => (this.dynamicRouteDict[name])).join('/')
      if (item.query) path += '?' + item.query.map((name) => (name + '=' + this.dynamicRouteDict[name])).join('&')
      // console.log(path)
      return path
    }
  },

  watch: {
    $route(newVal) {
      console.log('route to')
      console.log(newVal)
      this.setActivateIndex()
    }
  }
}
</script>

<template>

  <!--  Components  -->

  <Introduction v-model="introOnClick"/>
  <DeveloperInfo v-model="infoOnClick" :is-light="isLight"/>

  <!--    Main Page    -->

  <div class="MainPage">

    <!--      Left: menu     -->

    <div class="MainPageMenu">
      <el-scrollbar>
        <el-menu
            mode="vertical"
            :default-active="activateIndex"
            @open="handleOpen"
            @close="handleClose"
            :collapse="this.ifCollapse"
            :router="true"
        >
          <!--      MyDorm - MyGO logo                -->
          <el-menu-item @click="infoOnClick=true">
            <div class="HeaderImage">
              <el-space>
                <el-image :src="this.ifCollapse ? my_dorm_image_collapse : my_dorm_image" :fit="'contain'"/>
              </el-space>
            </div>
          </el-menu-item>

          <!--      Build Sub-menus      -->
          <el-sub-menu v-for="subMenuItem in buildSubMenuJsonList" :index="subMenuItem.name">
            <template #title>
              <el-icon>
                <component :is="subMenuItem.icon"/>
              </el-icon>
              <span> {{ ifCollapse ? '' : subMenuItem.name }} </span>
            </template>
            <el-menu-item-group :title="ifCollapse ? subMenuItem.name : ''">
              <el-menu-item v-for="children in subMenuItem.children" :index="this.buildRoute(children)">
                {{ children.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <!--      Build Menu-items      -->
          <el-menu-item v-for="menuItem in buildMenuItemJsonList" :index="this.buildRoute(menuItem)">
            <el-icon>
              <component :is="menuItem.icon"/>
            </el-icon>
            <template #title>
              {{ menuItem.name }}
            </template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>

    <!--    Right: Main page    -->
    <el-container class="MainPageMainPart">
      <el-header class="Header">
        <!--      Buttons                             -->
        <div class="HeaderButtonDiv">
          <el-space>
            <!--      Switch Light-Dark Mode Button     -->
            <el-tooltip :content="isLight ? 'Dark Mode' : 'Light Mode'" placement="bottom">
              <el-button @click="toggleDark" :icon="isLight ? Sunny : Moon"
                         class="HeaderButton" text circle size="large"/>
            </el-tooltip>

            <!--      Open Introduction Drawer Button   -->
            <el-tooltip content="Introduction" placement="bottom">
              <el-button @click="introOnClick=true" :icon="QuestionFilled"
                         class="HeaderButton" text circle size="large"/>
            </el-tooltip>

            <!--      Open Information Drawer Button   -->
            <el-tooltip content="Developers" placement="bottom">
              <el-button @click="infoOnClick=true" :icon="InfoFilled"
                         class="HeaderButton" text circle size="large"/>
            </el-tooltip>
          </el-space>
        </div>
      </el-header>

      <!--    Main Part of the Page    -->
      <el-main>
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.MainPage {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
}

.MainPageMainPart {
  height: 100%;
  flex: 1;
}

.MainPageMenu {
  height: 100%;
  width: auto;
  margin-right: 10px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.3);
}

.el-menu {
  border-right: 0 !important;
}

.Header {
  height: 10vh;
  display: flex;
  align-items: center;
}

.HeaderImage {
  width: 150px;
}

.HeaderButtonDiv {
  position: absolute;
  right: 8%;
}

.HeaderButton {
  margin-right: 15px;
}
</style>