<template>
	<div>
		<button @click="onClick">点击</button>
		{{$attrs.msg}}
		<p>	
		{{str}}
		</p>
	</div>
</template>

<script>
	export default {
		inject:// ["foo"],
		{
			str: {
				from: "foo"
			}
		},
		methods: {
			onClick() {
				this.$parent.$emit("onEventClick", "我是a孩子")
			}
		}
	}
</script>

<style>
</style>
