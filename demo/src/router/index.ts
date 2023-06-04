import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/login', 
        name: 'login',
        component: () => import('../views/home/login.vue')
    },
    {
        path: '/register', 
        name: 'register',
        component: () => import('../views/home/register.vue')
    },
    {
        path: '/',
        name: 'home',
        component:() =>import('../views/home/index.vue'),
        children:[
            {
                path: '/findmusic',
                name: 'findmusic',
                component:() =>import('../views/home/findmusic.vue')
            },
            {
                path: '/localmusic',
                name: 'localmusic',
                component:() =>import('../views/home/localmusic.vue')
            },
            {
                path: '/interest',
                name: 'interest',
                component:() =>import('../views/home/interest.vue')
            },
            {
                path: '/favor',
                name: 'favor',
                component:() =>import('../views/mysong/favor.vue')
            },
            {
                path: '/recom',
                name: 'recom',
                component:() =>import('../views/home/recom.vue')
            },
            {
                path: '/collect',
                name: 'collect',
                component:() =>import('../views/mysong/collect.vue')
            },
            {
                path: '/download',
                name: 'download',
                component:() =>import('../views/mysong/download.vue')
            },
            {
                path: '/recplay',
                name: 'recplay',
                component:() =>import('../views/mysong/recplay.vue')
            },
            {
                path: '/listsong',
                name: 'listsong',
                component:() =>import('../views/table/listsong.vue')
            },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
export default router