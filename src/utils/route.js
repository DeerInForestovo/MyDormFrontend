import Home from "@/components/Home.vue";

import LoginPage from "@/components/LoginPage.vue";

import Profile from "@/components/ProfileComponents/ProfileCard.vue";
import ProfileSetting from "@/components/ProfileComponents/SettingCard.vue";
import ProfileFavorite from "@/components/ProfileComponents/FavoriteCard.vue";

import Team from "@/components/TeamComponents/TeamInfoCard.vue";
import TeamMemberRecommend from "@/components/TeamComponents/TeamMemberRecommendCard.vue";
import TeamNotification from "@/components/TeamComponents/TeamInvitationCard.vue";

import ManageStudents from "@/components/ManageComponents/Accounts.vue";
import ManageOptions from "@/components/ManageComponents/Options.vue";
import ManageZones from "@/components/ManageComponents/Zones.vue";
import ManageDorms from "@/components/ManageComponents/Dorms.vue";

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
        path: '/',
        redirect: '/login',
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
                path: 'team_invitation',
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
                path: 'manage_options',
                component: ManageOptions,
            },
            {
                path: 'manage_zones',
                component: ManageZones,
            },
            {
                path: 'manage_dorms',
                component: ManageDorms,
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
    } else if (  // Are you admin?
        !store.state.isAdmin
        && to.path.startsWith('/home/manage')
    ) {
        return {
            path: '/home'  // Forbidden!
        }
    }
})

export default router
