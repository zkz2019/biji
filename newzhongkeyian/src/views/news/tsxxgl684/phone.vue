<!--  -->
<template>
  <el-dialog
    :title="'手机范围 - '+param.pushname + '（推送编号：'+param.pushid+'）'"
    width="60%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/push/limit/g/getpushmobile"
        ref="paging-table"
        :list="list"
        :param="paramObj"
        :refresh="refresh"
        :refreshTable="refreshTable"
        @onSelection="(d)=>{selecArr=d}"
      >
        <template v-for="(val, key) of buts">
          <span v-if="val.id == 765" :key="key" class="sli but-blue" @click="onClick(1)">
            <i class="ficon-image686"></i>新增手机
          </span>
          <span
            :class="{'disabled':selecArr.length==0}"
            v-else-if="val.id == 767"
            :key="key"
            class="sli but-blue"
            @click="onClick(2)"
          >
            <i class="ficon-image106"></i>批量删除
          </span>
        </template>
      </paging-table>
    </el-container>
    <el-dialog
      width="50%"
      :title="type == 1?'新增推送手机':'修改推送手机'"
      :close-on-click-modal="false"
      :before-close="innerClose"
      :visible.sync="innerVisible"
      append-to-body
    >
      <fel-form
        ref="felForm"
        class="single-row"
        @submitForm="submitForm"
        @closeForm="innerClose"
        width="140px"
        dynamic
        :defaultData="defaultData"
        :formData="formData"
      ></fel-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
import judge from "@/utils/judge.js";
export default {
  props: {
    buts: Array,
    param: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      type: 1,
      paramObj: {},
      defaultData: {},
      innerVisible: false,
      refresh: 0,
      refreshTable: 0,
      selecArr: [],
      formData: [
        {
          value: "pmcontent",
          name: "手机号",
          type: "text",
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                  callback(new Error("请输入手机号码"));
                } else if (!judge.isMobile(value)) {
                  callback(new Error("手机号码格式错误"));
                } else {
                  callback();
                }
              },
              trigger: "blur",
            },
          ],
        },
        {
          name: "备注",
          value: "pmremark",
        },
      ],
      list: [
        {
          type: "selection",
        },
        {
          name: "序号",
          type: "$index",
          width: "80px",
        },
        {
          name: "手机号码",
          prop: "pmcontent",
        },
        {
          name: "备注",
          prop: "pmremark",
        },
        {
          name: "操作",
          width: "100px",
          template: {
            props: ["scope"],
            computed: {
              buts() {
                return $this.buts.filter((obj) => {
                  return obj.id != "765";
                });
              },
            },
            methods: {
              onClick(key) {
                if (key == 766) {
                  $this.type = 2;
                  $this.defaultData = Object.assign({}, this.scope.row);
                  $this.innerVisible = true;
                } else {
                  $this.delete(this.scope.row.pmid);
                }
              },
            },
            template: `<div class="operat-buts"> 
             <el-button v-for="(v,i) of buts" :key="i" type="text" size="small" @click.stop="onClick(v.id)">{{v.alias}}</el-button>
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
      }
    },
  },
  methods: {
    onRefresh(bool) {
      this.paramObj = {
        pushid: this.param.pushid,
        pgid: this.param.pgid,
        search: "",
      };
      if (bool) {
        this.refreshTable = new Date().getTime();
      } else {
        this.refresh = new Date().getTime();
      }
    },
    submitForm(data) {
      if (this.type == 1) {
        data.pushid = this.param.pushid;
        this.$ajax("/push/limit/h/savepushmobile", data, "1", {})
          .then((res) => {
            this.innerClose();
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.onRefresh(true);
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error",
            });
          });
      } else {
        this.$ajax("/push/limit/i/updatepushmobile", data, "1", {})
          .then((res) => {
            this.innerClose();
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.onRefresh(true);
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error",
            });
          });
      }
    },
    onClick(key) {
      if (key == 1) {
        this.defaultData = {};
        this.innerVisible = true;
      } else {
        let arr = this.selecArr.map((o) => o.pmid);
        if (arr.length > 0) {
          this.$confirm("确定要删除当前选中手机号码吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$ajax("/push/limit/j/deletepushmobile", {}, "1", arr, true)
                .then((res) => {
                  this.$message({
                    type: "success",
                    message: "批量删除成功!",
                  });
                  this.onRefresh(true);
                })
                .catch((err) => {
                  this.$message({
                    showClose: true,
                    message: `[${err.resultCode}] ` + err.resultMsg,
                    type: "error",
                  });
                });
            })
            .catch((err) => {});
        }
      }
    },
    delete(roomid) {
      this.$confirm("确定要删除当前手机号码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax("/push/limit/j/deletepushmobile", {}, "1", [roomid], true)
            .then((res) => {
              this.onRefresh(true);
              this.$message({
                message: "删除成功!",
                type: "success",
              });
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error",
              });
            });
        })
        .catch(() => {});
    },
    innerClose() {
      this.defaultData = {};
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.innerVisible = false;
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
  },
};
</script>
