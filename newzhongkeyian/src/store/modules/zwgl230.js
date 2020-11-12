//指纹管理仓库
const zwgl230 = {
    state: {
        zwgl230Refreshtable:false,         //刷新表格
        TreeIndex_zwgl230:'', //Tree展开保存
        addfingerprintVisible:false,      //添加弹出层开关  
        zwgl230pagebutid:'',              //当前页面按钮ID 
        zwgl230pageid:'',              //当前页面ID     
        zwgl230tabesitems:'',                 //表格选中对象的ID
        inputvals:'',                     //查询
      },
      mutations: {
       //刷新表格          
        setzwgl230Refreshtable (state, data) {
            this.state.zwgl230.zwgl230Refreshtable=data
        },
        //保存          
        Treetab_zwgl230 (state, data) {
            this.state.zwgl230.TreeIndex_zwgl230=data
        },
        setaddfingerprintVisible (state, data) {
            this.state.zwgl230.addfingerprintVisible=data
        },
        setzwgl230pagebutid (state, data) {
            this.state.zwgl230.zwgl230pagebutid=data
        },
        setzwgl230pageid (state, data) {
            this.state.zwgl230.zwgl230pageid=data
        },
        setzwgl230tabesitems (state, data) {
            this.state.zwgl230.zwgl230tabesitems=data
        },
        setzwgl230inputvals (state, data) {
            this.state.zwgl230.inputvals=data
        },
      },
      actions: {
     
      },
      getters: {
		getTreeIndex_zwgl230: state => {
            //通过方法访问
		  return state.TreeIndex_zwgl230
        },
        getaddfingerprintVisible: state => {
            //通过方法访问
		  return state.addfingerprintVisible
        },
        getzwgl230pagebutid: state => {
            //通过方法访问
		  return state.zwgl230pagebutid
        },
        getzwgl230pageid: state => {
            //通过方法访问
		  return state.zwgl230pageid
        },
        getzwgl230tabesitems: state => {
            //通过方法访问
		  return state.zwgl230tabesitems
        },
        getzwgl230inputvals: state => {
            //通过方法访问
		  return state.inputvals
        },
        getzwgl230Refreshtable: state => {
            //通过方法访问
		  return state.zwgl230Refreshtable
        },
        
    }   
} 
export default zwgl230