import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// 使用vuex
Vue.use(Vuex);

const state={
    username:'',
    cartCount:0
}

// 创建Vuex实例
export default new Vuex.Store({
    state,
    actions,
    mutations
})