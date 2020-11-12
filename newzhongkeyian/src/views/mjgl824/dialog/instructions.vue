<template>
  <el-dialog
    title="指令下发"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
    loadingBody
    v-loading="loadingBody"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <fel-form
      ref="felForm"
      class="single-row"
      :selects="selects"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="140px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
import { getAccessOrderResult } from "./../../device/mj809/getResult";
export default {
  props: {
    dialogVisible: Boolean,
    paramObj: Array,
    param: Object,
    agid: { type: String, default: "" },
    isBatch: { type: Boolean, default: false },
    range: String
  },
  data() {
    return {
      count: 60,
      loadingBody: false,
      loadText: `请求中...`,
      defaultData: {},
      selects: {
        zlxf: [
          { id: "4", alias: "探测读头" },
          { id: "5", alias: "状态查询" },
          { id: "6", alias: "解除消防报警" },
          { id: "7", alias: "远程开门" },
          { id: "8", alias: "远程关门" }
        ]
      },
      formData: [
        {
          noShow: false,
          value: "ordertype",
          name: "选择下发指令",
          type: "select",
          select: "zlxf",
          // onChange: this.onChange,
          slabel: "alias",
          svalue: "id",
          rules: [
            {
              required: true,
              message: "请选择下发指令",
              trigger: "change"
            }
          ]
        }
      ]
    };
  },
  watch: {
    // paramObj(val) {
    //   this.selects.zlxf = val;
    // }
  },
  created() {},
  methods: {
    submitForm(data) {
      if (this.isBatch) {
        let adids = this.paramObj.map(item => {
          return item.adid;
        });
        let obj = {
          ordertype: data.ordertype,
          adids,
          agid: this.agid,
          lottype: this.range
        };
        let text = "";
        switch (data.ordertype) {
          case "4":
            text = "探测读头";
            break;
          case "5":
            text = "状态查询";
            break;
          case "6":
            text = "取消消防报警";
            break;
          case "7":
            text = "远程开门";
            break;
          case "8":
            text = "远程关门";
            break;
        }
        this.$ajax(
          "/access/v2.0/door/a/saveLotAccessDoorOrder",
          obj,
          "9",
          {},
          true
        )
          .then(res => {
            this.beforeClose();
            this.$message({
              message: text + "指令下发成功!",
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
      } else {
        let obj = { ordertype: data.ordertype, adid: this.param.adid };
        this.$ajax("/access/v2.0/door/5/saveAccessDoorOrder", obj, "9")
          .then(res => {
            this.loadingBody = true;
            getAccessOrderResult(res.result, this);
          })
          .catch(err => {
            this.loadingBody = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      }
    },
    beforeClose() {
      if (this.$refs.felForm) {
        this.$refs.felForm.resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang="scss">
</style>
