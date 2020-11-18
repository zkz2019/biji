let Vue;
// import Vue from 'vue/dist/vue.esm.js';
import link from "./route-link.js";
import view from "./route-view.js";
class KvueRouter {
	constructor(options) {
		this.$options = options;
		Vue.util.defineReactive(this, "current", "/")
		window.addEventListener('hashchange', this.onHashchange.bind(this));
		window.addEventListener("load", this.onHashchange.bind(this));
		this.routerMap = {};
		options.routes.forEach(item => {
			this.routerMap[item.path] = item;
		})
	}
	onHashchange() {
		this.current = window.location.hash.slice(1);
	}
}

KvueRouter.install = function(_Vue) {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			// 确保根实例的时候才执行
			if (this.$options.router) {
				Vue.prototype.$router = this.$options.router;
			}

		}
	})
	Vue.component('router-link', link);
	Vue.component('router-view', view);
}
export default KvueRouter
