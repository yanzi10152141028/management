import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Login from '@/view/login'
import Home from '@/view/home'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/login' //重定向
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/index',
        name: 'index',
        component: Index,
    }, {
        path: '/home',
        name: 'home',
        component: Home
    }]
})