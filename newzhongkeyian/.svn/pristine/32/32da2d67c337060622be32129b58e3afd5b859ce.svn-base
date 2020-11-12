<template>
  <el-dialog
    class="dialog-jurisdiction"
    :title="rolename ?'修改角色' :'添加角色'"
    width="1000px"
    top="10vh"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <div class="form fel-form">
      <div class="form-content">
        <div class="content-div">
          <el-form
            v-loading="loading"
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="form-el demo-ruleForm"
          >
            <el-form-item class="form-it" label="角色名称" prop="rolename">
              <el-input
                class="inp"
                maxlength="24"
                :disabled="rolename?true:false"
                v-model="form.rolename"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-it" label="角色描述">
              <el-input class="inp" v-model="form.roledesc"></el-input>
            </el-form-item>
            <el-form-item class="form-it" label="权限信息" prop="jurisdiction">
              <div class="com-jurisdiction">
                <div :class="{'jurisdiction-fixed':isFixed}">
                  <div v-if="isFixed" class="fixed-title">
                    权限信息
                    <button
                      type="button"
                      @click="isFixed=false"
                      aria-label="Close"
                      class="el-dialog__headerbtn"
                    >
                      <i class="el-dialog__close el-icon el-icon-close"></i>
                    </button>
                  </div>
                  <div class="fixed-pad">
                    <jurisdiction
                      class="jurisdiction"
                      v-model="form.jurisdiction"
                      ref="jurisdiction"
                      :param="jurisdiction"
                    />
                  </div>
                </div>
              </div>
              <div class="icon-fixed" @click="isFixed=true">
                <i class="el-icon-zoom-in"></i>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-button">
      <el-button class="com-but-small" type="primary" @click="submitForm">确定</el-button>
      <el-button class="com-but-small" @click="beforeClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import jurisdiction from "./jurisdiction";
export default {
  components: {
    jurisdiction
  },
  props: {
    rolename: String,
    dialogVisible: Boolean
  },
  data() {
    return {
      isFixed: false,
      loading: false,
      jurisdiction: [],
      functions: [],
      form: {
        rolename: "",
        roledesc: "",
        jurisdiction: ["302"]
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        jurisdiction: [
          { required: true, message: "请选择权限", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.inGetfunction();
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.rolename) {
          this.inGetroleinfo();
        } else {
          this.form = {
            rolename: "",
            roledesc: "",
            jurisdiction: ["302"]
          };
          this.inGetfunction();
        }
      }
    }
  },
  methods: {
    inGetroleinfo() {
      this.loading = true;
      this.$ajax(
        "/system/role/update/1/getroleinfo",
        {
          rolename: this.rolename
        },
        "1"
      )
        .then(res => {
          this.jurisdiction = res.result.functions;
          this.form = {
            rolename: res.result.rolename,
            roledesc: res.result.roledesc,
            jurisdiction: ["302"]
          };
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
    },
    inGetfunction() {
      this.$ajax("/system/role/save/1/getfunction", {}, "1")
        .then(res => {
          this.jurisdiction = res.result;
        })
        .catch(err => {});
    },
    inAdd() {
      let arr = [...new Set(this.form.jurisdiction)];
      arr = arr.filter(value => {
        return !/^SS\S+$/.test(value);
      });
      let data = {};
      for (let item in this.form) {
        if (item != "jurisdiction") {
          data[item] = this.form[item];
        }
      }
      // delete this.form.jurisdiction;
      this.$ajax("/system/role/save/2/saverole", data, "1", arr, true, 120000)
        .then(res => {
          this.$emit("success");
          this.beforeClose();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    inModify() {
      let arr = [...new Set(this.form.jurisdiction)];
      arr = arr.filter(value => {
        return !/^SS\S+$/.test(value);
      });
      let data = {};
      for (let item in this.form) {
        if (item != "jurisdiction") {
          data[item] = this.form[item];
        }
      }
      // delete this.form.jurisdiction;
      this.$ajax(
        "/system/role/update/2/updaterole",
        data,
        "1",
        arr,
        true,
        120000
      )
        .then(res => {
          this.$emit("success");
          this.beforeClose();
          this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.rolename) {
            this.inModify();
          } else {
            this.inAdd();
          }
        } else {
          return false;
        }
      });
    },
    beforeClose() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>