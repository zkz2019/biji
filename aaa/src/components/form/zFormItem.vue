<template>
	<div>
		<label v-if="label">{{label}}</label>
		<slot></slot>
		<p style="color:red">{{err}}</p>
	</div>
</template>

<script>
	import Schema from "async-validator";
	import emitter from "@/mixins/emitter.js";
	export default {
		inject: ["form"],
		mixins:[emitter],
		componentName:"zFormItem",
		props: {
			label: {
				type: String,
				default: ""
			},
			prop: {
				type: String,
			}
		},
		data: () => {
			return {
				err: "",
			}
		},
		mounted() {
			if(this.prop){
			this.dispatch("zForm","zz-event",this)
			}
			this.$on("validate", () => {
				// console.log("进入")
				this.validate();
			})
		},
		methods: {
			validate() {
				this.err += "a"
				const rules = this.form.rules[this.prop];
				const value = this.form.param[this.prop];
				const desc = {
					[this.prop]: rules
				};
				const schema = new Schema(desc);
				return schema.validate({
					[this.prop]: value
				}, errors => {
					if (errors) {
						this.err = errors[0].message;
					} else {
						this.err = "";
					}
				})

			}
		}
	}
</script>

<style>
</style>
