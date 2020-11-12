<template>
  <el-dialog
    title="指令下发"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
    v-loading="loading"
    :element-loading-text="`请求中,预计还需${count}秒...`"
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
export default {
  props: {
    dialogVisible: Boolean,
    paramObj: Array,
    param: Object
  },
  data() {
    return {
      count: 60,
      loading: false,
      defaultData: {},
      selects: {
        zlxf:  [
          { id: "开门", alias: "开门" },
          { id: "关门", alias: "关门" },
          { id: "常开", alias: "常开" },
          { id: "常闭", alias: "常闭" },
          { id: "状态查询", alias: "状态查询" }
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
          svalue: "alias",
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
  methods: {
    submitForm(data) {
      this.$ajax("/access/order/1/saveorder", data, "1", this.param)
        .then(res => {
          this.loading = true;
          if (res.result == "") {
            $this.$message({
              showClose: true,
              message: "指令码为0!",
              type: "error"
            });
            this.loading = false;
            return;
          }
          if (res.result.orderid == "" || res.result == "success") {
            $this.$notify({
              title: "成功",
              message: res.result.ordermsg,
              type: "success"
            });
            $this.zlRefresh = new Date().getTime();
            this.loading = false;
            this.beforeClose();
            return;
          }
          setTimeout(() => {
            this.getorderresult(res.result);
          }, 2000);
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
          console.log("err", err);
        });
    },
    getorderresult(orderid) {
      this.$ajax("/access/order/2/getorderresult", { orderid: orderid }, "1")
        .then(res => {
          if (res.result == "0") {
            if (this.count > 0) {
              setTimeout(() => {
                this.count--;
                this.getorderresult(orderid);
              }, 1000);
            } else {
              this.count = 60;
              this.loading = false;
              this.$message({ message: "请求超时!" });
            }
          } else if (res.result == "1") {
            this.$message({
              message: "指令下发成功!",
              type: "success"
            });
            this.count = 60;
            this.beforeClose();
            this.loading = false;
          } else {
            this.count = 60;
            this.$message.error(res.result);
            this.$emit("onRefresh");
            this.loading = false;
          }
        })
        .catch(err => {
          this.count = 60;
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
          console.log("err", err);
        });
    },
    beforeClose() {
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang="scss">
</style>
