const state = {
  local: {
    admin: {},
  },
};

const getters = {
  local: (state) => state.local,
};

const actions = {
  async UpdateLocalStore({ commit }, options) {
    state.local[options.namespace] = state.local[options.namespace] || {};
    state.local[options.namespace][options.key] = options.data;
    commit("setLocalStore", state.local);
  },
};

const mutations = {
  setLocalStore(state, local) {
    for (var namespace in local) {
      state.local[namespace] = Object.assign(
        {},
        state.local[namespace],
        local[namespace]
      );
    }
  },
};

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
