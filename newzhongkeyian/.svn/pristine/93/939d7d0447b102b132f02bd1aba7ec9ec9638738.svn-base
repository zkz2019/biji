<!-- 基础参数 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <com-title>{{toParam.alias}}</com-title>
    </el-header>
    <el-main class="query_main">
      <paging-table
        height="100%"
        interface="/system/parameter/basic/3/getparameter3"
        class="heig100"
        :list="list"
        :refreshTable="refreshTable"
        @onEjectChange="onEjectChange(true)"
      />
    </el-main>
    <el-dialog
      title="修改参数"
      width="50%"
      class="jccs418-dialog"
      :close-on-click-modal="false"
      :before-close="closeForm"
      :visible.sync="dialogForm"
    >
      <fel-form
        :formData="formData"
        ref="basicFelForm"
        class
        width="100px"
        dynamic
        :selects="selects"
        @closeForm="closeForm"
        @submitForm="submitForm"
        :defaultData="defaultData"
      ></fel-form>
    </el-dialog>
  </el-container>
</template>

<script>
import Storages from "../../utils/Storage.js"; //缓存工具
export default {
  props: ["toParam"],
  created() {
    this.inGetsonmenu();
  },
  data() {
    let $this = this;
    return {
      butJui: true,
      selects: {
        paramvalue: [],
      },
      dialogForm: false,
      formData: [
        {
          name: "名称",
          disabled: true,
          type: "text",
          value: "parameter",
        },
        {
          name: "参数值",
          type: "text",
          value: "paramvalue",
          select: "paramvalue",
          vkey: "id",
          slabel: "name",
          svalue: "",
          multiple: false,
          rules: [
            { required: true, message: "请输入参数值", trigger: "blur" },
            { required: true, message: "请输入参数值", trigger: "change" },
          ],
        },
        {
          name: "说明",
          type: "textarea",
          value: "paramremark",
          // rules: [{ required: true, message: "请输入说明", trigger: "blur" }]
        },
      ],
      defaultData: {},
      refreshTable: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "名称",
          prop: "parameter",
          width: "180px",
        },
        {
          name: "参数",
          prop: "paramvalue",
        },
        {
          name: "说明",
          prop: "paramremark",
        },
        {
          name: "最后变动账号",
          prop: "userlogin",
          width: "110px",
        },
        {
          name: "最后变动时间",
          prop: "paramdate",
          width: "160px",
        },
        {
          name: "操作",
          width: "60px",
          template: {
            props: ["scope"],
            methods: {
              onClick(key) {
                $this.onClick(key, this.scope);
              },
            },
            template: `<div class="operat-buts">
             <el-button type="text" size="small" @click.stop="onClick(0)">修改</el-button>
            </div>`,
          },
        },
      ],
      sonmenu: 0,
    };
  },
  mounted() {
    this.getEject();
  },
  methods: {
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: this.toParam.id }, "1")
        .then((res) => {
          res.result.forEach((value) => {
            let id = value.entity.id;
          });
          this.sonmenu = 4;
        })
        .catch((err) => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    resetForm() {
      if (this.$refs["basicFelForm"]) {
        this.$refs["basicFelForm"].resetForm();
      }
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    closeForm() {
      this.dialogForm = false;
      this.resetForm();
    },
    submitForm(data) {
      let paramvalue = data.paramvalue;
      if (data.isselectone === "0") {
        paramvalue = data.paramvalue.map((obj) => obj.id).join(",");
      } else if (data.isselectone === "1") {
        paramvalue = data.paramvalue.id;
      }
      delete data.parameter;
      delete data.isselectone;
      data.paramvalue = paramvalue;
      this.$ajax(
        "/system/parameter/basic/update/7/updateparameter3",
        data,
        "1",
        {},
        true
      )
        .then((res) => {
          this.onRefreshTable();
          this.dialogForm = false;
          this.$message({
            message: "修改成功",
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
    },
    onClick(key, data) {
      this.formData[1].multiple = false;
      this.formData[1].type = "text";
      this.$ajax(
        "/system/parameter/basic/update/6/getparameterinfo3",
        {
          paramname: data.row.paramname,
        },
        "1"
      )
        .then((res) => {
          let obj = res.result;
          let paramvalue = obj.paramvalue;
          if (obj.isselectone === "0") {
            this.formData[1].type = "select";
            this.formData[1].multiple = true;
            this.formData[1].vkey = "id";
            this.selects.paramvalue = obj.pcs;
            let arr = obj.paramvalue.split(",");
            paramvalue = obj.pcs.filter((obj) => {
              return obj.isselect == "1";
            });
          } else if (obj.isselectone === "1") {
            this.formData[1].type = "select";
            this.selects.paramvalue = obj.pcs;
            this.formData[1].vkey = "id";
            paramvalue = {
              id: obj.paramvalue,
              name: "",
            };
          }
          this.defaultData = {
            paramname: obj.paramname,
            parameter: data.row.parameter,
            paramremark: obj.paramremark,
            paramvalue: paramvalue,
            isselectone: obj.isselectone,
          };
          this.dialogForm = true;
        })
        .catch((err) => {});
    },
    onEjectChange(bool = false) {
      this.$common.onEjectChange(this.list, "tscs-100");
    },
    getEject() {
      this.$common.getEject(this, "list", "tscs-100");
    },
  },
};
</script>