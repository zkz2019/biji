<!-- 操作记录 -->
<template>
  <el-dialog
    title="操作记录"
    width="70%"
    class="importHistory"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/analysis/expireauth/8/listExpireAuthRecord"
        ref="paging-table"
        :list="list"
        ajaxType="9"
        :param="param"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input
            clearable
            class="search"
            v-model="param.search"
            placeholder="输入房间名称/人员编号/人员姓名查询"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
        </span>
      </paging-table>
    </el-container>
    <historyDetails
      :dialogVisible="DetailsVisible"
      :earid="earid"
      v-bind="$attrs"
      @beforeClose="DetailsVisible=false"
    ></historyDetails>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import historyDetails from "./jjdqsqHistoryDetails";
export default {
  props: {
    dialogVisible: Boolean,
  },
  components: {
    historyDetails,
  },
  data() {
    let $this = this;
    return {
      DetailsVisible: false,
      param: { search: "" },
      earid: "",
      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "80px",
        },
        {
          name: "设备类型",
          prop: "devicetype",
          minWidth: "120px",
        },
        {
          name: "操作时间",
          prop: "earcdate",
          minWidth: "100px",
        },
        {
          name: "总数",
          prop: "earallcount",
          minWidth: "100px",
        },
        {
          name: "处理成功数",
          prop: "earokcount",
          minWidth: "100px",
        },
        {
          name: "处理失败数",
          prop: "earnocount",
          minWidth: "100px",
        },
        {
          name: "进度",
          prop: "earallcount",
          width: "80px",
          formatter(row) {
            if (row) {
              let newtotal = Number(row.earnocount) + Number(row.earokcount);
              let total = Number(row.earallcount);
              return Math.floor((newtotal / total) * 100) + "%";
            } else {
              return "";
            }
          },
        },
        {
          name: "操作类型",
          prop: "eartype",
          minWidth: "80px",
        },
        {
          name: "指令成功数",
          prop: "orderokcount",
          minWidth: "80px",
        },
        {
          name: "指令失败数",
          prop: "ordernocount",
          minWidth: "80px",
        },
        {
          name: "指令正在下发数",
          prop: "ordersendcount",
          minWidth: "80px",
        },
        {
          name: "操作账号",
          prop: "userlogin",
          minWidth: "80px",
        },
        {
          name: "操作",
          width: "100px",
          template: {
            props: ["scope"],
            methods: {
              onClick(key) {
                $this.onClick(this.scope.row);
              },
            },
            template: `<div class="operat-buts"> 
             <el-button type="text" size="small" @click.stop="onClick">详情</el-button>
            </div>`,
          },
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      } else {
      }
    },
  },
  methods: {
    ...mapGetters(["getNumber"]),
    onClick(data) {
      this.earid = data.earid;
      this.DetailsVisible = true;
      console.log("data", data);
    },
    onReset() {
      this.param.search = "";
      this.onRefresh();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
  },
};
</script>
