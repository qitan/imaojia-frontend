import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    device: 'desktop',
    menuIndex: ''
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories
    },
    SET_MENU_INDEX: (state, menuIndex) => {
      console.log('mutations设置', menuIndex)
      state.menuIndex = menuIndex
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  getters: {
    categories: state => state.categories,
    menuIndex: state => state.menuIndex,
    device: state => state.device
  },
  actions: {
    SET_CATEGORIES ({ commit }, categories) {
      commit('SET_CATEGORIES', categories)
    },
    SET_MENU_INDEX ({ commit }, menuIndex) {
      console.log('actions设置', menuIndex)
      commit('SET_MENU_INDEX', menuIndex)
    },
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
})
