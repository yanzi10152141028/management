<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    style="text-align:right;margin:20px 0;"
  ></el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 5
    };
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
};
</script>

<style>
</style>