function setStorage(key, value = "") { //sessionStorage 存储数组对象的方法
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (g) {
    console.log("存储数据失败，key为：" + key + "错误信息：" + g.message) 
  }
}

function getStorage(key) { //sessionStorage 获取数组对象的方法
  let v = "";
  try {
    let obj = sessionStorage.getItem(key);
    if (obj && obj !== "null" && obj !== "undefined") {
      v = JSON.parse(obj);
    }
  } catch (g) {
    console.log("獲取数据失败，key为：" + key + "错误信息：" + g.message)
  }
  return v
}

/**
 * 清除本地页面存储数据
 * @param {string} key 存储数据的 key  不传 清除所有
 */
function clearStorage(key) {
  try {
    if (key) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  } catch (g) {
    console.log("清除数据失败，key为：" + key + "错误信息：" + g.message)
  }
}

function setlocalStorage(key, value = "") { //localStorage 存储数组对象的方法
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (g) {
    console.log("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
  }
}

function getlocalStorage(key) { //localStorage 存储数组对象的方法
  let v = "";
  try {
    let obj = localStorage.getItem(key);
    if (obj && obj !== "null" && obj !== "undefined") {
      v = JSON.parse(obj);
    }
  } catch (f) {
    console.log("您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！");
  }
  return v;
}

function clearlocalStorage(key) {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  } catch (g) {
    console.log("清除数据失败，key为：" + key + "错误信息：" + g.message)
  }
}

export default {
  setStorage,
  getStorage,
  clearStorage,
  setlocalStorage,
  getlocalStorage,
  clearlocalStorage
}