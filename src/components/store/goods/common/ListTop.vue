<template>
    <div>
      <!-- 导航 -->
      <div class="section">
        <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        </div>
      </div>
      <!-- 主体 -->
      <div class="section">
          <div class="wrapper">
              <div class="wrap-box">
                  <!--类别菜单-->
                  <div class="left-220" style="margin:0;">
                      <div class="banner-nav">
                          <ul>
                          <!--此处声明下面可重复循环-->
                           
                              <li v-for="(item, index) in dataList.catelist" :key='item.id'>
                                  <h3>
                                      <i class="iconfont icon-arrow-right"></i>
                                      <span>{{item.title}}</span>
                                      <p>
                                        <span v-for='(subitem, index) in item.subcates' :key='subitem.title'>{{subitem.title}}&nbsp;</span>
                                      </p>
                                  </h3>
                                  <div class="item-box">
                                      <!--如有三级分类，此处可循环-->
                                      <!-- 在这个项目里面，我们这个盒子里面的内容和上面span和p标签里面的内容是一样的 -->
                                      <dl>
                                          <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                          <dd>
                                            <!-- 像我们的最后一个分类服装里面，除了服装分为了男装和女装以外，在这个男装和女装里面又细分了，
                                            所以像这种多层嵌套的，-->
                                            <!-- 我们只能尝试封装一个单独的组件，因为只有组件才能递归调用自己，普通元素不行 -->
                                            <!-- 我们把起始的一层列表数据传递过去，让它渲染 -->
                                            <!-- 然后该组件还会判断每一层数据是否有下一级，如果有那么调用自己继续渲染，直至没有下一级 -->
                                            <!-- <a href="/goods/43.html" v-for='(subitem,index) in item.subcates'>{{subitem.title}}</a> -->
                                            <app-category :list='item.subcates'></app-category>
                                          </dd>
                                      </dl>
                                  </div>
                              </li>                          
                          </ul>
                      </div>
                  </div>
                  <!--/类别菜单-->
                   
                  <!--幻灯片-->
                  <div class="left-705">
                      <div class="banner-img">
                        <template>
                          <el-carousel indicator-position="outside">
                            <el-carousel-item v-for="item in dataList.sliderlist" :key="item.id">
                              <img :src="item.img_url" alt="" style='width: 100%; height: 100%'>
                            </el-carousel-item>
                          </el-carousel>
                        </template>
                      </div>
                  </div>
                  <!--/幻灯片-->
                   
                  <!--推荐商品-->
                  <div class="left-220">
                      <ul class="side-img-list">
                       
                          <li>
                              <div class="img-box">
                                  <label>1</label>
                                  <img src="/upload/201504/20/thumb_201504200314272543.jpg">
                              </div>
                              <div class="txt-box">
                                  <a href="/goods/show-98.html">奔腾（BNTN） 380功放+纽约至尊 套装家庭影院</a>
                                  <span>2015-04-20</span>
                              </div>
                          </li>
                       
                          <li>
                              <div class="img-box">
                                  <label>2</label>
                                  <img src="/upload/201504/20/thumb_201504200258403759.jpg">
                              </div>
                              <div class="txt-box">
                                  <a href="/goods/show-97.html">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                  <span>2015-04-20</span>
                              </div>
                          </li>
                       
                          <li>
                              <div class="img-box">
                                  <label>3</label>
                                  <img src="/upload/201504/20/thumb_201504200242250674.jpg">
                              </div>
                              <div class="txt-box">
                                  <a href="/goods/show-95.html">惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）</a>
                                  <span>2015-04-20</span>
                              </div>
                          </li>
                       
                          <li>
                              <div class="img-box">
                                  <label>4</label>
                                  <img src="/upload/201504/20/thumb_201504200239192345.jpg">
                              </div>
                              <div class="txt-box">
                                  <a href="/goods/show-94.html">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                  <span>2015-04-20</span>
                              </div>
                          </li>
                       
                      </ul>
                  </div>
                  <!--/推荐商品-->
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
    import appCategory from './category.vue'
    export default {
      data(){
        return{
          dataList:{
            catelist:[],
            sliderlist:[],
            toplist:[]
          }
        }
      },
      methods:{
        getData(){
          this.$http.get(this.$api.goodsTop).then(res=>{
            // console.log(res)
            this.dataList = res.data.message
            console.log(this.dataList);
          })
        }
      },
      created(){
        this.getData()
      },
      components: {
        appCategory
      }
    }
  </script>
    
  <style>
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  </style>
  