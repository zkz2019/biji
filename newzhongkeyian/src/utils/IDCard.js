import axios from 'axios';
import {
    Message
} from 'element-ui';
let URL = "http://127.0.0.1:24010";
// if (document && document.location.protocol == "https:") {
//     URL = "https://127.0.0.1:24011"
// }
let isInstall = false;


let tsObj = {
    "0": "成功",
    "1": "连接身份证阅读器失败",
    "2": "数据传输超时",
    "3": "设置超时时间失败",
    "4": "设备忙打开失败",
    "6": "接口地址参数有误",
    "10": "请放置身份证或者重新放置身份证",
    "11": "读身份证失败",
    "20": "自检失败",
    "30": "其他错误",
    "40": "相片解码失败",
    "100": "超时",
    "200": "获取照片Base64失败",
    "201": "操作失败",
    "202": "IC卡参数出错",
    "-1": "获取指纹失败",
    "-100": "ID/IC卡模块加载失败",
    "203": "加载指纹采集库失败",
    "204": "加载指纹的算法库失败",
    "205": "初始化算库失败",
    "206": "初始化采集器失败",
    "207": "找不到二代证采集器",
    "208": "打开采集器失败",
    "209": "采集器采集图像失败",
    "210": "采集模板失败",
    "211": "比对模板无效",
    "212": "传入的JSON格式转换有误",
    "213": "比对失败",
    "214": "采集器采集图像超时",
    "215": "播报的语音类型不支持",
    "216": "设置播报语音失败",
};

// 检查是否安装驱动
function inspect(callback, errCallback) {
    axios.get(URL + "/ZKIDROnline/info").then((response) => {
        let res = response.data;
        isInstall = true;
        res.retext = (res.ret != 0 ? "身份证读取失败，原因：" : "") + tsObj[res.ret];
        if (callback) {
            callback(res);
        }
    }).catch(() => {
        isInstall = false;
        if (errCallback) {
            errCallback({});
        }
    });
};



// 读取身份证信息
function read(type = 1, callback, errCallback, err) {
    axios.get(URL + "/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4&RREPEAT=1&common=1&random=" + parseInt(Math.random() * 10000), {
        responseType: "text"
    }).then((response) => {
        let res = response.data;
        if (typeof (res) == "string") {
            let data = res.replace(/\\/g, "/");
            try {
                res = JSON.parse(data);
            } catch (e) {
                res = eval("(" + data + ")");
            }
        }
        if (res.ret == 0) {
            if (callback) {
                res.Certificate.img = "data:image/jpg;base64," + res.Certificate.Base64Photo
                callback(res.Certificate);
            }
        } else {
            res.retext = "身份证读取失败，原因：" + tsObj[res.ret];
            if (errCallback) {
                errCallback(res);
            }
        }
    }).catch(() => {
        if (err) {
            err();
        }
    });
};



// 读身份证物理卡号
function readPh(callback, errCallback, err) {
    axios.get(URL + "/ZKIDROnline/MFCard?OP-DEV=1&CMD-URL=2&iPort=5").then((response) => {
        let res = response.data;
        if (res.ret == 0) {
            if (callback) {
                callback(res.data);
            }
        } else {
            res.retext = "身份证读取失败，原因：" + tsObj[res.ret];
            if (errCallback) {
                errCallback(res);
            }
        }
    }).catch(() => {
        if (err) {
            err();
        }
    });
};




// 设置语音播放
// 0  请放卡  
// 1  读卡成功  
// 2  读卡失败，请重新放卡  
// 3  读卡成功，请核验指纹  
// 4  核验成功  
// 5  核验失败，请重按手指  
// 6  写卡成功  
// 7  写卡失败  
function setVoice(type = 1, callback, errCallback, err) {
    axios.get(URL + "/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=16&VoiceType=" + type).then((response) => {
        let res = response.data;
        if (res.ret == 0) {
            if (callback) {
                callback(res.data);
            }
        } else {
            res.retext = "身份证读取失败，原因：" + tsObj[res.ret];
            if (errCallback) {
                errCallback(res);
            }
        }
    }).catch(() => {
        if (err) {
            err();
        }
    });
};

//下载插件
function download(callback) {
    window.location =
        window.location.origin + "/download/ZKIDROnline.exe";
    let judgeLoad = () => {
        window.setTimeout(() => {
            inspect(() => {
                if (isInstall && callback) {
                    callback();
                }
            }, () => {
                judgeLoad();
            });
        }, 10000);
    }
}

function readIDCard(callback, errCallback) {
    if (isInstall) {
        read("", callback, errCallback, () => {
            Message({
                showClose: true,
                message: "身份证读卡器连接失败，请先安装！",
                type: "error"
            });
        });
    } else {
        Message({
            showClose: true,
            message: "身份证读卡器连接失败，请先安装！",
            type: "error"
        });
    }
}
export default {
    readIDCard,
    download,
    inspect,
    setVoice,
}