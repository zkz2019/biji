<!-- 卡片操作记录 -->
<template>
  <el-dialog
    title="卡片操作记录"
    width="70%"
    class="importHistory"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/auth/fingercenter/finger/3/listFingerDel"
        ref="paging-table"
        :list="list"
        ajaxType="9"
        :param="param"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input clearable class="search" v-model="param.search" placeholder="输入卡号/姓名/人员编号查询"></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
        </span>
      </paging-table>
    </el-container>
    <outListDetails
      :dialogVisible="DetailsVisible"
      :fdid="fdid"
      @beforeClose="DetailsVisible=false"
    ></outListDetails>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import outListDetails from "./outListDetails";
export default {
  props: {
    dialogVisible: Boolean
  },
  components: {
    outListDetails
  },
  data() {
    let $this = this;
    return {
      DetailsVisible: false,
      param: { search: "" },
      fdid: "",
      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "80px"
        },
        {
          name: "操作时间",
          prop: "fdcdate",
          minWidth: "120px"
        },
        {
          name: "操作账号",
          prop: "userlogin",
          minWidth: "100px"
        },
        {
          name: "进度",
          prop: "fdallcount",
          width: "80px",
          formatter(row, b, c, d) {
            if (row) {
              let newtotal = Number(row.fdnocount) + Number(row.fdokcount);
              let total = Number(row.fdallcount);
              return Math.floor((newtotal / total) * 100) + "%";
            } else {
              return "";
            }
          }
        },
        {
          name: "操作类型",
          prop: "fdtype",
          minWidth: "80px"
        },
        {
          name: "操作",
          width: "100px",
          template: {
            props: ["scope"],
            methods: {
              onClick(key) {
                $this.onClick(this.scope.row);
              }
            },
            template: `<div class="operat-buts"> 
             <el-button type="text" size="small" @click.stop="onClick">详情</el-button>
            </div>`
          }
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      } else {
      }
    }
  },
  methods: {
    ...mapGetters(["getNumber"]),
    onClick(data) {
      this.fdid = data.fdid;
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
    }
  }
};
</script>
