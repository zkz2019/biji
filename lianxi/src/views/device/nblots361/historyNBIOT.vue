<template>
  <el-dialog
    title="导入历史查询"
    width="70%"
    class="instructDialog"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/system/device/devicenblock/upload/3/getuploaddevicenblock"
        :list="list"
        :param="param"
        :refresh="refresh"
      >
        <span class="sli">
          <el-input
            clearable
            class="search con-search"
            v-model="param.search"
            placeholder="输入创建人查询"
          ></el-input>
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
        </span>
      </paging-table>
    </el-container>
    <el-dialog
      title="房间明细查询"
      width="70%"
      class="instructDialog"
      append-to-body
      :close-on-click-modal="false"
      :before-close="beforeDetailed"
      :visible.sync="dialogDetailed"
    >
      <el-container class="dialog-table6 query_main">
        <paging-table
          interface="/system/device/devicenblock/upload/4/getuploaddevicenblockdetails"
          :list="detailedList"
          :param="detailedParam"
          :refresh="detailedRefresh"
        ></paging-table>
      </el-container>
    </el-dialog>
    <el-dialog
      title="指令明细查询"
      width="70%"
      class="instructDialog"
      append-to-body
      :close-on-click-modal="false"
      :before-close="beforeInstruct"
      :visible.sync="dialogInstruct"
    >
      <el-container class="dialog-table6 query_main">
        <paging-table
          interface="/system/device/devicenblock/upload/6/getuploaddeviceorderdetails"
          :list="instructList"
          :param="detailedParam"
          :refresh="instructRefresh"
        ></paging-table>
      </el-container>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    paramObj: Object,
  },
  data() {
    let $this = this;
    return {
      dialogInstruct: false,
      detailedList: [
        // 导入历史房间明细查询 列表
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "房间IMEI",
          prop: "roomimei",
        },
        {
          name: "房间IMSI",
          prop: "roomimsi",
        },
        {
          name: "房间位置",
          prop: "roomlocation",
          width: "200px",
        },
        {
          name: "平台类型",
          prop: "roomtxtype",
        },
        {
          name: "处理时间",
          prop: "unbdate",
        },
        {
          name: "处理状态",
          prop: "unbstatus",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.unbstatus;
                if (value == "1") {
                  return "puc-pg";
                } else if (value == "-1") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            computed: {
              getName() {
                let value = this.scope.row.unbstatus;
                if (value == "1") {
                  return "处理成功";
                } else if (value == "-1") {
                  return "处理失败";
                } else {
                  return "正在处理";
                }
              },
            },
            template: `<span :class='getClass()'>{{getName}}</span>`,
          },
        },
        {
          name: "门锁唯一ID",
          prop: "roomcode2",
        },
        {
          name: "备注",
          prop: "unbremark",
        },
        // {
        //   name: "房间编号",
        //   prop: "roomcode"
        // },

        // {
        //   name: "房间型号",
        //   prop: "roommodel"
        // }
      ],
      instructList: [
        // 导入历史房间指令明细查询 列表
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "房间位置",
          prop: "roomlocation",
        },
        {
          name: "门锁唯一ID",
          prop: "roomcode2",
        },
        {
          name: "发送状态",
          template: {
            props: ["scope"],
            template: `<span :class='scope.row.issend=="下发成功"?"puc-ps":"puc-px"'>{{scope.row.issend}}</span>`,
          },
        },
        {
          name: "备注",
          prop: "failtype",
        },
      ],
      instructRefresh: 0,
      param: {
        search: "",
      },
      detailedParam: {
        ulid: "",
      },
      detailedRefresh: 0,
      dialogDetailed: false,

      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "导入时间",
          prop: "uploaddate",
        },
        {
          name: "导入数",
          prop: "uploadallcount",
          template: {
            props: ["scope"],
            methods: {
              isNumber(num) {
                if (num) {
                  return /^[0-9]*$/.test(num) && num != 0;
                }
                return false;
              },
              onClick() {
                if (this.scope.row.uploadid) {
                  $this.detailedParam.ulid = this.scope.row.uploadid;
                  $this.onDetailedRefresh();
                  $this.dialogDetailed = true;
                }
              },
            },
            template: `<div>
              <span v-if="isNumber(scope.row.uploadallcount)"><a class="a-click" @click.stop="onClick">{{scope.row.uploadallcount}}</a></span>
              <span v-else>{{scope.row.uploadallcount}}</span>
            </div>`,
          },
        },
        // {
        //   name: "指令数",
        //   prop: "ulcount2",
        //   template: {
        //     props: ["scope"],
        //     methods: {
        //       isNumber(num) {
        //         if (num) {
        //           return /^[0-9]*$/.test(num) && num != 0;
        //         }
        //         return false;
        //       },
        //       onClick() {
        //         if (this.scope.row.ulid) {
        //           $this.detailedParam.ulid = this.scope.row.ulid;
        //           $this.onInstructRefresh();
        //           $this.dialogInstruct = true;
        //         }
        //       }
        //     },
        //     template: `<div>
        //       <span v-if="isNumber(scope.row.ulcount2)"><a class="a-click" @click.stop="onClick">{{scope.row.ulcount2}}</a></span>
        //       <span v-else>{{scope.row.ulcount2}}</span>
        //     </div>`
        //   }
        // },
        {
          name: "处理成功数",
          prop: "uploadokcount",
        },
        {
          name: "处理失败数",
          prop: "uploadnocount",
        },

        {
          name: "导入账号",
          prop: "userlogin",
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
    paramObj(val) {
      this.param.buildid = val.buildid;
    },
  },
  methods: {
    onDetailedRefresh() {
      this.detailedRefresh = new Date().getTime();
    },
    onInstructRefresh() {
      this.instructRefresh = new Date().getTime();
    },
    beforeDetailed() {
      this.dialogDetailed = false;
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeInstruct() {
      this.dialogInstruct = false;
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
  },
};
</script>

<style>
</style>
