<!-- 添加卡片 修改卡片授权 -->
<template>
  <el-dialog
    :title="title"
    width="60%"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      class="kinguserModify"
      ref="felForm"
      v-loading="loading"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="140px"
      dynamic
      :defaultData="defaultFormData"
      :formData="formData"
    >
      <div slot="top" v-if="isBatch" class="form-tips">批量修改会把你选择的授权都改成你输入的值</div>
    </fel-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "@/utils/utils.js";
export default {
  props: {
    type: String,
    param: Object,
    paramObj: Object | Array,
    defaultData: {
      type: Object,
      default() {
        return {};
      }
    },
    list: Array,
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      loading: false,
      defaultFormData: {},
      title: "修改授权",
      isBatch: false,
      formData: [],
      formData2: [
        {
          width: "50%",
          value: "personname",
          name: "归属人",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "personcode",
          name: this.getNumber(),
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "personlocation",
          name: "组织",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "userlogin",
          name: "授权账号",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "authtype",
          name: "授权类型",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "cardcode",
          name: "卡号/指纹号",
          type: "text",
          disabled: true
        },
        {
          noShow: false,
          value: "password", //值,
          name: "修改密码", //名称,
          placeholder: "不填为不修改密码",
          type: "password", //input输入框的类型 或者 select,
          width: "50%",
          rules: [
            {
              validator: (rule, value, callback) => {
                let password = $this.$refs.felForm.ruleForm.password2;
                if (!value && value !== 0) {
                  if (password) {
                    callback(new Error("请输入修改密码"));
                  } else {
                    callback();
                    $this.$refs.felForm.validateField("password2");
                  }
                } else if (password) {
                  callback();
                  $this.$refs.felForm.validateField("password2");
                } else {
                  callback();
                  $this.$refs.felForm.validateField("password2");
                }
              },
              trigger: "blur"
            }
          ] //表格校验 Array
        },
        {
          noShow: false,
          value: "password2", //值,
          name: "确认密码", //名称,
          placeholder: "不填为不修改密码",
          type: "password", //input输入框的类型 或者 select,
          width: "50%",
          rules: [
            {
              validator: (rule, value, callback) => {
                let password = $this.$refs.felForm.ruleForm.password;
                if (!value && value !== 0) {
                  if (password) {
                    callback(new Error("请输入确认密码"));
                  } else {
                    callback();
                  }
                } else if (password && password != value) {
                  callback(new Error("与修改密码不一致!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ] //表格校验 Array
        },
        {
          width: "50%",
          value: "empsdate",
          name: "授权开始时间",
          type: "date",
          date: "datetime",
          placeholder: "长期",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "empedate",
          name: "授权结束时间",
          type: "date",
          date: "datetime",
          placeholder: "长期",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "openstime",
          name: "每日授权开始时间",
          type: "time",
          format: "HH:mm",
          rules: [
            {
              required: true,
              message: "请选择每日授权开始时间",
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "openetime",
          name: "每日授权结束时间",
          type: "time",
          format: "HH:mm",
          rules: [
            {
              required: true,
              message: "请选择每日授权结束时间",
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "opencount",
          name: "开门使用次数",
          maxlength: 4,
          placeholder: "不限",
          type: "text",
          rules: [
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (/^[0-9]+$/.test(value)) {
                    if (value < 0 || value > 254) {
                      callback(new Error("输入的值在1~254之间"));
                    } else {
                      callback();
                    }
                  } else {
                    callback(new Error("使用次数必须是正整数"));
                  }
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "lastdate",
          name: "最后下发时间",
          type: "text",
          disabled: true
        }
      ],
      formData1: [
        {
          width: "50%",
          value: "empsdate",
          name: "授权开始日期",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "empedate",
          name: "授权结束日期",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "openstime",
          name: "每日授权开始时间",
          type: "time",
          format: "HH:mm"
        },
        {
          width: "50%",
          value: "openetime",
          name: "每日授权结束时间",
          type: "time",
          format: "HH:mm"
        },
        {
          width: "50%",
          value: "opencount",
          name: "开门使用次数",
          maxlength: 4,
          type: "text",
          rules: [
            {
              validator: (rule, value, callback) => {
                if (value) {
                  if (/^[0-9]+$/.test(value)) {
                    if (value < 0 || value > 254) {
                      callback(new Error("输入的值在1~254之间"));
                    } else {
                      callback();
                    }
                  } else {
                    callback(new Error("使用次数必须是正整数"));
                  }
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.setDefaultFormData();
      }
    }
  },
  methods: {
    ...mapGetters(["getNumber"]),
    setDefaultFormData() {
      if (
        (this.param._clicktype == 1 && this.param.range == 2) ||
        this.paramObj.length > 1
      ) {
        this.isBatch = true;
        this.title = "批量修改授权";
        this.formData = this.formData1;
        this.defaultFormData = {
          empsdate: "",
          empedate: "",
          openstime: "",
          openetime: "",
          opencount: ""
        };
      } else {
        this.defaultFormData = {
          openstime: "00:00",
          openetime: "23:59"
        };
        this.formData = this.formData2;
        let valObj = this.paramObj[0];
        this.title = "修改授权";
        this.isBatch = false;
        if (valObj.rctype != 3) {
          this.formData[6].noShow = true;
          this.formData[7].noShow = true;
        }
        this.ingetauthinfo(valObj);
      }
    },
    ingetauthinfo(obj) {
      this.loading = true;
      this.$ajax("/lock/operate/info/m/getauthinfo", {}, "1", obj)
        .then(res => {
          res.result.openstime = res.result.openstime || "00:00";
          res.result.openstime = res.result.openstime || "23:59";
          this.defaultFormData = res.result;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.loading = false;
      this.$emit("beforeClose");
    },
    submitForm(data) {
      let obj = Object.assign(data, this.param);
      if (this.title == "修改授权") {
        obj.actiontype = "勾选范围";
      } else {
        obj.actiontype = obj.range == "2" ? "跨页全选" : "勾选范围";
      }
      this.$ajax(
        "/lock/operate/info/n/updateauths",
        obj,
        "1",
        this.paramObj,
        true
      )
        .then(res => {
          this.$emit("onRefresh");
          this.$message({
            message: "修改授权已发送",
            type: "success"
          });
          this.beforeClose();
        })
        .catch(err => {
          this.$message({
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.kinguserModify {
  .form-tips {
    text-align: center;
    color: #f00;
    margin-bottom: 10px;
  }
}
</style>