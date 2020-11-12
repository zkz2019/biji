<template>
  <el-dialog
    title="人员列表"
    width="60%"
    top="10vh"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/system/device/deviceaccess/accessorder/4/getpersonlist"
        :param="param"
        @onSelect="onSelect"
        :refresh="refresh"
        :list="list"
      >
        <span class="sli">
          <el-input
            clearable
            class="search con-search"
            v-model="param.search"
            :placeholder="'输入'+getNumber()+'/姓名/手机号查询'"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
        </span>
      </paging-table>
    </el-container>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    param: {
      type: Object,
      default() {
        return {
          search: ""
        };
      }
    },
    interface: {
      type: String,
      default: "/auth/cardcenter/card/savecard/8/getcardperson"
    },
    dialogVisible: Boolean
  },
  data() {
    return {
      refresh: 0,
      list:  [
        { name: this.getNumber(), prop: "personcode" },
        { name: "组织", prop: "personlocation" },
        { name: "电话", prop: "personmobile" },
        { name: "姓名", prop: "personname" }
      ]
    };
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.onRefresh();
      }
    }
  },
  methods: {
    ...mapGetters(["getNumber"]),
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect(data) {
      this.$emit("onSelect", data);
    }
  }
};
</script>