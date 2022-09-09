import { createStore, mapActions } from 'vuex'
import router from "../router/index";

const state = {};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
};

const actions = {
  redirectTo({ commit }, payload) {
    commit('redirectTo', payload.val);
  }
};

export default createStore({
  state: {
    auth: false
  },
  getters,
  mutations: {
    doLogin(state) {
      state.auth = true;
    },
    doLogout(state) {
      state.auth = false;
    }
  },
  actions: {
    doLogin({ commit }) {
      commit("doLogin");
    },
    doLogout({ commit }) {
      commit("doLogout");
    }
  },
  modules: {
  }
})
