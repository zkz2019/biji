<template>
  <el-dialog
    title="操作记录详情"
    width="70%"
    class="importHistory"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/login/main/7/listPersonAuthManageDetails"
        :list="listInfo"
        :param="param"
        ajaxType="9"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input clearable class="search" v-model="param.search" placeholder="输入授权位置/操作账号查询"></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
        </span>
      </paging-table>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    pamid: String | Number,
  },
  data() {
    let $this = this;
    return {
      param: { pamid: "", search: "" },
      refresh: 0,
      listInfo: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "创建时间",
          prop: "pamdcdate",
        },
        {
          name: "处理时间",
          prop: "pamdedate",
        },
        // {
        //   name: "授权开始时间",
        //   prop: "empsdate",
        // },
        // {
        //   name: "授权结束时间",
        //   prop: "empedate",
        // },
        // {
        //   name: "每日开门起始时间",
        //   prop: "openstime",
        // },
        // {
        //   name: "每日开门结束时间",
        //   prop: "openetime",
        // },
        {
          name: "位置",
          prop: "authlocation",
        },
        {
          name: "授权类型",
          prop: "pamdauthtype",
        },
        {
          name: "授权详情",
          prop: "pamdauthcode",
        },
        {
          name: "处理状态",
          template: {
            props: ["scope"],
            computed: {
              name() {
                if (this.scope.row.pamdstatus == "0") {
                  return "正在删除";
                } else if (this.scope.row.pamdstatus == "-1") {
                  return "失败";
                } else {
                  return "成功";
                }
              },
            },
            methods: {
              getClass() {
                let value = this.scope.row.pamdstatus;
                if (value == "1") {
                  return "puc-pg";
                } else if (value == "-1") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{name}}</span>`,
          },
        },
        {
          name: "指令状态",
          prop: "authissend",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.authissend;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.authissend}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "pamdremark",
        },
      ],
    };
  },
  computed: {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.param.pamid = this.pamid;
        this.onRefresh();
      } else {
        this.param.pamid = "";
      }
    },
  },
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onReset() {
      this.param.search = "";
      this.onRefresh();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
  },
};
</script>