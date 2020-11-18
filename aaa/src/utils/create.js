import Vue from 'vue'
function create(component,props){
	const vm = new Vue({
		render:h=>h(component,{props})
		}).$mount();
		console.log(vm);
		document.body.appendChild(vm.$el);
		const comp = vm.$children[0];
		comp.remove=function(){
			document.body.removeChild(vm.$el);
			vm.$destroy();
		}
		return comp;
}
export default create;