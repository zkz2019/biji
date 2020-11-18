<template>
	<div><button  v-on="$listeners">bbbbb</button></div>
</template>

<script>
	export default {
		mounted() {

			this.$parent.$on("onEventClick", msg => {
				console.log(msg);
			})
		},
		methods:{
			eat(){
				console.log("回来了");
			}
		}
	}
</script>

<style>
</style>
