import Vue from 'vue'
import Vuex from 'vuex'

import openTab from './modules/openTab'
import Table1 from './modules/tableindex'
import zhgl26 from './modules/zhgl26'
import zwgl230 from './modules/zwgl230'
// import fjgl38 from './modules/fjgl38'
import fullscreen from "./modules/fullscreen"
import dictionary from "./modules/dictionary"
import account from "./modules/account"
import fj38 from "./modules/fj38"

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    openTab,
    Table1,
    zhgl26,
    zwgl230,
    // fjgl38,
    fullscreen,
    dictionary,
    account,
    fj38,
  }
})
export default store