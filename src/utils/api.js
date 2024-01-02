import axios from "axios";
import store from "./store";

const base_api = 'http://10.16.165.147:8081';

export default {
    methods: {
        // Basic
        getBaseApi() {
            return base_api
        },
        getToken() {
            return store.state.token
        },
        defaultConfig() {
            return {
                headers: {
                    Authorization: 'Bearer ' + this.getToken(),
                }
            }
        },
        getResourceByFilename(filename) {
            return filename ? this.getBaseApi() + '/resources/' + filename : null;
        },
        uploadResources(type, file) {
            // ref: https://apifox.com/apiskills/axios-upload-file/
            const formData = new FormData()
            formData.append(type, file)
            return axios.post(base_api + '/api/image/upload', formData, this.defaultConfig())
        },

        // Login Dialog
        login(username, password) {
            return axios.post(base_api + '/auth', {
                username: username,
                password: password,
            })
        },
        newToken(username, token) {
            return axios.post(base_api + '/auth', {
                username: username,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
        },

        // Me - Profile & Setting
        getProfile(username) {
            return axios.get(base_api + '/api/profile/' + username, this.defaultConfig())
        },
        updateUserProfile(isManager, username, formData) {  // update or set
            console.log(username)
            console.log(formData)
            return isManager ?
                axios.post(base_api + '/api/manage/user/profile/' + username, formData, this.defaultConfig()) :  // set user profile
                axios.patch(base_api + '/api/profile/' + username, formData, this.defaultConfig())
        },
        getHobbyIdByName(username, hobbyName) {
            return axios.get(base_api + '/api/hobby/' + hobbyName, this.defaultConfig())
        },
        createHobby(username, hobbyName) {
            return axios.post(base_api + '/api/hobby', {
                name: hobbyName
            }, this.defaultConfig())
        },
        userAddHobby(username, hobbyItem) {
            let hobbyId = hobbyItem.hobbyId
            return axios.put(base_api + '/api/hobby', {
                username: username,
                hobbyId: hobbyId
            }, this.defaultConfig())
        },
        userDeleteHobby(username, hobbyId) {
            return axios.delete(base_api + '/api/hobby',
                {
                    params: {
                        username: username,
                        hobbyId: hobbyId
                    },
                    headers: {
                        Authorization: 'Bearer ' + this.getToken(),
                    }
                })
        },
        changePassword(formData) {
            return axios.put(base_api + '/auth', formData, this.defaultConfig())
        },

        // Dorm
        getAllBuildings() {
            return axios.get(base_api + '/api/building', this.defaultConfig())
        },
        getRoomFromZone(zoneId) {
            return axios.get(base_api + '/api/room', {
                headers: {
                    Authorization: 'Bearer ' + this.getToken(),
                },
                params: {
                    zoneId: zoneId
                }
            })
        },

        // Team
        createTeam() {
            return axios.post(base_api + '/api/team', {}, this.defaultConfig())
        },
        sendInvitation(username, toUsername, code) {
            return axios.post(base_api + '/api/team/invitation', {
                username: username,
                toUsername: toUsername,
                code: code,
            }, this.defaultConfig())
        },
        acceptApplication(username, applicationId) {
            return axios.post(base_api + '/api/team/application/accept', {
                username: username,
                applicationId: applicationId,
            }, this.defaultConfig())
        },
        denyApplication(username, applicationId) {
            return axios.post(base_api + '/api/team/application/deny', {
                username: username,
                applicationId: applicationId,
            }, this.defaultConfig())
        },
        kickMember(username, code, kickedUsername) {
            return axios.post(base_api + '/api/team/kick', {
                username: username,
                code: code,
                kickedUsername: kickedUsername,
            }, this.defaultConfig())
        },
        sendTeamApplication(username, code) {
            return axios.post(base_api + '/api/team/application', {
                username: username,
                code: code,
            }, this.defaultConfig())
        },
        getTeamInfo() {
            return axios.get(base_api + '/api/team', this.defaultConfig())
        },
        denyInvitation(username, invitationId) {
            return axios.post(base_api + '/api/team/invitation/deny', {
                username: username,
                invitationId: invitationId,
            }, this.defaultConfig())
        },
        getTeamInvitation() {
            return axios.get(base_api + '/api/team/invitation', this.defaultConfig())
        },
        acceptInvitation(username, invitationId) {
            console.log(this.getToken())
            return axios.post(base_api + '/api/team/invitation/accept', {
                username: username,
                invitationId: invitationId,
            }, this.defaultConfig())
        },
        leaveTeam() {
            return axios.post(base_api + '/api/team/leave', {}, this.defaultConfig())
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
            }, this.defaultConfig())
        },
        getRoomInfo(roomId){
            return axios.get(base_api + '/api/room/'+roomId, this.defaultConfig())
        },
        deleteComment(username, commentId){
            return axios.delete(base_api + '/api/comment', {
                params: {
                    username: username,
                    commentId: commentId
                },
                headers: {
                    Authorization: 'Bearer ' + this.getToken(),
                }
            })
        },
        // star
        addStar(username, roomId){
            return axios.post(base_api + '/api/profile/star', {
                username: username,
                roomId: roomId
            }, this.defaultConfig())
        },
        removeStar(username, roomId){
            return axios.delete(base_api + '/api/profile/star', {
                params: {
                    username: username,
                    roomId: roomId
                },
                headers: {
                    Authorization: 'Bearer ' + this.getToken(),
                }
            })
        },

        // Message Part
        getComment(commentId){
            return axios.get(base_api + '/api/comment/'+ commentId, this.defaultConfig());
        },

        getUserNotification(username){
            return axios.get(base_api + '/api/notification/'+ username, this.defaultConfig());
        },

        readComment(commentId){
            return axios.post(base_api + '/api/comment', {
                commentId: commentId,
            }, this.defaultConfig())
        }
    }
}
