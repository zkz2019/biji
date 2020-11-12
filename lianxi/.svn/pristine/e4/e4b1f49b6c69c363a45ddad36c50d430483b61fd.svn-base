<!-- 修改预订信息 -->
<template>
  <el-dialog
    title="修改预订信息"
    :visible.sync="dialogVisible"
    width="50%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    append-to-body
  >
    <fel-form
      ref="felForm"
      @submitForm="submitForm"
      @closeForm="handleClose"
      width="120px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
import judge from "@/utils/judge.js";
export default {
  props: {
    param: Object,
    dialogVisible: Boolean
  },
  data() {
    var $this = this;
    return {
      defaultData: { dates: ["", ""] },
      formData: [
        {
          value: "newpersoncode",
          name: "新身份证",
          width: "50%",
          type: "text",
          //   disabled: true,
          rules: [
            {
              required: true,
              message: "请填写新身份证",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (!judge.isCardID(value)) {
                  callback(new Error("身份证号格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          value: "personname",
          name: "姓名",
          width: "50%",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写姓名",
              trigger: "blur"
            }
          ]
        },
        {
          value: "personphone",
          name: "手机",
          width: "50%",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写手机号",
              trigger: "blur"
            },
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
          value: "personsex",
          name: "性别",
          type: "select",
          width: "50%",
          select: [
            {
              value: "男",
              label: "男"
            },
            {
              value: "女",
              label: "女"
            }
          ],
          rules: [
            {
              required: true,
              message: "请选择性别",
              trigger: "blur"
            }
          ]
        },
        {
          value: "tpremark",
          name: "备注",
          width: "50%",
          type: "text"
        },
        {
          value: "dates",
          name: "开始结束时间",
          type: "date",
          date: "datetimerange",
          onChange: this.onChange,
          options: {
            disabledDate(time) {
              return time.getTime() < new Date().getTime() - 86400000;
            }
          },
          format: "yyyy-MM-dd HH:mm:ss",
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (
                  !value ||
                  value.length == 0 ||
                  value[0] == "" ||
                  value[1] == ""
                ) {
                  callback(new Error("请选择时间段"));
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
  created() {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.defaultData = Object.assign(
          {
            newpersoncode: this.param.personcode,
            dates: [this.param.tpsdate, this.param.tpedate]
          },
          this.param
        );
      }
    }
  },
  methods: {
    submitForm(obj) {
      let data = {
        newpersoncode: obj.newpersoncode,
        personname: obj.personname,
        personphone: obj.personphone,
        personsex: obj.personsex,
        roomid: obj.roomid,
        tpid: this.param.tpid,
        tpremark: obj.tpremark,
        tpstime: obj.dates[0],
        tpetime: obj.dates[1]
      };
      this.$ajax("/lock/operate/hotel/e/updateteamperson", data, "1", {}, true)
        .then(res => {
          this.$message({
            showClose: true,
            message: "修改成功!",
            type: "success"
          });
          this.handleClose();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    handleClose() {
      this.defaultData = { dates: ["", ""] };
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("handleClose");
    }
  }
};
</script>


