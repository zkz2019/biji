import Vue from 'vue'
import Vuex from './kvuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		a: 1,
	},
	mutations: {
		add(state, val) {
			state.a += val;
		}
	},
	actions: {
		add({
			commit
		}, val) {
			setTimeout(() => {
				commit("add", val * 2);
			})
		}
	},
	modules: {}
})
