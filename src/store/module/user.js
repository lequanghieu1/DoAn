const state = {
    users: {},
    acc_present: {},
    spinner: false,
    is_login: false,
    addEdit: null,
    listKH:[]

}
const getters = {
    loading: state => state.spinner
}
const actions = {
    loadUsers({ commit }, data) {
        commit('SET_MANAGERS', data);
    },
    setActions({ commit }, data) {
        commit('SET_ACTIONS', data);
    },
    setCus({ commit }, data) {
        commit('SET_CUS', data);
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
    SET_ACTIONS(state, action) {
        state.addEdit = action
    },
    SET_CUS(state, cus) {
        state.listKH = cus
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
