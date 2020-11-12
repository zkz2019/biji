import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './routes'
import store from './store'
import ElementUI from 'element-ui'

//import './promission.js'//这里进行路由后台获取的模拟
import 'element-ui/lib/theme-chalk/index.css';
//css
import './assets/css/styles.scss'
import './components';
import {
  confirm,
  ajax
} from './request/http.js'
//定义全局变量
Vue.prototype.$ajax = ajax;
Vue.prototype.$confirmCon = confirm;


Vue.use(ElementUI);
Vue.use(Vuex)
Vue.config.productionTip = false
let message = Vue.prototype.$message;
let main_Message = function (obj) {
  message.closeAll();
  if (obj.message) {
    message(obj);
  }
};
['success', 'warning', 'info', 'error'].forEach(function (type) {
  main_Message[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return main_Message(options);
  };
});
Vue.prototype.$message = main_Message;

/*********浏览器的win的方法 */
if (typeof (window) != "undefined") {
  let config = _getSystemBrowser() || {};
  if (window.innerHeight) {
    config.winHeight = window.innerHeight;
  } else if ((document.body) && (document.body.clientHeight)) {
    config.winHeight = document.body.clientHeight;
  }
  if (window.innerWidth) {
    config.winWidth = window.innerWidth;
  } else if ((document.body) && (document.body.clientWidth)) {
    config.winWidth = document.body.clientWidth;
  }
  Vue.prototype.$config = config;
}

import common from './common.js';
Vue.prototype.$common = common || {};

//解决ie el-menu 报错问题
(function (window) {
  try {
    new MouseEvent('test');
    return false;
  } catch (e) {}

  var MouseEventPolyfill = function (eventType, params) {
    params = params || {
      bubbles: false,
      cancelable: false
    };
    var mouseEvent = document.createEvent('MouseEvent');
    mouseEvent.initMouseEvent(eventType,
      params.bubbles,
      params.cancelable,
      window,
      0,
      params.screenX || 0,
      params.screenY || 0,
      params.clientX || 0,
      params.clientY || 0,
      params.ctrlKey || false,
      params.altKey || false,
      params.shiftKey || false,
      params.metaKey || false,
      params.button || 0,
      params.relatedTarget || null
    );

    return mouseEvent;
  }

  MouseEventPolyfill.prototype = Event.prototype;

  window.MouseEvent = MouseEventPolyfill;
})(window);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')