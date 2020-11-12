<!-- 重载授权记录 -->
<template>
  <el-dialog
    title="重载授权记录"
    width="70%"
    class="importHistory"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/analysis/failauth/7/listNotsendAuthReload"
        ref="paging-table"
        :list="list"
        :param="param"
        ajaxType="9"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input
            clearable
            class="search"
            v-model="param.search"
            :placeholder="'输入房间名称/人员编号/人员姓名查询'"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
        </span>
      </paging-table>
    </el-container>
    <reLoadDetails
      :dialogVisible="DetailsVisible"
      :narid="narid"
      @beforeClose="DetailsVisible=false"
    ></reLoadDetails>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import reLoadDetails from "./reLoadDetails";
export default {
  props: {
    dialogVisible: Boolean,
  },
  components: {
    reLoadDetails,
  },
  data() {
    let $this = this;
    return {
      DetailsVisible: false,
      param: { search: "" },
      narid: "",
      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "80px",
        },
        {
          name: "时间",
          prop: "narcdate",
          minWidth: "120px",
        },
        {
          name: "操作账户",
          prop: "userlogin",
          minWidth: "90px",
        },
        {
          name: "进度",
          prop: "narallcount",
          width: "80px",
          formatter(row, b, c, d) {
            if (row) {
              let newtotal = Number(row.narnocount) + Number(row.narokcount);
              let total = Number(row.narallcount);
              return Math.floor((newtotal / total) * 100) + "%";
            } else {
              return "";
            }
          },
        },
        {
          name: "处理成功数",
          prop: "narokcount",
          minWidth: "100px",
        },
        {
          name: "处理失败数",
          prop: "narnocount",
          minWidth: "100px",
        },

        {
          name: "下发成功数",
          prop: "orderokcount",
          minWidth: "100px",
        },
        {
          name: "下发失败数",
          prop: "ordernocount",
          minWidth: "100px",
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
      }
    },
  },
  methods: {
    onClick(data) {
      this.narid = data.narid;
      this.DetailsVisible = true;
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
