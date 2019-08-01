import Vue from 'vue';
import Router from 'vue-router';
import home from '../views/member/Home'
import login from '../views/member/Login';
import category from '../views/item/Category';
import store from '../store/store';
import myPage from '../views/member/MyPage';
import signUp from '../views/member/SignUp';
import itemDetail from '../views/item/ItemDetail';
import cartList from '../views/cart/CartList';
import order from '../views/order/Order';
import search from '../views/item/Search';
import orderSuccess from '../views/order/OrderSuccess';
import orderDetail from '../views/member/OrderDetail'
import agreement from '../views/member/Agreement'

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    if(store.getters.getLoggedIn) return next();
    alert('로그인 필요');
    next('/login');
};


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: agreement
        },
        {
            path: '/category/:cid',
            name: 'category',
            component: category
        },
        {
            path: '/myPage',
            name: 'myPage',
            component: myPage,
            beforeEnter: requireAuth()
        },
        {
            path: '/myPage/orderDetail',
            name: 'orderDetail',
            component: orderDetail,
            beforeEnter: requireAuth()
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: signUp
        },
        {
            path: '/itemDetail/:itemid',
            name: 'itemDetail',
            component: itemDetail
        },
        {
            path: '/cartList',
            name: 'cartList',
            component: cartList,
            beforeEnter: requireAuth()
        },
        {
            path: '/order',
            name: 'order',
            component: order,
            beforeEnter: requireAuth()
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/orderSuccess',
            name: 'orderSuccess',
            component: orderSuccess,
            beforeEnter: requireAuth()
        }
    ],
    scrollBehavior : (to, from, savedPosition) => {
        return { x: 0, y: 0 }
    }
});