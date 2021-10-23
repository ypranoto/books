// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from '@/plugins/vuex-pathify'
import createPersistedState from 'vuex-persistedstate'
import secureLS from 'secure-ls'

// Modules
import * as modules from './modules'

// eslint-disable-next-line new-cap
var ls = new secureLS({
  encodingType: 'aes',
  encryptionSecret: '^77asj12@skdjasda',
})
Vue.use(Vuex)
const store = new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
  ],
  state: {
    authentication: null,
    Authorization: false,
    users: {},

  },

  mutations: {
    authentication (state, val) {
      state.authentication = val
    },
    Authorization (state, val) {
      state.Authorization = val
    },
    users (state, val) {
      state.users = val
    },
  },
    // eslint-disable-next-line no-dupe-keys
    plugins: [
      createPersistedState({
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
      }),
    ],
  })
store.subscribe(mutation => {
  if (!mutation.type.startsWith('user/')) return

  store.dispatch('user/update', mutation)
})

store.dispatch('app/init')

export default store

export const ROOT_DISPATCH = Object.freeze({ root: true })
