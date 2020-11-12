<template>
  <el-dialog
    title="网关信息修改"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      v-loading.fullscreen.lock="loading"
      :element-loading-text="'请求中...'"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
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
import { mapGetters } from "vuex";
export default {
  props: {
    param: Object,
    dialogVisible: Boolean,
  },
  data() {
    return {
      loading: false,
      od: {},
      selects: {
        // gatewaytype: []
      },
      getStop: false,
      defaultData: {},
      formData: [
        {
          width: "50%",
          value: "buildname",
          name: "网关位置",
          type: "text",
          disabled: true,
        },
        // {
        //   width: "50%",
        //   value: "gatewaytype",
        //   name: "网关型号",
        //   type: "select",
        //   select: "gatewaytype",
        //   slabel: "",
        //   svalue: ""
        // },
        {
          width: "50%",
          value: "gatewayseq",
          name: "网关编号",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "ver",
          name: "软件版本号",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "gatewaycode2",
          name: "网关唯一ID",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "power",
          name: "网关功率",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "newgatewaycode2",
          name: "新网关唯一ID",
          type: "text",
        },
        {
          width: "50%",
          value: "xdid",
          name: "信号ID",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "xd",
          name: "信号",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "gatewaycode",
          name: "通讯ID",
          type: "text",
          disabled: true,
        },
        {
          width: "50%",
          value: "gatewayisencryption",
          name: "网关加密类型",
          type: "select",
          select: "enctype",
          svalue: "enctype",
          slabel: "encname",
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inGetupdategatewayinfo();
      }
    },
  },
  methods: {
    ...mapGetters(["getCheckType"]),
    inGetupdategatewayinfo() {
      if (this.param.gatewaycode) {
        this.$ajax(
          "/system/device/gateway/update/1/getupdategatewayinfo",
          { gatewaycode: this.param.gatewaycode },
          "1"
        )
          .then((res) => {
            this.selects.enctype = res.result.enctype;
            let result = res.result;
            result.buildname = this.param.gatewaylocation;
            result.gatewayisencryption = String(result.gatewayisencryption);
            // this.selects.gatewaytype = result.gatewaytypes;
            this.defaultData = result;
            this.gatewayisencryption = result.gatewayisencryption
              ? result.gatewayisencryption
              : String(this.getCheckType());
          })
          .catch((err) => {});
      }
    },
    submitForm(data) {
      this.getStop = false;
      this.od = data;
      this.beforeClose();
      this.$ajax(
        "/system/device/gateway/update/2/updategateway",
        {
          enctype: data.gatewayisencryption,
          gatewaycode: data.gatewaycode,
          // gatewaytype: data.gatewaytype,
          newgatewaycode2: data.newgatewaycode2,
        },
        "1",
        {},
        true
      )
        .then((res) => {
          if (res.result == "success") {
            this.beforeClose();
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$emit("onRefresh");
            return;
          } else {
            var obj = { odid: res.result };
            obj.odtype = "1";
            this.loading = true;
            setTimeout(() => {
              this.getStop = true;
            }, 10000);
            this.getresult(obj); //类型为1请求结果接口
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },

    getresult(data) {
      //同步网关路由信息, 解决禅道3129号bug
      if (this.getStop) {
        this.loading = false;
        this.$message({
          message: "请求时间过长,请前往指令查询查看结果!",
          // type: "error",
        });
        return;
      }
      this.$ajax(
        "/system/device/gateway/update/3/getorderresult",
        data,
        "1",
        {}
      )
        .then((res) => {
          if (res.result.orderstate == "1") {
            //或1成功   或1成功（结束）

            if (res.result.odid == "") {
              this.beforeClose();
              this.$message({
                message: res.result.ordermsg || "修改成功",
                type: "success",
              });
              this.loading = false;
              this.$emit("onRefresh");
              return;
            } else {
              //如果返回1成功就有可能返回一个新的id，继续传新的id，类型为2到结果接口
              let obj = { odid: res.result.odid, odtype: "2" };
              setTimeout(() => {
                this.getresult(obj);
              }, 1000);
            }
          } else if (res.result.orderstate == "-1") {
            //直到结果返回-1失败（结束） 直到结果接口返回-1失败（结束）
            // this.beforeClose();
            this.$message({
              showClose: true,
              message: res.result.ordermsg || "修改失败",
              type: "error",
            });
            this.loading = false;
            // this.$emit("onRefresh");
            return;
          } else if (res.result.orderstate == "0") {
            if (res.result.odid == "") {
              let obj = { odid: data.odid, odtype: "1" };
              setTimeout(() => {
                this.getresult(obj);
              }, 1000);
            }
          } else {
            let obj = { odid: res.result.odid, odtype: "1" };
            setTimeout(() => {
              this.getresult(obj);
            }, 1000);
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    // getresult(data) {
    //   //同步网关路由信息, 解决禅道3129号bug
    //   this.$ajax(
    //     "/system/device/gateway/update/3/getorderresult",
    //     data,
    //     "1",
    //     {},
    //     true
    //   )
    //     .then(res => {
    //       if (res.result.orderstate == "1") {//或1成功   或1成功（结束）

    //         if (res.result.odid == "") {
    //           this.beforeClose();
    //           this.$message({
    //             message: "修改成功",
    //             type: "success"
    //           });
    //           this.$emit("onRefresh");
    //           return;
    //         } else {                    //如果返回1成功就有可能返回一个新的id，继续传新的id，类型为2到结果接口
    //           let obj = { odid: res.result.odid, odtype: "2" };
    //           setTimeout(() => {
    //             this.getresult(obj);
    //           }, 1000);
    //         }
    //       } else if (res.result.orderstate == "-1") {//直到结果返回-1失败（结束） 直到结果接口返回-1失败（结束）
    //         // this.beforeClose();
    //         this.$message({
    //           showClose: true,
    //           message: "修改失败",
    //           type: "err"
    //         });
    //         // this.$emit("onRefresh");
    //         return;
    //       } else if (res.result.orderstate == "0") {
    //         if (res.result.odid == "") {
    //           let obj = { odid: data.odid, odtype: "1" };
    //           setTimeout(() => {
    //             this.getresult(obj);
    //           }, 1000);
    //         }
    //       } else {
    //         let obj = { odid: res.result.odid, odtype: "1" };
    //         setTimeout(() => {
    //           this.getresult(obj);
    //         }, 1000);
    //       }
    //     })
    //     .catch(err => {
    //       this.$message({
    //         showClose: true,
    //         message: `[${err.resultCode}] `+err.resultMsg ,
    //         type: "error"
    //       });
    //     });
    // },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    },
  },
};
</script>
