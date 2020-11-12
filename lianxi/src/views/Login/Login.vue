<!-- 登录 -->
<template>
  <div class="login">
    <img class="backg_img" :src="loginBackg" />
    <div class="layer" id="login"></div>
    <div class="loginbox">
      <el-form
        @submit.native.prevent
        status-icon
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="100px"
        class="login-container"
      >
        <h3 class="top" :style="{fontSize:nameSize}">{{name}}</h3>
        <el-form-item prop="userlogin">
          <span slot="label">
            <i class="maR10 ficon-user"></i>帐号
          </span>
          <el-input clearable v-model="ruleForm2.userlogin" placeholder="输入帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span slot="label">
            <i class="maR10 ficon-pwd"></i>密码
          </span>
          <el-input
            show-password
            clearable
            v-model="ruleForm2.password"
            type="password"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verificode" ref="verificode" class="form-test">
          <span slot="label">
            <i class="maR10 ficon-test"></i>验证码
          </span>
          <el-input
            class="login-test"
            clearable
            v-model="ruleForm2.verificode"
            type="text"
            placeholder="输入验证码"
          ></el-input>
          <div
            class="login-img"
            v-loading="loadingImg"
            element-loading-spinner="el-icon-loading"
            @click="getTicketImg"
          >
            <el-image @error="onImgErr" :src="testUrl"></el-image>
          </div>
        </el-form-item>
        <div class="checkboxa">
          <!-- <el-checkbox v-model="checkbox">记住账号</el-checkbox> -->
        </div>
        <el-button
          type="primary"
          native-type="submit"
          v-loading.fullscreen.lock="logining"
          @click.native.prevent="check"
          style="width:100%"
          class="login_but"
          :loading="logining"
        >我要登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
require("particles.js");
import config from "./default";
import { mapState, mapActions, mapMutations } from "vuex";
import Storages from "../../utils/Storage.js"; //缓存工具
import Logout from "../../utils/logout";
import { clearDownload } from "../personnel/index.js";
export default {
  data() {
    return {
      nameSize: "",
      loginBackg: "/img/login.jpg",
      testUrl: "../image/dc.png",
      logining: false,
      loginIn: true,
      loadingImg: true,
      imgTimes: null,
      name: "智慧物联管理平台",
      ruleForm2: {
        userlogin: "",
        password: "",
        randomcode: "",
        verificode: ""
      },
      checkbox: true,
      rules2: {
        userlogin: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ],
        verificode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              setTimeout(() => {
                if (!value || value == "") {
                  callback(new Error("请输入验证码"));
                } else {
                  callback();
                }
              }, 100);
            },
            trigger: "blur"
          }
          // { validator: validaePass2 }
        ]
      }
    };
  },
  // components: {},

  // computed: {},
  beforeDestroy() {
    if (this.imgTimes) {
      clearTimeout(this.imgTimes);
    }
    // document.onkeypress = function() {};
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (typeof pJSDom != "undefined" && pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  created() {
    if (window._ZK_COMFIG_.login_name) {
      this.name = window._ZK_COMFIG_.login_name;
      if (this.name.length > 26) {
        this.nameSize = "19px";
      } else if (this.name.length > 20) {
        this.nameSize = "20px";
      }
    }
    if (window._ZK_COMFIG_.login_backg) {
      this.loginBackg = window._ZK_COMFIG_.login_backg;
    }
    if (typeof window._ZK_COMFIG_.login_canvas != "undefined") {
      if (window._ZK_COMFIG_.login_canvas) {
        Storages.setlocalStorage("isLoginCanvas", "1");
      } else {
        Storages.clearlocalStorage("isLoginCanvas");
      }
    } else {
      let search = window.location.search;
      if (search == "?canvas=1") {
        Storages.setlocalStorage("isLoginCanvas", "1");
      } else if (search == "?canvas=0") {
        Storages.clearlocalStorage("isLoginCanvas");
      }
    }
    let name = ""; //Storages.getlocalStorage("user");   //本来有记住密码,后来取消了
    this.ruleForm2.userlogin = name;
    let that = this;
    // document.onkeypress = function(e) {
    //   var keycode = document.all ? event.keyCode : e.which;
    //   if (keycode == 13) {
    //     that.check(e); // 登录方法名
    //     return false;
    //   }
    // };
    this.getTicketImg();
    clearDownload();
  },
  mounted() {
    if (Storages.getlocalStorage("isLoginCanvas") != 1) {
      // 初始化例子插件
      particlesJS("login", config);
    }
  },

  methods: {
    ...mapMutations(["setCheckVisible", "setUserinfo"]),
    ...mapActions(["getDiction", "getmenu", "againGetInfo"]),
    getRndNum(n) {
      var rnd = "";
      for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
      }
      return rnd;
    },
    getTicketImg() {
      if (this.imgTimes) {
        clearTimeout(this.imgTimes);
      }
      this.loadingImg = true;
      this.testUrl = "";
      var ticket_key = new Date().getTime() + this.getRndNum(7);
      this.ruleForm2.verificode = "";
      this.ruleForm2.randomcode = ticket_key;
      if (this.$refs["verificode"]) {
        this.$refs["verificode"].resetField();
      }
      this.$ajax(
        "/login/login/getverificode",
        { randomcode: ticket_key },
        "3",
        {},
        false,
        10000
      )
        .then(res => {
          if (this.imgTimes) {
            clearTimeout(this.imgTimes);
          }
          this.loadingImg = false;
          if (res.size) {
            this.testUrl = window.URL.createObjectURL(res);
          }
        })
        .catch(err => {
          this.loadingImg = false;
          this.imgTimes = setTimeout(() => {
            this.getTicketImg();
          }, 5000);
          // if (err.size) {
          //   this.testUrl = window.URL.createObjectURL(err);
          // }
        });
    },
    onImgErr() {},
    check: function(event) {
      if (this.loginIn) {
        this.loginIn = false;
        this.$refs["ruleForm2"].validate(valid => {
          if (valid) {
            //获取值
            this.logining = true;
            this.$ajax("/login/login/checklogin", {}, "0", this.ruleForm2)
              .then(response => {
                if (
                  response.resultCode == 0 &&
                  response.result &&
                  response.result.token
                ) {
                  let result = response.result;
                  this.setUserinfo(result);
                  this.setCheckVisible(false);
                  Storages.setStorage("_codewarn", result.codewarn);
                  console.log("登录成功");
                  //判断复选框是否被勾选 勾选则调用配置cookie方法
                  // if (this.checkbox == true) {
                  // Storages.setlocalStorage("user", this.ruleForm2.userlogin);
                  // }
                  Storages.setStorage("token", result.token);
                  Storages.setStorage("refreshentoken", result.refreshentoken);
                  Storages.setStorage("tokenNum", 0);
                  Storages.setStorage("maxfingernum", result.maxfingernum);
                  this.ruleForm2.userlogin = "";
                  this.ruleForm2.password = "";
                  this.getTicketImg();
                  this.againGetInfo();
                  this.getDiction();
                  this.getmenu()
                    .then(data => {
                      this.$router.replace({ path: "/index" });
                      this.logining = false;
                      this.loginIn = true;
                      if (result.codewarn == 1) {
                        let codedate = result.codedate;
                        this.$confirm(
                          codedate + "系统即将到期，请输入序列号",
                          "提示",
                          {
                            confirmButtonText: "前往设置",
                            cancelButtonText: "取消",
                            type: "warning"
                          }
                        )
                          .then(() => {
                            this.$router.push({
                              name: "系统参数",
                              params: { name: "基础参数" }
                            });
                          })
                          .catch(() => {});
                      }
                    })
                    .catch(err => {
                      this.$router.replace({ path: "/index" });
                      this.logining = false;
                      this.loginIn = true;
                      if (result.codewarn == 1) {
                        let codedate = result.codedate;
                        this.$confirm(
                          codedate + "系统即将到期，请输入序列号",
                          "提示",
                          {
                            confirmButtonText: "前往设置",
                            cancelButtonText: "取消",
                            type: "warning"
                          }
                        )
                          .then(() => {
                            this.$router.push({
                              name: "系统参数",
                              params: { name: "基础参数" }
                            });
                          })
                          .catch(() => {});
                      }
                    });
                  Logout.times(0, this); //清除登录信息
                } else {
                  this.getTicketImg();
                  this.$message({
                    message: `[${response.resultCode}] ` + response.resultMsg,
                    type: "error"
                  });
                  this.logining = false;
                  this.loginIn = true;
                }
              })
              .catch(err => {
                this.getTicketImg();
                this.$message({
                  message: `[${err.resultCode}] ` + err.resultMsg,
                  type: "error"
                });
                this.logining = false;
                this.loginIn = true;
              });
          } else {
            this.loginIn = true;
            return false;
          }
        });
      }
    }
  }
};
</script>
