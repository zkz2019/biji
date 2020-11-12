import store from '@/store'
import { Message } from 'element-ui';
//判断按钮
function is_butttype(id,pageid){
   if(id=='10'||id=='22'||id=='155' || id=='231'){
      //添加学生、添加教职工、添加临时人员、添加指纹
      adddata(id,pageid)
   }else if(id=='11'||id=='23'||id=='156'){
    //修改学生、修改教职工、修改临时人员、
    revisiondata(id,pageid)
   }else if(id=='12'||id=='24'||id=='157'){
    //学生离校、教职工离职、离校、
    leave(id,pageid)
   }else if(id=='173'||id=='174'){
    //取消学生离校、取消离职
    canceldata(id,pageid)
   }
}
//添加
function adddata(id,pageid){
 if(id=='231'){
   store.commit('setzwgl230pageid',pageid)    //当前页面ID  
   store.commit('setzwgl230pagebutid',id)    //当前页面按钮ID 
   store.commit('setaddfingerprintVisible',true)   
   return
 }
  store.commit('setzhgl26pageid',pageid)    //当前页面ID  
  store.commit('setzhgl26pagebutid',id)    //当前页面按钮ID 
  store.commit('setdialogFormVisible',true)   
}
//修改
function revisiondata(id,pageid){
   let items = store.getters.getzhgl26tabesitems
   if(items==''){
        Message({
         showClose: true,
         message: '请先选中人员!',
         type: 'error'
       });
       return
   }
   store.commit('setzhgl26pageid',pageid)    //当前页面ID  
   store.commit('setzhgl26pagebutid',id)    //当前页面按钮ID 
   store.commit('setdialogFormVisible',true)   
}

//离开
function leave(id,pageid){
   let items = store.getters.getzhgl26tabesitems
   if(items==''){
        Message({
         showClose: true,
         message: '请先选中人员!',
         type: 'error'
       });
       return
   }
}
//取消
function canceldata(){
   let items = store.getters.getzhgl26tabesitems
   if(Object.keys(items).length==0){
        Message({
         showClose: true,
         message: '请先选中人员!',
         type: 'error'
       });
       return
   }
}

export default {
    is_butttype,
} 