import Storages from "../../utils/Storage.js"; //缓存工具
import {
    ajax
} from '@/request/http.js'
const account = {
    state: {
        checkVisible: Boolean(Storages.getStorage("checkVisible")) || false,
        info: {}, //数字字典
        logo: "",
        systemlogo: "",
    },
    mutations: {
        setCheckVisible(state, data) {
            state.checkVisible = data;
            Storages.setStorage("checkVisible", data)
        },
        clearInfo(state) {
            state.info = {};
            state.logo = "";
            state.systemlogo = "";
        },
        setLogo(state, data) {
            state.logo = data;
        },
        setSystemlogo(state, data) {
            state.systemlogo = data;
        }
    },
    actions: {
        setInfo({
            state,
            dispatch
        }, data) {
            state.info = data;
            if (state.info.logo) {
                dispatch("setLogo", {
                    filepath: state.info.logo
                })
            }
            if (state.info.systemlogo) {
                dispatch("setSystemlogo", {
                    filepath: state.info.systemlogo
                })
            }
        },
        setLogo({
            state,
            commit
        }, {
            filepath
        }) {
            ajax("/login/home/9/downlogo", {
                    filepath
                }, "3").then(res => {
                    if (res.size) {
                        state.logo = window.URL.createObjectURL(res);
                    }
                })
                .catch(err => {});
        },
        setSystemlogo({
            state,
            commit
        }, {
            filepath
        }) {
            ajax("/login/home/9/downlogo", {
                    filepath
                }, "3").then(res => {
                    if (res.size) {
                        state.systemlogo = window.URL.createObjectURL(res);
                    }
                })
                .catch(err => {
                    // if (err.size) {
                    //     state.systemlogo = window.URL.createObjectURL(err)
                    // };
                });
        },
        againGetInfo({
            state,
            dispatch
        }) {
            return new Promise((resolve, reject) => {
                ajax("/login/home/a/getlogoininfo", {}, "1").then(res => {
                    let result = res.result;
                    dispatch("setInfo", result);
                    resolve(result);
                }).catch(err => {
                    reject(err)
                });

            });
        },
        clearAccount({
            state,
            commit
        }, vm) {
            ajax("/login/home/7/exit", {}, "3");
            Storages.clearStorage("token");
            Storages.clearStorage("_codewarn");
            Storages.clearStorage("plxfBtn");
            Storages.clearStorage("userinfo");
            commit("setUserinfo", {});
            commit("setCheckVisible", false);
            commit("clearInfo");
            commit("clearMenuData");
            commit("condition");
            console.log("删除了登录信息");
        },
    }
}
export default account