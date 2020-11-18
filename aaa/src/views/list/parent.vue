<template>
	<div>
		<child1 msg="shabi"></child1>
		<child2 @click="onclick2"></child2>
		<button @click="onclick">回家</button>
	</div>
</template>

<script>
	import child1 from "./a.vue";
	import child2 from "./b.vue";

	export default {
		provide() {
			return {
				foo: "fooooooo",
			}
		},
		components: {
			child1,
			child2
		},
		data() {
			return {

			}
		},
		methods: {
			onclick() {
				console.log(this.$children);
				this.$children[1].eat();
			},
			onclick2() {
				console.log("kjjj", this);
			}
		}
	}
</script>

<style>
</style>
