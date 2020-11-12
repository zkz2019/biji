<!-- 未归查询 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <inpbox inptext="查询时段">
          <fel-date
            class="maR10 qh_date con-date"
            style="width: 370px !important"
            v-model="dates"
          ></fel-date>
        </inpbox>
        <inpbox :inpb="true">
          <el-select
            class="con-select qh_inp"
            @change="onChangeType"
            v-model="param.devicetype"
          >
            <el-option
              v-for="item in devicetypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <queryPosition
            ref="queryPosition"
            class="maR10 con-popover qh_inp"
            @onChoice="onChoiceWZ"
            :devicetype="param.devicetype"
            interface="/analysis/unlockerr/1/listAreaTree"
          ></queryPosition>
        </inpbox>
        <inpbox :inpb="true">
          <queryOrgan
            ref="queryOrgan"
            class="maR10 con-popover qh_inp"
            @onChoice="onChoiceZZ"
            interface="/analysis/unlockerr/2/listPersonTree"
          ></queryOrgan>
        </inpbox>
        <inpbox :inpb="true">
          <el-select class="con-select qh_inp" v-model="param.authtype">
            <el-option
              v-for="item in authtypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-select class="con-select qh_inp" v-model="param.syncstatus">
            <el-option
              v-for="item in syncstatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="search con-search qh_inp"
            v-model="param.search"
            :placeholder="'输入姓名/' + getNumber() + '查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="search"
            >查询</fel-button
          >
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="padt0 query_main">
      <paging-table
        ref="paging-table"
        class="tobleList wid100 heig100"
        height="100%"
        ajaxType="9"
        interface="/analysis/unlockerr/4/listUnlockErr"
        :isAll="range == 2 ? true : false"
        :class="{ 'cover-up': range == 2 }"
        :list="list"
        :refresh="refresh"
        @onSelection="
          (data) => {
            this.listArrs = data;
          }
        "
        :param="param"
        :refreshTable="refreshTable"
        :paramObj="paramObj"
        @onEjectChange="onEjectChange"
      >
        <span
          v-for="but of topButs"
          class="sli but-blue"
          @click="onClick(but.id)"
        >
          <i v-if="but.icon" :class="'ficon-' + but.icon"></i>
          {{ but.alias }}
        </span>
        <template v-if="listBut && listBut.length > 0">
          <div class="full-list" v-show="!list[0].show">
            <el-checkbox
              v-model="range"
              @change="onChange"
              true-label="2"
              false-label="1"
              >跨页全选</el-checkbox
            >
          </div>
          <batch-but
            class="sli but-blue"
            :type="range"
            :list="listArrs"
            :param="listBut"
            @onClick="onAction"
          ></batch-but>
        </template>
      </paging-table>
    </el-main>
    <el-dialog
      class="configureInfo"
      top="12%"
      title="同步策略"
      width="35%"
      :before-close="
        () => {
          dialogVisible = false;
        }
      "
      :visible.sync="dialogVisible"
    >
      <fel-form
        ref="felForm"
        @submitForm="submitForm"
        @closeForm="
          () => {
            dialogVisible = false;
          }
        "
        width="140px"
        dynamic
        :defaultData="defaultData"
        :formData="formData"
      ></fel-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { format, download } from "@/utils/utils.js";
import queryPosition from "./queryPosition1";
import queryOrgan from "./queryOrgan1";
export default {
  name: "wgcx190",
  components: {
    queryPosition,
    queryOrgan,
  },
  data() {
    return {
      batchButs: [],
      listArrs: [],
      refreshTable: 0,
      range: "1",
      isSelectable: true,
      defaultData: {},
      dialogVisible: false,
      paramObj: {
        type: "1",
        arearooms: [],
        agid: [],
        pgid: [],
      },
      topButs: [],
      listBut: [],
      dates: [],
      param: {
        sdate: "",
        edate: "",
        search: "",
        authtype: "",
        devicetype: "1",
        syncstatus: "",
      },
      authtypes: [],
      syncstatus: [],
      devicetypes: [
        { id: "1", name: "门锁" },
        { id: "2", name: "门禁" },
      ],
      formData: [
        {
          value: "unlocksyncstatus",
          name: "策略状态",
          type: "select",
          select: [
            { name: "启用", id: "1" },
            { name: "停用", id: "2" },
          ],
          slabel: "name",
          svalue: "id",
        },
        {
          value: "unlocksynctype",
          name: "同步方式",
          type: "select",
          select: [
            { name: "立即同步", id: "1" },
            { name: "延时同步", id: "2" },
          ],
          slabel: "name",
          svalue: "id",
        },

        {
          value: "unlocksynctime",
          name: "同步时间",
          type: "time",
          format: "HH:MM:SS",
        },
        {
          value: "unlocksyncretry",
          name: "失败重试",
          type: "select",
          select: [
            { name: "不重试", id: "0" },
            { name: "重试1次", id: "1" },
            { name: "重试2次", id: "2" },
            { name: "重试3次", id: "3" },
          ],
          slabel: "name",
          svalue: "id",
        },
      ],
      list: [
        {
          type: "selection",
          selectable: this.onSelectable,
        },
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        // {
        //   name: "操作时间",
        //   prop: "",
        // },
        {
          name: "房间位置",
          prop: "roomlocation",
        },
        {
          name: "授权类型",
          prop: "authtype",
          formatter(row) {
            let type = row.authtype;
            return type == 1
              ? "卡片"
              : type == 2
              ? "指纹"
              : type == 3
              ? "密码"
              : "人脸";
          },
        },
        {
          name: "授权详情",
          prop: "authcode	",
        },
        {
          name: "归属人",
          prop: "personname",
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
          name: "同步状态",
          prop: "syncstatus",
          template: {
            props: ["scope"],
            computed: {
              name() {
                if (this.scope.row.syncstatus == "-2") {
                  return "未同步";
                } else if (this.scope.row.syncstatus == "0") {
                  return "正在同步";
                } else if (this.scope.row.syncstatus == "1") {
                  return "同步成功";
                } else if (this.scope.row.syncstatus == "-1") {
                  return "同步失败";
                }
              },
            },
            methods: {
              getClass() {
                let value = this.scope.row.syncstatus;
                if (value == "0") {
                  return "";
                } else if (value <= 0) {
                  return "puc-px";
                } else {
                  return "puc-pg";
                }
              },
            },
            template: `<span :class='getClass()'>{{name}}</span>`,
          },
        },
        {
          name: "授权到期日期",
          prop: "unlockingdate",
        },
        {
          name: "操作",
          template: {
            computed: {
              listBut() {
                return $this.listBut;
              },
            },
            props: ["scope"],
            methods: {
              onClick(key, obj) {
                $this.onAction(key, this.scope.row);
              },
            },
            template: `<div class="operat-buts">
            <el-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type, v)">{{v.name}}</el-button>
            </div>`,
          },
        },
      ],
      refresh: 0,
      sonmenu: 0,
    };
  },
  created() {
    this.inGetsonmenu();
    this.getType();
    // this.getRule();
    this.getType1();
  },
  mounted() {
    this.getEject();
  },
  methods: {
    getRule() {
      //获取同步策略
      this.$ajax("/analysis/unlockerr/6/getSyncRule", {}, "9")
        .then((res) => {
          this.defaultData = res.result;
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    getType1() {
      //获取同步状态
      this.$ajax("/analysis/unlockerr/8/getStatusType", {}, "9")
        .then((res) => {
          this.syncstatus = res.result;
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    getType(val) {
      //获取筛选下拉框
      this.$ajax(
        "/analysis/unlockerr/3/getSearchType",
        { devicetype: val || this.param.devicetype },
        "9"
      )
        .then((res) => {
          this.authtypes = res.result;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    onClick(id) {
      //列表按钮
      this.dialogVisible = true;
    },
    submitForm(data) {
      //提交同步策略
      this.$ajax(
        "/analysis/unlockerr/7/updateSyncRule",
        {
          unlocksyncretry: data.unlocksyncretry,
          unlocksyncstatus: data.unlocksyncstatus,
          unlocksynctime: data.unlocksynctime,
          unlocksynctype: data.unlocksynctype,
        },
        "9",
        {},
        true
      )
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功!",
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

    onAction(key, obj) {
      //操作
      console.log("key,obj", key, obj);
      if (key == "1003") {
        this.snyncAuth();
      }
    },
    snyncAuth(obj) {
      //同步授权
      let data = {
        actiontype: this.range,
        agid: this.paramObj.agid,
        arearooms: this.paramObj.arearooms,
        pgid: this.paramObj.pgid,
        authtype: this.param.authtype,
        edate: this.param.edate,
        sdate: this.param.sdate,
        search: this.param.search,
        syncstatus: this.param.syncstatus,
        type: this.paramObj.type,
        unlockingids: obj
          ? [obj.unlockingid]
          : this.listArrs.map((item) => {
              return item.unlockingid;
            }),
      };
      this.$ajax("/analysis/unlockerr/5/syncAuth", data, "9")
        .then((res) => {
          this.$message({
            type: "success",
            message: "同步授权成功!",
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
    onSelectable() {
      return this.isSelectable;
    },
    onChangeType(val) {
      this.getType(val);
      console.log("val", val);
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
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: "1002" }, "1")
        .then((res) => {
          res.result.forEach((value) => {
            let entity = value.entity;
            let id = entity.id;
            if (id == "1003") {
              this.listBut.push(entity);
            } else if (id == "1004") {
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
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.param.devicetype = "1";
      this.param.syncstatus = "";
      this.$refs.queryPosition.onClear();
      this.$refs.queryOrgan.onClear();
      this.search();
    },
    ...mapGetters(["getNumber"]),
    onChoiceWZ(data, type) {
      if (type == "1") {
        this.paramObj.type = 2;
        this.paramObj.arearooms = data || [];
        this.paramObj.agid = [];
      } else {
        this.paramObj.type = 1;
        this.paramObj.arearooms = [];
        this.paramObj.agid =
          data.map((item) => {
            return item.agid;
          }) || [];
      }
    },
    onChoiceZZ(data) {
      this.paramObj.pgid =
        data.map((item) => {
          return item.pgid;
        }) || [];
    },
    search() {
      if (this.dates && this.dates.length == 2) {
        this.param.sdate = format(this.dates[0], "yyyy-MM-dd HH:mm:ss");
        this.param.edate = format(this.dates[1], "yyyy-MM-dd HH:mm:ss");
      } else {
        this.param.sdate = "";
        this.param.edate = "";
      }
      this.refresh = new Date().getTime();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "wsqkmcx1002");
    },
    getEject() {
      this.$common.getEject(this, "list", "wsqkmcx1002");
    },
  },
};
</script>