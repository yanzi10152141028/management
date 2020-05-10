// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
/** css  */
import 'element-ui/lib/theme-chalk/index.css'
import './assets/sass/common.scss'

// js
import store from './vuex/index.js'
import apiConfig from './api/config.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios;
Vue.prototype.$url = apiConfig;


//请求拦截
axios.interceptors.request.use(function(config) {
        var params = {
            'token': store.getters.token,
            'uid': store.getters.uid
        };
        Object.assign(params, config.params || {});
        config.params = params
        return config;
    })
    //全局响应拦截,token失效，跳到登录
axios.interceptors.response.use(function(response) {
    var data = response.data;
    if (data.code == -1) {
        window.vm.$store.dispatch("token", "");
        window.vm.$router.push('/login')
    }
    return response;
})

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})