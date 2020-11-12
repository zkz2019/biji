<!-- 新增团员 -->
<template>
  <el-dialog
    :title="type==1?'新增团员':'修改团员'"
    width="55%"
    append-to-body
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      ref="felForm"
      width="140px"
      :button="[]"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
      @submitForm="submitForm"
    >
      <div slot="bottom" class="footerButton">
        <fel-button class="com-but-small" @click="beforeClose">取消</fel-button>
        <fel-button class="com-but-small" @click="onClickIDCard">读取身份证</fel-button>
        <fel-button class="com-but-small" type="primary" @click="onClick">确认</fel-button>
      </div>
    </fel-form>
  </el-dialog>
</template>

<script>
import IDCard from "@/utils/IDCard.js";
import { format } from "@/utils/utils.js";
import judge from "@/utils/judge.js";
export default {
  props: {
    param: {
      type: Object,
      default() {
        return {};
      }
    },
    choiceObj: {
      type: Object,
      default() {
        return {};
      }
    },
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      type: 1,
      defaultData: {},
      formData: [
        {
          width: "50%",
          value: "personname",
          name: "姓名",
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }
          ],
          buts: [
            {
              show: true,
              class: "but-connect",
              title: "身份证阅读器浏览器驱动下载",
              icon: "el-icon-download",
              onClick: this.onClickCardReaderIDCard
            }
          ]
        },
        {
          width: "50%",
          value: "personsex",
          name: "性别",
          type: "select",
          select: [
            {
              value: 1,
              label: "男"
            },
            {
              value: 0,
              label: "女"
            }
          ],
          rules: [
            {
              required: true,
              message: "请选择性别",
              trigger: "change"
            }
          ]
        },
        {
          width: "50%",
          value: "personcode",
          name: "身份证",
          maxlength: 18,
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入身份证",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                  callback();
                } else if (!judge.isCardID(value)) {
                  callback(new Error("身份证格式错误!"));
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
          value: "personphone",
          name: "手机号",
          maxlength: 11,
          type: "text",
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
          value: "tpsdate", //值,
          name: "预约开始日期", //名称,
          type: "date",
          placeholder: "请选择",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
          width: "50%"
        },
        {
          value: "tpedate", //值,
          name: "预约结束日期", //名称,
          type: "date",
          placeholder: "请选择",
          dTime: "[23:59:59]",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
          width: "50%"
        },
        {
          width: "50%",
          value: "personcompany",
          name: "单位",
          type: "text"
        },
        {
          width: "50%",
          value: "tpremark",
          name: "备注",
          type: "text"
        }
      ],
      isCardReaderIDCard: false
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.choiceObj.tpid) {
          this.type = 2;
          this.ingetteampersoninfo(this.choiceObj.tpid);
        } else {
          this.type = 1;
        }
        IDCard.inspect(
          () => {
            this.formData[0].buts[0].show = true;
          },
          () => {
            this.formData[0].buts[0].show = false;
          }
        );
      }
    }
  },
  created() {
    IDCard.inspect(
      () => {
        this.formData[0].buts[0].show = true;
      },
      () => {
        this.formData[0].buts[0].show = false;
      }
    );
  },
  methods: {
    ingetteampersoninfo(tpid) {
      this.$ajax(
        "/team/teamperson/4/getteampersoninfo",
        { tpid },
        "1",
        {},
        true
      )
        .then(res => {
          this.defaultData = res.result;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    onClickIDCard() {
      IDCard.readIDCard(
        data => {
          this.$refs["felForm"].setData("personname", data.Name);
          this.$refs["felForm"].setData("personcode", data.IDNumber);
          this.$refs["felForm"].setData("personsex", data.Sex == "女" ? 0 : 1);
        },
        err => {
          this.$message.error(err.retext || "读取身份证信息失败");
        }
      );
    },
    onClickCardReaderIDCard() {
      IDCard.download(() => {
        this.formData[0].buts[0].show = true;
      });
    },
    onClick() {
      this.$refs["felForm"].submitForm();
    },
    submitForm(data) {
      if (data.tpsdate && data.tpedate && data.tpsdate > data.tpedate) {
        this.$message({
          showClose: true,
          message: "预约结束日期要大于预约开始日期",
          type: "error"
        });
        return false;
      }
      if (this.type == 1) {
        data.teamid = this.param.teamid;
        this.$ajax("/team/teamperson/2/saveteamperson", data, "1", {}, true)
          .then(res => {
            this.$emit("onRefresh");
            this.$message({
              message: "新增团员成功",
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
      } else {
        this.$ajax("/team/teamperson/5/updateteamperson", data, "1", {}, true)
          .then(res => {
            this.$emit("onRefresh");
            this.$message({
              message: "修改团员成功",
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
      }
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