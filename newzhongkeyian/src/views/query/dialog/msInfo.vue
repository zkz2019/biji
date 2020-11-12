<template>
  <div class="msInfo">
    <retrieval class="query_head marpadbor0">
      <inpbox :inpb="true">
        <el-select placeholder="全部授权类型" class="con-select qh_inp" v-model="param.authtype">
          <el-option
            v-for="item in types"
            :key="item.authtype"
            :label="item.authname"
            :value="item.authtype"
          ></el-option>
        </el-select>
      </inpbox>
      <inpbox :inpb="true">
        <el-select placeholder="全部下发状态" class="con-select qh_inp" v-model="param.statetype">
          <el-option
            v-for="item in states"
            :key="item.statetype"
            :label="item.statename"
            :value="item.statetype"
          ></el-option>
        </el-select>
      </inpbox>
      <inpbox :inpb="true">
        <el-select placeholder="全部权限类型" class="con-select qh_inp" v-model="param.managertype">
          <el-option
            v-for="item in manager"
            :key="item.managertype"
            :label="item.managername"
            :value="item.managertype"
          ></el-option>
        </el-select>
      </inpbox>
      <inpbox :inpb="true">
        <el-input
          clearable
          class="con-search qh_inp"
          v-model="param.search"
          placeholder="输入授权位置/授权账号查询"
        ></el-input>
      </inpbox>
      <inpbox>
        <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
        <fel-button class="qh_btn" @click="onReset">重置</fel-button>
      </inpbox>
    </retrieval>
    <paging-table
      class="tobleList wh100"
      interface="/login/main/3/listPersonLock"
      :list="list"
      :refresh="refresh"
      :refreshTable="refreshTable"
      :param="param"
      :paramObj="paramObj"
      ref="paging-table"
      ajaxType="9"
      :isAll="range == 2? true:false"
      :class="{'cover-up':range == 2}"
      @onSelection="(d)=>{selecArr=d}"
    >
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

      <span v-if="historyShow" class="sli but-blue" @click="onClickTop">
        <i class="ficon-image915"></i>
        操作记录
      </span>
    </paging-table>
    <ul class="paging-statistics">
      <li>
        未生效:
        <span>{{authlockfail||0}}</span>个
      </li>
    </ul>

    <modify
      @confirm="modifyConfirm"
      @beforeClose="beforeClose"
      :dialogVisible="dialogVisible"
      :param="modifyData"
      :defaultData="defaultData"
    ></modify>
    <history
      :personcode="$attrs.param.personcode"
      devicetype="1"
      :dialogVisible="historyVisible"
      @beforeClose="historyVisible=false"
    ></history>
  </div>
</template>

<script>
import history from "./history";
import modify from "./modify";
export default {
  components: { modify, history },
  props: {
    buts: Array,
  },
  data() {
    let $this = this;
    return {
      historyVisible: false,
      historyShow: false,
      dialogVisible: false,
      defaultData: {},
      modifyData: [],
      authlockfail: "",
      refresh: 0,
      refreshTable: 0,
      param: {
        authtype: "",
        search: "",
        managertype: "",
        statetype: "",
        empedate: "",
        empsdate: "",
        opencount: "",
        openetime: "",
        openstime: "",
      },
      types: [],
      states: [],
      manager: [],
      paramObj: {},
      range: "1",
      selecArr: [],
      batchButs: [],
      isSelectable: true,
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
          name: "授权位置",
          prop: "roomlocation",
          width: "110px",
        },
        {
          name: "下发时间",
          prop: "senddate",
        },
        {
          name: "授权类型",
          prop: "authtypename",
          minWidth: "80px",
        },
        {
          name: "授权详情",
          prop: "authcode",
        },

        {
          name: "卡片类型",
          prop: "cardtype",
        },
        {
          name: "权限类型",
          prop: "managertypename",
        },
        {
          name: "授权账号",
          prop: "userlogin",
        },
        {
          name: "操作IP",
          prop: "authip",
        },
        {
          name: "下发状态",
          prop: "authissend",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.authissend;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class="getClass()">{{scope.row.authissend}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "authremark",
        },
        {
          name: "操作",
          width: "170px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                let but = [];
                $this.batchButs.forEach((item) => {
                  if (this.scope.row.authtypename.includes("删除")) {
                    if (item.alias != "删除") {
                      but.push(item);
                    }
                  } else {
                    but.push(item);
                  }
                });
                return but;
              },
            },
            methods: {
              onClick(key, obj) {
                let arr = [Object.assign({}, this.scope.row)];
                if (key == 968) {
                  let row = this.scope.row;
                  $this.defaultData = {
                    empsdate: row.empsdate,
                    empedate: row.empedate,
                    openstime: row.opentime.substring(0, 5),
                    openetime: row.opentime.substring(6),
                    opencount: row.opencount,
                  };
                  $this.modify(arr);
                } else if (key == 967) {
                  $this.heavyLoad(arr);
                } else if (key == 969) {
                  $this.delete(arr);
                }
              },
            },
            template: `<div class="operat-buts">
             <fel-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.id, v)">{{v.alias}}</fel-button>
            </div>`,
          },
        },
      ],
    };
  },
  created() {
    this.getType();
    this.getData();
    console.log("this.$attrs.param.personcode", this.$attrs.param.personcode);
    this.paramObj = { personcode: this.$attrs.param.personcode };
    this.buts.forEach((item) => {
      if (item.entity.id == "967") {
        this.batchButs.push(item.entity);
        //重载
      } else if (item.entity.id == "968") {
        this.batchButs.push(item.entity);
        //修改
      } else if (item.entity.id == "969") {
        this.batchButs.push(item.entity);
        //删除
      } else if (item.entity.id == "970") {
        //操作记录
        this.historyShow = true;
      }
    });
    console.log("this.batchButs", this.batchButs);
  },
  methods: {
    getData() {
      this.$ajax(
        "/login/main/1/getPersonMes",
        { personcode: this.$attrs.param.personcode },
        "9"
      ).then((res) => {
        this.authlockfail = res.result.authlockfail;
      });
    },
    getType() {
      this.$ajax("/login/main/2/getSearchType", {}, "9")
        .then((res) => {
          this.manager = [
            { managername: "全部权限类型", managertype: "" },
            ...res.result.manager,
          ];
          this.states = [
            { statename: "全部下发状态", statetype: "" },
            ...res.result.states,
          ];
          this.types = [
            { authname: "全部授权类型", authtype: "" },
            ...res.result.types,
          ];
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    onSelectable() {
      return this.isSelectable;
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
    onAction(key, obj) {
      if (key == 967) {
        this.heavyLoad(this.selecArr);
      } else if (key == 969) {
        this.delete(this.selecArr);
      } else if (key == 968) {
        this.modify(this.selecArr);
      }
    },
    onReset() {
      this.modifyData = [];
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.onRefresh();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onClickTop() {
      this.historyVisible = true;
    },
    heavyLoad(obj) {
      let param = this.getParam(obj, 1);
      this.actionReq(param, "重载");
    },
    delete(obj) {
      let param = this.getParam(obj, 3);
      this.actionReq(param, "删除");
    },
    modify(obj) {
      this.modifyData = obj;
      this.dialogVisible = true;
    },
    modifyConfirm(data) {
      let param = this.getParam(data.obj, 2, data);
      // param.opencount = data.opencount;
      // param.empedate = data.empedate;
      // param.empsdate = data.empsdate;
      // param.openetime = data.openetime;
      // param.openstime = data.openstime;
      console.log("data", data);
      this.actionReq(param, "修改");
    },
    getParam(obj, num, data) {
      console.log("data", data);
      let param = {
        actiontype: this.range == "1" ? "勾选范围" : "全选范围",
        actiontype2: num,
        authids: obj.map((item) => {
          return item.authid;
        }),
        devicetype: 1,
        search: this.param.search,
        authtype: this.param.authtype,
        statetype: this.param.statetype,
        managertype: this.param.managertype,
        personcode: this.$attrs.param.personcode,
        opencount: data && data.opencount ? data.opencount : "",
        empedate: data && data.empedate ? data.empedate : "",
        empsdate: data && data.empsdate ? data.empsdate : "",
        openetime: data && data.openetime ? data.openetime : "",
        openstime: data && data.openstime ? data.openstime : "",
      };
      return param;
    },
    actionReq(param, str) {
      this.$confirm("确定要" + str + "当前人员吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ajax("/login/main/5/actionPersonAuth", param, "9", {}, true)
          .then((res) => {
            this.$message({
              message: str + "成功!",
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
      });
    },
    beforeClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>