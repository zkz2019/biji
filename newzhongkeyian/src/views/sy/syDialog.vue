<template>
  <fel-dialog
    title="网关明细"
    width="70%"
    minWidth="680px"
    top="10vh"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        ref="paging-table"
        interface="/login/home/e/getgatewayinfo"
        @onSelection="(d)=>{selecArr=d}"
        :param="param"
        @onSelect="onSelect"
        :refresh="refresh"
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
            placeholder="输入网关位置/通讯ID/唯一ID查询"
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
          name: "通讯ID",
          prop: "gatewaycode",
        },
        {
          name: "唯一ID",
          prop: "gatewaycode2",
        },
        {
          name: "网关位置",
          prop: "gatewaylocation",
        },
        {
          name: "分配门锁",
          prop: "gatewaylock",
        },
        {
          name: "网关状态",
          prop: "gatewaystate",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.gatewaystate;
                if (value == "在线") {
                  return "puc-pg";
                } else if (value == "离线") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class="getClass()">{{scope.row.gatewaystate}}</span>`,
          },
        },
        {
          name: "操作",
          template: {
            props: ["scope"],
            methods: {
              onClick() {
                $this.toPage({ to: "sy", code: [this.scope.row.gatewaycode2] });
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
    ...mapGetters(["getNumber"]),

    onSelectable() {
      return this.isSelectable;
    },
    onAction(key, obj) {
      if (key == "z1") {
        console.log("tis.selecArr", this.selecArr);
        let arr = this.selecArr.map((item) => {
          return item.gatewaycode2;
        });
        this.toPage({ to: "sy", code: arr });
      }
    },
    toPage(arr) {
      this.beforeClose();
      this.$router.push({
        name: "设备管理",
        params: {
          name: "智能网关",
          params: arr,
        },
      });
    },
    onChange(val) {
      console.log("val", val);
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
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect(data) {
      this.$emit("onSelect", data);
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