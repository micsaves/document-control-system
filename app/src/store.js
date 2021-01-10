import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: 'a',
    selectedRule: '',
    token: localStorage.getItem('token') || '',
  },
  plugins: [
    createPersistedState()
  ],
  mutations: {
    ADD_INFO: (state, data) => {
      state.userInfo = data
    },
    CHANGE_ITEM: (state, data) => {
      state.selectedRule = data
    },
    AUTH_SUCCESS: (state, data) => {
      state.token = data
      // state.user = Object.assign({}, state.user, payload.user)
    },
  },
  actions: {

  }
})
