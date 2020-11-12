import {
  filtration_isnext,
  filtration_isnext_return,
} from './../../utils/utils'
import Storages from '../../utils/Storage.js' //缓存工具
const fj38 = {
  state: {
    isAdmin: false,
    adminInfo: {},
    // roomid: {}, //被选中房间id
    dialogactiveName: '0', //选项卡默认按钮
    mjAdminShow: false,
    checkedRoom: '',
    // roomdata: {}, //被选中楼栋信息   (楼栋表格和实体渲染)
    // drydcBtn: { //导入导出按钮
    //     topBtns: {},
    //     exportButs: [],
    //     importButs: []
    // },
    // dialogVisible: false, //楼栋与房间显示切换
    // fjczdialogVisible: false, //房间操作弹出框
    // roomlist: [], //建筑统计列表
    // fjtotal: 0, //建筑总数
    // fjlist: {}, //房间列表信息
    // fjczBtn: {}, //房间操作按钮
    // zlxfBtn: {}, //指令下发按钮
    // plxfBtn: {}, //批量下发按钮
    // build: {}, //被选中楼栋  (楼栋头部信息渲染)
    // checkedroom: {}, //被选中房间
    // checkedfloor: {}, //被选中的楼栋
    // fatherid: "38", //房间管理权限id
    // buildVisible: false, //切换区域时实体的遮罩
    // floorPage: 1, //楼栋页数
    // czwsxsqBtn: {}, //重载未生效授权按钮
    // listPush: false, //
    // listNext: true, //判断
  },
  mutations: {
    fj38setAdmin(state, value) {
      state.isAdmin = value
    },
    fj38setAdminInfo(state, value) {
      state.checkedRoom = value.roomid
      state.adminInfo = value
    },
    fj38DelAdminInfo(state) {
      state.checkedRoom = ''
      state.adminInfo = {}
    },
    // setroomid(state, data) {
    //   state.roomid = data
    // },
    checkAdminShow(state, bool) {
      state.mjAdminShow = bool
    },
    // setlistPush(state, Bool) {
    //     state.listPush = Bool;
    // },
    // setlistNext(state, Bool) {
    //     state.listNext = Bool;
    // },
    // setfjlist(state, data) {
    //     state.fjlist = data;
    // },
    // setroomdata(state, data) {
    //     state.roomdata = data;
    // },
    // setdrydcBtn(state, obj) {
    //     state.drydcBtn.topBtns = obj.topBtns;
    //     state.drydcBtn.exportButs = obj.exportButs;
    //     state.drydcBtn.importButs = obj.importButs;
    //     state.drydcBtn.exImportButs = obj.exImportButs;
    // },
    // setfjczBtn(state, obj) {
    //     state.fjczBtn = obj;
    // },
    // setzlxfBtn(state, obj) {
    //     state.zlxfBtn = obj;
    // },
    // setplxfBtn(state, obj) {
    //     Storages.setStorage("plxfBtn", obj);
    //     state.plxfBtn = Storages.getStorage("plxfBtn");
    // },
    // setVisble(state, boolean) {
    //     state.dialogVisible = boolean;
    // },
    // setroomlist(state, arr) {
    //     state.roomlist = arr;
    // },
    // setfjtotal(state, num) {
    //     state.fjtotal = num;
    // },
    // setbuild(state, obj) {
    //     state.build = obj;
    // },
    // setfjczdialogVisible(state, boolean) {
    //     state.fjczdialogVisible = boolean;
    // },
    // setcheckedroom(state, obj) {
    //     state.checkedroom = obj;
    // },
    // setcheckedfloor(state, obj) {
    //     state.checkedfloor = obj;
    // },
    setfjg38dialogactiveName(state, data) {
      state.dialogactiveName = data
    },
    // setbuildVisible(state, boolean) {
    //     state.buildVisible = boolean;
    // },
    // setfloorPage(state, num) {
    //     state.floorPage = num;
    // },
    // setczwsxsqBtn(state, obj) {
    //     state.czwsxsqBtn = obj;
    // }
  },
  actions: {
    // setdrydcBtn({
    //     commit
    // }, obj) {
    //     let topBtns = obj.entity;
    //     let exportButs = [];
    //     let importButs = [];
    //     let exImportButs = [];
    //     obj.childs.forEach(data => {
    //         if (data.entity.id == "46") {
    //             importButs.push({
    //                 name: data.entity.alias,
    //                 tempUrl: "/lock/upload/4/downauthmodel",
    //                 url: "/lock/upload/1/uploadauth",
    //                 errUrl: "/lock/upload/7/downauth"
    //             });
    //             // exportButs.push(data.entity);
    //         } else if (data.entity.id == "51") {
    //             importButs.push({
    //                 name: data.entity.alias,
    //                 tempUrl: "/lock/upload/5/downauthbackmodel",
    //                 url: "/lock/upload/2/uploadauthback",
    //                 errUrl: "/lock/upload/8/downauthback"
    //             });
    //             // exportButs.push(data.entity);
    //         } else if (data.entity.id == "263") {
    //             importButs.push({
    //                 name: data.entity.alias,
    //                 tempUrl: "/lock/upload/6/downauthcheckmodel",
    //                 url: "/lock/upload/3/uploadauthcheck",
    //                 errUrl: "/lock/upload/9/downauthcheck"
    //             });
    //             // exportButs.push(data.entity);
    //         } else if (data.entity.id == "538") {
    //             exImportButs.push({
    //                 name: data.entity.alias,
    //                 url: "/lock/upload/4/downauthmodel"
    //             });
    //             // exportButs.push(data.entity);
    //         } else if (data.entity.id == "539") {
    //             exImportButs.push({
    //                 name: data.entity.alias,
    //                 url: "/lock/upload/5/downauthbackmodel"
    //             });
    //             // exportButs.push(data.entity);
    //         } else if (data.entity.id == "540") {
    //             exImportButs.push({
    //                 name: data.entity.alias,
    //                 url: "/lock/upload/6/downauthcheckmodel"
    //             });
    //             // exportButs.push(data.entity);
    //         }
    //     })
    //     commit("setdrydcBtn", {
    //         topBtns,
    //         exportButs,
    //         importButs,
    //         exImportButs
    //     })
    // },
  },
  getters: {
    getAdminInfo: (state) => {
      return filtration_isnext_return(state.adminInfo)
    },
    getAdminShow: (state) => {
      return state.mjAdminShow
    },
    // getroomdata: state => {
    //     return filtration_isnext_return(state.roomdata)
    // },
    // getroomlist: state => {
    //     return filtration_isnext_return(state.roomlist)
    // },
    // getfjczdialogVisible: state => {
    //     return state.fjczdialogVisible;
    // },
    // getfjg38dialogactiveName: state => {
    //     return state.dialogactiveName
    // },
    // getcheckedroom: state => {
    //     return state.checkedroom;
    // },
    // getplxfBtn: state => {
    //     return Storages.getStorage("plxfBtn");
    // }
  },
}

export default fj38
