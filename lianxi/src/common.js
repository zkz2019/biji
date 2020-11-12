import Storages from "./utils/Storage.js"; //缓存工具


function onEjectChange(list, key) {
    //将用户隐藏表格的信息存到localStorage
    let arr = list.map(o => o.show);
    Storages.setlocalStorage(key + ".eject", arr);
}

function getEject($this, list, key) {
    //从localStorage获取用户隐藏表格的信息
    let arr = Storages.getlocalStorage(key + ".eject") || [];
    let lists = [];
    $this[list].forEach((value, key) => {
        let obj = Object.assign({}, value);
        if (typeof arr[key] == "undefined" || obj.noStore) {
            obj.show = obj.show;
        } else {
            obj.show = arr[key];
        }
        lists.push(obj);
    });
    $this[list] = lists;
}

export default {
    onEjectChange,
    getEject,
}