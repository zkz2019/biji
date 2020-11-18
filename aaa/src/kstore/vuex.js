let Vue;
class Store {
	constructor(options) {
		// this.$options=options	
		// console.log("o", options);
		this._mutations = options.mutations;
		this._actions = options.actions;
		this._vm = new Vue({
			data: {
				$$state: options.state
			}
		})
		this.commit=this.commit.bind(this);
		this.dispatch=this.dispatch.bind(this);
	}
	commit(type, payload) {
		const entry = this._mutations[type];
		if (entry) {
			entry(this.state, payload);
		}
	}
	dispatch(type, payload) {
		const entry = this._actions[type];
		if (entry) {
			entry(this, payload);
		}
	}
}

function install(_vue) {
	Vue = _vue;
	Vue.mixin({
		beforeCreate() {
			console.log("o", this.$options);
			if (this.$options.store) {
				Vue.prototype.$store = this.$options.store;
			}
		}
	})
}
export default {
	Store,
	install
}
