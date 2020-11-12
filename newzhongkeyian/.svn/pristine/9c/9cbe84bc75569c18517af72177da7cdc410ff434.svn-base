<!-- 批量指令查询 -门禁 -->
<template>
  <fel-dialog
    title="批量指令查询"
    width="70%"
    append-to-body
    minWidth="1050px"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="mjhistory">
      <paging-table
        interface="/access/v2.0/door/b/listAccessOrder"
        class="mjhistory_table"
        :list="list"
        ajaxType="9"
        :refresh="refresh"
        :noOpera="true"
      ></paging-table>
    </el-container>
    <batchQueryZlDetails
      :paramObj="param"
      :dialogVisible="dialogVisibleDetails"
      @beforeClose="beforeCloseDetail"
    ></batchQueryZlDetails>
  </fel-dialog>
</template>

<script>
import batchQueryZlDetails from "./batchQueryZlDetails";
export default {
  props: {
    paramObj: Object,
    dialogVisible: Boolean
  },
  components: {
    batchQueryZlDetails
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      param: {},
      dialogVisibleDetails: false,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "50px"
        },
        {
          name: "操作时间",
          prop: "aocdate"
        },
        {
          name: "总数量",
          prop: "aocount"
        },
        {
          name: "失败数",
          prop: "aonocount"
        },
        {
          name: "成功数",
          prop: "aookcount"
        },
        {
          name: "类型",
          prop: "aotype"
        },
        {
          name: "操作人",
          prop: "userlogin"
        },
        {
          name: "操作",
          template: {
            props: ["scope"],
            methods: {
              onClick(obj) {
                $this.onClick(obj);
              }
            },
            template: `<div class="operat-buts"> 
      <fel-button type="text" size="small" @click.stop="onClick(scope.row)">详情</fel-button>
</div>`
          }
        }
      ]
    };
  },
  computed: {},
  created() {
    console.log("111111111111", 111111111111);
  },
  watch: {
    dialogVisible(val) {
      console.log("val", val);
      if (val) {
        this.onRefresh();
      }
    }
  },
  methods: {
    onClick(obj) {
      this.param = obj;
      this.dialogVisibleDetails = true;
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    beforeCloseDetail() {
      this.dialogVisibleDetails = false;
    },
    onRefresh() {
      //刷新表格
      this.refresh = new Date().getTime();
    }
  }
};
</script>

<style lang="scss">
.mjhistory {
  height: 100%;
  .mjhistory_table {
    height: 400px;
  }
}
</style>

