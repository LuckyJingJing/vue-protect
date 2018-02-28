//引入vue相关的第三方包
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//使用vue相关的第三方包
Vue.use(ElementUi)

//引入与vue无关的第三方包
import axios from 'axios'
//设置默认域名
axios.defaults.baseURL = 'http://157.122.54.189:9095'
//再把axios绑定在vue的原型上面方便使用
Vue.prototype.$http = aixos


//引入我们自己写的文件
import api from './js/api-config.js'
//也把它绑定在vue的原型上面
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
