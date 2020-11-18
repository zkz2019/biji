<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<!-- <home /> -->
		<p @click="$store.commit('add',1)">Home{{$store.state.a}}</p>
			<p @click="$store.dispatch('add',2)">a{{$store.state.a}}</p>

	</div>


</template>

<script>
	// @ is an alias to /src
	// import home from '@/views/home/index'

	export default {
		name: 'home',
		components: {
			// home
		}
	}
</script>
