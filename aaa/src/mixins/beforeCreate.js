// function vuexInit() {
// 	console.log("进来了")
// }
import Vue from "vue";
export default function(_Vue) {
	console.log("kkkkk", _Vue)
	Vue.mixin({
		beforeCreate() {
			console.log("进来了")
		},
		methods: {
			a() {
				console.log("aaaaaaaaaa");
			}
		}
	})
}
