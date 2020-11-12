<template>
  <div class="rowb_right">
    <div class="jlbox heig100">
      <el-tabs
        v-if="tabListMap&&tabListMap.length>0"
        class="heig100"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <template v-for="(item,ind) in tabList">
          <el-tab-pane :key="ind" v-loading="Loading" :label="item.label" :name="item.name">
            <div class="paging-tables tables">
              <sytabel
                :showHeader="false"
                :noOpera="true"
                :queryData="item.data||[]"
                :list="item.list||[]"
              ></sytabel>
            </div>
            <div v-show="item.more||true" class="more" @click="onJump(item.label)">
              <span class="ficon-image300">查看更多</span>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
      <el-tooltip effect="dark" content="调整排序" placement="top-end">
        <div v-if="tabListMap&&tabListMap.length>0" class="setUp" @click.stop="onSetUpShow">
          <span class="ficon-image425"></span>
        </div>
      </el-tooltip>
      <div v-show="setUpShow" class="setUpBox" @click.stop>
        <ul class="setUpSort">
          <li v-for="txt in tabListMap" :key="txt">{{txt}}</li>
          <p class="bottomTip">拖动可调整排序</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import sytabel from "./sytabel";
import { mapState } from "vuex";
import Storages from "./../../utils/Storage.js"; //缓存工具
export default {
  components: {
    sytabel,
  },
  props: {
    chaxunTabList: Array,
  },
  // ["querys1", "querys2", "querys3", "querys4", "querys5"],
  data() {
    return {
      Loading: false,
      jlcxMore: true,
      xybjMore: true,
      dcdlMore: true,
      ydcxMore: true,
      jjgqmsMore: true,
      setUpShow: false,
      yskmList: [
        { name: "开门时间", prop: "keyopendate" },
        { name: "房间位置", prop: "roomlocation" },
        { name: "开门方式", prop: "type" },
      ],
      xybjList: [
        { name: "报警时间", prop: "lockxydate" },
        { name: "房间位置", prop: "roomlocation" },
        { name: "类型", prop: "type" },
      ],
      ddlbjList: [
        { name: "房间位置", prop: "roomlocation" },
        { name: "剩余电量", prop: "roomquantity" },
        { name: "类型", prop: "type" },
      ],
      ydcxList: [
        { name: "异动时间", prop: "changedate" },
        { name: "房间位置", prop: "roomlocation" },
        { name: "变动人", prop: "personname" },
        { name: "类型", prop: "authtype" },
      ],
      stkmList: [
        { name: "开门时间", prop: "keyopendate" },
        { name: "房间位置", prop: "roomlocation" },
        { name: "类型", prop: "type" },
      ],
      wxfsqList: [
        { name: "下发时间", prop: "senddate" },
        { name: "授权位置", prop: "authlocation" },
        { name: "授权类型", prop: "authtype" },
        { name: "归属人", prop: "personname" },
      ],
      jjgqmsList: [
        { name: "到期时间", prop: "edate" },
        { name: "剩余天数", prop: "daysRemaining", width: "70px" },
        { name: "授权位置", prop: "authlocation" },
        { name: "归属人", prop: "personname", width: "65px" },
        { name: "授权类型", prop: "authtype", width: "80px" },
      ],
      tabList: [
        {
          label: "试探开门",
          name: "five",
        },
        {
          label: "异动查询",
          name: "four",
        },
        {
          label: "低电量报警",
          name: "third",
        },
        {
          label: "虚掩报警",
          name: "second",
        },
        {
          label: "钥匙开门",
          name: "first",
        },
        {
          label: "未下发门锁授权",
          name: "sixth",
        },
        {
          label: "即将到期门锁授权",
          name: "seventh",
        },
      ],
      activeName: "first",
      times: null,
      tabListMap: [],
    };
  },
  computed: {
    ...mapState({
      menuObj: (state) => state.openTab.menuObj,
    }),
  },
  mounted() {
    this.setactiveName(); //初始值设定
    this.getunlocking();
    this.getmore();
    this.setTabList();
    this.setSort();
  },
  beforeDestroy() {
    this.activeName = "first";
    clearInterval(this.times);
  },
  methods: {
    onSetUpShow() {
      this.setUpShow = !this.setUpShow;
    },
    closeUpShow() {
      this.setUpShow = false;
    },
    setTabList(num = 0) {
      if (this.chaxunTabList.length == 0) {
        if (num == 100) return;
        setTimeout(() => {
          this.setTabList(++num);
        }, 100);
      } else {
        let map = Storages.getlocalStorage("syTableSort");
        if (map) {
          let newTabList = [];
          map.forEach((item) => {
            if (this.chaxunTabList.indexOf(item) > -1) {
              newTabList.push(item);
            }
          });
          this.chaxunTabList.forEach((item) => {
            if (map.indexOf(item) == -1) {
              newTabList.push(item);
            }
          });
          this.tabListMap = newTabList;
        } else {
          this.tabListMap = this.chaxunTabList;
        }
        this.changeSort();
      }
    },
    setSort() {
      let $this = this;
      var example1 = document.querySelector(".setUpSort");
      let sort = new Sortable(example1, {
        animation: 150,
        onUpdate: function (evt) {
          let old = $this.tabListMap.splice(evt.oldIndex, 1);
          $this.tabListMap.splice(evt.newIndex, 0, old[0]);
          Storages.setlocalStorage("syTableSort", $this.tabListMap);
          $this.changeSort();
        },
      });
    },
    changeSort() {
      let tablist = [];
      this.tabListMap.forEach((label) => {
        let list = this.tabList.find((item) => {
          return item.label == label;
        });
        tablist.push(list);
      });
      this.tabList = tablist;
    },

    setactiveName() {
      this.times = setInterval(() => {
        let el = document.querySelector(".jlbox .el-tabs__content");
        if (el) {
          if (el.children[0]) {
            let fid = el.children[0].id.substring(5);
            this.activeName = fid;
            clearInterval(this.times);
          }
        }
      }, 100);
    },
    //隐藏查看更多
    getmore() {
      if (this.menuObj && this.menuObj["sklscx92"]) {
        this.jlcxMore = true;
      } else {
        this.jlcxMore = false;
      }
      if (this.menuObj && this.menuObj["mxybjtj252"]) {
        this.xybjMore = true;
      } else {
        this.xybjMore = false;
      }
      // ddlbjtj261 改成 dcdlcx162
      // 跳转页面是 dcdlcx162 所以 判断应该也是 dcdlcx162
      // 改 bug 146
      if (this.menuObj && this.menuObj["dcdlcx162"]) {
        this.dcdlMore = true;
      } else {
        this.dcdlMore = false;
      }
      if (this.menuObj && this.menuObj["ydcx204"]) {
        this.ydcxMore = true;
      } else {
        this.ydcxMore = false;
      }

      if (this.menuObj && this.menuObj["jjdqsqcx976"]) {
        this.jjgqmsMore = true;
      } else {
        this.jjgqmsMore = false;
      }
    },
    //查看更多
    onJump(name) {
      if (name === "试探开门") {
        this.$router.push({ name: "记录查询", params: { type: "6" } });
      } else if (name === "异动查询") {
        this.$router.push("ydcx204");
      } else if (name === "低电量报警") {
        this.$router.push({
          name: "电池电量查询",
          params: { quantitylv: "30" },
        });
      } else if (name === "虚掩报警") {
        this.$router.push("mxybjtj252");
      } else if (name === "钥匙开门") {
        this.$router.push({
          name: "记录查询",
          params: { type: "8" },
        });
      } else if (name === "未下发门锁授权") {
        this.$router.push({
          name: "授权未下发查询",
          params: { devicetype: "1" },
        });
      } else if (name === "即将到期门锁授权") {
        this.$router.push("jjdqsqcx976");
        // this.$router.push({
        //   name: "即将到期授权查询",
        // });
      }
    },
    //选项卡切换
    handleClick(tab, event) {
      this.getunlocking();
      this.setUpShow = false;
    },
    // 开门记录
    getunlocking() {
      this.Loading = true;
      this.$ajax("/login/home/6/getunlocking", { rows: 8 })
        .then((res) => {
          this.Loading = false;
          let unlocking = res.result;
          this.tabList.forEach((item) => {
            if (item.label == "试探开门") {
              item.data = unlocking.stopenrecord;
              item.list = this.stkmList;
              item.more = this.jlcxMore;
            } else if (item.label == "异动查询") {
              item.data = unlocking.changerecord;
              item.list = this.ydcxList;
              item.more = this.ydcxMore;
            } else if (item.label == "低电量报警") {
              item.data = unlocking.quantityanalysis;
              item.list = this.ddlbjList;
              item.more = this.dcdlMore;
            } else if (item.label == "虚掩报警") {
              item.data = unlocking.lockxyanalysis;
              item.list = this.xybjList;
              item.more = this.xybjMore;
            } else if (item.label == "钥匙开门") {
              item.data = unlocking.keyopenrecord;
              item.list = this.yskmList;
              item.more = this.jlcxMore;
            } else if (item.label == "未下发门锁授权") {
              item.data = unlocking.notissuedlockauth;
              item.list = this.wxfsqList;
              // item.more = this.jlcxMore;
            } else if (item.label == "即将到期门锁授权") {
              item.data = unlocking.dueLockAuthList;
              item.list = this.jjgqmsList;
              item.more = this.jjgqmsMore;
            }
          });
          this.tabList = JSON.parse(JSON.stringify(this.tabList));
        })
        .catch((err) => {
          this.Loading = false;
          console.log(err);
        });
    },
  },
};
</script>

