<!-- NB锁更换 -->
<template>
  <el-dialog
    title="NB锁更换"
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
        nbtypes: []
      },
      defaultData: {},
      formData: [
        {
          width: "50%",
          value: "roomlocation",
          name: "房间位置",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "roomcode2",
          name: "现有唯一ID",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "newroomcode2",
          name: "新唯一ID",
          type: "text"
        },
        {
          width: "50%",
          value: "roomimei",
          name: "现有IMEI",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "newroomimei",
          name: "新IMEI",
          type: "text"
        },
        {
          width: "50%",
          value: "roomimsi",
          name: "现有IMSI",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "newroomimsi",
          name: "新IMSI",
          type: "text"
        },
        {
          width: "50%",
          value: "roomtxtype",
          name: "NB锁平台类型",
          type: "select",
          select: "nbtypes",
          slabel: "typename",
          svalue: "roomtxtype",
          onChange: this.onChange
        },
        {
          width: "50%",
          value: "roomisencryption",
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
          "/system/device/devicenblock/update/1/getupdatedevicenblockinfo",
          { roomid: this.param.roomid },
          "1"
        )
          .then(res => {
            let result = res.result;
            this.selects.nbtypes = result.nbtypes;
            this.selects.nbtypes.forEach(obj => {
              if (obj.isselect == 1) {
                result.roomtxtype = obj.roomtxtype;
              }
            });
            this.selects.enctype=result.enctype;
            result.roomisencryption=String(result.roomisencryption);
            this.defaultData = result;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] `+err.resultMsg ,
              type: "error"
            });
          });
      }
    },
    submitForm(data) {
      if (data.newroomimei) {
        if (data.roomtxtype == "") {
          this.$message({
            showClose: true,
            message: "NB锁平台类型不能为空",
            type: "error"
          });
          return;
        }
      }
      // if ( && data.roomtxtype) {
      this.loading = true;
      this.$ajax(
        "/system/device/devicenblock/update/2/updatedevicenblock",
        {
          enctype:data.roomisencryption,
          roomcode2: data.newroomcode2,
          roomimei: data.newroomimei,
          roomimsi: data.newroomimsi,
          roomid: this.param.roomid,
          roomtxtype: data.roomtxtype
        },
        "1",
        {}
      )
        .then(res => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: "更换成功!",
            type: "success"
          });
          this.beforeClose();
          // if (res.result == "success") {
          //   this.loading = false;
          //   this.$message({
          //     message: "修改成功",
          //     type: "success"
          //   });
          //   this.$emit("onRefresh");
          //   this.beforeClose();
          //   return;
          // } else {
          //   var obj = { odid: res.result };
          //   obj.odtype = "1";
          //   this.loading = true;
          //   setTimeout(() => {
          //     this.loading = false;
          //     this.$message({
          //       message: "请求时间过长",
          //       type: "error"
          //     });
          //   }, 180000);
          //   this.getresult(obj); //类型为1请求结果接口
          // }
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
        });
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "NB锁平台类型不能为空",
      //     type: "error"
      //   });
      // }
    },
    getresult(data) {
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
                type: "err"
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
          .catch(err => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] `+err.resultMsg ,
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
