import Vue from 'vue'
import VueRouter from 'vue-router'
import Storages from '../utils/Storage.js' //缓存工具
import store from '@/store'
Vue.use(VueRouter)

//一级页面
import home from '@/views/Home/Home' //路由主页
// const home = () => import('@/views/Home/Home') //路由主页
import sy302 from '@/views/sy/sy302' //首页
// const sy302 = () => import('@/views/sy/sy302') //首页
import Login from '@/views/Login/Login' //登录
// const Login = () => import('@/views/Login/Login') //登录
import ssologin from '@/views/Login/ssologin' // 单点
// const ssologin = () => import('@/views/Login/ssologin') //单点

//导航一级页面
const pages404 = () => import('@/views/404') //404
// const fjgl38 = () => import('@/views/fjgl38/fjgl38') //房间管理
// const fjgl38 = () => import('@/views/fj38/fj38') //房间管理
// const plxf = () => import('@/views/fj38/fjbatch') //房间管理

//批量授权 EN
let routes = [
  {
    name: '登录',
    path: '/login',
    component: Login,
  },
  {
    name: '单点登录',
    path: '/ssologin',
    component: ssologin,
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/',
    component: home,
    children: [
      {
        path: 'index',
        name: '首页',
        component: sy302,
      },
      {
        path: 'fjgl38',
        name: '房间管理',
        component: () => import('@/views/fj38/fj38'),
      },
      // {
      //   path: 'mjgl590',
      //   name: '老门禁管理',
      //   component: () => import('@/views/mjgl590/mjgl590'),
      // },
      {
        path: 'mjgl824',
        name: '门禁管理',
        component: () => import('@/views/mjgl824/mjgl824'),
      },
      {
        path: 'zzjggl2',
        name: '组织管理',
        component: () => import('@/views/zzgl/organization'),
      },
      {
        path: 'jsgl107',
        name: '角色管理',
        component: () => import('@/views/role/index'),
      },
      {
        path: 'kwzx382',
        name: '卡务中心',
        component: () => import('@/views/kwgl/cards'),
      },
      {
        path: 'lyys768',
        name: '蓝牙钥匙',
        component: () => import('@/views/bluetooth/bluetooth'),
      },

      {
        path: 'rlgl866',
        name: '人脸管理',
        component: () => import('@/views/face/index'),
      },
      {
        path: 'zwgl383',
        name: '指纹管理',
        component: () => import('@/views/fingerprint/fingerprints'),
      },
      {
        path: 'sbjk203',
        name: '设备监控',
        component: () => import('@/views/sbjk203/sbjk203'),
      },
      {
        path: 'xtcs279',
        name: '系统参数',
        component: () => import('@/views/system/systems'),
      },
      {
        path: 'rygl437',
        name: '人员管理',
        component: () => import('@/views/personnel/personnel'),
      },
      {
        path: 'sklscx92',
        name: '记录查询',
        component: () => import('@/views/query/sklscx92'),
      },
      {
        path: 'mjjlcx600',
        name: '门禁记录查询',
        component: () => import('@/views/query/mjjlcx600'),
      },
      {
        path: 'sqwxfcx935',
        name: '授权未下发查询',
        component: () => import('@/views/query/sqwxfcx935'),
      },
      {
        path: 'jjdqsqcx976',
        name: '即将到期授权查询',
        component: () => import('@/views/query/jjdqsqcx976'),
      },
      {
        path: 'dlxhcx944',
        name: '电池消耗查询',
        component: () => import('@/views/query/dlxhcx944'),
      },
      {
        path: 'wgcx189',
        name: '晚归查询',
        component: () => import('@/views/query/wgcx189'),
      },
      {
        path: 'wgcx190',
        name: '未归查询',
        component: () => import('@/views/query/wgcx190'),
      },
      {
        path: 'wsqkmcx1002',
        name: '未授权开门查询',
        component: () => import('@/views/query/wsqkmcx1002'),
      },
      {
        path: 'ydcx204',
        name: '异动查询',
        component: () => import('@/views/query/ydcx204'),
      },
      {
        path: 'zlcx137',
        name: '指令查询',
        component: () => import('@/views/query/zlcx137'),
      },
      {
        path: 'dcdlcx162',
        name: '电池电量查询',
        component: () => import('@/views/query/dcdlcx162'),
      },
      {
        path: 'xgjlcx98',
        name: '巡更记录查询',
        component: () => import('@/views/query/xgjlcx98'),
      },
      {
        path: 'ldzstj163',
        name: '楼栋住宿统计',
        component: () => import('@/views/query/ldzstj163'),
      },
      {
        path: 'skkmtj100',
        name: '刷卡开门统计',
        component: () => import('@/views/query/skkmtj100'),
      },
      {
        path: 'ckcbtj254',
        name: '常开/常闭统计',
        component: () => import('@/views/query/ckcbtj254'),
      },
      {
        path: 'mxybjtj252',
        name: '门虚掩报警统计',
        component: () => import('@/views/query/mxybjtj252'),
      },
      {
        path: 'ddlbjtj261',
        name: '低电量报警统计',
        component: () => import('@/views/query/ddlbjtj261'),
      },
      {
        path: 'stkmtj577',
        name: '人员区域分布统计',
        component: () => import('@/views/query/stkmtj577'),
      },
      {
        path: 'xtrz447',
        name: '系统日志',
        component: () => import('@/views/journal/journals'),
      },
      {
        path: 'jzgl27',
        name: '建筑管理',
        component: () => import('@/views/building/index'),
      },
      {
        path: 'yhgl103',
        name: '账户管理',
        component: () => import('@/views/account/index'),
      },
      {
        path: 'sbgl34',
        name: '设备管理',
        component: () => import('@/views/device/devices'),
      },
      {
        path: 'kjcz299',
        name: '快捷操作',
        component: () => import('@/views/quick/index'),
      },
      {
        path: 'qczldl515',
        name: '清除指令队列',
        component: () => import('@/views/queue/index'),
      },
      {
        path: 'plxf',
        name: '批量下发',
        component: () => import('@/views/fj38/fjbatch'),
      },
      {
        path: 'tgl621',
        name: '团管理',
        component: () => import('@/views/group/index'),
      },
      {
        path: 'sbsj672',
        name: '在线升级',
        component: () => import('@/views/olUpgrade/index'),
      },
      {
        path: 'xxts683',
        name: '消息推送',
        component: () => import('@/views/news/index'),
      },
      {
        path: '*',
        component: pages404,
      },
    ],
  },
  {
    path: '*',
    component: pages404,
    hidden: true,
  },
]
const router = new VueRouter({
  mode: 'history',
  routes: routes,
})

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  console.log('to,from', to, from)
  if (to.path != from.path) {
    let isLogin = Storages.getStorage('token')
    if (isLogin) {
      let path = to.path
      if (to.path === '/login' || to.path === '/ssologin') {
        console.log('退出4')
        next()
      } else {
        path = path.replace(/^\//, '')
        if (store.state.openTab.menuObj[path] || path == 'index') {
          next()
        } else {
          store.commit('set_active_index', 'index')
          if (from.path != '/index') {
            next('/index')
          }
        }
      }
    } else {
      if (to.path === '/login' || to.path === '/ssologin') {
        //这就是跳出循环的关键
        console.log('退出1')
        next()
      } else {
        console.log('退出2')
        store.dispatch('clearAccount')
        if (from.path != '/login') {
          next('/login')
        }
      }
    }
  }
})
export default router
