import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
Vue.use(VueRouter)

import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import List from './views/List.vue'
import CheckList from './views/CheckList.vue'
import Detail from './views/Detail.vue'
import SportType from './views/SportType.vue'
import demo from './views/demo.vue'
import form from './views/form.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        redirect: "/demo",
        component: Home,
        name: 'Home',
        children: [{
                path: '/demo',
                component: demo,
                name: "测试例子"
            },
            {
                path: '/Main',
                component: Main,
                name: "测试例子"
            },
            {
                path: '/List',
                component: List,
                name: "测试例子"
            },
            {
                path: '/CheckList',
                component: CheckList,
                name: "CheckList"
            },
            {
                path: '/Detail/:Id',
                component: Detail,
                name: "Detail"
            }

        ],
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/main' }
    }
];

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // if (to.path == '/login') {
    //     sessionStorage.removeItem('user');
    // }
    // let user = JSON.parse(sessionStorage.getItem('user'));
    // if (!user && to.path != '/login') {
    //     next({ path: '/login' })
    // } else {
    var test = store;
    next()
        // }
})

export default router;