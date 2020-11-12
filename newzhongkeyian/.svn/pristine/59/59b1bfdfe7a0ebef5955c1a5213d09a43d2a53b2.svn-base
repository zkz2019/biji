<!-- 预约缴费 -->
<template>
  <el-dialog
    :title="type=='1'?'预约缴费':'修改缴费'"
    width="30%"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      ref="felForm"
      width="120px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
      @closeForm="beforeClose"
      @submitForm="submitForm"
    ></fel-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    type: String,
    dialogVisible: Boolean,
    defaultData:Object,
    param: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    let $this = this;
    return {
      formData: [
        {
          value: "tmmoney",
          name: "金额",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写金额",
              target: "blur"
            }
          ]
        },
        {
          value: "tmremark",
          name: "备注",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写备注",
              target: "blur"
            }
          ]
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
      }
    }
  },
  created() {},
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    submitForm(obj) {
      if (this.type == "1") {
        this.$ajax(
          "/team/update/4/saveteammoney",
          { ...obj, ...this.param },
          "1"
        )
          .then(res => {
            this.$message({
              message: "预约缴费已下发!",
              type: "success"
            });
            this.beforeClose();
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      } else {
        this.$ajax(
          "/team/update/5/updateteammoney",
          { ...obj, ...this.param },
          "1"
        )
          .then(res => {
            this.$message({
              message: "修改缴费已下发!",
              type: "success"
            });
            this.beforeClose();
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      }
    }
  }
};
</script>