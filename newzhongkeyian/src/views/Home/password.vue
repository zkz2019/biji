<template>
  <el-dialog
    class="dialog"
    title="修改密码"
    :close-on-click-modal="false"
    width="40%"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      class="single-row"
      ref="felForm"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="100px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";

import judge from "@/utils/judge.js";
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      defaultData: {},
      formData: [
        {
          value: "oldpass", //值,
          name: "原密码", //名称,
          type: "password", //input输入框的类型 或者 select,
          rules: [
            { required: true, message: "原密码不能为空", trigger: "blur" }
          ] //表格校验 Array
        },
        {
          value: "newpass", //值,
          name: "新密码", //名称,
          type: "password", //input输入框的类型 或者 select,
          rules: [
            {
              required: true,
              message: "请输入新密码",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                let password = $this.$refs.felForm.ruleForm.password2;
                if (!value && value !== 0) {
                  callback();
                } else if (password) {
                  $this.$refs.felForm.validateField("password2");
                  callback();
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ] //表格校验 Array
        },
        {
          value: "password2", //值,
          name: "确认密码", //名称,
          type: "password", //input输入框的类型 或者 select,
          rules: [
            {
              required: true,
              message: "请输入确认密码",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                let password = $this.$refs.felForm.ruleForm.newpass;
                if (!value && value !== 0) {
                  callback();
                } else if (password && password != value) {
                  callback(new Error("与新密码不一致!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ] //表格校验 Array
        }
      ],
      button: [
        {
          type: "2",
          name: "确定"
        },
        {
          type: "1",
          name: "取消"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["clearAccount"]),
    submitForm(data) {
      this.$ajax("/login/home/c/updateuserpsw", data, "1", {}, true)
        .then(res => {
          this.$alert("密码修改成功，请重新登录", "提示", {
            confirmButtonText: "确定",
            type: "success",
            center: true,
            callback: action => {
              this.beforeClose();
              this.clearAccount();
              this.$router.push({
                path: "/login"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
        });
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

<style lang='scss' scoped>
.acc-form {
  margin: 0 20%;
}
</style>
