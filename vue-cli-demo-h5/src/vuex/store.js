import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as config from '../common/js/config'
import * as constants from './constants'


Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 0,
    config: config,
    constants: constants,
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
})