import axios from 'axios';
import qs from 'qs';
import router from '@/routes'
import Storages from "../utils/Storage.js"; //缓存工具
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from '@/store';



// axios.defaults.baseURL = 'http://192.168.192.128/api';

// axios.defaults.baseURL = 'http://192.168.1.99/api' //7.3 打包地址

// axios.defaults.baseURL = 'http://175.6.59.201:88/api' //7.4 打包地址

if (window._ZK_COMFIG_.baseURL) {
  axios.defaults.baseURL = window._ZK_COMFIG_.baseURL;
} else {
  axios.defaults.baseURL = '/api';
}


// axios.defaults.baseURL = 'http://192.168.3.157:19996';  //刘源本地
// axios.defaults.baseURL = 'http://192.168.3.157:9005';  //刘源本地

// axios.defaults.baseURL = 'http://192.168.3.14:19996';  //陈涛本地

// axios.defaults.baseURL = 'http://192.168.88.168/api';  //安徽机电

// axios.defaults.baseURL = 'http://192.168.160.25/api';

// axios.defaults.baseURL ='http://s.keenzy.cn:2019';
 
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.cancelToken = source.token
    // console.log(config)
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    //  config.data = qs.stringify(config.data)
    // if(config.0=='0'){
    //   config.headers = {
    //     'Content-Type':'application/x-www-form-urlencoded'
    //   }
    // }else if(config.0=='1'){
    //   config.headers = {
    //     'Content-Type':'application/json'
    //   }
    // }
    // config.headers = {
    //       'Content-Type':'application/x-www-form-urlencoded'
    //     }
    // config.headers = {
    //   'Content-Type':'application/json'
    // }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    console.log("error", error);
    error = error || {};
    if (!error.resultMsg) {
      error.resultCode = "H0009";
      error.resultMsg = `请求发送出错`;
    }
    return Promise.reject(error);
  }
);

// axios.defaults.retry = 1;
// axios.defaults.retryDelay = 1000;
// axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
//   var config = err.config;
//   // 如果config不存在或未设置重试选项，请拒绝
//   if (!config || !config.retry) return Promise.reject(err);
//   // 设置变量跟踪重试次数
//   config.__retryCount = config.__retryCount || 0;
//   // 检查是否已经达到最大重试总次数
//   if (config.__retryCount >= config.retry) {
//     // 抛出错误信息
//     return Promise.reject(err);
//   }
//   // 增加请求重试次数
//   config.__retryCount += 1;
//   // 创建新的异步请求
//   var backoff = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve();
//     }, config.retryDelay || 1);
//   });
//   // 返回axios信息，重新请求
//   return backoff.then(function () {
//     return axios(config);
//   });
// });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    let res = response.data;
    if (res && typeof (res.resultCode) != "undefined" && res.resultCode == '-1') {
      source.cancel();
      console.log("退出5");
      store.dispatch("clearAccount");
      router.push({
        path: "/login",
      });
      source = CancelToken.source();
      setTimeout(() => {
        Message({
          message: `[${res.resultCode}] ` + res.resultMsg,
          type: "error",
          duration: 10000,
        });
      }, 30);
    }
    return response;
  },
  error => {
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !error.config._retry) {
      error.resultMsg = '请求超时';
      error.resultCode = "H0010";
    } else if (error.message == "Network Error") {
      error.resultMsg = '网络错误';
      error.resultCode = "H0006";
    } else if (error && error.response && (!error.resultCode)) {
      switch (error.response.status) {
        case 400:
          error.resultMsg = '请求错误';
          error.resultCode = "H0011";
          break
        case 401:
          error.resultMsg = '请求未授权，请登录';
          error.resultCode = "H0012";
          break
        case 403:
          error.resultMsg = '请求拒绝访问';
          error.resultCode = "H0013";
          break
        case 404:
          error.resultMsg = `请求地址出错`;
          error.resultCode = "H0014";
          break
        case 408:
          error.resultMsg = '请求超时';
          error.resultCode = "H0015";
          break
        case 500:
          error.resultMsg = '服务器内部错误';
          error.resultCode = "H0016";
          break
        case 501:
          error.resultMsg = '服务未实现';
          error.resultCode = "H0017";
          break
        case 502:
          error.resultMsg = '服务网关错误';
          error.resultCode = "H0018";
          break
        case 503:
          error.resultMsg = '服务不可用';
          error.resultCode = "H0019";
          break
        case 504:
          error.resultMsg = '服务网关超时';
          error.resultCode = "H0020";
          break
        case 505:
          error.resultMsg = 'HTTP版本不受支持';
          error.resultCode = "H0021";
          break
        default:
          error.resultMsg = '请求未知错误';
          error.resultCode = "H0" + error.response.status;
          break
      }
    }
    return Promise.reject(error)
  }
)




/**
 * 确定提示框
 * @param {*} message 提示内容
 * @param {*} callback 确认回调
 * @param {*} errCallback 取消回调
 */
export function confirm(message, callback, errCallback) {
  let options = {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  };
  MessageBox.confirm(message, "提示", options)
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch(err => {
      if (errCallback) {
        errCallback();
      }
    });
}


/**
 * 后台接口调用方法post方式
 * @param {*} url 接口url地址
 * @param {*} data 拼接到url后面的参数 默认{}
 * @param {*} headers 请求Content-Type类型 默认0
 * @param {*} param josn对象参数
 * @param {*} loading 是否要等待层 默认false
 * @param {*} timeout 接口超时时间
 */
export function ajax(url, data = {}, headers = '0', param = {}, loading = false, timeout, callback) {
  let ding;
  let head = {};
  if (loading) {
    let text = "请求中...";
    if (typeof loading == "string") {
      text = loading;
    }
    ding = Loading.service({
      lock: true,
      text: text,
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }
  axios.defaults.responseType = 'json';
  axios.defaults.timeout = 30000;
  let token = Storages.getStorage("token") //Cookies.get('token');
  if (token) {
    data.token = token;
  }
  if (headers == '9' || headers == "13") {
    if (headers == "13") {
      head = {
        headers: {
          'Content-Type': 'application/force-download'
        }
      }
      axios.defaults.responseType = 'blob';
      axios.defaults.timeout = 100000;
    } else {
      head = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
      data = Object.assign({}, data, param);
    }
  } else {
    let ds = Object.keys(data);
    if (ds.length > 0) {
      url = url + "?" + ds.map(key => {
        let z = data[key];
        if (typeof (z) == "undefined") {
          z = "";
        } else if (z === null) {
          z = "";
        } else if (typeof (z) == "string") {
          z = encodeURIComponent(z);
        }
        return key + '=' + z;
      }).join("&");
    }
    data = param;
  }
  if (headers == '0') {
    head = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    data = qs.stringify(param)
  } else if (headers == '1') {
    head = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
  } else if (headers == '2') {
    head = {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    }
    axios.defaults.timeout = 100000;
  } else if (headers == '7') {
    head = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.defaults.timeout = 100000;
  } else if (headers == '3') {
    head = {
      headers: {
        'Content-Type': 'application/force-download'
      }
    }
    axios.defaults.responseType = 'blob';
    axios.defaults.timeout = 100000;
  } else if (headers == '8') {
    head = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    axios.defaults.responseType = 'blob';
    axios.defaults.timeout = 100000;
  }
  if (timeout) {
    axios.defaults.timeout = timeout;
    head.timeout = timeout;
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data, head)
      .then(response => {
        if (ding) ding.close();
        if (callback) {
          callback(response);
        }
        let res = response.data;
        if (res) {
          if (typeof res == 'string') {
            res = JSON.parse(res)
          }
          if (typeof (res.resultCode) != "undefined" && res.resultCode == 0) {
            resolve(res);
          } else if (response.request.responseType == "blob") {
            resolve(res);
          } else {
            if (!res.resultCode) {
              res.resultCode = "H0021";
              res.resultMsg = "数据错误！"
            }
            console.log("错误", res)
            reject(res)
          }
        } else {
          if (!response.resultCode) {
            response.resultCode = "H0021";
            response.resultMsg = "请求无数据！"
          }
          console.log("错误", response)
          reject(response)
        }
      }, err => {
        console.log("错误", err)
        if (ding) ding.close();
        err = err || {};
        if (err.resultMsg) {
          reject(err);
        }
      })
  })
}