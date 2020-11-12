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
        interface="access/v2.0/auth/4/listAccessAuthCard"
        ajaxType="9"
        :list="list"
        :refresh="refresh"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <span class="sli but-blue" v-if="showBtn" @click.stop="onClick('d1')">
          <i class="ficon-batch"></i>批量添加卡片授权
        </span>
        <span
          class="sli but-blue"
          v-if="showDelBtn"
          @click.stop="onClick('d2')"
        >
          <i class="ficon-batch"></i>批量删除卡片授权
        </span>
        <!-- <span class="sli but-blue" @click="onClick('d1')">
          <i class="ficon-image403"></i>批量授权卡
        </span>-->
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
          interface="/access/v2.0/auth/5/listAccessAuthCardDetails"
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
      isType="4"
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
      title: "",
      DelVisible: false,
      dialogVisible: false,
      grantParam: { authid: "" },
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
        },
        {
          name: "卡号",
          prop: "cardcode",
        },
        {
          name: "卡类别",
          width: "70px",
          prop: "cardtype",
        },
        {
          name: "姓名",
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
              <div slot="content">
              授权开始时间 : {{scope.row.aacldsdate}}<br/>
              授权结束时间 : {{scope.row.aacldedate}}<br/>
              可使用次数 : {{scope.row.aacldusecount}}<br/>
              可用时间段 : {{scope.row.aacldopenstime+" ~ "+scope.row.aacldopenetime}}</div>
              <span  size="small" style="color:#409eff">查看</span> 
            </el-tooltip>`,
          },
        },
        // {
        //   name: "授权开始时间",
        //   prop: "aacldsdate"
        // },
        // {
        //   name: "授权结束时间",
        //   prop: "aacldedate"
        // },
        // {
        //   name: "可使用次数",
        //   prop: "aacldusecount"
        // },
        // {
        //   name: "可用时间段",
        //   prop: "",
        //   formatter(row, obj) {
        //     return row.aacldopenstime + "~" + row.aacldopenetime;
        //   }
        // },
        {
          name: "处理状态",
          prop: "aacldstatus",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aacldstatus;
                if (value == "授权成功") {
                  return "puc-pg";
                } else if (value == "授权失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.aacldstatus}}</span>`,
          },
        },
        {
          name: "下发状态",
          prop: "aacldstate",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aacldstate;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败" || value == "授权已删除") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.aacldstate}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "aacldremark",
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
          prop: "aaclcdate",
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
          prop: "aaclcount",
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
                if (obj.aaclid) {
                  $this.grantParam.authid = obj.aaclid;
                  $this.grantRefresh = new Date().getTime();
                  if (obj.actiontype == "1") {
                    $this.title = "授权列表";
                    $this.grantParam.actiontype = "1";
                    $this.grantList2[6].show = false;
                  } else {
                    console.log("this.grantList2", $this.grantList2);
                    $this.grantList2[6].show = true;
                    $this.title = "删除授权列表";
                    $this.grantParam.actiontype = "2";
                  }
                  $this.dialogVisible = true;
                }
              },
            },
            template: `<div>
              <span v-if="isNumber(scope.row.aaclcount)"><a class="a-click" @click.stop="onClick">{{scope.row.aaclcount}}</a></span>
              <span v-else>{{scope.row.aaclcount}}</span>
            </div>`,
          },
        },
        {
          name: "操作成功数",
          prop: "aaclokcount",
        },
        {
          name: "操作失败数",
          prop: "aaclnocount",
        },
        {
          name: "下发成功数",
          prop: "aaclzlokcount",
        },
        {
          name: "下发失败数",
          prop: "aaclzlnocount",
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
      console.log("key", key);
      if (key == "d1") {
        this.$emit("onClick", key, data);
      } else if (key == "d2") {
        this.DelVisible = true;
      } else if (key == "860") {
        this.$ajax(
          "/access/v2.0/auth/6/reloadAccessAuthCard",
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