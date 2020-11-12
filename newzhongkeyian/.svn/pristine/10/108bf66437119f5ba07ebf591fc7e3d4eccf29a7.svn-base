<!-- 记录查询 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <!-- <inpbox :inptext="'请选择时间'">
          <fel-date class="qh_date" v-model="dates"></fel-date>
        </inpbox>-->
        <inpbox :inpb="true">
          <dateSelect ref="dates" class="qh_date" v-model="dates"></dateSelect>
        </inpbox>
        <inpbox :inpb="true">
          <queryPosition
            ref="queryPosition"
            class="con-popover qh_inp"
            @onChoice="onChoiceWZ"
            interface="/analysis/lockrecord/1/getbuildtree"
          ></queryPosition>
        </inpbox>
        <inpbox :inpb="true">
          <queryOrgan
            ref="queryOrgan"
            class="con-popover qh_inp"
            @onChoice="onChoiceZZ"
            interface="/analysis/lockrecord/2/getpersontree"
          ></queryOrgan>
        </inpbox>
        <inpbox :inpb="true">
          <el-select class="con-select qh_inp" v-model="param.unlockingtype">
            <el-option
              v-for="item in unlockingtypes"
              :key="item.type"
              :label="item.typename"
              :value="item.type"
            ></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="con-search qh_inp"
            v-model="param.search"
            :placeholder="'输入卡号/姓名/' + getNumber() + '查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="search"
            >查询</fel-button
          >
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
          <!-- <fel-button class="qh_btn" type="primary" @click="exportBut">导出</fel-button> -->
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="padt0 query_main">
      <paging-table1
        class="tobleList wh100"
        height="100%"
        interface="/analysis/lockrecord/3/getlockrecord"
        :list="list"
        :refresh="refresh"
        :paramObj="paramObj"
        :param="param"
        @onEjectChange="onEjectChange"
      >
        <span
          v-for="but of topButs"
          class="sli but-blue"
          @click="exportBut(but.id)"
        >
          <i v-if="but.icon" :class="'ficon-' + but.icon"></i>
          {{ but.alias }}
        </span>
      </paging-table1>
    </el-main>
    <exportHistory
      historyUrl="/analysis/lockrecord/7/downhistory"
      :dialogVisible="iHvisible"
      @beforeClose="
        () => {
          iHvisible = false;
        }
      "
    ></exportHistory>
    <personInfo
      :dialogVisible="dialogVisibleInfo"
      :param="infoParam"
      @beforeClose="beforeClose"
    ></personInfo>
  </el-container>
</template>

<script>
import personInfo from "./dialog/personInfo";
import { getDates, getparam } from "./query.js";
import Storages from "../../utils/Storage.js"; //缓存工具
import { mapGetters } from "vuex";
import { format, download } from "@/utils/utils.js";
import exportHistory from "../personnel/export-history";
import { timerDownload } from "../personnel/index.js";
import queryPosition from "./queryPosition";
import queryOrgan from "./queryOrgan";
export default {
  name: "sklscx92",
  components: {
    queryPosition,
    exportHistory,
    queryOrgan,
    personInfo,
  },
  data() {
    let $this = this;
    return {
      dialogVisibleInfo: false,
      iHvisible: false,
      infoParam: {},
      paramObj: {
        type: "1",
        arearoom: [],
        build: [],
        persontree: [],
      },
      dates: [],
      unlockingtypes: [
        {
          type: "",
          typename: "全部记录类型",
        },
      ],
      param: {
        sdate: "",
        edate: "",
        search: "",
        unlockingtype: "",
      },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "操作时间",
          prop: "unlockingdate",
        },
        {
          name: "上传时间",
          prop: "unlockingcdate",
        },
        {
          name: "记录类型",
          prop: "unlockingtype",
        },
        {
          name: "房间位置",
          prop: "roomlocation",
        },
        {
          name: "操作人员",
          prop: "personname",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                $this.infoParam = this.scope.row;
                if (this.scope.row && this.scope.row.personcode) {
                  $this.dialogVisibleInfo = true;
                }
              },
            },
            template: `<div class="operat-buts">
             <fel-button type="text" size="small" @click.stop="onClick()">{{scope.row.personname}}</fel-button>
            </div>`,
          },
        },
        {
          name: "卡片类型",
          prop: "cardtype",
        },
        {
          name: this.getCardcodeName(),
          minWidth: "100px",
          prop: "cardcode",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
        },
        {
          name: "归属组织",
          prop: "personlocation",
        },
      ],
      refresh: 0,
      topButs: [],
      sonmenu: 0,
    };
  },
  watch: {},
  created() {
    this.inGetsonmenu();
    this.inGetType();
    getparam(this);
  },
  activated() {
    let obj = this.$route.params;
    if (obj.type) {
      this.param.unlockingtype = obj.type;
      this.search();
    }
  },
  mounted() {
    this.getEject();
  },
  methods: {
    getCardcodeName() {
      let text = [];
      if (this.getIsCard()) {
        text.push("卡号");
      }
      if (this.getIsFinger()) {
        text.push("指纹号");
      }
      if (this.getIsFace()) {
        text.push("人脸号");
      }
      if (text.length == 0) {
        text.push("编号");
      }
      return text.join("/");
    },
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: "92" }, "1")
        .then((res) => {
          res.result.forEach((value) => {
            let entity = value.entity;
            let id = entity.id;
            if (id == "341") {
              this.topButs.push(entity);
            } else if (id == "949") {
              this.topButs.push(entity);
            }
          });
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
    //重置事件
    onReset() {
      this.dates = [];
      this.$refs.dates.value2 = new Date();
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.$refs.queryPosition.onClear();
      this.$refs.queryOrgan.onClear();
      this.search();
    },
    exportHistory() {
      this.iHvisible = true;
    },
    exportBut(id) {
      if (id == "341") {
        let url = "/analysis/lockrecord/6/exportlockrecords";
        let name = "记录查询";
        let tValue = getDates(this.dates);
        this.param.sdate = tValue[0];
        this.param.edate = tValue[1];
        this.inExportPackage(url, name, this.param, this.paramObj);
      } else if (id == "949") {
        this.exportHistory();
      }
    },
    inExportPackage(url, name, data = {}, obj = {}) {
      this.$ajax(url, data, "1", obj, true, 60000)
        .then((res) => {
          this.$message({
            message: name + "文件导出已下发，文件正在生成中",
            type: "success",
          });
          timerDownload(
            res.result,
            "/analysis/lockrecord/7/downhistory",
            this,
            name
          );
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    ...mapGetters(["getNumber", "getIsCard", "getIsFinger", "getIsFace"]),
    inGetType() {
      this.$ajax("/analysis/lockrecord/5/getrecordtype", {}, "1")
        .then((res) => {
          this.unlockingtypes.push(...res.result);
        })
        .catch((err) => {});
    },
    onChoiceWZ(data, type) {
      if (type == "1") {
        this.paramObj.type = 2;
        this.paramObj.arearoom = data;
        this.paramObj.build = [];
      } else {
        this.paramObj.type = 1;
        this.paramObj.arearoom = [];
        this.paramObj.build = data;
      }
    },
    onChoiceZZ(data) {
      this.paramObj.persontree = data;
    },
    search() {
      let tValue = getDates(this.dates);
      this.param.sdate = tValue[0];
      this.param.edate = tValue[1];
      this.refresh = new Date().getTime();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "sklscx92");
    },
    getEject() {
      this.$common.getEject(this, "list", "sklscx92");
    },
    beforeClose() {
      this.dialogVisibleInfo = false;
    },
  },
};
</script>