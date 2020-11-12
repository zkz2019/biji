<!-- 路由主页 -->
<template>
  <div class="home">
    <header class="header" :style="{backgroundColor:backgColor}">
      <div class="header-left" :style="{width:logowidth+60+'px'}">
        <div class="logo">
          <img v-show="isLogo" :src="systemlogo" @load="isLogo=true" @error="isLogo=false" />
        </div>
      </div>
      <div class="header-content" ref="content">
        <div
          v-if="isScroll"
          class="header-scroll left"
          :style="{backgroundColor:backgColor,color:textColor}"
          @click="scroll('left')"
        >
          <i class="el-icon-arrow-left"></i>
        </div>
        <div
          v-if="isScroll"
          class="header-scroll right"
          :style="{backgroundColor:backgColor,color:textColor}"
          @click="scroll('right')"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
        <div
          class="header-menu"
          :class="{scroll:isScroll}"
          ref="scroll"
          :style="'transform: translateX(' + currentTranslateX + 'px);'"
        >
          <el-menu
            :background-color="backgColor"
            :text-color="textColor"
            :default-active="menuIndex"
            active-text-color="#24A6F9"
            mode="horizontal"
            @select="menuSelected"
          >
            <template v-for="navMenu in menuData">
              <!-- 最后一级菜单 -->
              <el-menu-item
                v-if="!navMenu.childs&&navMenu.entity"
                :key="navMenu.entity.id"
                :data="navMenu"
                :index="navMenu.entity.value"
              >
                <i
                  v-if="navMenu.entity.icon"
                  :class="'ficon-'+navMenu.entity.icon"
                  :style="{color:textColor}"
                ></i>
                <span slot="title">{{navMenu.entity.alias}}</span>
              </el-menu-item>
              <!-- 此菜单下还有子菜单 -->
              <el-submenu
                v-if="navMenu.childs&&navMenu.entity"
                :key="navMenu.entity.id"
                :data="navMenu"
                popper-class="Home_submenu"
                :index="navMenu.entity.value"
              >
                <template v-for="item in navMenu.childs">
                  <el-menu-item
                    :key="item.entity.id"
                    :index="navMenu.entity.value+'|'+item.entity.value"
                  >
                    <i
                      v-if="item.entity.icon"
                      :class="'ficon-'+item.entity.icon"
                      :style="{color:textColor}"
                    ></i>
                    <span slot="title">{{item.entity.alias}}</span>
                  </el-menu-item>
                </template>
                <template slot="title">
                  <!-- <img
                    v-if="navMenu.entity.icon"
                    :src="require(`@/assets/image/${navMenu.entity.icon}${menuIndex.indexOf(navMenu.entity.value)==-1?'a':''}.png`)"
                  />-->
                  <i
                    v-if="navMenu.entity.icon"
                    :class="'ficon-'+navMenu.entity.icon"
                    :style="{color:textColor}"
                  ></i>
                  <span slot="title">{{navMenu.entity.alias}}</span>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </div>
      </div>
      <div
        v-if="isQuick && isQuick.id"
        class="quick"
        :class="{'is-active':'kjcz299'==this.menuIndex}"
        :style="{color:textColor}"
        @click="onQuick"
      >
        <i v-if="isQuick.icon" :class="'ficon-'+isQuick.icon"></i>
        <span>快捷</span>
      </div>
      <div class="header-right">
        <el-dropdown trigger="hover">
          <span class="userinfo-inner" :style="{color:textColor}">
            <!-- <span class="logo"> -->
            <!-- <img :src="logo?logo:'./../../assets/image/u437.png'" @error="setLogo(sysUserAvatar)" /> -->
            <!-- </span> -->
            <!-- <i class="ficon-homeLogo" style="font-size:132px"></i> -->
            <svg class="iconLogo" aria-hidden="true">
              <use xlink:href="#icon-cjgly" />
            </svg>
            <span class="userinfo-name">{{info.username || " "}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
            <el-dropdown-item @click.native="dialogVisible=true">
              <i class="ficon-set"></i>设置
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <i class="ficon-out"></i>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <fullscreen class="full-screen" /> -->
      </div>
    </header>
    <section class="section" :style="{backgroundColor:winBackgColor}">
      <!-- 此处放置el-tabs代码 -->
      <header class="section-header">
        <rightKey
          :visible.sync="contextmenuFlag"
          @onClick="onClickClose"
          :x="contentmenuX"
          :y="contentmenuY"
        ></rightKey>
        <el-tabs
          v-model="tabvalue"
          type="card"
          closable
          v-if="openTab.length"
          @tab-click="tabClick"
          @tab-remove="tabRemove"
          @contextmenu.native="handleContextmenu"
        >
          <el-tab-pane
            v-for="item of openTab"
            :class="{index:item.id == 302}"
            :key="item.index"
            :label="item.name"
            :name="item.index"
          >
            <span slot="label">
              <!-- <i v-if="item.icon" :class="'ficon-'+item.icon"></i> -->
              {{item.name}}
            </span>
          </el-tab-pane>
        </el-tabs>
      </header>
      <div v-if="isCodewarn" class="home-codewarn">
        <span>{{textCodewarn}}</span>
        <el-button @click="onCodewarn" type="text" size="medium">前往设置</el-button>
      </div>
      <div class="section-content">
        <keep-alive :include="keepAlive">
          <router-view></router-view>
        </keep-alive>
      </div>
    </section>
    <account @beforeClose="dialogVisible=false" :dialogVisible="dialogVisible"></account>
    <el-dialog
      :visible.sync="checkVisible"
      top="30vh"
      custom-class="check-login-dialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="check-login-content">
        <div class>
          <div class="check-login-top">
            <i></i>
            <span>由于您长时间没有任何操作系统自动锁屏</span>
          </div>
          <div class="check-login-pwd">
            <el-form @submit.native.prevent :model="ruleForm" ref="ruleForm" :rules="rules">
              <el-form-item prop="pwd">
                <el-input v-model="ruleForm.pwd" placeholder="输入账号登录密码" type="password"></el-input>
              </el-form-item>
              <el-button
                v-show="false"
                native-type="submit"
                class="com-but-small"
                type="primary"
                @click="onClickCheckLogin(1)"
              >解 锁</el-button>
            </el-form>
          </div>
        </div>
        <div class="check-login-buts">
          <el-button class="com-but-small" @click="onClickCheckLogin(0)">退出系统</el-button>
          <el-button class="com-but-small" type="primary" @click="onClickCheckLogin(1)">解 锁</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/css/fonts/iconfont.js";
import Storages from "../../utils/Storage.js"; //缓存工具
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import rightKey from "./rightKey";
// import fullscreen from "../../components/fullscreen/index";
import account from "./account";
import Logout from "../../utils/logout.js"; //清除登录信息
export default {
  components: {
    // fullscreen,
    account,
    rightKey
  },
  name: "Home",
  data() {
    return {
      logowidth: 220,
      winBackgColor: "#f2f2f2",
      backgColor: "#1B2437",
      textColor: "#ffffff",
      platformType: 0,
      ruleForm: {
        pwd: ""
      },
      rules: {
        pwd: [
          { required: true, message: "请输入账号登录密码", trigger: "blur" }
        ]
      },
      isCodewarn: false,
      textCodewarn: "系统到期，请在系统参数——序列号对话框中输入序列号",
      isLogo: false,
      isScroll: true,
      contextmenuFlag: false,
      tagName: "",
      contentmenuY: 0,
      contentmenuX: 0,
      currentTranslateX: 0,
      isQuick: {},
      dialogVisible: false,
      sysUserAvatar: require("../../assets/image/headImg.png"), //头像
      menuIndex: "",
      times: null,
      sonmenu: 0
    };
  },
  computed: {
    ...mapState({
      checkVisible: state => state.account.checkVisible, //校验登录
      menuData: state => state.openTab.menuData,
      menuObj: state => state.openTab.menuObj,
      openTab: state => state.openTab.openTab,
      keepAlive: state => state.openTab.keepAlive,
      info: state => state.account.info,
      logo: state => state.account.logo,
      systemlogo: state => state.account.systemlogo
    }),
    tabvalue: {
      get() {
        return this.$store.state.openTab.tabvalue;
      },
      set(val) {
        this.set_active_index(val);
      }
    }
  },
  methods: {
    // aa(){
    //   let a1=[1,23,3];
    //   let a2 = [...a1];
    //   a2[1]=2;
    // },
    ...mapMutations([
      "setCheckVisible",
      "setMenuData",
      "clearMenuData",
      "addMenuObj",
      "add_tabs",
      "delete_tabs",
      "delete_key",
      "condition",
      "set_active_index",
      "setLogo",
      "setSystemlogo"
    ]),
    ...mapActions(["getmenu", "clearAccount"]),
    onClickCheckLogin(key) {
      if (key == 0) {
        this.setCheckVisible(false);
        this.clearAccount();
        this.$router.push({
          path: "/login"
        });
      } else {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$ajax(
              "/login/home/h/unlockedlogin",
              { password: this.ruleForm.pwd },
              "1",
              {},
              true
            )
              .then(res => {
                Logout.times(0, this);
                this.$refs["ruleForm"].resetFields();
                this.setCheckVisible(false);
                // this.$message({
                //   message: "解锁成功",
                //   type: "success"
                // });
              })
              .catch(err => {
                this.$message({
                  showClose: true,
                  message: `[${err.resultCode}] ` + err.resultMsg,
                  type: "error"
                });
              });
          } else {
            return false;
          }
        });
      }
    },

    updateToken() {
      let num = Storages.getStorage("tokenNum");
      let refreshentoken = Storages.getStorage("refreshentoken");
      // this.times=setInterval(()=>{
      // },1000);
      this.times = setInterval(() => {
        num++;
        console.log(num, "num++", Storages.getStorage("token"));
        Storages.setStorage("tokenNum", num);
        if (num % 10 == 0) {
          //后端每三十分钟更新一次,这里每十分钟更新一次,在后台更新前重新获取token
          this.$ajax(
            "/login/login/refreshentoken",
            { refreshentoken: refreshentoken },
            "1"
          )
            .then(res => {
              console.log("重新获取token", new Date(), res.result);
              Storages.setStorage("token", res.result);
            })
            .catch(err => {
              console.log("重新获取token失败",  new Date(),err);
            });
        }
      }, 60000); //1800000
    },

    onClickClose(v) {
      this.delete_key({ id: this.tagName, key: v.id });
      if (this.$route.path != "/" + this.tabvalue) {
        this.$router.push({
          path: this.tabvalue
        });
      }
    },
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu(event) {
      let target = event.target;
      // 解决 https://github.com/d2-projects/d2-admin/issues/54
      let flag = false;
      if (target.className.indexOf("el-tabs__item") > -1) flag = true;
      else if (target.parentNode.className.indexOf("el-tabs__item") > -1) {
        target = target.parentNode;
        flag = true;
      }
      if (flag) {
        event.preventDefault();
        event.stopPropagation();
        this.contentmenuX = event.clientX;
        this.contentmenuY = event.clientY;
        this.tagName = target.getAttribute("aria-controls").slice(5);
        this.contextmenuFlag = true;
      }
    },
    scroll(direction) {
      if (direction === "left") {
        // 向右滚动
        this.currentTranslateX = 0;
      } else {
        let contentWidth = this.$refs.content.clientWidth;
        let scrollWidth = this.$refs.scroll.clientWidth;
        // 向左滚动
        if (contentWidth * 2 - this.currentTranslateX <= scrollWidth) {
          this.currentTranslateX -= contentWidth;
        } else {
          this.currentTranslateX = contentWidth - scrollWidth;
        }
      }
    },
    checkScroll() {
      this.currentTranslateX = 0;
      if (this.$refs.content) {
        let contentWidth = this.$refs.content.clientWidth;
        let scrollWidth = this.$refs.scroll.clientWidth;
        if (this.isScroll) {
          // 页面依旧允许滚动的情况，需要更新width
          if (contentWidth - scrollWidth === this.currentTranslateX) {
            // currentTranslateX 也需要相应变化【在右端到头的情况时】
            this.currentTranslateX = contentWidth - scrollWidth;
            // 快速的滑动依旧存在判断和计算时对应的contentWidth变成正数，所以需要限制一下
            if (this.currentTranslateX > 0) {
              this.currentTranslateX = 0;
            }
          }
          // 判断何时滚动消失: 当scroll > content
          if (contentWidth > scrollWidth) {
            this.isScroll = false;
          }
        }
        // 判断何时滚动出现: 当scroll < content
        if (!this.isScroll && contentWidth < scrollWidth) {
          this.isScroll = true;
          // 注意，当isScroll变为true，对应的元素盒子大小会发生变化
          this.$nextTick(() => {
            this.currentTranslateX = 0;
          });
        }
      }
    },
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: "302" }, "1")
        .then(res => {
          res.result.forEach(value => {
            if (value.entity.id == "299") {
              this.isQuick = value.entity;
              this.addMenuObj(value.entity);
            }
          });
          this.sonmenu = 4;
        })
        .catch(err => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    onCodewarn() {
      this.$router.push({
        name: "系统参数",
        params: { name: "基础参数" }
      });
    },
    onQuick() {
      this.menuIndex = "kjcz299";
      this.toPath("kjcz299");
    },
    menuSelected(key, keyPath) {
      let arr = key.split("|");
      if (arr.length > 1) {
        this.toPath(arr[1]);
      } else {
        this.toPath(arr[0]);
      }
    },
    toPath(tab) {
      let obj = this.menuObj[tab];
      if (obj) {
        this.add_tabs({
          index: tab,
          name: obj.alias,
          id: obj.id
        });
        this.set_active_index(tab);
        if (this.$route.path != "/" + tab) {
          this.$router.push({ path: tab });
        }
      }
    },
    setMenuIndex(val) {
      let obj = this.menuObj[val];
      if (obj) {
        if (obj.parent) {
          this.menuIndex = obj.parent + "|" + val;
        } else {
          this.menuIndex = val;
        }
      } else {
        this.menuIndex = val;
      }
    },
    setTabvalue() {
      let obj = this.menuObj[this.tabvalue];
      if (!this.tabvalue) {
        obj = this.menuData[0].entity;
      }
      if (obj) {
        this.add_tabs({
          index: this.tabvalue,
          name: obj.alias,
          icon: obj.icon,
          id: obj.id
        });
        if (obj.parent) {
          this.menuIndex = obj.parent + "|" + this.tabvalue;
        } else {
          this.menuIndex = this.tabvalue;
        }
      }
    },
    //tab标签点击时，切换相应的路由
    tabClick() {
      let val = this.tabvalue;
      // this.setMenuIndex(val);
      if (this.$route.path != "/" + val) {
        this.$router.push({ path: val });
      }
    },
    //移除tab标签
    tabRemove(id) {
      this.delete_tabs(id);

      // this.setMenuIndex(this.tabvalue);
      if (this.$route.path != "/" + this.tabvalue) {
        this.$router.push({
          path: this.tabvalue
        });
      }
    },
    //退出登录
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("退出12");
          this.clearAccount();
          this.$router.push({
            path: "/login"
          });
        })
        .catch(err => {
          console.info(err);
        });
    },
    throttledCheckScroll() {
      this.checkScroll();
    }
  },
  destroyed() {
    clearInterval(this.times);
    Logout.clearTimes();
  },
  created() {
    if (window._ZK_COMFIG_.header_backg) {
      this.backgColor = window._ZK_COMFIG_.header_backg;
    }
    if (window._ZK_COMFIG_.header_color) {
      this.textColor = window._ZK_COMFIG_.header_color;
    }
    if (window._ZK_COMFIG_.win_backg) {
      this.winBackgColor = window._ZK_COMFIG_.win_backg;
    }
    if (window._ZK_COMFIG_.logo_width) {
      this.logowidth = window._ZK_COMFIG_.logo_width;
    }
    // this.aa();
    Logout.times(0, this);
    Logout.sjjt(this);
    this.inGetsonmenu();
    let path = this.$route.path;
    console.log("path", path);
    let codewarn = Storages.getStorage("_codewarn");
    if (codewarn === "0" || codewarn === 0) {
      this.isCodewarn = true;
      this.textCodewarn = "系统未激活，请在系统参数——序列号对话框中输入序列号";
    } else if (codewarn == 2) {
      this.isCodewarn = true;
      this.textCodewarn = "系统到期，请在系统参数——序列号对话框中输入序列号";
    } else {
      this.isCodewarn = false;
    }
    path = path.replace(/^\//, "");
    if (this.menuObj[path] || path == "index") {
      this.set_active_index(path);
      this.getmenu().then(() => {
        this.setTabvalue();
        setTimeout(() => {
          if (this.$el) {
            this.checkScroll();
          }
        }, 800);
      });
    } else {
      // this.$message({
      //   showClose: true,
      //   message: `你没有访问${path}页面的权限`,
      //   type: "error"
      // });
      this.set_active_index("index");
      this.toPath("index");
    }
    this.updateToken();
  },
  mounted() {
    // 初始化判断
    // 默认判断父元素和子元素的大小，以确定初始情况是否显示滚动
    setTimeout(() => {
      this.checkScroll();
    }, 800);
    // 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
    window.addEventListener("resize", this.throttledCheckScroll);
  },
  beforeDestroy() {
    // 取消监听
    window.removeEventListener("resize", this.throttledCheckScroll);
  },
  watch: {
    $route(to, from) {
      let path = to.path;
      path = path.replace(/^\//, "");
      this.setMenuIndex(path);
      let obj = this.menuObj[path];
      if (obj) {
        this.add_tabs({
          index: path,
          name: obj.alias,
          icon: obj.icon,
          id: obj.id
        });
        this.set_active_index(path);
      }
    }
  }
};
</script>
