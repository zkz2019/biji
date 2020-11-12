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
        interface="/access/v2.0/auth/m/listAccessAuthApp"
        ajaxType="9"
        :list="list"
        :refresh="refresh"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <!-- <span class="sli but-blue" @click="onClick('d1')">
          <i class="ficon-image403"></i>批量授权蓝牙
        </span>-->

        <span class="sli but-blue" v-if="showBtn" @click.stop="onClick('d1')">
          <i class="ficon-batch"></i>批量添加蓝牙授权
        </span>
        <span
          class="sli but-blue"
          v-if="showDelBtn"
          @click.stop="onClick('d2')"
        >
          <i class="ficon-batch"></i>批量删除蓝牙授权
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
          interface="/access/v2.0/auth/n/listAccessAuthAppDetails"
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
      isType="8"
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
      titleList: "",
      DelVisible: false,
      dialogVisible: false,
      grantParam: { authid: "", actiontype: "" },
      grantList2: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "门位置",
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
          name: "姓名",
          width: "60px",
          prop: "personname",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
        },
        {
          name: "处理状态",
          prop: "aaaldstatus",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aaaldstatus;
                if (value == "授权成功") {
                  return "puc-pg";
                } else if (value == "授权失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.aaaldstatus}}</span>`,
          },
        },
        // {
        //   name: "下发状态",
        //   prop: ""
        // },
        {
          name: "失败原因",
          prop: "aaaldremark",
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
          prop: "aaalcdate",
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
          prop: "aaalcount",
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
                if (obj.aaalid) {
                  $this.grantParam.authid = obj.aaalid;
                  $this.grantParam.actiontype = obj.actiontype;
                  $this.grantRefresh = new Date().getTime();
                  if (obj.actiontype == "1") {
                    $this.titleList = "蓝牙授权列表";
                  } else {
                    $this.titleList = "蓝牙删除授权列表";
                  }
                  $this.dialogVisible = true;
                }
              },
            },
            template: `<div>
              <span v-if="isNumber(scope.row.aaalcount)"><a class="a-click" @click.stop="onClick">{{scope.row.aaalcount}}</a></span>
              <span v-else>{{scope.row.aaalcount}}</span>
            </div>`,
          },
        },
        {
          name: "操作成功数",
          prop: "aaalokcount",
        },
        {
          name: "操作失败数",
          prop: "aaalnocount",
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