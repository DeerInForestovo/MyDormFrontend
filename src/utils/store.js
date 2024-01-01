import {createStore} from "vuex";
import Cookies from 'js-cookie';
import {ElNotification} from "element-plus";
import api from "@/utils/api";
import {toRaw} from "@vue/reactivity";

const username_cookie_name = 'MyDorm_username'
const token_cookie_name = 'MyDorm_token'

let store = createStore({
    state() {
        return {
            // login info
            username: null,
            token: null,

            // user basic info
            name: null,
            profilePhotoUrl: null,

            // zone info
            zoneId: null,
            zoneName: null,

            stars: [],

        }
    },
    mutations: {
        setUserLoginInfo(state, data) {
            state.username = data.username
            state.token = data.token
            // Set username and token to cookie
            Cookies.set(username_cookie_name, data.username, {expires: 1, secure: true})
            Cookies.set(token_cookie_name, data.token, {expires: 1, secure: true})
        },

        setProfileInfo(state, data) {
            state.name = data.name
            state.profilePhotoUrl = data.profilePhotoUrl
            state.zoneId = data.zoneId
            console.log(state.name);
            console.log(data.stars)
            state.stars = Array.from(data.stars);
            console.log(state.stars)
        },

        logout(state) {
            state.username = null
            state.token = null
            Cookies.set(username_cookie_name, '', {expires: 1, secure: true})
            Cookies.set(token_cookie_name, '', {expires: 1, secure: true})
        },

        starRoom(state, room) {
            console.log(state.stars);
            console.log(room);
            state.stars.push(toRaw(room));
            console.log(state.stars)
        },

        removeStarRoom(state, roomId){
            state.stars = state.stars.filter(item => item.roomId !== roomId); //
        }
    }
})

// Get username and token from Cookies
let username = store.state.username
let token = store.state.token
if (username && token) {
    api.methods.newToken(username, token)
        .then(response => {
            ElNotification({
                type: "success",
                message: "Welcome back, " + username
            })
            store.state.username = response.data.username
            store.state.token = response.data.token
        })
        .catch(response => {
            ElNotification({
                type: "info",
                message: "Please login first (" + username + "'s token expires)"
            })
            store.state.username = null
            store.state.token = null
        })
} else {
    ElNotification({
        type: "info",
        message: "Please login first"
    })
}

export default store
