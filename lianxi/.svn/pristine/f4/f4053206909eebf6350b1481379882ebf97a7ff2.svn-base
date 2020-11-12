<template>
  <el-dialog
    title="操作历史查询"
    width="70%"
    class="instructDialog"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/system/device/fingerprint/info/1/getfingerprinthistory"
        :list="list"
        :param="param"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input
            clearable
            class="search con-search"
            v-model="param.search"
            placeholder="输入ID/名称查询"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
        </span>
      </paging-table>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      param: {
        search: "",
      },

      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "采集器名称",
          prop: "fpname",
          width: "250px",
        },
        {
          name: "采集器唯一ID",
          prop: "fpcode",
          minWidth: "100px",
        },
        {
          name: "下发时间",
          prop: "sifcdate",
        },
        {
          name: "返回时间",
          prop: "sifedate",
        },
        {
          name: "下发类型",
          prop: "siftype",
        },
        {
          name: "创建人",
          prop: "userlogin",
        },
        {
          name: "备注",
          prop: "failtype",
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      }
    },
  },
  methods: {
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onReset() {
      this.param.search = "";
      this.onRefresh();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
  },
};
</script>

<style>
</style>
