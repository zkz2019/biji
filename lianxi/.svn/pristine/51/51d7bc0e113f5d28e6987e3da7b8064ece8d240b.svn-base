<!-- 操作记录详情 -门禁 -->
<template>
  <fel-dialog
    title="操作记录详情"
    width="70%"
    minWidth="1050px"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="mjRecord">
      <paging-table
        height="100%"
        interface="/access/v2.0/door/n/listAccessAuthUpdateDetails"
        class="heig100"
        @onSelection="onSelection"
        :list="list"
        ajaxType="9"
        :refresh="refresh"
        :param="paramObj"
      ></paging-table>
    </el-container>
  </fel-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    paramObj: Object,
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      param: {},
      list: [
        {
          name: "序号",
          type: "$index",
          width: "50px"
        },
        {
          name: "创建时间",
          prop: "aaudcdate"
        },
        {
          name: "处理时间",
          prop: "aaudedate"
        },
        {
          name: "读头名称",
          prop: "ahname"
        },
        {
          name: "原授权类型",
          prop: "authtypename"
        },
        {
          name: "处理状态",
          prop: "aaudstatusname",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.aaudstatusname;
                if (value == "处理成功") {
                  return "puc-pg";
                } else if (value == "处理失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              }
            },
            template: `<span :class='getClass()'>{{scope.row.aaudstatusname}}</span>`
          }
        },
        {
          name: "失败原因",
          prop: "aaudreason"
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      }
    }
  },
  created() {},
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onRefresh() {
      //刷新表格
      this.refresh = new Date().getTime();
    },
    onSelection(data) {}
  }
};
</script>

<style lang="scss">
.mjRecord {
  height: 450px;
}
</style>

