<!-- 无线联网锁更换 -->
<template>
  <el-dialog
    title="无线联网锁更换"
    width="50%"
    v-loading="loading"
    :element-loading-text="'请求中...'"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
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
export default {
  props: {
    param: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      loading: false,
      selects: {
        roommodel: [],
        gatewaytype: [],
        enctype:[],
      },
      defaultData: { accesscodeOld: "" },
      // getStop: false,
      formData: [
        {
          value: "accesscodeOld",
          name: "现有唯一ID",
          type: "text",
          disabled: true
        },
        {
          value: "accesscode",
          name: "新唯一ID",
          type: "text"
        },
        {
          value: "accessid",
          name: "门禁ID",
          type: "text",
          disabled: true
        },
        {
          value: "enctype",
          name: "NB锁加密类型",
          type: "select",
          select: "enctype",
          svalue: "enctype",
          slabel: "encname",
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      let data = { accesscodeOld: "", accessid: "" };
      if (val) {
        data.accessid = this.param.accessid;
        data.accesscodeOld = this.param.accesscode;
        this.defaultData = data;
      }
    }
  },
  created(){
    this.$ajax("/system/device/deviceaccess/updateaccess/2/getenctype",{},"1").then(res=>{
      this.selects.enctype=res.result;
    })
  },
  methods: {
    submitForm(data) {
      this.loading = true;
      this.$ajax(
        "/system/device/deviceaccess/updateaccess/1/updateaccess",
        { accesscode: data.accesscode, accessid: data.accessid,enctype:data.enctype },
        "1",
        {}
      )
        .then(res => {
          this.loading = false;
          this.beforeClose();
          this.$message({
            type: "success",
            message: "更换指令已下发!"
          });
        })
        .catch(err => {
          this.loading = false;
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
