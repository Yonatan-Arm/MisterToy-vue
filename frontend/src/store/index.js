import { createStore } from 'vuex'
import toyStore from './modules/toy-module.js'
import userStore from './modules/user-module.js'
import reviewStore from './modules/review-store.js'


const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        toyStore,
        userStore,
        reviewStore
    },
})

export default store