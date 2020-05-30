<template>
  <el-dialog :title="btnText+'管理员信息'" :visible.sync="dialogFormVisible" style="text-align:left">
    <el-form :model="rulesForm" :rules="rules" ref="rulesForm" size="min" label-width="100px">
      <el-form-item label="账号" prop="userName">
        <el-col :span="8">
          <el-input v-model="rulesForm.userName" placeholder="请输入内容" autocomplete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="8">
          <el-input v-model="rulesForm.password" placeholder="请输入内容" autocomplete="off" show-password clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-col :span="8">
          <el-input v-model="rulesForm.nickName" placeholder="请输入内容" autocomplete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="权限组id" prop="groupId">
        <el-cascader :options="authorityIdsData" :props="{ checkStrictly: true }" clearable ref="groupIds"></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="addManage('rulesForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:["authorityIds"],
  data() {
    var groupIdValid = (rule,value,callback) =>{
       value = this.$refs.groupIds.getCheckedNodes();
       if(value == ""){
         callback(new Error("请选择权限组"));
       }else{
         callback();
       }
    }
    return {
      btnText: "添加",
      dialogFormVisible:false,
      editID:'',
      authorityIdsData:[],
      rulesForm: {
        userName: "",
        password: "",
        nickName: "",
        groupId: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        groupId: [{ required: true, validator:groupIdValid, trigger: "change" }]
      }
    };
  },
  created(){
    this.getAuthorityIds();
  },
  methods:{
    //添加和编辑
    dailogShow(status){
      this.dialogFormVisible = true;
      if(status){
        this.editID = status;
        this.btnText = "编辑";

      }else{
        this.editID = 0;
        this.$nextTick(()=>{
          this.$refs["rulesForm"].resetFields();
          this.options = [];
        })
      }

    },
    //确定
    addManage(formName){
       this.$refs[formName].validate(valid =>{
         if(valid){
           var data ={
              id:this.editID,
              userName:this.rulesForm.userName,
              password:this.rulesForm.password,
              nickName:this.rulesForm.nickName,
              // groupId: this.$refs.groupIds.getCheckedNodes()[0].value
           }
             this.$http.post(this.$url.addManager,data).then( res =>{
               var data = res.data;
               if(data.success){
                  this.$message({
                    message:this.btnText =='添加'?'添加成功！':'修改成功！',
                    type:'success'
                  })
                  this.dialogFormVisible = false;
               }
             })
         }
       })
    },
    // 取消
    cancel(){
      this.dialogFormVisible = false;
    },
    //获取权限组
    getAuthorityIds(){
       this.$http.get(this.$url.getAuthorityIds).then(res=>{
         var data = res.data;
         if(data.success){
            this.authorityIdsData = data.data;
         }
       })
    }
  }
};
</script>

<style>
</style>