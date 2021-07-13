import { HTTP } from "../../API/http_common";
const state = {
    foods: [],
    Quanty: 0,
    bill: []

}
const getters = {
    loading: state => state.foods
}
const actions = {
    async listFood({ commit }, data) {
        await HTTP.get(`/cate/food/${data}/0/12`)
            .then((res) => { commit('SET_FOODS', res.data.data) });
    },
    async getfood({ commit }, data) {
        await HTTP.get(`/food/list/${data}/12`).then((res) => {
            commit('SET_FOODS', res.data.data)
        }
        );
    },
    async getNumQuan({ commit }) {
        await HTTP.get("/order/count/shopping-cart").then((res) => {
            commit('SET_NUM', res.data.data.total)
        });
    },
    async listBills({ commit }) {
        await HTTP.get(`/order/user/list`)
            .then((res) => { commit('SET_BILLS', res.data.data) });
    },
}
const mutations = {
    SET_FOODS(state, foods) {
        state.foods = foods
    },
    SET_NUM(state, num) {
        state.Quanty = num
    },
    SET_BILLS(state, bill) {
        state.bill = bill
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
