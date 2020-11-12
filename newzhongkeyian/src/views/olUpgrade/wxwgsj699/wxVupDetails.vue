<template>
  <el-dialog
    title="无线网关记录详情"
    width="70%"
    class="importHistory"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 wh100">
      <!-- <el-header class="query_headbox">
        <retrieval class="query_head">
          <inpbox :inpb="true">
            <el-input
              clearable
              class="qh_w270 qh_inp maR24"
              v-model="param.search"
              placeholder="输入门锁唯一ID/房间查询"
            ></el-input>
          </inpbox>
          <inpbox>
            <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
            <fel-button class="qh_btn" @click="onReset">重置</fel-button>
          </inpbox>
        </retrieval>
      </el-header>-->
      <paging-table
        interface="/system/onlineup/wxgateversionup/2/getwxgateversionupdetails"
        :list="listInfo"
        :param="param"
        :refresh="refresh"
      >
        <retrieval class="query_head">
          <inpbox :inpb="true">
            <el-input
              clearable
              class="qh_w270 qh_inp maR24"
              v-model="param.search"
              placeholder="输入门锁唯一ID/房间查询"
            ></el-input>
          </inpbox>
          <inpbox>
            <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
            <fel-button class="qh_btn" @click="onReset">重置</fel-button>
          </inpbox>
        </retrieval>
      </paging-table>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    duid: String | Number,
  },
  data() {
    let $this = this;
    return {
      param: { duid: "", search: "" },
      refresh: 0,
      listInfo: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "操作类型",
          prop: "duordertypename",
        },
        {
          name: "指令开始时间",
          prop: "dudcdate",
        },
        {
          name: "指令结束时间",
          prop: "dudedate",
        },

        {
          name: "网关位置",
          prop: "gatewaylocation",
        },
        {
          name: "版本号",
          prop: "deviceversion",
        },

        {
          name: "处理状态",
          width: "100px",
          template: {
            props: ["scope"],
            computed: {
              name() {
                return this.scope.row.dudstatusname;
                // if (this.scope.row.dudstatus == "0") {
                //   return "正在删除";
                // } else if (this.scope.row.dudstatus == "-1") {
                //   return "失败";
                // } else {
                //   return "成功";
                // }
              },
            },
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
              },
            },
            template: `<span :class='getClass()'>{{name}}</span>`,
          },
        },
        {
          name: "指令结果",
          width: "80px",
          prop: "dudstatename",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.dudstatename;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<ul><li :class='getClass()'>{{scope.row.dudstatename}}</li></ul>`,
          },
        },
        {
          name: "失败原因",
          prop: "dudremark",
        },
      ],
    };
  },
  computed: {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.param.duid = this.duid;
      } else {
        this.param.duid = "";
      }
      this.onRefresh();
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