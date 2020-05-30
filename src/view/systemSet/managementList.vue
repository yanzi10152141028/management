<template>
  <div class="authority_container">
      <el-row type="flex" justify="start">
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </el-col>
    </el-row>
   <el-row type="flex" justify="center" class="content">
      <el-col :span="24">
        <el-table
          :data="manageData"
          style="width: 100%;height:700px"
          row-key="id"
          default-expand-all
          border
          show-header
          height="250"
        >
          <el-table-column fixed="left" prop="id" label="ID" width="50"></el-table-column>
          <el-table-column label="账号" width="180" prop="id">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" min-width="50">
            <template slot-scope="scope">{{scope.row.password}}</template>
          </el-table-column>
           <el-table-column label="昵称" min-width="50">
            <template slot-scope="scope">{{scope.row.nickName}}</template>
          </el-table-column>
           <el-table-column label="权限组id" min-width="50">
            <template slot-scope="scope">{{scope.row.groupId}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <page-item></page-item>
    <manage-dialog :authorityIds="authorityIds" ref="childManage" ></manage-dialog>
    </div>
</template>
<script>
import pageItem from '../../component/page'
import manageDialog from '../../component/dialogs/manageDialog'
export default {
  components:{ manageDialog , pageItem },
  data(){
    return{
      authorityIds:[],
      manageData:[]
    }
  },
  created(){
    this.getManagerList();
  },
  methods:{
    //添加
    handleAdd(){
      this.$nextTick(()=>{
        this.$refs.childManage.dailogShow();
        this.authorityIds = [];
      })
    },
    //编辑
    handleEdit(row){
      this.$refs.childManage.dailogShow(row.id);
      Object.assign(this.authorityIds,row)
    },
    //获取管理员列表
    getManagerList(){
       this.$http.get(this.$url.getManagerList).then(res =>{
          var data = res.data;
          if(data.success){
            //  this.manageData = data.data;
          }
       })
    }
  }

}
</script>

<style>

</style>