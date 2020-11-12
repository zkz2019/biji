<!-- 快捷操作 -->
<template>
  <el-container>
    <el-header class="heig30 query_headbox">
      <com-title>快捷操作</com-title>
      <retrieval class="query_head">
        <inpbox :inpb="true">
          <el-input
            clearable
            class="search con-search qh_inp"
            v-model="param.search"
            :placeholder="'输入姓名/'+getNumber()+'查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="pad0-10 query_main">
      <paging-table
        class="tobleList wh100"
        height="100%"
        interface="/quick/getquick2"
        :list="list"
        :refresh="refresh"
        :refreshTable="refreshTable"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <span v-for="(v,k) of topButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
          <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
          {{v.alias}}
        </span>
      </paging-table>
    </el-main>
    <!-- <guideFile
      :dialogVisible="dialogGuideFile"
      :importButs="importButs"
      :exportButs="exportButs"
      @handleClose="dialogGuideFile=false"
    ></guideFile>-->
    <guideFile
      :dialogVisible="dialogGuideFile"
      :importButs="importButs"
      :exportButs="exportButs"
      :bottomBtn="bottomBtn"
      @handleClose="dialogGuideFile = false"
    ></guideFile>
    <journal @beforeClose="dialogJournal=false" :dialogVisible="dialogJournal"></journal>
    <add
      :param="addParam"
      @onRefresh="onRefreshTable"
      @beforeClose="dialogAdd=false"
      :dialogVisible="dialogAdd"
    ></add>
    <rightDetails
      :personcode="personcode"
      @onRefresh="onRefreshTable"
      @beforeClose="dialogDetails=false"
      :dialogVisible="dialogDetails"
    ></rightDetails>
    <pUpdate :param="addParam" @beforeClose="dialogpUpdate=false" :dialogVisible="dialogpUpdate"></pUpdate>
  </el-container>
</template>

<script>
import pUpdate from "./pUpdate";
import rightDetails from "./rightDetails";
import Storages from "../../utils/Storage.js"; //缓存工具
import { mapGetters } from "vuex";
import journal from "./journal.vue";
import add from "./add.vue";
import guideFile from "@/views/common/guideFile/zguideFile.vue";
// import guideFile from "./dialog/guideFile.vue";
export default {
  components: {
    guideFile,
    journal,
    add,
    pUpdate,
    rightDetails,
  },
  data() {
    let $this = this;
    return {
      addParam: {},
      dialogpUpdate: false,
      dialogDetails: false,
      dialogAdd: false,
      dialogJournal: false,
      dialogGuideFile: false,
      exportButs: [],
      personcode: "",
      bottomBtn: [
        {
          id: 1,
          type: "9",
          name: "快捷导入历史",
          url: "/quick/upload/5/getupload",
          interface: "quick/upload/6/getuploadquick",
          listInfo: [
            {
              name: "序号",
              type: "$index",
              width: "60px",
            },
            {
              name: "学号",
              prop: "personcode",
            },
            {
              name: "姓名",
              width: "80px",
              prop: "personname",
            },
            {
              name: "人员类型",
              width: "80px",
              prop: "persontype",
            },
            {
              name: "归属组织",
              prop: "personlocation",
            },
            {
              name: "卡号",
              prop: "cardcode",
            },
            {
              name: "卡类型",
              width: "80px",
              prop: "cardtype",
            },
            {
              name: "房间位置",
              prop: "roomlocation",
            },
            {
              width: "80px",
              name: "房间名称",
              prop: "roomname",
            },

            {
              name: "导入时间",
              show: true,
              prop: "uqdate",
            },
            {
              name: "建卡日期",
              show: true,
              width: "95px",
              prop: "cardcdate",
            },
            {
              name: "到期日期",
              show: true,
              width: "95px",
              prop: "cardedate",
            },

            {
              name: "邮箱",
              show: true,
              width: "80px",
              prop: "personemail",
            },
            {
              name: "电话",
              show: true,
              width: "80px",
              prop: "personmobile",
            },
            {
              name: "性别",
              show: true,
              width: "80px",
              prop: "personsex",
            },
            {
              name: "学历",
              show: true,
              width: "80px",
              prop: "persontype2",
            },

            {
              name: "身份证",
              show: true,
              prop: "personcard",
            },

            {
              name: "授权卡授权开门次数",
              show: true,
              prop: "cardcount",
            },
            {
              name: "授权卡授权天数",
              show: true,
              prop: "cardday",
            },
            {
              name: "授权到期时间",
              show: true,
              prop: "empedate",
            },
            {
              name: "是否允许蓝牙钥匙",
              show: true,
              prop: "isapp",
            },
            {
              name: "是否下发指纹",
              show: true,
              prop: "isfinger",
            },
            {
              name: "是否允许app指纹录入",
              show: true,
              prop: "isfingerentry",
            },
            {
              name: "是否当做管理权限",
              show: true,
              prop: "ismanager",
            },
            {
              name: "授权开门时间段",
              show: true,
              prop: "opentime",
            },
            {
              name: "授权卡授权时间段",
              show: true,
              prop: "opentime2",
            },
            {
              name: "状态",
              template: {
                props: ["scope"],
                computed: {
                  name() {
                    if (this.scope.row.uqstatus == "0") {
                      return "正在导入";
                    } else if (this.scope.row.uqstatus == "-1") {
                      return "失败";
                    } else {
                      return "成功";
                    }
                  },
                },
                methods: {
                  getClass() {
                    let value = this.scope.row.uqstatus;
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
              prop: "uqremark",
            },
          ],
        },
      ],
      importButs: [
        {
          name: "快捷导入",
          tempUrl: "/quick/upload/3/downmodel",
          url: "/quick/upload/1/uploadquick",
          errUrl: "/quick/upload/2/downquick",
          progUrl: "/quick/upload/4/getuploadrate",
        },
      ],
      topButs: [],
      listBut: [],
      param: { search: "" },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "姓名",
          prop: "personname",
        },
        {
          name: "性别",
          prop: "personsex",
        },
        {
          name: "人员类型",
          prop: "persontype",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
        },
        {
          name: "归属组织",
          prop: "personlocation",
        },

        {
          name: "最后变动操作人",
          prop: "userlogin",
        },
        {
          name: "最后变动时间",
          prop: "personudate",
        },
        {
          name: "状态",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.personstate;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.personstate}}</span>`,
          },
        },
        {
          name: "操作",
          width: "120px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.listBut;
              },
            },
            methods: {
              onClick(key) {
                if (key == 5) {
                  $this.heavyLoad(Object.assign({}, this.scope.row));
                } else if (key == "9") {
                  $this.onDetails(this.scope.row);
                } else {
                  $this.modify(this.scope.row);
                }
              },
            },
            template: `<div class="operat-buts"> 
             <el-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type)">{{v.name}}</el-button>
            </div>`,
          },
        },
      ],
      refresh: 0,
      refreshTable: 0,
      sonmenu: 0,
    };
  },
  created() {
    this.inGetsonmenu();
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
      this.onRefresh();
    },
    ...mapGetters(["getNumber"]),

    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: "302" }, "1")
        .then((res) => {
          let arr = res.result.filter((value) => {
            return value.entity.id == "299";
          });
          arr = arr[0] || {};
          if (arr && arr.childs) {
            arr.childs.forEach((value) => {
              let id = value.entity.id;
              let alias = value.entity.alias;
              if (id == "305") {
                this.topButs.push(value.entity);
              } else if (id == "301") {
                this.listBut.push({
                  type: "2",
                  name: "修改",
                });
              } else if (id == "468") {
                this.listBut.push({
                  type: "5",
                  name: "重载",
                });
              } else if (id == "654") {
                this.listBut.push({
                  type: "9",
                  name: "授权管理",
                });
              } else if (id == "300") {
                this.topButs.push(value.entity);
              } else if (id == "304") {
                this.topButs.push(value.entity);
              } else if (id == "543") {
                this.exportButs.push({
                  name: value.entity.alias,
                  url: "/quick/upload/3/downmodel",
                  data: this.param,
                });
              }
            });
          }
          this.sonmenu = 4;
        })
        .catch((err) => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    modify(data) {
      this.addParam = data;
      this.dialogpUpdate = true;
    },
    onDetails(obj) {
      this.personcode = obj.personcode;
      this.dialogDetails = true;
    },
    heavyLoad(data) {
      this.$ajax("/quick/reload/1/reloadquick", {}, "1", data, true)
        .then((res) => {
          this.$message({
            message: "重载成功",
            type: "success",
          });
          this.onRefreshTable();
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
      if (key == "304") {
        this.dialogGuideFile = true;
      } else if (key == "305") {
        this.dialogJournal = true;
      } else if (key == "300") {
        this.addParam = {};
        this.dialogAdd = true;
      }
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "kjcz299");
    },
    getEject() {
      this.$common.getEject(this, "list", "kjcz299");
    },
  },
};
</script>