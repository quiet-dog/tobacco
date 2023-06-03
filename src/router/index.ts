import Login from "@/views/login/index.vue";
import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Login,
        redirect: '/login',
        children: [],
        meta: { title: '登陆' }
    }, {
        path: '/login',
        component: Login,
        meta: { title: '登陆' }
    }, {
        path: '/home',
        component: () => import('@/layouts/layout.vue'),
        children: [
            {
                path: 'case',
                component: () => import('@/views/case/index.vue'),
                redirect: "/home/case/identification",
                name: "case",
                children: [
                    {
                        path: 'identification',
                        component: () => import('@/views/case-identification/index.vue'),
                    },
                    {
                        path: 'enter',
                        component: () => import('@/views/case-enter/index.vue')
                    },
                    {
                        path: 'archive',
                        component: () => import('@/views/case-archive/index.vue')
                    },
                    {
                        path: 'int',
                        component: () => import('@/views/case-int/index.vue')
                    },
                    {
                        path: 'overdue',
                        component: () => import('@/views/case-overdue/index.vue')
                    },
                    {
                        path: 'expires',
                        component: () => import('@/views/case-expires/index.vue')
                    }
                ],
                meta: { title: '案件中心' }
            },
            {
                path: 'screen',
                component: () => import('@/views/screen/index.vue'),
                name: 'screen',
                meta: { title: '数据大屏' }
            },
            {
                path: 'user',
                component: () => import('@/views/user/index.vue'),
                name: "user",
                meta: { title: '用户管理' }
            },
            {
                path: 'tobacco',
                component: () => import('@/views/tobacco/index.vue'),
                name: 'tobacco',
                meta: { title: '烟草管理' }
            },
            {
                path: 'warehouse',
                component: () => import('@/views/warehouse/index.vue'),
                name: 'warehouse',
                meta: { title: '库区管理' }
            },
            {
                path: 'create',
                component: () => import('@/views/case-create/index.vue'),
                meta: { title: '案件创建' },
                name: 'create'
            },
            {
                path: '/archive',
                component: () => import('@/views/archive/index.vue'),
                name: 'archive',
            },
            {
                path: '/area',
                component: () => import('@/views/area/index.vue'),
                name: 'area',
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router;