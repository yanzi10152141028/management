<template>
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<script>
import bus from '../../assets/js/eventBus.js'
export default {
  data() {
    return {
      title:''
      
    };
  },
 mounted(){
   this.getBreadcrumbName();
 },
  methods: {
    getBreadcrumbName(){
      bus.$on('menuData',data =>{
        this.title = data.name;
      })
    }
  }
};
</script>