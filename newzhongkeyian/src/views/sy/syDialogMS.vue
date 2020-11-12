<template>
  <fel-dialog
    title="门锁明细"
    width="70%"
    minWidth="680px"
    top="10vh"
    class="syDialogMS"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        ref="paging-table"
        interface="/login/home/f/getlockinfo"
        @onSelection="(d)=>{selecArr=d}"
        :param="param"
        @onSelect="onSelect"
        :refresh="refresh"
        @selection-change="selectChange"
        :list="list"
      >
        <span class="sli">
          <el-select class="maR10 wid150" v-model="param.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            clearable
            class="search con-search"
            v-model="param.search"
            placeholder="输入门锁唯一ID/门锁位置查询"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </span>
        <template v-if="batchButs.length > 0">
          <!-- <div class="full-list" v-show="!list[0].show">
            <el-checkbox v-model="range" @change="onChange" true-label="2" false-label="1">跨页全选</el-checkbox>
          </div>-->
          <batch-but
            class="sli but-blue"
            :type="range"
            :list="selecArr"
            :param="batchButs"
            @onClick="onAction"
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
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      range: "1",
      isType: "",
      selecArr: [],
      isSelectable: true,
      batchButs: [
        {
          alias: "批量查看",
          icon: "",
          id: "z1",
          isnext: "0",
          value: "plck",
        },
      ],
      param: {
        search: "",
        type: "",
      },
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "在线",
        },
        {
          value: "0",
          label: "离线",
        },
      ],
      refresh: 0,
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
        {
          name: "网关通讯ID",
          prop: "gatewaycode",
        },
        {
          name: "门锁通讯ID",
          prop: "roomcharge",
        },
        {
          name: "门锁唯一ID",
          prop: "roomcode2",
        },
        {
          name: "门锁位置",
          prop: "roomlocation",
        },
        {
          name: "电量",
          prop: "roomelectric",
          formatter(row) {
            return row.roomelectric + "%";
          },
        },
        {
          name: "门锁状态",
          prop: "roomstate",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.roomstate;
                if (value == "在线") {
                  return "puc-pg";
                } else if (value == "离线") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class="getClass()">{{scope.row.roomstate}}</span>`,
          },
        },
        {
          name: "门锁类型",
          prop: "roomtxtype",
        },
        {
          name: "操作",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                $this.toPage(
                  [this.scope.row.roomcode2],
                  this.scope.row.roomtxtype
                );
              },
            },
            template: `<el-button type="text" size="small" @click.stop="onClick">查看</el-button>`,
          },
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onReset();
      }
    },
  },
  methods: {
    onSelectable(row) {
      if (this.isType == "") {
        return true;
      } else if (row.roomtxtype != this.isType) {
        return false;
      } else {
        return true;
      }
    },
    onAction(key, obj) {
      if (key == "z1") {
        let arr = this.selecArr.map((item) => {
          return item.roomcode2;
        });
        this.toPage(arr, this.isType);
      }
    },
    toPage(arr, type) {
      console.log("arr,type", arr, type);
      this.beforeClose();
      if (type == "电信NB锁") {
        this.$router.push({
          name: "设备管理",
          params: {
            name: "NBIOT锁",
            params: { to: "sy", code: arr },
          },
        });
      } else if (type == "无线联网锁") {
        this.$router.push({
          name: "设备管理",
          params: {
            name: "无线联网锁",
            params: { to: "sy", code: arr },
          },
        });
      } else if (type == "有线联网锁") {
        this.$router.push({
          name: "设备管理",
          params: {
            name: "有线联网锁",
            params: { to: "sy", code: arr },
          },
        });
      }
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect(data) {
      this.$emit("onSelect", data);
    },
    selectChange(data, obj) {
      if (data.length == 0) {
        this.isType = "";
      } else {
        this.isType = data[0].roomtxtype;
      }
    },
    //重置事件
    onReset() {
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.onRefresh();
    },
  },
};
</script>
<style lang="scss" >
.syDialogMS {
  .el-table__header .el-checkbox {
    display: none !important;
  }
}
</style>