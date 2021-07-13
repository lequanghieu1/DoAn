
const state = {
    delay: false
}
const getters = {
    delayvali: state => state.delay
}
const actions = {
    startVali({ commit }) {
        commit('VALI')
    },
    endVali({ commit }) {
        commit('END')
    },
}
const mutations = {
    VALI(state) {
        state.delay = true
        setTimeout(() => {
            state.delay = false
        }, 1500)
    },
    END(state) {
        state.delay = true
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
