import Storages from '../../utils/Storage.js' //缓存工具
import { ajax } from '@/request/http.js'
const dictionary = {
  state: {
    userinfo: Storages.getStorage('userinfo') || {},
    dictionary: Storages.getStorage('dictionary') || {}, //数字字典
  },
  mutations: {
    setDictionary(state, data) {
      state.dictionary = data
      Storages.setStorage('dictionary', state.dictionary)
    },
    setUserinfo(state, data) {
      state.userinfo = data
      Storages.setStorage('userinfo', state.userinfo)
    },
  },
  getters: {
    getCheckType(state) {
      return state.userinfo.checktype
    },
    // 是否支持门禁
    getIsDoor(state) {
      return Boolean(state.userinfo && state.userinfo.ismj == 1)
    },
    // 是否支持卡片
    getIsCard(state) {
      return Boolean(state.userinfo && state.userinfo.iscard == 1)
    },
    // 是否支持人脸
    getIsFace(state) {
      return Boolean(state.userinfo && state.userinfo.isface == 1)
    },
    // 是否支持app
    getIsApp(state) {
      return Boolean(state.userinfo && state.userinfo.isapp == 1)
    },
    // 是否支持指纹
    getIsFinger(state) {
      return Boolean(state.userinfo && state.userinfo.isfinger == 1)
    },
    // 是否支持密码
    getIsPwd(state) {
      return Boolean(state.userinfo && state.userinfo.ispassword == 1)
    },
    // 是否支持分组
    getIsClassify(state) {
      return Boolean(state.userinfo && state.userinfo.isfz == 1)
    },
    // 编号
    getNumber(state) {
      return state.dictionary['personcode|1'] || '编号'
    },
    // 公共房间细分
    getRoomnexttype: (state) => (id) => {
      if (id) {
        return state.dictionary['roomnexttype|' + id]
      } else {
        let obj = {}
        Object.keys(state.dictionary)
          .filter((key) => {
            return key.includes('roomnexttype|')
          })
          .forEach((key) => {
            obj[key.replace('roomnexttype|', '')] = state.dictionary[key]
          })
        return obj
      }
    },
    // 建筑房间类型
    getRoomtype2: (state) => (id) => {
      if (id) {
        return state.dictionary['roomtype2|' + id]
      } else {
        let obj = {}
        Object.keys(state.dictionary)
          .filter((key) => {
            return key.includes('roomtype2|')
          })
          .forEach((key) => {
            obj[key.replace('roomtype2|', '')] = state.dictionary[key]
          })
        return obj
      }
    },
    // 人员类型
    getPersontype: (state) => (id) => {
      if (id) {
        return state.dictionary['persontype|' + id]
      } else {
        let obj = {}
        Object.keys(state.dictionary)
          .filter((key) => {
            return key.includes('persontype|')
          })
          .forEach((key) => {
            obj[key.replace('persontype|', '')] = state.dictionary[key]
          })
        return obj
      }
    },
  },
  actions: {
    getDiction({ state, commit }) {
      return new Promise((resolve, reject) => {
        ajax('/login/home/8/getwordbook', {}, '1')
          .then((res) => {
            let result = res.result
            let obj = {}
            if (result) {
              result.forEach((element) => {
                obj[element.ddtype + '|' + element.wbdcode] = element.wbdvalue
              })
              commit('setDictionary', obj)
            }
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
}
export default dictionary
