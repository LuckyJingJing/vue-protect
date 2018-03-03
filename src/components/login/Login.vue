<template>
  <div class='login'>
    <h3>后台管理系统</h3>
    <el-form label-width="80px" :model="formLabelAlign" :rules="rules" ref="ruleForm2">
      <el-form-item label="用户名" prop='uname'>
        <el-input v-model="formLabelAlign.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='upwd'>
        <el-input v-model="formLabelAlign.upwd"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data(){
      //校验用户名， 将来配置到下面的validator配置项
      function unameFn(rule, value, callback) {
        if(value == '') {
            callback(new Error('账号不能为空'))
        }else {
            callback();
        }
      }

      //校验密码，将来配置刀下面的validator配置项
      function upwdFn(rule, value, callback) {
        if(value == '') {
            callback(new Error('密码不能为空'))
        }else {
            callback();
        }
      }
      return{
        formLabelAlign:{
          uname:"",
          upwd:""
        },
        rules:{
          uname:[
            { required: true, validator: unameFn, trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          upwd:[
            { required: true, validator: upwdFn, trigger: 'blur' },
            { pattern: /^\w{6,18}$/, trigger: 'blur' }
            
          ]
        }
      }
    },
    methods:{
      //登陆
      login(){
        this.$http.post(this.$api.login, this.formLabelAlign).then(res=>{
          // console.log(res);
          //获取全局守卫里面我们跳转到登陆页面的时候传的参数
          // let nextPage = this.$route.query
          // console.log(nextPage)   
          //打印出来就是{nextPage: "/admin/goods/content/list"}，因为我们的query传递过来的就是一个对象
          //如果想直接获取地址，那么就写成
          let nextPage = this.$route.query.nextPage  
          console.log(nextPage)        
          //打印出来就是/admin/goods/content/list
          if(res.data.status== 0){         
            //满足条件表示用户名和密码都正确，那么就跳转页面，
            //因为全局守卫的缘故，我们要先获取全局守卫里面传递给登陆页面的参数，然后跳转到这个参数地址
            //但是如果用户直接进入的就是登陆页面，那么这个参数就不存在，nextPage就是undefined
            //所以我们在跳转页面的时候进行判断，如果nextPage存在我们就跳转到这个页面，如果不存在我们就
            //跳转到首页
            // this.$router.push({path:"/admin"})
            this.$router.push({path: nextPage? nextPage:'/admin' })
          }else{
            this.$alert(res.data.message)
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$alert('请填写用户名和密码')
          }
        });
      },
    },
  }
</script>

<style scoped>
  .login{
    width: 300px;
    height: 200px;
    border: 1px solid #fff;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h3{
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
  }
  
</style>