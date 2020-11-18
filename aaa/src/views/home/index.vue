<template>
	<div>
		<!-- <zForm>adsfdsf</zForm> -->
		<zForm :param="param" :rules="rules" ref="zForm">
			<zFormItem label="用户名" prop="username">
				<zInput placeholder="请输入用户名" v-model="param.username"></zInput>
			</zFormItem>
			<zFormItem label="密码" prop="password">
				<zInput type="password" v-model="param.password"></zInput>
			</zFormItem>
			<zFormItem>
				<button @click="onClick">提交</button>
			</zFormItem>
		</zForm>
		<p>{{aaa}}</p>
		<!--  @click="$store.commit('add',1)"<p @click="$store.dispatch('add',2)">a{{$store.state.a}}</p> -->
	</div>
</template>

<script>
	// import create from "./../../../utils/create.js";
	// import extend from "./../../../utils/extend.js";
	// import Notice from "./../../../components/Notice";
	export default {
		data() {
			return {
				param: {
					username: "",
					password: ""
				},
				rules: {
					username: {
						required: true,
						message: "请输入用户名"
					},
					password: {
						required: true,
						message: "请输入密码"
					},
				}
			}
		},
		created(){
			console.log("this",this.$store)
		},
		computed:{
			aaa(){
				console.log("jjjj",this.$store)
				return this.$store
			}
		},
		methods: {
			onClick() {
				this.$refs.zForm.validate(bool => {
					// const notice = this.$notice(Notice, {
					// 	title: "社会你杨哥喊你来搬砖",
					// 	message: bool ? "请求登录!" : "校验失败!",
					// 	duration: 2000
					// });
					const notice = 
					this.$notice({
						title: "社会你杨哥喊你来搬砖",
						message: bool ? "请求登录!" : "校验失败!",
						duration: 2000
					})
					// extend(Notice);
					console.log(22222, this.$notice);
					notice.show();
				})
			}
		}
	}
</script>

<style>
</style>
