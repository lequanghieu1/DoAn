import Vue from 'vue'
import Vuex from 'vuex'
import users from './module/user'
import vali from './module/validate'
import food from './module/food'
Vue.use(Vuex)

const storeData = {
   modules: { users, vali,food }
}
const store = new Vuex.Store(storeData)

export default store
