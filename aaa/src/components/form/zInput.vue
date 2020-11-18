<template>
	<div>
		<input :type="type" :value="value" @input="onInput" v-bind="$attrs">
	</div>
</template>

<script>
	import emitter from "@/mixins/emitter.js";
	export default{
		inheritAttrs:false,
		mixins:[emitter],
		props:{
			value:{
				type:String
			},
			type:{
				type:String,
				default:"text"
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			onInput(e){
				// console.log("eee",this.dispatch)
				this.$emit("input",e.target.value);
				// this.$parent.$emit("validate")
				this.dispatch("zFormItem","validate")
			}
		}
	}
</script>

<style>
</style>
