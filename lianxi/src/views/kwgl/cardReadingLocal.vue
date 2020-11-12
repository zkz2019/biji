<template></template>

<script>
// f6ced2卡片
// f6ced1身份证
// f6ceda指纹
// {"resultCode":"01","resultMsg":"未找到录入机设备信息！","result":""}

// let obj = {
//               CardNo: result.codetype, //返回的参数
//               types: "0",              //参数类型(0-卡片,1-指纹,2-身份证)
//               FunctionID: 0,           //老参数类型(写死为1-卡片\3-身份证)
//               Result: 1,               //老的参数(写死为1即可);
//               err: false               //错误码(0-正常,1-未插入录入机,2-数据为空)
//             };
import { getcode, delcode, rgetcode } from "@/utils/read.js";
import setting from "@/setting.js";
export default {
  props: {
    close: Boolean,
    type: {
      type: String | Number,
      default: 0
    },
    types: {
      type: String | Number,
      default: ""
    },
    next: {
      //是否返回空数据
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      adyjk: true,
      Times1: null,
      Times2: null
    };
  },
  created() {
    this.$emit("onInstall", false);
  },
  mounted() {
    this.clearInter();
    this.Times1 = setInterval(() => {
      this.getResult();
    }, 1000);
  },
  activated() {
    this.clearInter();
    this.Times2 = setInterval(() => {
      this.getResult();
    }, 1000);
  },
  watch: {
    close() {
      if (this.close) {
        this.adyjk = true;
        // this.jzjs(() => {
        //   if (this.adyjk) {
        //     // this.isInstall = false;
        //     this.$emit("onInstall", false);
        //     window.setTimeout(() => {
        //       this.judgeLoad();
        //     }, 5000);
        //   }
        // });
      } else {
        this.adyjk = false;
        // this.disconnect();
        clearInterval(this.Times1);
        // this.clearInter();
      }
    }
  },
  beforeDestroy() {
    this.adyjk = false;
    console.log("退出1");
    // this.disconnect();
    this.delResult();
    // clearInterval(this.Times1);
    // clearInterval(this.Times2);
    this.clearInter();
  },
  deactivated() {
    this.delResult();
    // clearInterval(this.Times1);
    // clearInterval(this.Times2);
    this.clearInter();
  },
  methods: {
    clearInter() {
      clearInterval(this.Times1);
      clearInterval(this.Times2);
    },
    delResult() {
      delcode(
        res => {},
        err => {
          console.log("err", err);
        }
      );
      // delcode()
      //   .then(res => {
      //     // console.log("zzz", res);
      //   })
      //   .catch(err => {
      //     console.log("err", err);
      //   });
    },
    getResult() {
      //循环获取数据
      getcode(
        res => {
          let result = res.result;
          console.log("循环获取数据", res, result);
          this.$emit("onInstall", true);
          if (res.resultCode == "01") {
            console.log("错误抛出01");
            this.$emit("resultdata", {
              err: 1
            });
          } else if (res.resultCode == "0") {
            this.handleResult(result);
          }
          this.delResult();
        },
        err => {
          this.delResult();
          this.$emit("onInstall", false);
        }
      );
      // getcode()
      //   .then(res => {
      //     let result = res.result;
      //     console.log("循环获取数据", result);
      //     this.$emit("onInstall", true);
      //     if (res.resultCode == "01") {
      //       this.$emit("resultdata", {
      //         err: true
      //       });
      //     } else if (res.resultCode == "0") {
      //       this.handleResult(result);
      //     }
      //     this.delResult();
      //   })
      //   .catch(err => {
      //     this.delResult();
      //     this.$emit("onInstall", false);
      //   });
    },
    rgetResult() {
      //手动重新获取数据
      rgetcode(
        res => {
          let result = res.result;
          console.log("手动重新获取数据", result);
          this.$emit("onInstall", true);
          if (res.resultCode == "21") {
            console.log("错误抛出21");
            this.$emit("resultdata", {
              err: 1
            });
            this.$message({
              type: "error",
              message: "未找到录入机设备信息！"
            });
          } else if (res.resultCode == "0") {
            this.handleResult(result);
          }
          this.delResult();
        },
        err => {
          this.delResult();
          this.$emit("onInstall", false);
        }
      );
      // rgetcode()
      //   .then(res => {
      //     let result = res.result;
      //     console.log("手动重新获取数据", result);
      //     this.$emit("onInstall", true);
      //     if (res.resultCode == "21") {
      //       this.$emit("resultdata", {
      //         err: true
      //       });
      //     } else if (res.resultCode == "0") {
      //       this.handleResult(result);
      //     }
      //     this.delResult();
      //   })
      //   .catch(err => {
      //     this.delResult();
      //     this.$emit("onInstall", false);
      //   });
    },
    download() {
      //下载安装包
      window.location = window.location.origin + "/download/keenzy_cs_x64.exe";
    },
    handleResult(result) {
      if (result !== "") {
        console.log("获得result", result);
        if (result.codetype == "f6ced2") {
          if (this.types === "" || this.types === "0") {
            let obj = {
              CardNo: result.codecontent,
              types: "0",
              FunctionID: 0,
              Result: 1,
              err: 0
            };
            this.$emit("resultdata", obj);
          } else {
            this.$message({
              showClose: true,
              message: "请勿读取卡号!",
              // type: "error"
            });
          }
        } else if (result.codetype == "f6ceda") {
          if (this.types === "" || this.types === "1") {
            let obj = {
              CardNo: result.codecontent,
              types: "1",
              FunctionID: 0,
              err: 0,
              Result: 1
            };
            this.$emit("resultdata", obj);
          } else {
            this.$message({
              showClose: true,
              message: "请勿读取指纹!",
              // type: "error"
            });
          }
        } else if (result.codetype == "f6ced1") {
          if (this.types === "" || this.types === "2") {
            let obj = {
              CardNo: result.codecontent,
              types: "2",
              FunctionID: 3,
              err: 0,
              Result: 1
            };
            this.$emit("resultdata", obj);
          } else {
            this.$message({
              showClose: true,
              message: "请勿读取身份证!",
              // type: "error"
            });
          }
        }
      } else {
        if (this.next) {
          let obj = {
            CardNo: result.codecontent,
            types: "",
            FunctionID: 0,
            err: 2,
            Result: 0
          };
          console.log("空数据抛出", this.next);
          this.$emit("resultdata", obj);
        }
      }
    },
    readIDCard() {
      //重新获取
      console.log("重新获取");
      this.rgetResult();
    }
  }
};
</script>
