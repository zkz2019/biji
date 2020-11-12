<!-- 人员授权信息 -->
<template>
  <el-dialog
    title="人员授权信息"
    width="70%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    append-to-body
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        class="tobleList wh100"
        height="100%"
        interface="/quick/getquickauth"
        :list="list"
        :refresh="refresh"
        :refreshTable="refreshTable"
        :param="param"
      >
        <div class="query_head fjDialogtabel">
          <inpbox :inpb="true">
            <el-input
              clearable
              class="qh_w270 qh_inp"
              v-model="param.search"
              placeholder="输入授权详情/房间位置查询"
            ></el-input>
          </inpbox>

          <inpbox>
            <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
            <fel-button class="qh_btn" @click="onReset">重置</fel-button>
          </inpbox>
        </div>
      </paging-table>
    </el-container>
    <rightUpdate
      @onRefresh="onRefreshTable"
      :param="paramUpdate"
      :dialogVisible="dialogUpdate"
      @beforeClose="beforeCloseUpdate"
    ></rightUpdate>
  </el-dialog>
</template>

<script>
import rightUpdate from "./rightUpdate";
export default {
  components: { rightUpdate },
  props: {
    personcode: String,
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      refreshTable: 0,
      dialogUpdate: false,
      paramUpdate: {},
      param: { search: "", personcode: "" },
      list: [
        {
          prop: "authtype",
          name: "授权类型",
        },
        {
          prop: "authcode",
          name: "授权详情",
        },
        {
          prop: "authdate",
          name: "授权时间",
        },
        {
          prop: "userlogin",
          name: "授权人",
        },
        {
          prop: "roomlocation",
          name: "房间位置",
        },
        {
          prop: "issend",
          name: "下发状态",
          template: {
            props: ["scope"],
            methods: {},
            template: `<div :class="scope.row.issend=='下发成功'?'puc-pg':'puc-px'">{{scope.row.issend}}</div>`,
          },
        },
        {
          name: "操作",
          width: "100px",
          template: {
            props: ["scope"],
            computed: {},
            methods: {
              onClick(val) {
                if (val == "1") {
                  $this.onclick2(this.scope.row);
                } else {
                  $this.onClick(this.scope.row);
                }
              },
            },
            template: `<div class="operat-buts"> 
             <el-button type="text" size="small" @click.stop="onClick()">修改</el-button>
             <el-button type="text" size="small" @click.stop="onClick('1')">重载</el-button>
            </div>`,
          },
        },
      ],
    };
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.onRefresh();
        this.param.personcode = this.personcode;
      }
    },
  },
  created() {
    // this.inGetfingertype();
  },
  methods: {
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onReset() {
      this.param.search = "";
      this.onRefresh();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onClick(obj) {
      this.paramUpdate = obj;
      this.dialogUpdate = true;
    },
    onclick2(obj) {
      this.$ajax(
        "/quick/reload/2/reloadauth",
        { authid: obj.authid, authtype: obj.authtype },
        "1",
        {},
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
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    beforeCloseUpdate() {
      this.dialogUpdate = false;
    },
  },
};
</script>
