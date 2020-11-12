<template>
  <el-dialog
    title="网关自动升级流程"
    width="70%"
    class="importHistory"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/system/onlineup/yxgateversionup/5/getautoversionupdetails"
        :list="listInfo"
        :param="param"
        :refresh="refresh"
      ></paging-table>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    auid: String | Number
  },
  data() {
    let $this = this;
    return {
      param: { auid: "" },
      refresh: 0,
      listInfo: [
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "指令开始时间",
          width:"160px",
          prop: "dudcdate"
        },
        {
          name: "指令结束时间",
          width:"160px",
          prop: "dudedate"
        },
        {
          name: "总包数",
          prop: "dudmaxno"
        },
        {
          name: "已传输包数",
          prop: "dudindexno"
        },
        {
          name: "进度",
          prop: "dudrate"
        },
        {
          name: "指令结果",
          prop: "dudstatename"
        },

        {
          name: "处理状态",
          template: {
            props: ["scope"],
            // computed: {
            //   name() {
            //     if (this.scope.row.dudstatus == "0") {
            //       return "正在删除";
            //     } else if (this.scope.row.dudstatus == "-1") {
            //       return "失败";
            //     } else {
            //       return "成功";
            //     }
            //   }
            // },
            methods: {
              getClass() {
                let value = this.scope.row.dudstatus;
                if (value == "1") {
                  return "puc-pg";
                } else if (value == "-1") {
                  return "puc-px";
                } else {
                  return "";
                }
              }
            },
            template: `<span :class='getClass()'>{{scope.row.dudstatusname}}</span>`
          }
        },
        {
          name: "操作类型",
          prop: "duordertypename"
        },
        {
          name: "失败原因",
          prop: "dudremark"
        }
      ]
    };
  },
  computed: {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.param.auid = this.auid;
      } else {
        this.param.auid = "";
      }
      this.onRefresh();
    }
  },
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    }
  }
};
</script>