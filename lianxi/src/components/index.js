import Vue from 'vue';
// 注册全局组件

Vue.component('fel-container', () => import("./container/fel-container.vue"));

Vue.component('fel-container-batch', () => import("./container/fel-container-batch.vue"));

Vue.component('fel-popup', () => import("./container/fel-popup.vue"));

Vue.component('fel-retrie', () => import("./container/fel-retrie.vue"));

Vue.component('fel-table-but', () => import("./container/fel-table-but.vue"));

Vue.component('fel-num-but', () => import("./container/fel-num-but.vue"));

Vue.component('fel-table-color', () => import("./container/fel-table-color.vue"));

Vue.component('fel-table-input', () => import("./container/fel-table-input.vue"));

Vue.component('search-select', () => import("./common/search-select.vue"));



//列表按钮图标
Vue.component('table-buttom', () => import("./common/table-buttom.vue"));

//表格加分页
Vue.component('paging-table', () => import("./table/paging-table.vue"));
//表格加分页
Vue.component('paging-table1', () => import("./table/paging-table1.vue"));
// 表格
Vue.component('fel-table', () => import("./table/fel-table.vue"));
// 表格
Vue.component('pfel-table', () => import("./table/pfel-table.vue"));


// 表单提示框
Vue.component('dialog-form', () => import("./common/dialog-form.vue"));

Vue.component('fel-dialog', () => import("./common/fel-dialog.vue"));


// 左侧树形控件
Vue.component('fel-tree', () => import('./tree/fel-tree.vue'));
Vue.component('fel-tree1', () => import('./tree/fel-tree1.vue'));
Vue.component('fel-tree3', () => import('./tree/fel-tree3.vue'));
Vue.component('fel-tree4', () => import('./tree/fel-tree4.vue'));
Vue.component('fel-tree5', () => import('./tree/fel-tree5.vue'));
Vue.component('fel-left-tree', () => import('./tree/fel-left-tree.vue'));


Vue.component('fel-img', () => import('./common/fel-img.vue'));

Vue.component('form-table', () => import('./table/form-table.vue'));


// 表单
Vue.component('fel-form', () => import("./form/fel-form.vue"));
// Vue.component('fel-form1', () => import("./form/fel-form1.vue"));

// 时间选择控件
Vue.component('fel-date', () => import("./form/fel-date.vue"));
Vue.component('fel-time', () => import("./form/fel-time.vue"));
Vue.component('fel-Stime',()=>import("./form/time-Selector.vue"));
//月份日期组件
Vue.component('dateSelect',()=>import("./common/date-select.vue"));
Vue.component('dateSelect1',()=>import("./common/date-select1.vue"));

// 图片上传控件
Vue.component('fel-upload', () => import("./form/fel-upload.vue"));
Vue.component('fel-upload-input', () => import('./form/fel-upload-input.vue'));

Vue.component('fel-button', () => import('./form/fel-button.vue'));
Vue.component('fel-input', () => import('./form/fel-input.vue'));
Vue.component('fel-clearInput', () => import('./form/fel-clearInput.vue'));
Vue.component('fel-select', () => import('./form/fel-select.vue'));
Vue.component('fel-checkbox', () => import('./form/fel-checkbox.vue'));
Vue.component('checkSelect', () => import('./common/checkSelect.vue'));


// 图片上传控件
Vue.component('puc-upload', () => import("./dialog/puc-upload.vue"));


//标题
Vue.component("comTitle", () => import("@/views/common/com-title.vue"));
Vue.component("retrieval", () => import("@/views/common/retrieval.vue"));
Vue.component("inpbox", () => import("@/views/common/inpbox"));

// 左侧选项卡控件
Vue.component('fel-left-tabs', () => import("./common/fel-left-tabs.vue"));

Vue.component('fel-admin', () => import('./common/fel-admin.vue'));
Vue.component('batch-but', () => import('@/views/common/batchButs.vue'));

//拖动
Vue.component('adjust', () => import('./adjust/adjust.vue'));
Vue.component('adjust-div', () => import('./adjust/adjust-div.vue'));

//房间管理办理入住表单内部组件
Vue.component("displayForm", () => import("./common/displayForm.vue"));