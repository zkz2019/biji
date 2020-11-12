import axios from 'axios';
import {
    Message
} from 'element-ui';
let URL = "http://127.0.0.1:65252";
let isInstall = false;


let num = 0;
export function getcode(cb, errcb) {
    axios.get("http://127.0.0.1:65252/getcode", {
        responseType: "json"
    }).then(res => {
        num++;
        cb(res.data);
    }).catch(err => {
        errcb(err)
    })
}

export function rgetcode(cb, errcb) {
    axios.get("http://127.0.0.1:65252/rgetcode", {
        responseType: "json"
    }).then(res => {
        cb(res.data);
    }).catch(err => {
        errcb(err)
    })
}

export function delcode(cb, errcb) {
    axios.get("http://127.0.0.1:65252/delcode", {
        responseType: "json"
    }).then(res => {
        cb(res.data);
    }).catch(err => {
        errcb(err)
    })
}


// export function getcode() {
//     const req = new Promise((resolve, reject) => {
//         axios.get("http://127.0.0.1:65252/getcode").then(res => {
//             console.log("底层请求",res)
//             resolve(res.data);
//         }).catch(err => {
//             reject(err)
//         })
//     })
//     return req;
// }

// export function rgetcode() {
//     const req = new Promise((resolve, reject) => {
//         axios.get("http://127.0.0.1:65252/rgetcode").then(res => {
//             console.log("底层请求",res)
//             resolve(res.data);
//         }).catch(err => {
//             reject(err)
//         })
//     })
//     return req;
// }

// export function delcode() {
//     const req = new Promise((resolve, reject) => {
//         axios.get("http://127.0.0.1:65252/delcode").then(res => {
//             resolve(res.data);
//         }).catch(err => {
//             reject(err)
//         })
//     })
//     return req;
// }


// getcode()
//   .then(res => {
//     let result = res.result;
//     console.log("循环获取数据", result);
//     this.$emit("onInstall", true);
//     if (res.resultCode == "01") {
//       this.$emit("resultdata", {
//         err: true
//       });
//     } else if (res.resultCode == "0") {
//       this.handleResult(result);
//     }
//     this.delResult();
//   })
//   .catch(err => {
//     this.delResult();
//     this.$emit("onInstall", false);
//   });

//---------------------------------------------------

// rgetcode()
//   .then(res => {
//     let result = res.result;
//     console.log("手动重新获取数据", result);
//     this.$emit("onInstall", true);
//     if (res.resultCode == "21") {
//       this.$emit("resultdata", {
//         err: true
//       });
//     } else if (res.resultCode == "0") {
//       this.handleResult(result);
//     }
//     this.delResult();
//   })
//   .catch(err => {
//     this.delResult();
//     this.$emit("onInstall", false);
//   });

//---------------------------------------------------


// delcode()
//   .then(res => {
//     // console.log("zzz", res);
//   })
//   .catch(err => {
//     console.log("err", err);
//   });