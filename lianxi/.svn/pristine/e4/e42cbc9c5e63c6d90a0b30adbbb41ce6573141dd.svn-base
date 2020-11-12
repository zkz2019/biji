<template>
  <el-container>
    <el-header class="query_headbox">
      <com-title>{{ toParam.alias }}</com-title>
      <retrieval class="query_head">
        <inpbox :inpb="true">
          <el-select class="qh_inp" v-model="param.actiontype">
            <el-option label="全部操作类型" value></el-option>
            <el-option label="批量授权" value="1"></el-option>
            <el-option label="批量删除授权" value="2"></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="search con-search qh_inp"
            type="text"
            v-model="param.search"
            :placeholder="'输入' + getNumber() + '/姓名查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <el-button class="buta qh_btn" type="primary" @click="search"
            >查询</el-button
          >
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="pad0 query_main">
      <paging-table
        class="tobleList wh100"
        height="100%"
        interface="/access/v2.0/auth/a/listAccessAuthFinger"
        ajaxType="9"
        :list="list"
        :refresh="refresh"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <!-- <span class="sli but-blue" @click="onClick('d1')">
          <i class="ficon-image403"></i>批量授权指纹
        </span>-->
        <span class="sli but-blue" v-if="showBtn" @click.stop="onClick('d1')">
          <i class="ficon-batch"></i>批量添加指纹授权
        </span>
        <span
          class="sli but-blue"
          v-if="showDelBtn"
          @click.stop="onClick('d2')"
        >
          <i class="ficon-batch"></i>批量删除指纹授权
        </span>
      </paging-table>
    </el-main>
    <el-dialog
      title="操作详情"
      width="75%"
      class="grantDialog"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      :visible.sync="dialogVisible"
    >
      <el-container class="dialog-table6 query_main">
        <paging-table
          interface="/access/v2.0/auth/b/listAccessAuthFingerDetails"
          :param="grantParam"
          ajaxType="9"
          :refresh="grantRefresh"
          :list="grantList2"
        >
          <span
            v-for="(v, k) of topButs"
            :key="k"
            class="sli but-blue"
            @click="onClick(v.id, v)"
          >
            <i v-if="v.icon" :class="'ficon-' + v.icon"></i>
            {{ v.alias }}
          </span>
        </paging-table>
      </el-container>
    </el-dialog>
    <batchDelRight
      :dialogVisible="DelVisible"
      isType="6"
      @beforeClose="DelVisible = false"
    ></batchDelRight>
  </el-container>
</template>

<script>
import batchDelRight from "./../face/plsqmj868/batchDelRightMj";
import Storages from "../../utils/Storage.js"; //缓存工具
import { mapGetters } from "vuex";
export default {
  components: { batchDelRight },
  props: {
    toParam: null,
    topButs: Array,
    showDelBtn: Boolean,
    showBtn: Boolean,
  },
  data() {
    let $this = this;
    return {
      DelVisible: false,
      dialogVisible: false,
      title: "",
      grantParam: { authid: "", actiontype: "" },
      grantList2: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "门位置",
          // formatter(row) {
          //   return row.aglocation + "-" + row.amname;
          // },
          minWidth: "180px",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                let row = this.scope.row;
                $this.dialogVisible = false;
                $this.$router.push({
                  name: "门禁管理",
                  params: {
                    adid: row.adid,
                    amid: row.amid,
                    toTarget: "sfxx-mjglGrant",
                  },
                });
              },
            },
            template: `<el-button type="text" size="small" @click.stop="onClick">{{scope.row.aglocation}}</el-button>`,
          },
          // prop: "aglocation"
        },
        {
          name: "读头名称",
          prop: "ahname",
        },
        {
          name: "指纹编号",
          prop: "fingercode",
        },
        {
          name: "姓名",
          width: "60px",
          prop: "personname",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
        },
        {
          name: "授权详情",
          show: false,
          template: {
            props: ["scope"],
            template: `
            <el-tooltip placement="bottom-end">
              <div slot="content">授权开始时间 : {{scope.row.aafldsdate}}<br/>授权结束时间 : {{scope.row.aafldedate}}<br/>可使用次数 : {{scope.row.aafldusecount}}<br/>可用时间段 : {{scope.row.aafldopenstime+" - "+scope.row.aafldopenetime}}</div>
              <span size="small" style="color:#409eff">查看</span>
            </el-tooltip>`,
          },
        },
        {
          name: "处理状态",
          prop: "aafldstatus",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aafldstatus;
                if (value == "授权成功") {
                  return "puc-pg";
                } else if (value == "授权失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.aafldstatus}}</span>`,
          },
        },
        {
          name: "下发状态",
          prop: "aafldstate",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aafldstate;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败" || value == "授权已删除") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.aafldstate}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "aafldremark",
        },
      ],
      grantRefresh: 0,
      param: {
        search: "",
        actiontype: "",
      },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "授权下发时间",
          prop: "aaflcdate",
        },
        {
          name: "操作类型",
          prop: "actiontype",
          formatter(row) {
            return row.actiontype == "1" ? "批量授权" : "批量删除授权";
          },
        },
        {
          name: "操作总数",
          prop: "aaflcount",
          template: {
            props: ["scope"],
            methods: {
              isNumber(num) {
                if (num) {
                  return /^[0-9]*$/.test(num) && num != 0;
                }
                return false;
              },
              onClick() {
                let obj = this.scope.row;
                if (obj.aaflid) {
                  $this.grantParam.authid = obj.aaflid;
                  $this.grantParam.actiontype = obj.actiontype;
                  $this.grantRefresh = new Date().getTime();
                  if (obj.actiontype == "1") {
                    $this.title = "授权列表";
                    $this.grantList2[6].show = false;
                  } else {
                    $this.grantList2[6].show = true;
                    $this.title = "删除授权列表";
                  }
                  $this.dialogVisible = true;
                }
              },
            },
            template: `<div>
              <span v-if="isNumber(scope.row.aaflcount)"><a class="a-click" @click.stop="onClick">{{scope.row.aaflcount}}</a></span>
              <span v-else>{{scope.row.aaflcount}}</span>
            </div>`,
          },
        },
        {
          name: "操作成功数",
          prop: "aaflokcount",
        },
        {
          name: "操作失败数",
          prop: "aaflnocount",
        },
        {
          name: "下发成功数",
          prop: "aaflorderokcount",
        },
        {
          name: "下发失败数",
          prop: "aaflordernocount",
        },
        {
          name: "操作人账号",
          prop: "userlogin",
        },
        {
          name: "操作人姓名",
          prop: "username",
        },
        {
          name: "操作IP",
          width: "120px",
          prop: "ip",
        },
      ],
      refresh: 0,
    };
  },
  mounted() {
    this.getEject();
  },
  methods: {
    //重置事件
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.search();
    },
    ...mapGetters(["getNumber"]),
    beforeClose() {
      this.dialogVisible = false;
    },
    search() {
      this.refresh = new Date().getTime();
    },
    onClick(key, data) {
      if (key == "d1") {
        this.$emit("onClick", key, data);
      } else if (key == "d2") {
        this.DelVisible = true;
      } else if (key == "863") {
        this.$ajax(
          "/access/v2.0/auth/c/reloadAccessAuthFinger",
          { authid: this.grantParam.authid },
          "9",
          {},
          true
        )
          .then((res) => {
            this.$message({
              message: "重载成功!",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error",
            });
          });
      }
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "plsqmj864");
    },
    getEject() {
      this.$common.getEject(this, "list", "plsqmj864");
    },
  },
};
</script>