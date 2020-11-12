<!-- 编辑房型 -->
<template>
  <el-dialog
    title="编辑房型"
    width="50%"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        interface="/system/roomtype/1/getroomtype"
        :list="list"
        :param="param"
        :refresh="refresh"
        :refreshTable="refreshTable"
      >
        <span class="sli but-blue" @click="onClick">新增房型</span>
      </paging-table>
    </el-container>
    <el-dialog
      :title="title"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
      :before-close="beforeCloseForm"
      :visible.sync="dialogVisibleForm"
    >
      <fel-form
        ref="felForm"
        class="single-row"
        @submitForm="submitForm"
        @closeForm="beforeCloseForm"
        width="140px"
        dynamic
        :defaultData="defaultData"
        :formData="formData"
      ></fel-form>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  props: {
    param: {
      type: Object,
      default() {
        return {};
      }
    },
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      buts: [
        {
          type: "2",
          name: "编辑"
        },
        {
          type: "4",
          name: "删除"
        }
      ],
      title: "新增",
      dialogVisibleForm: false,
      defaultData: {},
      formData: [
        {
          value: "housename",
          name: "房型",
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入房型名称",
              trigger: "blur"
            }
          ]
        },
        {
          value: "houseprice",
          name: "房价",
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入房价",
              trigger: "blur"
            }
          ]
        },
        {
          value: "maxperson",
          name: "最大入住人数",
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入最大入住人数",
              trigger: "blur"
            }
          ]
        }
      ],
      refresh: 0,
      refreshTable:0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "80px"
        },
        {
          name: "房型",
          prop: "housename"
        },
        {
          name: "房价",
          prop: "houseprice"
        },
        {
          name: "最大入住人数",
          prop: "maxperson"
        },
        {
          name: "操作",
          width: "100px",
          template: {
            props: ["scope"],
            computed: {
              buts() {
                return $this.buts;
              }
            },
            methods: {
              onClick(key) {
                if (key == 4) {
                  $this.delete(this.scope.row.houseid);
                } else {
                  $this.title = "编辑";
                  $this.defaultData = Object.assign({}, this.scope.row);
                  $this.dialogVisibleForm = true;
                }
              }
            },
            template: `<div class="operat-buts"> 
             <el-button v-for="(v,i) of buts" :key="i" type="text" size="small" @click.stop="onClick(v.type)">{{v.name}}</el-button>
            </div>`
          }
        }
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
    onClick() {
      this.title = "新增";
      this.defaultData = {};
      this.dialogVisibleForm = true;
    },
    submitForm(data) {
      let url = "/system/roomtype/save/1/saveroomtype";
      if ((this.title == "编辑")) {
        url = "/system/roomtype/update/1/updateroomtype";
      }
      this.$ajax(url, data, "1", {}, true)
        .then(res => {
          this.$emit("onRefresh");
          this.onRefreshTable();
          this.beforeCloseForm();
          this.$message({
            message: this.title + "成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    delete(roomid) {
      this.$confirm("确定要删除当前房型吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax(
            "/system/roomtype/delete/1/deleteroomtype",
            { houseid: roomid },
            "1"
          )
            .then(res => {
              this.$emit("onRefresh");
              this.onRefreshTable();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error"
              });
            });
        })
        .catch(() => {});
    },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    },
    beforeCloseForm() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.dialogVisibleForm = false;
    }
  }
};
</script>