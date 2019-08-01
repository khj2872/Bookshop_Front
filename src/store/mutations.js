import Constant from './Constant'

export default {
    [Constant.CHANGE_ISLOADING] : (state, payload) => {
        state.isloading = payload.isloading;
    },

    [Constant.ADD_JWT] : (state, payload) => {
        state.jwt = payload;
    },

    [Constant.ADD_USERNAME_AND_ROLE_AND_ID] : (state, payload) => {
        state.username = payload.username;
        state.loggedIn = true;
        state.role = payload.role;
        state.id = payload.id;
    },

    [Constant.LOGOUT] : (state) => {
        state.username = null;
        state.role = null;
        state.jwt = null;
        state.loggedIn = false;
    },

    [Constant.CART_ORDER_STEP_ONE] : (state, payload) => {
        state.orderListId = [];
        state.orderListId = payload;
    },

    [Constant.DIRECT_ORDER_STEP_ONE] : (state, payload) => {
        state.orderListId = [];
        state.orderListId.push(payload);
    },

    [Constant.USER_QUERY] : (state, payload) => {

        state.userQuery = payload;
    },

    [Constant.ADD_ORDER_ID] : (state, payload) => {
        state.orderId = payload;
    },

    [Constant.ORDER_SUCCESS] : (state) => {
        state.orderResult = true;
    },

    [Constant.RESET_ORDER_ID] : (state) => {
        state.orderId = null;
    },

    [Constant.RESET_ORDER_RESULT] : (state) => {
        state.orderResult = false;
    },

    [Constant.ADD_ORDER_DETAIL] : (state, payload) => {
        state.orderDetail = payload;
    },

    [Constant.ADD_MEMBER] : (state, payload) => {
        state.member = payload;
    }
}