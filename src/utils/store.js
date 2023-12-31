import {createStore} from "vuex";

export default new createStore({
    state() {
        return {
            // user info
            username: null,
            token: null,
            name: null,
        }
    },
    mutations: {
        setUserLoginInfo(state, data) {
            state.username = data.username
            state.token = data.token
        },

        setProfileInfo(state, name) {
            state.name = name
        }
    }
})
