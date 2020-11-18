<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		componentName:"zForm",
		provide() {
			return {
				form: this
			}
		},
		props: {
			param: {
				type: Object,
				required: true,
			},
			rules: {
				type: Object
			}
		},
		data() {
			return {}
		},
		mounted(){
			this.arr=[];
			this.$on("zz-event",item=>{
				// console.log("进入")
				this.arr.push(item);
			})
		},
		methods: {
			validate(cb) {
			console.log("kkkk",this.arr,cb);
				// const next = this.$children.filter(item => item.prop).map(item => {
				// 	console.log(item.validate())
				// 	return item.validate()
				// });
				const next = this.arr.map(item=>{return item.validate()})
				// console.log("this", this.arr, next)
				Promise.all(next).then(() => {
					cb(true)
				}).catch(() => cb(false));
			}
		}
	}
</script>

<style>
</style>
