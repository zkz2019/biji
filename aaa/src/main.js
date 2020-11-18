import Vue from 'vue';
import App from './App.vue';
import components from  "./components/index.js";

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import extend from "./utils/extend.js";

import router from './router'
import store from './kstore'
Vue.use(extend);
// Vue.mixin({
// 		beforeCreate() {
// 			console.log("进入")
// 			// 确保根实例的时候才执行
// 			if (this.$options.router) {
// 				Vue.prototype.$router = this.$options.router;
// 			}

// 		}
// 	})
// Vue.prototype.$notice = extend;
Vue.config.productionTip = false;

Vue.use(components);
// Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
