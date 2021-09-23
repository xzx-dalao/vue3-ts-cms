import { createApp } from 'vue'
import { globalRegister } from './global'

import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'
import { setupStore } from './store'
const app = createApp(App)
//注册element组件
// registerApp(app)
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
