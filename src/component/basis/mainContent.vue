<template>
  <div class="main_content">
      <keep-alive include="">
          <component :is="currentTarget"> </component>
      </keep-alive>
      <authority-dialogs></authority-dialogs>
  </div>
</template>

<script>
import bus from '../../assets/js/eventBus.js'
import Home from '../../view/home'
import ManagementList from '../../view/systemSet/managementList'
import ManagementAuthority from '../../view/systemSet/managementAuthority'
import AuthorityDialogs from '../dialogs/authorityDialog'
export default {
components:{Home,ManagementList,ManagementAuthority,AuthorityDialogs},
data(){
    return{
       currentTarget:'Home',
    }
},
created(){
    this.receviesMenuData();
},
methods:{
    receviesMenuData(){
          bus.$on('menuData',data =>{
            this.currentTarget = data.url;
          })
    }
}
}
</script>

<style>

</style>