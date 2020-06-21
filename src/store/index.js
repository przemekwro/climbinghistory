import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        historyClimbing: []
    },
    mutations: {
        setHistoryClimbing(state,history){
            state.historyClimbing = history
        }
    },
    getters:{
        getHistoryClimbing(state){
            return state.historyClimbing
        }
    },
    actions: {},
    modules: {}
})
