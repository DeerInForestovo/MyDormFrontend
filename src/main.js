import './assets/main.css'
import App from './App.vue'

// import ElementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import vuex store
import store from './utils/store'

// import vue-router
import router from './utils/route'

import 'element-plus/theme-chalk/display.css';


// build app
import {createApp} from 'vue'
const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')
