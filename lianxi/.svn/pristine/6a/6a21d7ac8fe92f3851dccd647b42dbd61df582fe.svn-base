<!-- 添加指纹机 -->
<template>
  <el-dialog
    :title="title"
    width="40%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      class="single-row"
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
      title: "",
      selects: {
        fpmodel: []
      },
      defaultData: {
        fptype: ""
      },
      formData: [
        {
          value: "fpname",
          name: "采集器名称",
          type: "text"
        },
        {
          value: "fpmodel",
          name: "采集器型号",
          type: "select",
          select: "fpmodel",
          vkey: "fpmodel",
          slabel: "fpmodel",
          svalue: "",
          onChange: this.onChange,
          rules: [
            {
              required: true,
              message: "请选择采集器型号",
              trigger: "chang"
            }
          ]
        },
        {
          value: "fpcode",
          name: "采集器唯一ID",
          type: "text",
          disabled: false
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inGetupdatefingerprint();
      }
    }
  },
  methods: {
    onChange(arr, data) {
      if (arr[0]) {
        data.fptype = arr[0].fptype;
      }
    },
    inGetfingerprintmodel(url) {
      this.$ajax(url, {}, "1")
        .then(res => {
          this.selects.fpmodel = res.result;
        })
        .catch(err => {});
    },

    inGetupdatefingerprint() {
      if (this.param.hasOwnProperty("fpcode")) {
        this.formData[2].disabled = true;
        this.inGetfingerprintmodel(
          "/system/device/fingerprint/update/2/getfingerprintmodel"
        );
        this.title = "采集器信息修改";
        this.$ajax(
          "/system/device/fingerprint/update/1/getupdatefingerprint",
          { fpcode: this.param.fpcode },
          "1"
        )
          .then(res => {
            let result = res.result;
            this.defaultData = {
              fpname: result.fpname,
              fpcode: result.fpcode,
              fptype: result.fptype,
              fpmodel: {
                fpmodel: result.fpmodel
              }
            };
          })
          .catch(err => {});
      } else {
        this.formData[2].disabled = false;
        this.inGetfingerprintmodel(
          "/system/device/fingerprint/save/1/getfingerprintmodel"
        );
        this.title = "添加采集器";
        this.defaultData = {
          fptype: ""
        };
      }
    },

    submitForm(data) {
      let obj = data.fpmodel.fpmodel;
      data.fpmodel = obj;
      let url = "/system/device/fingerprint/save/2/savefingerprint";
      if (this.param.hasOwnProperty("fpcode")) {
        url = "/system/device/fingerprint/update/3/updatefingerprint";
      }
      this.$ajax(url, data, "1", {}, true)
        .then(res => {
          this.beforeClose();
          this.$message({
            message: this.title + "成功",
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
