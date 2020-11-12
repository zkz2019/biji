<template>
  <el-dialog
    title="重载记录详情"
    width="70%"
    class="importHistory"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/lock/e/listBuildAuthReloadDetails"
        :list="listInfo"
        :param="param"
        ajaxType="9"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input clearable class="search" v-model="param.search" placeholder="输入账号查询"></el-input>
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
    barid: String | Number,
  },
  data() {
    let $this = this;
    return {
      param: { barid: "", search: "" },
      refresh: 0,
      listInfo: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "处理时间",
          prop: "barddate",
        },

        {
          name: "授权类型",
          prop: "authtype",
        },
        {
          name: "姓名",
          prop: "personname",
        },
        {
          name: "人员编号",
          prop: "personcode",
        },
        {
          name: "房间位置",
          prop: "roomlocation",
        },
        {
          name: "授权详情",
          prop: "bardcode",
        },
        {
          name: "处理状态",
          template: {
            props: ["scope"],
            computed: {
              name() {
                if (this.scope.row.bardstatus >= "1") {
                  return "成功";
                } else if (this.scope.row.bardstatus == "-1") {
                  return "失败";
                } else {
                  return "正在删除";
                }
              },
            },
            methods: {
              getClass() {
                let value = this.scope.row.bardstatus;
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
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.osstatus;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.osstatus}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "bardremark",
        },
      ],
    };
  },
  computed: {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.param.barid = this.barid;
        this.onRefresh();
      } else {
        this.param.barid = "";
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