<template>
  <el-dialog :title="btnText+'分组'" :visible.sync="dialogFormVisible" style="text-align:left">
    <el-form :model="rulesForm" :rules="rules" ref="rulesForm" size="min" label-width="100px">
      <el-form-item label="分组名" prop="name">
        <el-col :span="8">
          <el-input v-model="rulesForm.name" placeholder="请输入内容" autocomplete="off" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="状态" prop="disable">
        <el-col :span="6">
          <el-select v-model="rulesForm.disable">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item,index) in statusData"
              :key="index"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="权限" prop="id">
        <el-tree
          :data="authorityTree"
          :props="props"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="authoritySelectedIds"
          :check-on-click-node ="true"
          :expand-on-click-node="false"
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="addAuthority('rulesForm')">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import bus from "../../assets/js/eventBus";
export default {
  props: ["parentVal"],
  data() {
    var authorityValid = (rule, value, callback) => {
      value = this.$refs.tree.getCheckedNodes(false, true);
      if (value == "") {
        callback(new Error("请勾选权限"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      btnText: "添加",
      editID: "",
      rulesForm: {
        name: "",
        disable: 0,
        authority: "",
        id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        disable: [{ required: true, trigger: "change" }],
        id: [{ required: true, validator: authorityValid, trigger: "change" }]
      },
      props: {
        label: "name",
        children: "subList"
      },
      authorityTree: [],
      authoritySelectedIds: [],
      statusData: [
        {
          label: "禁用",
          value: 0
        },
        {
          label: "开启",
          value: 1
        }
      ]
    };
  },
  created() {
    this.getAuthoritysData();
  },
  methods: {
    //添加和编辑
    dailogShow(status) {
      this.dialogFormVisible = true;
      if (status) {
        this.editID = status;
        this.btnText = "编辑";
        this.getGroupAuthorityData();
        Object.assign(this.rulesForm, this.parentVal);
      } else {
          this.btnText ="添加";
          this.editID = 0;
          this.$nextTick(function(){
            for(var key in this.rulesForm){
               this.rulesForm['name']= "";
            }
            this.$refs.tree.setCheckedKeys([]);
          })
      }
    },
    //取消
    cancel() {
      this.dialogFormVisible = false;
    },
    //获取添加权限
    getAuthoritysData() {
      this.$http.get(this.$url.Authoritys).then(res => {
        var data = res.data;
        if (data.success) {
          var authoritys = new Array();
          for (var i = 0, len = data.data.length; i < len; i++) {
            var item = data.data[i];
            var authority = this.authorityResolver(item);
            var subList = new Array();
            var self = this;
            item.subList.forEach(element => {
              subList.push(self.authorityResolver(element));
            });
            authority["subList"] = subList;
            authoritys.push(authority);
          }
          this.authorityTree = authoritys;
        }
      });
    },
    // 获取编辑的权限
    getGroupAuthorityData() {
      var data = {
        params: {
          groupId: this.editID
        }
      };
      this.$http.get(this.$url.getGroupAuthority, data).then(res => {
        var data = res.data;
        if (data.success) {
         this.authoritySelectedIds = data.data.selectedIds;
          var result = data.data;
          var authoritys = new Array();
          for(var i=0,data = result.authorityTrees;i<data.length;i++){
              var item = data[i];
              var authority = this.authorityEditResolver(item.authority);
              var subList = new Array();
              item.subList.forEach(e=>{
                 subList.push(this.authorityResolver(e));
              })
              authority["subList"] = subList;
             authoritys.push(authority)
          }
          this.authorityTree = authoritys;
        }
      });
    },
    //添加权限
    addAuthority(formName) {
      if (this.editID) {
      } else {
        this.editID = 0;
      }
      var params = {
        name: this.rulesForm.name,
        id: this.editID,
        authorityIds: this.$refs.tree.getCheckedKeys()
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post(this.$url.Addauthoritys, params).then(res => {
            var data = res.data;
            if (data.success) {
              this.$message({
                message: this.btnText == "添加" ? "添加成功!" : "修改成功!",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.$parent.getAuthorityList();
            }
          });
        }
      });
    },
    authorityResolver(authority) {
      return {
        id: authority.authority.id,
        name: authority.authority.name
      };
    },
     authorityEditResolver(authority) {
      return {
        id: authority.id,
        name: authority.name
      };
    }
  }
};
</script>

<style>
</style>