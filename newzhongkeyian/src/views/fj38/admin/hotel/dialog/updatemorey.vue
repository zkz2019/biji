<!-- 修改房间实收金额 -->
<template>
  <el-dialog
    title="修改房间实收金额"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose"
    append-to-body
  >
    <fel-form
      ref="felForm"
      class="single-row"
      @submitForm="submitForm"
      @closeForm="handleClose"
      width="120px"
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
    var $this = this;
    return {
      defaultData: {},
      formData: [
        {
          value: "remark",
          name: "备注",
          type: "text"
        },
        {
          value: "trrmoney",
          name: "实收金额",
          type: "text"
        }
      ]
    };
  },
  created() {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.defaultData = this.param;
      } else {
        this.defaultData = {};
      }
    }
  },
  methods: {
    submitForm(data) {
      let obj = {
        remark: data.remark,
        trrmoney: data.trrmoney,
        trid: this.param.trid
      };
      this.$ajax("/lock/operate/hotel/c/updateteamroom", obj, "1")
        .then(res => {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.handleClose();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    handleClose() {
      this.$emit("handleClose");
    }
  }
};
</script>


