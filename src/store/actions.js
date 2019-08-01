import Constant from './Constant'
import axios from 'axios'
import store from '../store/store'
import router from '../router/router'

axios.interceptors.request.use(function (config) {
    store.commit(Constant.CHANGE_ISLOADING, { isloading : true });
    config.headers.Authorization = store.state.jwt;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    store.commit(Constant.CHANGE_ISLOADING, { isloading : false });
    console.log('response' + response.statusText);

    return response;
}, function (error) {
    store.commit(Constant.CHANGE_ISLOADING, { isloading : false });

    switch (error.response.data.message) {
        case 'expiredToken' :
            alert('로그인이 만료되었습니다.');
            axios.defaults.headers.common['Authorization'] = undefined;
            store.commit(Constant.LOGOUT);
            router.push('/login');
            break;

        case 'nullToken' :
            alert('token is null');
            axios.defaults.headers.common['Authorization'] = undefined;
            store.commit(Constant.LOGOUT);
            router.push('/login');
            break;

        case 'unAuthorizedToken' :
            alert('token is unAuthorized');
            axios.defaults.headers.common['Authorization'] = undefined;
            store.commit(Constant.LOGOUT);
            router.push('/login');
            break;
    }
    return Promise.reject(error);
});

export default {
    [Constant.LOGIN_GOOGLE]: (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/login/google', payload)
                .then(response => {
                    store.commit(Constant.ADD_JWT, response.data);
                    axios.defaults.headers.common['Authorization'] = response.data;
                    store.dispatch(Constant.ADD_USERNAME_AND_ROLE_AND_ID)
                        .then(()=> {
                            resolve();
                        })
                        .catch(ex=> {
                            reject(ex);
                        })
                })
                .catch(ex => {
                    reject(ex);
                })
        })

    },

    [Constant.ADD_USERNAME_AND_ROLE_AND_ID] : (store) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/members/')
                .then(response => {
                    console.log(response);
                    store.commit(Constant.ADD_USERNAME_AND_ROLE_AND_ID, response.data);
                    resolve();
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.LOGOUT] : (store) => {
        return new Promise((resolve) => {
            axios.defaults.headers.common['Authorization'] = undefined;
            store.commit(Constant.LOGOUT);
            resolve();
        })
    },

    [Constant.REGISTER] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/members/register', payload)
                .then(response => {
                    resolve(response.status);
                })
                .catch(ex => {
                    reject(ex);
                })
        });

    },

    [Constant.LOGIN] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/members/login', payload)
                .then(jwt => {
                    store.commit(Constant.ADD_JWT, jwt.data);
                    store.dispatch(Constant.ADD_USERNAME_AND_ROLE_AND_ID)
                        .then(()=> {
                            resolve();
                        })
                        .catch(ex=> {
                            reject(ex);
                        })
                })
                .catch(ex => {
                    reject(ex);
                })
        });
    },

    [Constant.GET_CATEGORIES] : () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/categories')
                .then(response => {
                    resolve(response);
                })
                .catch(ex=> {
                    reject(ex);
                })
        })
    },

    [Constant.GET_CATEGORY_ITEMS] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/items/category/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex=> {
                    reject(ex);
                })
        })
    },

    [Constant.GET_AUTOCOMPLETE] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/items/autocomplete', {
                params : payload
            })
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.START_SEARCH] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/items/' + payload.userQuery + '/search/' + payload.searchOption, {
                params : { page : payload.page, size : payload.size }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_ITEM_DETAIL] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/items/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.ADD_CART] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/carts', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.DELETE_CART] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/carts/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.UPDATE_CART] : (store, payload) => {
        return new Promise((resolve, reject) => {
            const data = { count : payload.count };
            axios.put('/api/carts/' + payload.id, data)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_CART_LIST] : () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/carts')
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_ORDER_LIST] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/carts/list', {
                params : {
                    id : encodeURI(payload)
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.START_ORDER] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/orders', payload)
                .then(response => {
                    store.commit(Constant.ADD_ORDER_ID, response.data);
                    store.commit(Constant.ORDER_SUCCESS);
                    resolve();
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_USER_INFO] : () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/members/')
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_COMPLETE_ORDER_LIST] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/orders', {
                params : payload
            })
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.GET_ORDER_DETAIL] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.get('/api/orders/' + payload)
                .then(response => {
                    store.commit(Constant.ADD_ORDER_DETAIL, response.data.order);
                    store.commit(Constant.ADD_MEMBER, response.data.member);
                    resolve();
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.ADD_REVIEW] : (store, payload) => {
        return new Promise((resolve, reject) => {

            axios.post('/api/reviews', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    },

    [Constant.DELETE_REVIEW] : (store, payload) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/reviews/' + payload)
                .then(response => {
                    resolve(response);
                })
                .catch(ex => {
                    reject(ex);
                })
        })
    }
}