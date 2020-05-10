<template>
  <el-container>
    <el-aside width="200px">
      <aside-menu></aside-menu>
    </el-aside>
    <el-container>
      <el-header>
        <top-content></top-content>
      </el-header>
      <el-main>
        <main-content></main-content>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

import topContent from "../component/basis/topContent"
import asideMenu from "../component/basis/asideMenu";
import mainContent from "../component/basis/mainContent"
export default {
  components: { topContent, asideMenu,mainContent},
  created(){
  }
}
</script>

<style>
</style>