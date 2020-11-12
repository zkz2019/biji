<!-- 团信息 -->
<template>
  <el-dialog
    title="团信息"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="beforeClose"
    append-to-body
  >
    <el-container class="heig500">
      <el-header class="query_headbox">
        <retrieval class="query_head marpadbor0" style="padding-left:20px;">
          <inpbox :inptext="'请输入'">
            <el-input
              clearable
              class="qh_inp qh_w270"
              v-model="param.search"
              :placeholder="'输入团名/团长/团长手机查询'"
            ></el-input>
          </inpbox>
          <inpbox>
            <fel-button class="qh_btn" type="primary" @click="search">查询</fel-button>
            <fel-button class="qh_btn" @click="onReset">重置</fel-button>
          </inpbox>
        </retrieval>
      </el-header>
      <el-main class="query_main" style="padding-top:10px;">
        <paging-table
          class="tobleList wh100"
          height="100%"
          :interface="url"
          :list="list"
          :refresh="refresh"
          :param="param"
          @cell-click="onSelection"
          :noOpera="true"
        ></paging-table>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  props: {
    url: { type: String, default: "/lock/operate/hotel/5/getteam" },
    dialogVisible: Boolean,
    obj: Object
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      param: {
        search: "",
        personcode: ""
      },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "主账房",
          prop: "mainaccountroom"
        },
        {
          name: "团名",
          prop: "teamname"
        },
        {
          name: "预订开始时间",
          prop: "tpstime"
        },
        {
          name: "预订结束时间",
          prop: "tpetime"
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.param = { ...this.param, ...this.obj };
        this.search();
      }
    },
    obj(val) {},
    personcode(val) {
      if (val) {
        this.search();
      }
    }
  },
  created() {},
  methods: {
    onSelection(data) {
      this.$emit("onSelection", data);
      this.beforeClose();
    },
    search() {
      this.refresh = new Date().getTime();
    },
    onReset() {
      this.param.search = "";
      this.search();
    },
    beforeClose() {
      this.$emit("beforeClose");
    }
  }
};
</script>