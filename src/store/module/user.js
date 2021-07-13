import { HTTP } from "../../API/http_common";
const state = {
    users: [],
    acc_present: {},
    spinner: false,
    is_login: false,
}
const getters = {
    loading: state => state.spinner
}
const actions = {
    async loadUsers({ commit }) {
        await HTTP.get(`users`)
            .then((res) => { commit('SET_MANAGERS', res.data) });
    },
}
const mutations = {
    SET_MANAGERS(state, users) {
        state.users = users
        state.is_login = false
    },
    LOADING(state, status) {
        state.users = status
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
