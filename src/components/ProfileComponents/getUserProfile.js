import axiosFunctions from "@/utils/api";
import {ElNotification} from "element-plus";

export default (username, callback, error_callback) => {
    axiosFunctions.methods.getProfile(username)
        .then(response => {
            if (response.data.username !== username) {
                console.log(response)
                ElNotification({
                    title: 'Failed',
                    message: 'Failed to get user info (response = ' + response.data.username + ', this = ' + username + ').',
                    type: 'error',
                })
            } else callback(response.data)
        }).catch(response => {
        ElNotification({
            title: 'Failed',
            message: 'Failed to get user info. Does it exits?',
            type: 'error',
        })
        error_callback(response)
    })
}