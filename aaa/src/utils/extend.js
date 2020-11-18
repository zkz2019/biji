import Vue  from "vue";
import Notice from "@/components/Notice";
function extend(component,props){
	const p =Vue.extend(component);
	// const comp = new p({propsData:props});
	// comp.$mount()
	const comp = new p({propsData:props}).$mount();
	document.body.appendChild(comp.$el);
	comp.remove=function(){
		document.body.removeChild(comp.$el);
		comp.$destroy();
	}
	console.log(11111,component);
	return comp;
}
export default//extend
{
	install(Vue){
			Vue.prototype.$notice=function(options){
				console.log("kjkj",Notice,options);
				return extend(Notice,options)
			}
	}
}