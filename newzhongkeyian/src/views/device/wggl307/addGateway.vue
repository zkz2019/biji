<template>
  <el-dialog
    title="添加网关"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      ref="felForm"
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
export default {
  props: {
    param: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      selects: {
        // gatewaytype: [],
        gatetype: []
      },
      defaultData: {},
      formData: [
        {
          width: "50%",
          value: "buildname",
          name: "网关位置",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "gatewaycount",
          name: "添加网关数量",
          type: "text",
          rules: [
            { required: true, message: "请输入网关数量", trigger: "blur" },
             { validator: (rule, value, callback) => {
               var reg=/^[0-9]*$/
               if (!reg.test(value*1)) {
                  callback(new Error("网关数量格式不合法!"));
                } else {
                  callback();
                }
              }, trigger: "blur" }
          ]
        },
        {
          width: "50%",
          value: "startcode",
          name: "起始网关编号",
          type: "text",
          onInput: this.onInput,
          rules: [
            { required: true, message: "请输入起始网关编号", trigger: "blur" }
          ]
        },
        {
          width: "50%",
          value: "gatetype",
          name: "网关类型",
          type: "select",
          select: "gatetype",
          slabel: "gatename",
          svalue: "gatetype",
          rules: [
            { required: true, message: "请选择网关类型", trigger: "change" }
          ]
        },
        // {
        //   width: "50%",
        //   value: "gatewaytype",
        //   name: "网关型号",
        //   type: "select",
        //   select: "gatewaytype",
        //   slabel: "",
        //   svalue: "",
        //   rules: [
        //     { required: true, message: "请选择网关型号", trigger: "change" }
        //   ]
        // },
        {
          width: "50%",
          value: "gatewaycode",
          name: "网关通讯ID",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "gatewaycode2",
          name: "网关唯一ID",
          type: "text",
          placeholder: "数量为多个时不填"
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inGetupdategatewayinfo();
      }
    }
  },
  methods: {
    onInput(arr, data) {
      if (arr[0]) {
        this.inGetupdategatewayinfo(arr[0]);
      }
    },
    inGetupdategatewayinfo(startcode = 1) {
      this.$ajax(
        "/system/device/gateway/save/1/getsavegatewayinfo",
        { startcode: startcode },
        "1",
        this.param
      )
        .then(res => {
          let result = res.result;
          // this.selects.gatewaytype = result.gatewaytype;
          this.selects.gatetype = result.gts;
          let obj = {
            gatewaycode: result.gatewaycode,
            buildname: this.param.buildlocation
          };
          let ruleForm = {};
          if (this.$refs["felForm"]) {
            ruleForm = this.$refs["felForm"].ruleForm;
          }
          this.defaultData = Object.assign(ruleForm, obj);
        })
        .catch(err => {});
    },
    submitForm(data) {
      this.$ajax(
        "/system/device/gateway/save/2/savegateway",
        data,
        "1",
        this.param,
        true
      )
        .then(res => {
          this.beforeClose();
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$emit("onRefresh");
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
        });
    },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>

<style>
</style>
