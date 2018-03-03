import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


//我们要加上全局守卫
import BeforeEach from '../js/beforeEach'

//导入组件

//登陆组件
import Login from '../components/login/Login.vue'
import Store from '../components/store/Store.vue'
import GoodsList from '../components/store/goods/GoodsList.vue'
import GoodsDetail from '../components/store/goods/GoodsDetail.vue'

import Shopcart from '../components/store/shopcart/Shopcart.vue'
import Commit from '../components/store/order/Commit.vue'
import Pay from '../components/store/order/Pay.vue'


let router = new Router({
  routes:[
    //重定向
    { path:'/',redirect: '/store'},

    //登陆
    {name:"login", path:'/login', component: Login},
    
    //商品列表
    {name:'store', path:'/store', component: Store, children:[
      {name:"goodslist", path:'goods/goodslist', component: GoodsList},
      {name:"goodsdetail", path:'goods/goodsdetail', component: GoodsDetail},
      {name:"shopcart", path:'/shopcart', component: Shopcart},
      {name:"commit", path:'order/commit', component: Commit},
      {name:"pay", path:'order/pay', component: Pay},
      
      
      
    ]}
  ]
})

router.beforeEach(BeforeEach);

export default router
