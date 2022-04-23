import { HTTP } from "../../API/http_common";
const state = {
    foods: [],
    Quanty: 0,
    oldQuan: 0,
    bill: [],
    status: [{ value: 0, text: 'Chờ xác nhận', color: 'warning' }, { value: 1, text: 'Đã xác nhận', color: 'info' }, { value: 2, text: 'Xuất kho', color: 'primary' }, { value: 3, text: 'Đã giao', color: 'success' }, { value: 4, text: 'Đã hủy', color: 'danger' }]

}
const getters = {
    loading: state => state.foods
}
const actions = {
    async listFood({ commit }, data) {
        await HTTP.get(`/sanpham/danhmuc/${data}`)
            .then((res) => { commit('SET_FOODS', res.data) });
    },
    async getfood({ commit }) {
        await HTTP.get(`/sanpham`).then((res) => {
            commit('SET_FOODS', res.data)
        }
        );
    },
    async searchfood({ commit }, data) {
        HTTP.post(`/food/search`, { foodName: data }).then((res) => {
            commit('SET_FOODS', res.data.data.slice(0, 12))
        });
    },
    async getNumQuan({ commit }, makh) {
        await HTTP.get(`/numcart/${makh}`).then((res) => {
            commit('SET_NUM', res.data)
        }).catch(() => { commit('SET_NUM', 0) });
    },
    async listBills({ commit }, makh) {
        await HTTP.get(`/donhang/${makh}`)
            .then((res) => { commit('SET_BILLS', res.data) });
    },
    deleteBills({ commit }, data) {
        HTTP.delete(`/giohang/${data.makh}/${data.foodId}`).then(() => {
            commit()
        });
    },
}
const mutations = {
    SET_FOODS(state, foods) {
        state.foods = foods
    },
    SET_NUM(state, num) {
        state.Quanty = num
        state.oldQuan = num
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
