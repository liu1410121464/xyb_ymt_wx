import {
  getToken,
  setToken,
  removeToken,
} from '@/utils/auth'
// import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  info: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
}

const actions = {
  setInfo ({ commit }, data) {
    return new Promise((resolve) => {
      commit('SET_INFO', data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      resolve()
    })
  },
  setToken  ({ commit }, data) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', data)
      setToken(data)
      resolve()
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
