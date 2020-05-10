<template>
  <div class="login_container">
    <div class="container_child">
      <div class="child">
        <h3>登录</h3>
        <el-form ref="rulesForm"  :model="rulesForm" label-width="100px" :rules="rules">
          <el-form-item label="用户名" prop="userName"  >
            <el-input v-model="rulesForm.userName" auto-complete clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input v-model="rulesForm.password" show-password auto-complete clearable @keyup.enter.native="submitForm('rulesForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('rulesForm')" >登录</el-button>
            <el-button @click="resetForm('rulesForm')"  >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rulesForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  created(){

  },
  methods: {
    submitForm(formName) {
      var params ={
        userName:this.rulesForm.userName,
        password:this.rulesForm.password
      };
        this.$refs[formName].validate((valid) => {
            if(valid){
              this.$http.post(this.$url.Login,params).then((res)=>{
                var data = res.data;
                 if(data.success){
                    this.$router.push('/index')
                   this.$store.dispatch("token",data.data.userToken.token);
                   this.$store.dispatch("uid",data.data.userToken.uid);   
                 }else{
                   this.$message.error(data.msg);
                 }
              })
            }
        });
      },
    resetForm(form){
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.login_container {
  width: 100%;
  height: 100%;
  // background: url("../assets/img/login_bg.jpeg") no-repeat;
  // background-size: cover;
  .container_child {
    width: 500px;
    height: 500px;
    position: relative;
    margin: 0 auto;
    .child {
      width: 460px;
      height: 240px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -120px;
      margin-left: -230px;
      h3{
       margin:  0 0 20px 100px;
       font-size: 1.4rem;
      
      }

    }
  }
}
</style>