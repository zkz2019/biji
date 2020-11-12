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
          <el-button class="buta qh_btn" type="primary" @click="cardInput"
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
        interface="/auth/app/appauth/1/getappauth"
        @onSelection="onSelection"
        :list="list"
        :refresh="refresh"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <!-- <span class="sli but-blue" v-if="true" @click="onClick('d1')">
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
          v-if="grantType == 1"
          interface="/auth/app/appauth/2/getappauthinfo"
          :param="grantParam"
          :refresh="grantRefresh"
          :list="grantList1"
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

        <paging-table
          v-else
          interface="/auth/app/appauth/3/getappauthbackinfo"
          :param="grantParam"
          :refresh="grantRefresh"
          :list="grantList1"
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
      isType="7"
      @beforeClose="DelVisible = false"
    ></batchDelRight>
  </el-container>
</template>

<script>
import batchDelRight from "./../kwgl/batchDelRight";
import Storages from "../../utils/Storage.js"; //缓存工具
import { mapGetters } from "vuex";
export default {
  components: { batchDelRight },
  props: {
    toParam: null,
    showBtn: Boolean,
    showDelBtn: Boolean,
    topButs: Array,
  },
  data() {
    let $this = this;
    return {
      titleList: "",
      DelVisible: false,
      dialogVisible: false,
      grantParam: { sceid: "" },
      grantType: "1",
      grantList1: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "房间位置",
          // prop: "roomlocation",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                let row = this.scope.row;
                let arr = row.roomlocation2.split(",");
                let roomlocationName = row.roomlocation;
                let roomlocation = [];
                arr.forEach((item) => {
                  if (item) {
                    roomlocation.push(item);
                  }
                });
                $this.dialogVisible = false;
                $this.$router.push({
                  name: "房间管理",
                  params: {
                    roomid: row.roomid,
                    roomlocation,
                    roomlocationName,
                    toTarget: "sfxx-adminKinguser",
                  },
                });
              },
            },
            template: `<el-button type="text" size="small" @click.stop="onClick">{{scope.row.roomlocation}}</el-button>`,
          },
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
          name: "处理状态",
          prop: "saedstatus",
          template: {
            props: ["scope"],
            computed: {
              name() {
                let value = this.scope.row.saedstatus;
                if (value == "0") {
                  return "正在授权";
                } else if (value == "1") {
                  return "授权成功";
                } else {
                  return "授权失败";
                }
              },
            },
            methods: {
              getClass() {
                let value = this.scope.row.saedstatus;
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
          name: "失败原因",
          prop: "saedremark",
        },
      ],
      grantRefresh: 0,
      dialogEdit: false,
      editData: [],
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
          name: "操作时间",
          prop: "scecdate",
        },
        // {
        //   name: "授权类型",
        //   prop: "specialtype"
        // },
        {
          name: "操作类型",
          prop: "actiontype",
          formatter(row) {
            return row.actiontype == "1" ? "批量授权" : "批量删除授权";
          },
        },
        {
          name: "操作总数",
          prop: "sceallcount",
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
                if (obj.sceid) {
                  $this.grantType = obj.actiontype;
                  if (obj.actiontype == "1") {
                    $this.titleList = "蓝牙授权列表";
                  } else {
                    $this.titleList = "蓝牙删除授权列表";
                  }
                  $this.grantParam.sceid = obj.sceid;
                  $this.grantRefresh = new Date().getTime();
                  $this.dialogVisible = true;
                }
              },
            },
            template: `<div>
              <span v-if="isNumber(scope.row.sceallcount)"><a class="a-click" @click.stop="onClick">{{scope.row.sceallcount}}</a></span>
              <span v-else>{{scope.row.sceallcount}}</span>
            </div>`,
          },
        },
        {
          name: "操作成功数",
          prop: "sceokcount",
        },
        {
          name: "操作失败数",
          prop: "scenocount",
        },
        // {
        //   name: "指令成功数",
        //   prop: "scezlokcount"
        // },
        // {
        //   name: "指令失败数",
        //   prop: "scezlnocount"
        // },
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
      tableData: [],
      defaultData: {},
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
      this.cardInput();
    },
    ...mapGetters(["getNumber"]),
    beforeClose() {
      this.dialogVisible = false;
    },
    onSelection(data) {
      this.tableData = data;
    },
    confirm(data) {
      let arr = [];
      if (this.editData instanceof Array) {
        this.editData.forEach((obj) => {
          obj["oledate"] = data.edate || "";
        });
        arr = this.editData;
      } else {
        this.editData["oledate"] = data.edate || "";
        arr.push(this.editData);
      }
      this.edit(arr);
    },
    cardInput() {
      this.refresh = new Date().getTime();
    },
    //删除离线授权
    delete(arr) {
      this.$confirm("确定要删除这些授权吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax(
            "/auth/cardcenter/offlineauth/saveofflineauth/1/deleteofflineauth",
            {},
            "1",
            arr
          )
            .then((res) => {
              this.cardInput();
              this.$message({
                message: "删除成功",
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
        })
        .catch(() => {});
    },
    //修改
    edit(arr) {
      this.$ajax(
        "/auth/cardcenter/offlineauth/saveofflineauth/1/updateofflineauth",
        {},
        "1",
        arr
      )
        .then((res) => {
          this.cardInput();
          this.dialogEdit = false;
          this.$message({
            message: "修改成功",
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
    },
    onClick(key, data) {
      if (key == 474) {
        this.submitForm();
      } else if (key == "d1") {
        this.$emit("onClick", key, data);
      } else if (key == "d2") {
        this.DelVisible = true;
      }
    },
    submitForm() {
      this.inReloadlotcard(this.grantType, this.grantParam.sceid);
    },
    inReloadlotcard(type, sceid) {
      this.$confirm(
        `确定要重载${type != 1 ? "删除" : ""}指纹的授权吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let url =
            "/auth/fingercenter/fingerauth/reload/1/reloadlotfingerauth";
          if (type == 4) {
            url =
              "/auth/fingercenter/fingerauth/reload/2/reloadlotfingerbackauth";
          }
          this.$ajax(url, { sceid }, "1", {}, true)
            .then((res) => {
              this.$message({
                message: "重载授权成功",
                type: "success",
              });
              this.grantRefresh = new Date().getTime();
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error",
              });
            });
        })
        .catch(() => {});
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "plsq770");
    },
    getEject() {
      this.$common.getEject(this, "list", "plsq770");
    },
  },
};
</script>