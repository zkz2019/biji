// import zForm from "./form/zForm"
const Loading={
  install:function (Vue) {
    Vue.component('zForm',()=>import("./form/zForm"));
    Vue.component('zFormItem',()=>import("./form/zFormItem"));
    Vue.component('zInput',()=>import("./form/zInput"));
    Vue.component('Notice',()=>import("./Notice"));
  }
}
export default Loading