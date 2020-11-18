export default {
	props: {
		to: {
			type: String,
			require: true
		}
	},
	render(h) {
		const {routerMap,current} =this.$router;
		const comp = routerMap[current].component||null;
		return h(comp)
	}
}
