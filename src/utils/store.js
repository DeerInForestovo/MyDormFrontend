import {createStore} from "vuex";
import Cookies from 'js-cookie';

let store = createStore({
    state() {
        return {
            // login info
            username: null,
            token: null,

            // user basic info
            name: null,
            profilePhotoUrl: null,
        }
    },
    mutations: {
        setUserLoginInfo(state, data) {
            state.username = data.username
            state.token = data.token
            // Set username and token to cookie
            Cookies.set('username', data.username, {expires: 1, secure: true})
            Cookies.set('token', data.token, {expires: 1, secure: true})
        },

        setProfileInfo(state, data) {
            state.name = data.name
            state.profilePhotoUrl = data.profilePhotoUrl
        }
    }
})

// Get username and token from cookie
store.state.username = Cookies.get('username')
store.state.token = Cookies.get('token')

export default store
