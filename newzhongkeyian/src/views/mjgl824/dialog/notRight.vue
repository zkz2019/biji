<!-- 未生效授权 -门禁 -->
<template>
  <fel-dialog
    title="未生效授权"
    width="70%"
    minWidth="1050px"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="mjRecord">
      <paging-table
        ref="paging-table"
        height="100%"
        interface="/access/v2.0/door/o/listAccessFailAuth"
        class="heig100"
        @onSelection="onSelection"
        :list="list"
        ajaxType="9"
        :refresh="refresh"
        :refreshTable="refreshTable"
        :param="paramObj"
      >
        <template v-if="btnRight && btnRight.length > 0">
          <div class="full-list" v-show="!list[0].show">
            <el-checkbox v-model="range" @change="onChange" true-label="2" false-label="1">跨页全选</el-checkbox>
          </div>
          <batch-but
            class="sli but-blue"
            text="批量下发"
            :list="listArrs"
            :param="btnRight"
            @onClick="onBatchClick"
          ></batch-but>
        </template>
      </paging-table>
    </el-container>
  </fel-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    paramObj: Object,
    btnRight: Array,
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      refreshTable: 0,
      param: {},
      listArrs: [],
      batchButs: [],
      isSelectable: true,
      range: "1",
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
          name: "下发日期",
          prop: "senddate",
        },
        {
          name: "姓名",
          prop: "personname",
        },
        {
          name: "人员编号",
          prop: "personcode",
        },
        {
          name: "归属组织",
          prop: "personlocation",
        },
        {
          name: "卡片类型",
          prop: "cdtype",
        },
        {
          name: "授权详情",
          prop: "authcode",
        },
        {
          name: "授权类型",
          prop: "authtypename",
        },
        {
          name: "授权账号",
          prop: "userlogin",
        },

        {
          name: "下发状态",
          prop: "issend",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.issend;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.issend}}</span>`,
          },
        },
        {
          name: "失败原因",
          prop: "failreason",
        },
        {
          name: "操作",
          width: "150px",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                $this.onClick(this.scope.row);
              },
            },
            template: `<div class="operat-buts"> 
      <fel-button type="text" size="small" @click.stop="onClick">重载未生效授权</fel-button>
</div>`,
          },
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      } else {
        this.range = "1";
      }
    },
  },
  methods: {
    beforeClose() {
      this.$refs["paging-table"].clearSelection();
      this.isSelectable = true;
      this.$emit("beforeClose");
    },
    onRefresh() {
      //刷新表格
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onSelection(data) {
      this.listArrs = data;
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
    onBatchClick(key, obj) {
      this.onClick();
    },
    onClick(obj) {
      let data = [];
      if (obj) {
        data = {
          actiontype: "勾选范围",
          adid: this.paramObj.adid,
          amid: this.paramObj.amid,
          auths: [obj],
        };
      } else {
        data = {
          actiontype: this.range == "1" ? "勾选范围" : "全选范围",
          adid: this.paramObj.adid,
          amid: this.paramObj.amid,
          auths: this.listArrs,
        };
      }
      this.$ajax("/access/v2.0/door/p/reloadAccessFailAuth", data, "9", true)
        .then((res) => {
          this.$message({
            type: "success",
            message: "重载成功!",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: `[${err.resultCode}] ` + err.resultMsg || "重载失败!",
          });
        });
    },
    onSelectable() {
      return this.isSelectable;
    },
  },
};
</script>

<style lang="scss">
.mjRecord {
  height: 450px;
}
</style>

