import Home from "@/components/Home.vue";

import LoginPage from "@/components/LoginPage.vue";

import Profile from "@/components/ProfileComponents/ProfileCard.vue";
import ProfileSetting from "@/components/ProfileComponents/SettingCard.vue";
import ProfileFavorite from "@/components/ProfileComponents/FavoriteCard.vue";

import Team from "@/components/TeamComponents/TeamInfoCard.vue";
import TeamMemberRecommend from "@/components/TeamComponents/TeamMemberRecommendCard.vue";
import TeamNotification from "@/components/TeamComponents/TeamNotificationCard.vue";

import ManageStudents from "@/components/ManageComponents/Accounts.vue";
import ManageDorms from "@/components/ManageComponents/Dorm.vue";
import ManageOptions from "@/components/ManageComponents/Options.vue";

import Message from "@/components/Message.vue";

import Map from "@/components/Map.vue";

import Room from "@/components/RoomComponents/Room.vue";
import Building from "@/components/RoomComponents/Buildings.vue";
import BuildingDetail from "@/components/RoomComponents/BuildingDetail.vue";

import NotFoundPage from "@/components/decorations/NotFoundPage.vue";

import {createRouter, createWebHashHistory} from 'vue-router'
import store from './store'

// build route
const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'profile/:username',
                props: true,
                component: Profile,
            },
            {
                path: 'setting',
                component: ProfileSetting,
            },
            {
                path: 'favorite',
                component: ProfileFavorite,
            },
            {
                path: 'team',
                component: Team,
            },
            {
                path: 'team_notification',
                component: TeamNotification,
            },
            {
                path: 'team_recommend',
                component: TeamMemberRecommend,
            },
            {
                path: 'message',
                component: Message,
            },
            {
                path: 'manage_students',
                component: ManageStudents,
            },
            {
                path: 'manage_dorms',
                component: ManageDorms,
            },
            {
                path: 'manage_options',
                component: ManageOptions,
            },
            {
                path: 'map',
                component: Map,
            },
            {
                path: 'buildings',
                component: Building,
            },
            {
                path: 'building/:buildingId',
                props: true,
                component: BuildingDetail,
            },
            {
                path: 'room/:roomId',
                props: true,
                component: Room,
            }
        ]
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    if (  // Did you log in?
        !store.state.token  // ! LoggedIn
        && to.path !== '/login'  // to != LoginPage
    ) {
        return {
            path: '/login'  // LoginPage
        }
    }
})

export default router
