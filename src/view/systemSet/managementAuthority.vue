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
          :data="authorityData"
          style="width: 100%;height:700px"
          row-key="id"
          default-expand-all
          border
          show-header
          height="250"
        >
          <el-table-column fixed="left" prop="id" label="ID" width="50"></el-table-column>
          <el-table-column label="名称" width="180" prop="id">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="50">
            <template slot-scope="scope">{{scope.row.disable}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <authority-dialog
      ref="childAuthority"
      :parentVal="authorityForm"
    ></authority-dialog>
  </div>
</template>
<script>
import authorityDialog from "../../component/dialogs/authorityDialog";
export default {
  components: { authorityDialog },
  data() {
    return {
      authorityData: [],
      authorityDialogShow: false,
      authorityForm: {},
    };
  },
  created() {
    this.getAuthorityList();
  },
  methods: {
    //点击添加
    handleAdd() {
      this.addShow = true;
      this.$nextTick(() => {
        this.$refs.childAuthority.dailogShow(); //父调用子
        for (var key in this.authorityForm) {
          this.authorityForm[key] = "";
        }
      });
    },
    //点击编辑
    handleEdit(row) {
      this.addShow = true;
      this.$nextTick(() => {
        this.$refs.childAuthority.dailogShow(row.id);
      });
      Object.assign(this.authorityForm, row);
    },
    // 获取权限列表
    getAuthorityList() {
      this.$http.get(this.$url.getAuthority).then(res => {
        var data = res.data;
        if (data.success) {
          for (var i = 0, result = data.data; i < result.length; i++) {
            for (var key in result[i]) {
              result[i].disable = result[i].disable ? "开启" : "禁用";
            }
          }
          this.authorityData = data.data;
        }
      });
    }
  }
};
</script>

<style>
</style>