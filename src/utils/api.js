import axios from "axios";

const base_api = 'http://10.16.165.147:8081';

let token = '';

export default {
    methods: {
        // Basic
        getBaseApi() {
            return base_api
        },
        setToken(userToken) {
            token = userToken
        },
        defaultConfig(token) {
            return {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
        },
        getResourceByFilename(filename) {
            return this.getBaseApi() + '/resources/' + filename
        },
        uploadResources(type, file) {
            // ref: https://apifox.com/apiskills/axios-upload-file/
            const formData = new FormData()
            formData.append(type, file)
            return axios.post(base_api + '/api/image/upload', formData, this.defaultConfig(token))
        },

        // Login Dialog
        login(username, password) {
            return axios.post(base_api + '/auth', {
                username: username,
                password: password,
            })
        },

        // Me - Profile & Setting
        getProfile(username) {
            return axios.get(base_api + '/api/profile/' + username, this.defaultConfig(token))
        },
        updateUserProfile(isManager, username, formData) {  // update or set
            return axios.post(base_api + (isManager ? '/api/manage/user/profile/' : '/api/profile/') + username, formData, this.defaultConfig(token))
        },
        updateUserProfileImage(username, filename) {
            return axios.post(base_api + '/api/profile/image/' + username, {
                url: filename
            }, this.defaultConfig(token))
        },
        getHobbyIdByName(username, hobbyName) {
            return axios.get(base_api + '/api/hobby/' + hobbyName, this.defaultConfig(token))
        },
        createHobby(username, hobbyName) {
            return axios.post(base_api + '/api/hobby', {
                name: hobbyName
            }, this.defaultConfig(token))
        },
        userAddHobby(username, hobbyItem) {
            let hobbyId = hobbyItem.hobbyId
            return axios.put(base_api + '/api/hobby', {
                username: username,
                hobbyId: hobbyId
            }, this.defaultConfig(token))
        },
        userDeleteHobby(username, hobbyId) {
            return axios.delete(base_api + '/api/hobby',
                {
                    params: {
                        username: username,
                        hobbyId: hobbyId
                    },
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
        },

        // Dorm
        getAllBuildings() {
            return axios.get(base_api + '/api/building', this.defaultConfig(token))
        },

        // Manage
        createUser(username, password) {
            return axios.post(base_api + '/api/manage/user', {
                username: username,
                password: password
            })
        }
    }
}
