<template>
  <fel-dialog
    class="grant"
    top="5%"
    title="授权管理"
    width="80%"
    minWidth="1100px"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <!-- <el-header class="query_headbox">
    </el-header>-->
    <el-main class="padt0 query_main">
      <retrieval class="query_head marpadbor0">
        <inpbox :inpb="true">
          <el-select class="con-select qh_inp" v-model="param.authtype">
            <el-option v-for="item in authtypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-select class="wid150 qh_inp" v-model="param.issend">
            <el-option v-for="item in issends" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-select class="con-select qh_inp" v-model="param.ahid">
            <el-option v-for="item in ahids" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="qh_inp wid220"
            v-model="param.search"
            :placeholder="'输入' + getNumber() + '/身份证查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
      <paging-table
        class="tobleList wh100"
        interface="/access/v2.0/door/g/listAccessAuth"
        :list="list"
        :refresh="refresh"
        :refreshTable="refreshTable"
        ref="paging-table"
        :paramObj="paramList"
        ajaxType="9"
        :isAll="range == 2 ? true : false"
        :class="{ 'cover-up': range == 2 }"
        @onSelection="
          (d) => {
            selecArr = d
          }
        "
      >
        <template>
          <span v-for="(v, k) of topButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
            <i v-if="v.icon" :class="'ficon-' + v.icon"></i>
            {{ v.alias }}
          </span>
          <template v-if="batchButs.length > 0">
            <div class="full-list" v-show="!list[0].show">
              <el-checkbox v-model="range" @change="onChange" true-label="2" false-label="1">跨页全选</el-checkbox>
            </div>
            <batch-but
              class="sli but-blue"
              :type="range"
              :list="selecArr"
              :param="batchButs"
              @onClick="onAction"
            ></batch-but>
          </template>
        </template>
      </paging-table>
      <ul class="paging-statistics">
        <li>
          人员
          <span>{{doorAuth.adpersoncount|| 0}}</span>个
        </li>
        <li>
          人脸
          <span>{{doorAuth.adfacecount|| 0}}</span>个
        </li>
        <li>
          卡片
          <span>{{doorAuth.adcardcount || 0}}</span>张
        </li>
        <li>
          密码
          <span>{{doorAuth.adpasscount || 0}}</span>个
        </li>
        <li>
          指纹
          <span>{{doorAuth.adfingercount || 0}}</span>枚
        </li>
        <li>
          蓝牙钥匙
          <span>{{doorAuth.adappcount || 0}}</span>个
        </li>
        <li>
          未生效
          <span>{{doorAuth.adwsxcount || 0}}</span>个
        </li>
      </ul>
    </el-main>
    <grantAdd
      :param="paramObj"
      @onRefresh="onRefreshTable"
      @beforeClose="dialogAdd = false"
      :dialogVisible="dialogAdd"
    ></grantAdd>
    <grantModify
      :param="modifyParam"
      :defaultData="defaultDataModify"
      @onRefresh="onRefreshTable"
      @beforeClose="dialogModify = false"
      :dialogVisible="dialogModify"
    ></grantModify>
    <record :paramObj="paramObj" :dialogVisible="dialogRecord" @beforeClose="dialogRecord = false"></record>
    <remarks :dialogVisible="dialogRemark" :row="auth" @beforeClose="remarkClose"></remarks>
  </fel-dialog>
</template>

<script>
import remarks from "./remarks";
import { mapGetters } from "vuex";
import grantAdd from "./grantAdd";
import record from "./record";
import grantModify from "./grantModify";
export default {
  components: {
    grantAdd,
    record,
    grantModify,
    remarks,
  },
  props: {
    paramObj: Object,
    btnRight: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      dialogAdd: false,
      dialogRemark: false,
      dialogModify: false,
      dialogRecord: false,
      refresh: 0,
      refreshTable: 0,
      auth: {},
      doorAuth: {},
      param: {
        search: "",
        authtype: "",
        issend: "",
        ahid: "",
      },
      isSelectable: true,
      defaultDataModify: {},
      modifyParam: {},
      authtypes: [{ id: "", name: "全部授权" }],
      ahids: [{ id: "", name: "全部读头" }],
      issends: [{ id: "", name: "全部授权状态" }],
      selecArr: [],
      list: [
        {
          type: "selection",
          selectable: this.onSelectable,
        },
        {
          name: "序号",
          type: "$index",
          width: "50px",
        },
        {
          name: "创建时间",
          show: true,
          prop: "senddate",
          width: "110px",
        },
        {
          name: "下发时间",
          prop: "authosdate",
          width: "110px",
        },
        {
          name: "归属人",
          width: "65px",
          prop: "personname",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
          minWidth: "80px",
        },
        {
          name: "归属人组织",
          prop: "personlocation",
          minWidth: "95px",
        },
        {
          name: "授权类型",
          prop: "authtypename",
          width: "80px",
        },
        {
          name: "授权详情",
          width: "80px",
          prop: "authcode",
        },
        {
          name: "卡片类型",
          width: "80px",
          prop: "cdtype",
        },
        {
          name: "读头名称",
          width: "80px",
          prop: "ahname",
        },
        {
          name: "授权账号",
          width: "80px",
          prop: "userlogin",
        },

        {
          name: "操作IP",
          width: "120px",
          prop: "ip",
        },
        {
          name: "下发状态",
          prop: "issend",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.issend;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class="getClass()">{{scope.row.issend}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "failreason",
        },
        {
          name: "备注信息",
          prop: "remark",
        },
        {
          name: "操作",
          width: "130px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                let buts = $this.batchButs.filter((item) => {
                  if (this.scope.row.authtype2 == 0) {
                    return item.id == 848 || item.id == 961;
                  } else {
                    return item;
                  }
                });
                return buts;
              },
            },
            methods: {
              onClick(key, obj) {
                console.log("key,obj", key, obj);
                if (key == 846) {
                  $this.modify(this.scope.row);
                } else if (key == 848) {
                  $this.heavyLoad(this.scope.row);
                } else if (key == 847) {
                  $this.delete(this.scope.row);
                } else if (key == 961) {
                  $this.remark("0", this.scope.row);
                }
              },
            },
            template: `<div class="operat-buts">
             <fel-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.id, v)">{{v.alias}}</fel-button>
            </div>`,
          },
        },
      ],
      range: "1",
      ranges: [
        {
          value: "1",
          label: "勾选范围",
        },
        {
          value: "2",
          label: "全部列表",
        },
      ],
    };
  },
  computed: {
    paramList() {
      let obj = {
        adid: this.paramObj.adid,
        amid: this.paramObj.amid,
        ahid: this.param.ahid,
        authtype: this.param.authtype,
        issend: this.param.issend,
        search: this.param.search,
      };
      return obj;
    },
    topButs() {
      let arr = [];
      this.btnRight.forEach((item) => {
        if (item.entity.id == "845") {
          arr.push(item.entity);
        } else if (item.entity.id == "849") {
          arr.push(item.entity);
        }
      });
      return arr;
    },
    batchButs() {
      let arr = [];
      this.btnRight.forEach((item) => {
        if (item.entity.id == "846") {
          arr.push({ id: item.entity.id, alias: item.entity.alias });
        } else if (item.entity.id == "847") {
          arr.push({ id: item.entity.id, alias: item.entity.alias });
        } else if (item.entity.id == "848") {
          arr.push({ id: item.entity.id, alias: item.entity.alias });
        } else if (item.entity.id == "961") {
          arr.push({ id: item.entity.id, alias: "备注" });
        }
      });
      return arr;
    },
    actionParam() {
      let data = {
        // auths: this.selecArr,
        adid: this.paramObj.adid,
        ahid: this.param.ahid,
        amid: this.paramObj.amid,
        authtype: this.param.authtype,
        issend: this.param.issend,
        search: this.param.search,
      };
      return data;
    },
  },
  created() {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.$ajax(
          "/access/v2.0/door/h/getSearchType",
          { adid: this.paramObj.adid },
          "9"
        )
          .then((res) => {
            this.ahids = this.ahids.concat(res.result.ahids);
            this.authtypes = this.authtypes.concat(res.result.authtypes);
            this.issends = this.issends.concat(res.result.issends);
          })
          .catch((err) => {
            console.log("err", err);
          });
        this.getAccessDoorAuthAnalysis();
        this.onRefresh();
      } else {
        this.range = "1";
        this.onChange("1");
        this.authtypes = [{ id: "", name: "全部授权" }];
        this.ahids = [{ id: "", name: "全部读头" }];
        this.issends = [{ id: "", name: "全部授权状态" }];
      }
    },
  },
  mounted() {},
  methods: {
    ...mapGetters(["getNumber"]),
    getAccessDoorAuthAnalysis() {
      console.log("this.param", this.paramObj);
      this.$ajax(
        "/access/v2.0/door/r/getAccessDoorAuthAnalysis",
        { adid: this.paramObj.adid },
        "9"
      )
        .then((res) => {
          this.doorAuth = res.result;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    remarkClose(bool) {
      this.dialogRemark = false;
      if (bool) {
        this.onRefreshTable();
      }
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      console.log("111", 111);
      this.refreshTable = new Date().getTime();
    },
    onReset() {
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.onRefresh();
    },
    onChange(val) {
      if (val == 2) {
        this.$refs["paging-table"].clearSelection();
        this.$refs["paging-table"].toggleAllSelection();
        setTimeout(() => {
          this.isSelectable = false;
        }, 100);
      } else {
        this.$refs["paging-table"].clearSelection();
        this.isSelectable = true;
      }
    },
    onAction(val, obj) {
      if (val == 846) {
        this.modify();
      } else if (val == 847) {
        this.delete();
      } else if (val == 848) {
        this.heavyLoad();
      }
    },
    onClick(id, data) {
      if (id == "845") {
        this.dialogAdd = true;
      } else if (id == "849") {
        this.dialogRecord = true;
      }
    },
    heavyLoad(obj) {
      this.$confirm("确定要重载当前授权吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = {};
        if (obj) {
          data = {
            actiontype: "勾选范围",
            // auths: [obj]
          };
        } else {
          data = {
            actiontype: this.range == "2" ? "全选范围" : "勾选范围",
            // auths: this.selecArr
          };
        }

        this.$ajax(
          "/access/v2.0/door/i/reloadAccessAuth",
          this.actionParam,
          "9",
          { auths: obj ? [obj] : this.selecArr, ...data },
          true
        )
          .then((res) => {
            this.$message({
              type: "success",
              message: "重载成功!",
            });
            this.onRefreshTable();
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: `[${err.resultCode}] ` + err.resultMsg || "重载失败!",
            });
          });
      });
    },
    modify(obj) {
      if (obj) {
        this.$ajax(
          "/access/v2.0/door/k/getAccessAuthInfo",
          { auid: obj.auid, authtype: obj.authtype },
          "9"
        )
          .then((res) => {
            this.defaultDataModify = res.result ? res.result : {};
            this.defaultDataModify.opencount =
              this.defaultDataModify.opencount == "不限"
                ? ""
                : this.defaultDataModify.opencount;
          })
          .catch((err) => {
            console.log("err", err);
          });
        this.modifyParam = {
          actiontype: "勾选范围",
          auths: [obj],
          ...this.actionParam,
        };
      } else {
        this.modifyParam = {
          actiontype: this.range == "2" ? "全选范围" : "勾选范围",
          auths: this.selecArr,
          ...this.actionParam,
        };
      }
      this.dialogModify = true;
    },
    remark(type, arr) {
      this.auth = arr;
      this.dialogRemark = true;
    },
    delete(obj) {
      let data = {};
      if (obj) {
        data = {
          actiontype: "勾选范围",
        };
      } else {
        data = {
          actiontype: this.range == "2" ? "全选范围" : "勾选范围",
        };
      }
      this.$confirm("确定要删除当前授权吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ajax(
          "/access/v2.0/door/l/deleteAccessAuth",
          this.actionParam,
          "9",
          { auths: obj ? [obj] : this.selecArr, ...data },
          true
        )
          .then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.onRefreshTable();
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: `[${err.resultCode}] ` + err.resultMsg || "删除失败!",
            });
          });
      });
    },
    onSelectable() {
      return this.isSelectable;
    },
  },
};
</script>

<style lang="scss">
.grant {
  .query_main {
    height: 450px;
    .con-select {
      width: 120px;
    }
    .con-search {
      width: 150px;
    }
    .paging-statistics {
      position: absolute;
      bottom: 40px;
      left: 55px;
      display: flex;
      li {
        padding-right: 10px;
        span {
          padding: 2px;
        }
      }
    }
    @media screen and (max-height: 640px) {
      .paging-statistics {
        bottom: 20px;
      }
    }
  }
}
</style>
