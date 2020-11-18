//监听是否未操作,十分钟后退出登录
import Storages from "./Storage.js"; //缓存工具
import store from '@/store'; 

function sjjt(that) {  //事件监听
    window.addEventListener("keydown", function (e) {
        times(0, that);
    })

    window.addEventListener("mousedown", function (e) {
        times(0, that);
    })

    window.addEventListener("mousemove", function (e) {
        times(0, that);
    })

    window.addEventListener("mousewheel", function (e) {
        times(0, that);
    })

    // window.addEventListener("click", function (e) {
    //     times(0, that);
    // })

    window.addEventListener("TouchDown", function (e) {
        times(0, that);
        // console.log("触屏事件");
    })
}


var T = null

function times(num, that) {   //判断未操作时间
    if (Storages.getStorage("token")) {
        clearInterval(T)
        T = setInterval(() => {
            num++;
            if (num % 10 == 0) {
                console.log("判断是否十分钟未操作,num==600时退出登录", num);
            }
            if (num >= 600) {
                clearInterval(T);
                console.log("长时间未操作,退出登录")
                store.commit("setCheckVisible", true);
            }
        }, 1000);
    }
}

function clearTimes() {
    clearInterval(T);
}

export default {
    times,
    sjjt,
    clearTimes
}