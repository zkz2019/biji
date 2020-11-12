import Storages from "../../utils/Storage.js"; //缓存工具
import {
    ajax
} from '@/request/http.js'
const openTab = {
    state: {
        menuChilds: Storages.getStorage("navigation-childs") || {},
        menuData: Storages.getStorage("navigation-data") || [],
        menuObj: Storages.getStorage("navigation-obj") || {},
        openTab: Storages.getStorage("openTab") || [{
            index: "index",
            icon: "image302",
            name: "首页",
            alias: "首页",
            id: 302
        }], //所有打开的路由
        keepAlive: ["index"],
        tabvalue: 'index', //激活状态
    },
    mutations: {
        setMenuData(state, data) {
            let objData = {};
            let arrs = data.filter(item => {
                let bol = true;
                if (item.entity) {
                    let id = item.entity.value;
                    if (id == "sy302") {
                        bol = false;
                    } else {
                        bol = item.entity.isnext == "1" ? false : true;
                        if (item.childs) {
                            item.childs = item.childs.filter(val => {
                                let bols = val.entity.isnext == "1" ? false : true;
                                val.entity.parent = id;
                                if (val.childs) {
                                    if (val.childs.length > 0) {
                                        state.menuChilds[val.entity.value] = val.childs;
                                        bols = true;
                                    }
                                }
                                if (bols) {
                                    objData[val.entity.value] = val.entity;
                                }
                                return bols
                            });
                            if (item.childs.length > 0) {
                                bol = true;
                            }
                        }
                    }
                    if (bol) {
                        objData[id] = item.entity;
                    }
                }
                return bol
            });
            state.menuData = arrs;
            Storages.setStorage("navigation-data", state.menuData);
            state.menuObj = objData;
            Storages.setStorage("navigation-obj", state.menuObj);
            Storages.setStorage("navigation-childs", state.menuChilds);
        },
        clearMenuData(state) {
            state.menuData = [];
            state.menuObj = {};
            state.menuChilds = {};
            Storages.clearStorage("navigation-data");
            Storages.clearStorage("navigation-obj");
            Storages.clearStorage("navigation-childs");
        },
        // 添加tabs           路由
        add_tabs(state, data) {
            let index = true;
            for (let option of state.openTab) {
                if (option.index === data.index) {
                    index = false;
                    break;
                }
            }
            if (index) {
                state.openTab.push(data);
                Storages.setStorage("openTab", state.openTab);
            }
        },
        // 删除tabs            路由
        delete_tabs(state, id) {
            let length = state.openTab.length;
            if (id == "index") {
                return false;
            }
            if (length > 1) {
                let index = 0;
                for (; index < length; index++) {
                    if (state.openTab[index].index === id) {
                        break;
                    }
                }
                if (index < length) {
                    if (id == state.tabvalue) {
                        let obj = state.openTab[index + 1] || state.openTab[index - 1];
                        state.tabvalue = obj.index;
                    }
                    let open = state.openTab.splice(index, 1);
                    if (open && open[0].index) {
                        let ik = state.keepAlive.indexOf(open[0].index);
                        if (ik != -1) {
                            state.keepAlive.splice(ik, 1);
                        }
                    }
                    Storages.setStorage("openTab", state.openTab);
                }
            }
        },

        // 删除tabs            路由
        delete_key(state, obj) {
            let id = obj.id;
            let key = obj.key;
            let index = 0;
            let length = state.openTab.length;
            if (key == "0") {
                state.openTab = [{
                    index: "index",
                    icon: "image302",
                    alias: "首页",
                    name: "首页",
                    id: 302
                }];
                state.keepAlive = ["index"];
                state.tabvalue = "index";
            } else if (key == 7) {
                for (; index < length; index++) {
                    if (state.openTab[index].index === id) {
                        break;
                    }
                }
                let obj = state.openTab[index];
                if (obj.index != "index") {
                    state.openTab = [{
                        index: "index",
                        icon: "image302",
                        alias: "首页",
                        name: "首页",
                        id: 302
                    }, obj];
                    state.keepAlive = ["index", obj.index];
                } else {
                    state.openTab = [{
                        index: "index",
                        icon: "image302",
                        alias: "首页",
                        name: "首页",
                        id: 302
                    }];
                    state.keepAlive = ["index"];
                }
                state.tabvalue = obj.index;
            } else if (key == 5) {
                let is = false;
                for (; index < length; index++) {
                    if (state.openTab[index].index === state.tabvalue) {
                        is = true;
                    }
                    if (state.openTab[index].index === id) {
                        break;
                    }
                }
                if (index > 1) {
                    if (is) {
                        state.tabvalue = state.openTab[index].index;
                    }
                    state.openTab.splice(1, index - 1);
                    state.keepAlive = state.openTab.map(o => o.index);
                }
            } else if (key == 6) {
                let arr = [],
                    ikr = [],
                    is = false;
                for (; index < length; index++) {
                    arr.push(state.openTab[index]);
                    ikr.push(state.openTab[index].index);
                    if (state.openTab[index].index === state.tabvalue) {
                        is = true;
                    }
                    if (state.openTab[index].index === id) {
                        break;
                    }
                }
                if (index != length - 1) {
                    if (!is) {
                        state.tabvalue = state.openTab[index].index;
                    }
                    state.openTab = arr;
                    state.keepAlive = ikr;
                }
            }
            Storages.setStorage("openTab", state.openTab);
        },
        // 设置当前激活的tab     路由 
        set_active_index(state, index) {
            if (!state.keepAlive.includes(index)) {
                state.keepAlive.push(index);
            }
            state.tabvalue = index;
        },
        //清空tab
        condition(state) {
            state.keepAlive = ["index"];
            state.openTab = [{
                index: "index",
                icon: "image302",
                alias: "首页",
                name: "首页",
                id: 302
            }];
            Storages.setStorage("openTab", state.openTab);
            state.tabvalue = 'index';
        },
        addMenuObj(state, obj) {
            if (obj && obj.value) {
                state.menuObj[obj.value] = obj;
                Storages.setStorage("navigation-obj", state.menuObj);
            }
        }
    },
    actions: {
        getmenu({
            state,
            commit,
            dispatch
        }) {
            return new Promise((resolve, reject) => {
                dispatch("againGetInfo").catch(()=>{});
                if (state.menuData && state.menuData.length > 0) {
                    resolve(state.menuChilds)
                } else {
                    ajax("/login/home/1/getmenu", {}, "1").then(res => {
                        commit("setMenuData", res.result);
                        resolve(state.menuChilds);
                    }).catch(err => {
                        reject(err)
                    });

                }
            });
        },
    }
}
export default openTab