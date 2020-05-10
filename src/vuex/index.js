import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import getters from './getter.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user
    },
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage

    })]
})
export default store;