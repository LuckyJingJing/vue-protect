
//这个路由守卫的作用就是在全局下面注册，
//要实现的逻辑是
//1.用户一开始进入的是登陆页面的时候，我们要判断用户之前是否登陆过，如果登陆过那就直接跳转到首页admin
// 如果没有登陆过，那么就直接显示这个登陆页面
//2.用户一开始进入的是其它页面，判断用户是否登陆过，登陆过那就直接进入用户开始进入这个页面，
// 如果没有登陆那就跳转到登陆页面然后再跳回到之前用户要进入的页面
//3.因为我们要跳回到用户之前想进入的页面，所以我们要获取之前用户要进入的地址，在我们跳转到登陆页面让用户登陆的时候
//就把这个地址也传递过去，然后我们登陆之后，就获取我们传递的这个地址，让页面跳转回这个地址

//4.但是要搞清楚，我们只有在提交订单和支付的页面需要用户登陆，而其他的页面不要求用户先登陆，
//如 goodslist 页面  goodsdetail 页面  shopcart页面 以及首页（这里的首页就是我们的goodslist）页面
//不需要用户先登陆，所以要把这些页面排除在外，用一个数组把这些页面放在里面，然后用some方法来判断我们访问的
//页面有没有在这个数组里面，（some方法返回的是true和false）如果是这个数组里面的页面，那么直接nxet（）就可以了，如果不是就进行下面的逻辑

import axios from 'axios'
import api from './api-config.js'
export default (to,from,next)=>{
  // console.log(to,from)
  //to 和 from 是两个对象，里面都有一系列属性 如fullPath path name  to 是要去的页面 from是要离开的页面
  //1.获取用户要去的页面
  let toName = to.name
  // console.log(toName)
  //2.先调用后台接口来判断用户是否登陆过
  //因为我们这里文件不是路由组件，所以不能用this.$http  和 this.$api  所以要导入这两个

  let noCheckedPage=['store','goodslist','goodsdetail','shopcart']

  //在这里判断我们的页面有没有在我们数组里面
  if(noCheckedPage.some(v=>v==toName)){
    return next()
  }
  axios.get(api.isLogin).then(res=>{
    console.log(res)
    let flag = true;
    if(res.data.code == 'nologin'){
      //满足条件表示用户没有登陆过
      //3.立一个flag，根据是否登陆过来改变flag的值
      flag = false
    }
    //因为axios和ajax 都是异步的，所以我们下面的逻辑还是写在axios这个里面
    if(toName == 'login' && flag){
      next("/admin")
    }else if(toName != 'login' && flag ==false){
      next({name:"login",query:{nextPage: to.fullPath}})
    }else{
      next()
    }
    //完成上面的代码之后，会发现我们点击登陆的时候页面不跳转了，是因为我们跨域了，我们是用localhost来打开
    //页面的，而我们访问的是'http://157.122.54.189:9095'这个地址，所以跨域了。如果跨域了，浏览器是不会把
    //我们的cookie携带过去的，所以我们输入用户名和密码之后，点击登陆，仍然打印出来的是nologin，未登陆，所
    //以页面跳转不了
    //要在main.js里面设置axios.defaults.withCredentials=true;
    //设置完这一项之后，我们点击登陆的时候才会根据我们写的逻辑来跳转页面


    //但是还有一个问题就是 我们虽然在跳到登陆页面的时候，把我们之前要进入的url传参到了login的url的后面
    //但是我们就算之前向进入的是admin/goods/content/list 这个页面，而且我们参数也传递正确了，但是我们
    //每次点击登陆之后进入的都是admin首页
    //那是因为我们在login组件里面。给登陆按钮注册了点击之后跳转到首页的逻辑，所以我们要回到login组件，
    //修改里面的逻辑
  })
}