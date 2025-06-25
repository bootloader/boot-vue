import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import storage from "local-storage-fallback";

import apiStore from "./modules/apiStore";
import localStore from "./modules/localStore";

const store = createStore({
  modules: {
    apiStore,
    localStore,
  },
  plugins: [
    createPersistedState({
      paths: ["localStore"],
      storage: {
        getItem: (key) => storage.getItem(key),
        setItem: (key, value) => storage.setItem(key, value),
        removeItem: (key) => storage.removeItem(key),
      },
    }),
  ],
});

export default store;

/*

using composition API
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const store = useStore()

    const data = computed(() => store.getters['apiStore/getData'])
    const loading = computed(() => store.getters['apiStore/isLoading'])

    const loadData = () => {
      store.dispatch('apiStore/fetchData', () => axios.get('/api/user'))
    }

    return {
      data,
      loading,
      loadData,
    }
  },
}

using options API
computed: {
  data() {
    return this.$store.getters['apiStore/getData']
  },
  loading() {
    return this.$store.getters['apiStore/isLoading']
  }
},
methods: {
  loadData() {
    this.$store.dispatch('apiStore/fetchData', () => axios.get('/api/user'))
  }
}

Your customStore.js should:
Use namespaced: true
*/
