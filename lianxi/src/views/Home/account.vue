<template>
  <el-dialog
    class="dialog"
    title="账号信息"
    :close-on-click-modal="false"
    width="50%"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <!-- class="single-row" -->
    <fel-form
      ref="felForm"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="110px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    >
      <div slot="bottom">
        <fel-button type="text" class="flr" size="small" @click.stop="dialogPassword=true">修改密码</fel-button>
        <fel-button type="text" size="small" @click.stop="dialogPlatform=true">关于平台</fel-button>
      </div>
    </fel-form>
    <!-- <div class="accountList">
      <div v-if="logo" class="accountList_imgbox">
        <img :src="logo" alt="">
      </div>
      <ul class="accountList_list">
        <li>
          <div>姓名</div>
          <div>{{defaultData.username}}</div>
        </li>
        <li>
          <div>手机</div>
          <div>{{defaultData.usermobile}}</div>
        </li>
        <li>
          <div>邮箱</div>
          <div>{{defaultData.useremail}}</div>
        </li>
        <li>
          <div>绑定用户名称</div>
          <div></div>
        </li>
        <li>
          <div>绑定用户编号</div>
          <div></div>
        </li>
        <li>
          <div>激活状态</div>
          <div></div>
        </li>
        <li>
          <div>用户来源</div>
          <div></div>
        </li>
        <li>
          <div>创建日期</div>
          <div></div>
        </li>
        <li>
          <div>失效日期</div>
          <div></div>
        </li>
        <li>
          <div>最后登录</div>
          <div></div>
        </li>
      </ul>
      <div class="accountList_btn">
        <fel-button type="text" size="small" @click.stop="dialogPlatform=true">关于平台</fel-button>
        <fel-button type="text" size="small" @click.stop="dialogPassword=true">修改密码</fel-button>
      </div>
    </div>-->
    <el-dialog
      title="平台信息"
      :close-on-click-modal="false"
      width="40%"
      append-to-body
      :before-close="beforePlatform"
      :visible.sync="dialogPlatform"
    >
      <div v-if="dialogPlatform" class="platform">
        <ul>
          <li>
            <span>前端软件版本号：</span>
            {{sysVersion}}
          </li>
          <template v-for="(item,key) in defaultData.versions">
            <li :key="key">
              <span>{{item.servertype}}：</span>
              {{item.serverversion}}
            </li>
          </template>
          <!-- <li>
            <span>技术支持：</span>湖南中科易安物联科技有限公司
          </li>-->
        </ul>
      </div>
    </el-dialog>
    <password :dialogVisible="dialogPassword" @beforeClose="dialogPassword=false"/>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import judge from "@/utils/judge.js";
import setting from "@/setting.js";
import password from "./password";
export default {
  components: {
    password
  },
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      versionNum: [],
      sysVersion: setting.sysVersion,
      dialogPassword: false,
      dialogPlatform: false,
      defaultData: {},
      formData: [
        {
          value: "userlogin",
          width: "50%",
          name: "账号",
          disabled: true,
          type: "text"
        },
        {
          value: "roles", //值,
          disabled: true,
          name: "角色", //名称,
          type: "text", //input输入框的类型 或者 select,
          width: "50%"
        },
        {
          value: "username", //值,
          name: "姓名", //名称,
          type: "text", //input输入框的类型 或者 select,
          disabled: true,
          width: "50%",
          // rules: [{ required: true, message: "姓名不能为空", trigger: "blur" }] //表格校验 Array
        },
        {
          value: "usermobile", //值,
          name: "绑定手机", //名称,
          width: "50%",
          type: "text", //input输入框的类型 或者 select,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                  callback();
                } else if (!judge.isMobile(value)) {
                  callback(new Error("手机号码格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          value: "userwxname",
          name: "绑定微信",
          disabled: true,
          width: "50%",
          type: "text"
        },
        {
          value: "useremail", //值,
          name: "绑定邮箱", //名称,
          width: "50%",
          type: "text", //input输入框的类型 或者 select,
          rules: [
            {
              validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                  callback();
                } else if (!judge.isEmail(value)) {
                  callback(new Error("邮箱格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        // {
        //   value: "usertype2",
        //   name: "售后权限",
        //   type: "text",
        //   width: "50%",
        //   disabled: true
        // },
        {
          value: "userlogin2",
          name: "创建人",
          width: "50%",
          disabled: true,
          type: "text"
        },
        {
          value: "userdate",
          name: "创建时间",
          disabled: true,
          width: "50%",
          type: "text"
        },

        {
          value: "userlastdate",
          name: "最后变动时间",
          width: "50%",
          disabled: true,
          type: "text"
        },
        {
          value: "useredate",
          name: "账号到期时间",
          width: "50%",
          disabled: true,
          type: "text"
        },
        {
          value: "logo", //值,
          name: "logo", //名称,
          uWidth: "180px",
          uHeight: "46px",
          type: "uploadImg", //上传
          url: "/login/home/d/uploaduserlogo",
          urlObtain: "/login/home/9/downlogo",
          width: "50%"
        }
        // {
        //   value: "personcode",
        //   name: "学号",
        //   width: "50%",
        //   disabled: true,
        //   type: "text"
        // },

        // {
        //   value: "isschool",
        //   name: "是否学校成员",
        //   type: "text",
        //   disabled: true,
        //   width: "50%"
        // }
      ],
      button: [
        {
          type: "2",
          name: "修改"
        },
        {
          type: "1",
          name: "取消"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      logo: state => state.account.logo
    })
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.againGetInfo()
          .then(data => {
            data.usertype2 =
              data.usertype2 == "1" ? (data.usertype2 = "是") : "否";
            data.isschool =
              data.isschool == "0"
                ? "否"
                : data.isschool == "1"
                ? "学生"
                : "教职工";
            data.imgLogo = this.logo;
            data.useredate = data.useredate == "" ? "长期" : data.useredate;
            this.defaultData = data;
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
  },
  methods: {
    ...mapActions(["againGetInfo"]),
    beforePlatform() {
      this.dialogPlatform = false;
    },
    submitForm(data) {
      let obj = {
        logo: data.logo,
        useremail: data.useremail,
        usermobile: data.usermobile,
        // username: data.username
      };
      delete data.imgLogo;
      this.$ajax("/login/home/b/updateuser", obj, "1", {}, true)
        .then(res => {
          this.againGetInfo();
          this.$message({
            message: "修改信息成功",
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
    },
    beforeClose() {
      this.defaultData = {};
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang='scss' scoped>
.acc-form {
  margin: 0 10%;
}
.accountList {
  .accountList_imgbox {
    height: 60px;
    margin: 0 0 8px 8px;
    img {
      height: 100%;
    }
  }
  .accountList_list {
    li {
      min-height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #dedede;
      &:last-child {
        border: none;
      }
      display: flex;
      font-size: 12px;
      div:first-child {
        // color: #66b1ff;
        width: 200px;
        padding-left: 10px;
      }
    }
  }
  .accountList_btn {
    height: 50px;
    line-height: 50px;
  }
}
</style>
