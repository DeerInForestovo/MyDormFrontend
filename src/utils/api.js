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

        // Team
        createTeam() {
            return axios.post(base_api + '/api/team', this.defaultConfig(token))
        },
        sendInvitation(username, toUsername, code) {
            return axios.post(base_api + '/api/team/invitation', {
                username: username,
                toUsername: toUsername,
                code: code,
            }, this.defaultConfig(token))
        },
        acceptApplication(username, applicationId) {
            return axios.post(base_api + '/api/team/application/accept', {
                username: username,
                applicationId: applicationId,
            }, this.defaultConfig(token))
        },
        denyApplication(username, applicationId) {
            return axios.post(base_api + '/api/team/application/deny', {
                username: username,
                applicationId: applicationId,
            }, this.defaultConfig(token))
        },
        kickMember(username, code, kickedUsername) {
            return axios.post(base_api + '/api/team/kick', {
                username: username,
                code: code,
                kickedUsername: kickedUsername,
            }, this.defaultConfig(token))
        },
        sendTeamApplication(username, code) {
            return axios.post(base_api + '/api/team/application', {
                username: username,
                code: code,
            }, this.defaultConfig(token))
        },
        getTeamInfo() {
            return axios.get(base_api + '/api/team', this.defaultConfig(token))
        },
        denyInvitation(username, invitationId) {
            return axios.post(base_api + '/api/team/invitation/deny', {
                username: username,
                invitationId: invitationId,
            }, this.defaultConfig(token))
        },
        getTeamInvitation() {
            return axios.get(base_api + '/api/team/invitation', this.defaultConfig(token))
        },
        acceptInvitation(username, invitationId) {
            return axios.post(base_api + '/api/team/invitation/accept', {
                username: username,
                invitationId: invitationId,
            }, this.defaultConfig(token))
        },
        leaveTeam() {
            return axios.post(base_api + '/api/team/leave', this.defaultConfig(token))
        },


        // Manage
        createUser(username, password) {
            return axios.post(base_api + '/api/manage/user', {
                username: username,
                password: password
            })
        },

        // Room-Comment
        postComment(username, comment){
            return axios.post(base_api + '/api/comment', {
                roomId : comment.roomId,
                username: username,
                content: comment.content,
                replyToCommentId: comment.replyToCommentId,
                replyToUsername: comment.replyToUsername
            }, this.defaultConfig(token))
        },
        getRoomInfo(roomId){
            return axios.get(base_api + '/api/room/'+roomId, this.defaultConfig(token))
        },
        deleteComment(username, commentId){
            return axios.delete(base_api + '/api/comment', {
                username: username,
                commentId: commentId
            })
        }
    }
}
