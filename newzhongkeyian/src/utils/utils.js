export function filtration_isnext(arr) {
  //过滤树状菜单
  arr.map((item) => {
    if (item.isnext == 1) {
      item.isnext = false
    } else {
      item.isnext = true
    }
  })
  return arr
}
export function filtration_isnext_return(objs) {
  //过滤树状菜单
  if (Object.keys(objs).length == 0) return objs
  let aobjs = JSON.parse(JSON.stringify(objs))
  if (aobjs.isnext) {
    aobjs.isnext = 0
  } else {
    aobjs.isnext = 1
  }
  return aobjs
}
export function is_sex(arr) {
  //过滤树状菜单
  arr.map((item) => {
    if (item.personsex == 1) {
      item.personsex = '男'
    } else if (item.personsex == 0) {
      item.personsex = '女'
    } else {
      item.personsex = '未知'
    }
    if (item.personstate == 0) {
      item.personstate = '离校'
    } else if (item.personstate == 1) {
      item.personstate = '在校'
    }
  })
  return arr
}

export function download(data, name) {
  let date = new Date();
  let dqdate = format(date, "yyyy-MM-dd_HH_mm_ss");
  try {
    var blobURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", name + dqdate + '.xlsx');
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data, name + dqdate + '.xlsx');
    } else {
      console.log("error", error);
      throw error;
    }
  }
}

//下载bin文件
export function downloadBin(data, name) {
  let date = new Date();
  let dqdate = format(date, "yyyy-MM-dd_HH_mm_ss");
  try {
    var blobURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", name + dqdate + '.bin');
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  } catch (error) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data, name + dqdate + '.bin');
    } else {
      console.log("error", error);
      throw error;
    }
  }
}

//定义一个中文数组
const arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

// 对Date的扩展，将 Date 转化为指令格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// XXX 格式为 星期几
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
export function format(date, fmt) { //author: meizz 
  if (!date) {
    return "";
  } else if (typeof (date) == "string") {
    let d = new Date(date);
    if (d == "Invalid Date") {
      return date;
    } else {
      date = d;
    }
  }
  let o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "H+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds(), //毫秒 
  };
  let xq = date.getDay(); //星期
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  if (fmt.includes("XXX")) {
    fmt = fmt.replace("XXX", arr[xq]);
  }
  return fmt;
}


export function loadScript(url, callback, errorCallback) {
  const scriptDom = window.document.createElement("script");
  scriptDom.type = "text/javascript";
  scriptDom.async = "async";
  scriptDom.src = url;
  // document.head.appendChild(script);
  window.document.body.appendChild(scriptDom);
  if (callback) {
    scriptDom.onload = function () {
      scriptDom.parentNode.removeChild(scriptDom);
      callback(scriptDom);
    };
  }
  if (errorCallback) {
    scriptDom.onerror = function () {
      scriptDom.parentNode.removeChild(scriptDom);
      errorCallback(scriptDom);
    };
  }
};

/**
 * 去除重复的数据
 * @param {*} objs 
 * @param {*} id 
 */
export function arrReduceRight(objs, id) {
  let arr = [];
  return objs.filter(obj => {
    if (arr.includes(obj[id])) {
      return false;
    } else {
      arr.push(obj[id]);
      return true;
    }
  })
}

/**
 * 去除重复的数据
 * @param {*} objs 
 * @param {*} id 
 */
export function arrReduceRightObj(objs, arrs) {
  let arr = [];
  return objs.filter(obj => {
    let v = arrs.map(o => {
      return obj[o];
    });
    v = v.join("|");
    if (arr.includes(v)) {
      return false;
    } else {
      arr.push(v);
      return true;
    }
  })
}

/**
 * 去除重复的数据
 * @param {*} objs 
 * @param {*} id 
 */
export function arrDelete(data, arrs, id) {
  let arr = arrs.map(o => o[id]);
  return data.filter(obj => {
    if (arr.includes(obj[id])) {
      return false;
    } else {
      return true;
    }
  })
}

/**
 * 监听dom点击事件
 * dom 需要监听的dom
 * e   监听事件
 * del 移除监听事件
 */

export function homeListenClick(dom, e, del = false) {
  if (del) {
    dom.removeEventListener('click', e)
    return;
  } else {
    dom.addEventListener("click", e)
  }
}

// 建筑排序
export function arrSort(array, key, is) {
  return array.sort((a, b) => {
    const am = a[key];
    const bm = b[key];
    const ra = /^([0-9]*)/gim;
    const rb = /^([0-9]*)/gim;
    let ras = ra.exec(am)[0];
    let rbs = rb.exec(bm)[0];
    let c = 0;
    if (am == bm) {
      c = 0;
    } else {
      if (ras.length > 0 && rbs.length > 0) {
        let va = Number(ras);
        let vb = Number(rbs);
        if (va > vb) {
          c = 1;
        } else if (va < vb) {
          c = -1;
        } else {
          if (am.length > bm.length) {
            c = 1;
          } else if (am.length < bm.length) {
            c = -1;
          } else {
            if (am > bm) {
              c = 1;
            } else {
              c = -1;
            }
          }
        }
      } else {
        if (ras.length > 0 || rbs.length > 0) {
          if (am > bm) {
            c = 1;
          } else {
            c = -1;
          }
        } else {
          if (am.length > bm.length) {
            c = 1;
          } else if (am.length < bm.length) {
            c = -1;
          } else {
            if (am > bm) {
              c = 1;
            } else {
              c = -1;
            }
          }
        }
      }
    }
    if (is) {
      if (c > 0) {
        c = -1;
      } else if (c < 0) {
        c = 1;
      }
    }
    return c;
  });
}


export function createFileFromUrl(path, url, callback) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function(ev) {
      if (request.readyState === 4) {
          if (request.status === 200) {
              let data = new Uint8Array(request.response);
              cv.FS_createDataFile('/', path, data, true, false, false);
              callback();
          } else {
              self.printError('Failed to load ' + url + ' status: ' + request.status);
          }
      }
  };
  request.send();
};