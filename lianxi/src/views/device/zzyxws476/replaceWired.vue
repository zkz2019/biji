<!-- 有线联网锁更换 -->
<template>
  <el-dialog
    title="有线联网锁更换"
    width="50%"
    v-loading="loading"
    :element-loading-text="numText"
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
      times: null,
      num: 120,
      loading: false,
      odtype: "1",
      loadingText: false,
      selects: {
        roommodel: [],
        gatewaytype: []
      },
      defaultData: {},
      getStop: false,
      formData: [
        {
          value: "roomlocation",
          name: "房间位置",
          type: "text",
          disabled: true
        },
        {
          value: "roomcode2",
          name: "现有唯一ID",
          type: "text",
          disabled: true
        },
        {
          value: "newroomcode2",
          name: "新唯一ID",
          type: "text"
        },
        {
          value: "gatewaytype",
          name: "分配网关",
          type: "select",
          select: "gatewaytype",
          slabel: "gatewaycode2",
          svalue: "gatewaycode",
          onChange: this.onChange
        },
        // {
        //   value: "roomisencryption",
        //   name: "有线锁加密类型",
        //   type: "select",
        //   select: "enctype",
        //   svalue: "enctype",
        //   slabel: "encname",
        // }
      ]
    };
  },
  computed: {
    numText() {
      return this.loadingText
        ? `请求中,预计还需${this.num > 0 ? this.num : 0}秒...`
        : "请求中...";
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inGetupdategatewayinfo();
      }
    }
  },
  methods: {
    onChange(arr, data) {
      if (arr[0]) {
        data.gatewaycode = arr[0];
      }
    },
    inGetupdategatewayinfo() {
      if (this.param.roomid) {
        this.loading = true;
        this.$ajax(
          "/system/device/deviceyxlock/update/1/getupdatedevicelockinfo",
          { roomid: this.param.roomid },
          "1"
        )
          .then(res => {
            let result = res.result;
            this.selects.enctype=result.enctype;
            this.selects.gatewaytype = result.gatewaycodes;
            result.gatewaytype = result.gatewaycode;
            // result.roomisencryption=String(result.roomisencryption);
            this.defaultData = result;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      }
    },
    submitForm(data) {
      clearInterval(this.times);
      this.num = 120;
      this.getStop = false;
      this.loading = true;
      this.loadingText = true;
      this.$ajax(
        "/system/device/deviceyxlock/update/2/updatedevicelock",
        {
          // enctype:data.roomisencryption,
          gatewaycode: data.gatewaycode,
          roomcode2: data.newroomcode2,
          roomid: this.param.roomid
        },
        "1",
        {}
      )
        .then(res => {
          if (res.result == "success") {
            this.loading = false;
            this.loadingText = false;
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.$emit("onRefresh");
            this.beforeClose();
            return;
          } else {
            this.odtype = "1";
            var obj = { odid: res.result, odtype: this.odtype };
            // obj.odtype = "1";
            this.loading = true;
            this.loadingText = true;
            setInterval(() => {
              this.num -= 1;
              if (this.num <= 0) {
                this.num = 0;
                this.getStop = true;
                clearInterval(this.times);
              }
            });
            // setTimeout(() => {
            //   this.getStop=true;
            // }, 180000);
            this.getresult(obj); //类型为1请求结果接口
          }
        })
        .catch(err => {
          this.loading = false;
          this.loadingText = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    getresult(data) {
      if (this.getStop) {
        this.loading = false;
        this.loadingText = false;
        this.$message({
          message: "请求时间过长,请前往指令查询查看结果!",
          type: "error"
        });
        return;
      }
      if (this.loading) {
        //同步网关路由信息, 解决禅道3129号bug
        this.$ajax(
          "/system/device/devicelock/update/4/getorderresult",
          data,
          "1",
          {}
        )
          .then(res => {
            if (res.result.orderstate == "1") {
              //或1成功   或1成功（结束）
              if (res.result.odid == "") {
                this.beforeClose();
                this.$message({
                  message: res.result.ordermsg || "修改成功",
                  type: "success"
                });
                this.loading = false;
                this.loadingText = false;
                this.$emit("onRefresh");
                return;
              } else {
                //如果返回1成功就有可能返回一个新的id，继续传新的id，类型为2到结果接口
                this.odtype = "2";
                let obj = { odid: res.result.odid, odtype: this.odtype };
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
                type: "err"
              });
              this.loading = false;
              this.loadingText = false;
              // this.$emit("onRefresh");
              return;
            } else if (res.result.orderstate == "0") {
              if (res.result.odid == "") {
                let obj = { odid: data.odid, odtype: this.odtype };
                setTimeout(() => {
                  this.getresult(obj);
                }, 1000);
              }
            } else {
              let obj = { odid: res.result.odid, odtype: this.odtype };
              setTimeout(() => {
                this.getresult(obj);
              }, 1000);
            }
          })
          .catch(err => {
            this.loading = false;
            this.loadingText = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      }
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
