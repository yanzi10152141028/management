<template>
  <div class="nav_menu">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      mode="vertical"
      theme="dark"
    >
      <template  v-for="(v,key) in menuList" >
        <el-submenu  :index="v.authority.id" :key="key" v-if="v.subList.length>0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{v.authority.name}}</span>
          </template>
           <el-menu-item :index="second.authority.id" v-for="(second,keyTwo) in v.subList" :key="keyTwo" @click="openTab(second.authority.attributeMap.route,second.authority.parentId,second.authority.name)" >{{second.authority.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item  :index="v.authority.id" v-else :key="key" @click="openTab(v.authority.attributeMap.route,v.authority.parentId,v.authority.name)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{v.authority.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../../assets/js/eventBus.js'
export default {
  data() {
    return {
      menuList:[]
    };
  },
  created(){
     this.getMenus();
  },
  methods: {
    getMenus(){
      this.$http.get(this.$url.Menus).then((res) => {
             var data = res.data;
           if(data.success){
              var result = data.data;
              this.menuList = data.data;
           }
      })
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {},
    //打开tab
    openTab(url,parentId,name){
      var data ={
        "url":url,
        "parentId":parentId,
        "name":name
      };
      bus.$emit('menuData',data);
    }
  }
};
</script>

<style>
</style>