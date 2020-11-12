<!-- 弹出窗口 管理员-->
<template>
  <!--添加界面-->
  <fel-dialog
    class="fel-left-tree dialog27box fel-admin"
    :title="title"
    top="8vh"
    :append-to-body="appendToBody"
    :minWidth="minWidth"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    width="80%"
  >
    <adjust class="adm_con">
      <adjust-div width="200px" class="asidebox left">
        <div class="admin-search">
          <el-input :placeholder="placeholder" clearable v-model="fuParam.search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <fel-button type="primary" @click="onFuRefresh">查询</fel-button>
        </div>
        <paging-table
          height="100%"
          :interface="leftInterfaceUrl"
          noOpera
          ref="fuPaging"
          layout="total, prev, next"
          :ajaxType="ajaxType"
          @onSelect="onSelectLeft"
          @onSelection="onSelectionLeft"
          :list="leftList"
          :param="fuParam"
          :paramObj="paramObj"
          :refresh="fuRefresh"
          :refreshTable="fuRefreshTable"
        />
      </adjust-div>
      <adjust-div class="container" noadjust>
        <el-container class="adm_con2">
          <paging-table
            ref="pagingTable"
            height="100%"
            :ajaxType="ajaxType"
            :interface="interfaceUrl"
            @onSelect="onSelect"
            @onSelection="onSelection"
            :list="list"
            :param="param"
            :paramObj="paramObj"
            :refresh="refresh"
            :refreshTable="refreshTable"
          >
            <span v-for="(v,k) of botButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
              <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
              {{v.alias}}
            </span>
          </paging-table>
        </el-container>
      </adjust-div>
    </adjust>
  </fel-dialog>
</template>

<script>
export default {
  props: {
    appendToBody: Boolean,
    minWidth: String,
    title: String,
    dialogVisible: Boolean,
    botButs: Array,
    ajaxType: {
      type: String,
      default: "1",
    },
    param: Object,
    paramObj: Object | Array,
    leftInterfaceUrl: String,
    placeholder: {
      type: String,
      default() {
        return "输入账号或姓名查询";
      },
    },
    leftList: {
      type: Array,
      default() {
        return [
          {
            prop: "userlogin",
            tooltip: true,
            name: "账号",
          },
          {
            prop: "username",
            tooltip: true,
            name: "姓名",
          },
        ];
      },
    },
    interfaceUrl: String,
    list: {
      type: Array,
      default() {
        return [
          {
            type: "selection",
          },
          {
            name: "序号",
            type: "$index",
            width: "60px",
          },
          {
            name: "管理员账号",
            prop: "userlogin",
          },
          {
            name: "使用者姓名",
            prop: "username",
          },
          {
            name: "账号角色",
            prop: "userrole",
          },
          {
            name: "授权账号",
            prop: "userlogin2",
            // formatter(a, b, c) {
            //   if (a.userlogin == "admin" && c == "admin") {
            //     return "--";
            //   }
            //   return c;
            // }
          },
          {
            name: "授权生效日期",
            minWidth: "100px",
            prop: "pgmdate",
          },
        ];
      },
    },
  },
  data() {
    return {
      fuRefresh: 0,
      fuRefreshTable: 0,
      fuParam: {
        search: "",
      },
      refresh: 0,
      refreshTable: 0,
    };
  },
  created() {
    this.fuParam = Object.assign(this.fuParam, this.param);
  },
  watch: {
    dialogVisible(v) {
      if (v) {
        this.fuParam = Object.assign(this.fuParam, this.param);
        this.onFuRefresh();
        this.onRefresh();
      }
    },
  },
  methods: {
    onFuRefresh() {
      this.fuRefresh = new Date().getTime();
    },
    onFuRefreshTable() {
      this.fuRefreshTable = new Date().getTime();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelectLeft(data) {
      this.$emit("onSelectLeft", data);
    },
    onSelectionLeft(data) {
      this.$emit("onSelectionLeft", data);
    },
    onSelect(data) {
      this.$emit("onSelect", data);
    },
    onSelection(data) {
      this.$emit("onSelection", data);
    },
    onClick(val, obj) {
      this.$emit("onClick", val, obj);
    },
    refreshData() {
      if (this.$refs.fuPaging) {
        this.$refs.fuPaging.setCurrent();
      }
      this.onFuRefreshTable();
      this.onRefreshTable();
    },
  },
};
</script>
