const user = {
    state: {
        token: '',
        uid: ''
    },
    mutations: {
        TOKEN(state, val) {
            state.token = val;
        },
        UID(state, val) {
            state.uid = val;
        }
    },
    actions: {
        token({ commit }, val) {
            commit('TOKEN', val);
        },
        uid({ commit }, val) {
            commit('UID', val);
        }
    }
}

export default user