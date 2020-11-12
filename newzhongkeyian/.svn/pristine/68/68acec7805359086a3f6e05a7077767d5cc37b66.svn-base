<!-- 预约管理 -->
<template>
  <fel-dialog
    :title="entity.alias"
    width="50%"
    append-to-body
    minWidth="700px"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <!-- <div class="administer-title" style="position: relative;" slot="title">
      <span class="el-dialog__title">预约管理</span>
      <div class="administer-export">
        <fel-button
          v-for="(v,key) of entity.topButs"
          :key="key"
          size="mini"
          @click="onClick(v.type, v)"
        >{{v.alias}}</fel-button>
      </div>
    </div>-->
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
        <template v-for="(v,key) of listBut">
          <fel-button class="com-but-small" :key="key" @click="onSubmit(v.type,v)">{{v.alias}}</fel-button>
        </template>
      </div>
    </fel-form>
    <recorddialog
      :buts="buts2"
      :param="param"
      :dialogVisible="recordVisible"
      @beforeClose="recordVisible=false"
    ></recorddialog>
    <Pay type="1" :param="param" :dialogVisible="payVisible" @beforeClose="payVisible=false"></Pay>
    <costDetails
      :buts="buts"
      :param="param"
      :dialogVisible="costVisible"
      @beforeClose="costVisible=false"
    ></costDetails>
  </fel-dialog>
</template>

<script>
import costDetails from "./dialog/costDetails";
import Pay from "./dialog/appointmentPay";
import recorddialog from "./dialog/recorddialog";
import judge from "@/utils/judge.js";
import { format, download } from "@/utils/utils.js";
export default {
  props: {
    param: {
      type: Object,
      default() {
        return {};
      }
    },
    entity: {
      type: Object,
      default() {
        return {
          listBut: [],
          topButs: []
        };
      }
    },
    dialogVisible: Boolean
  },
  components: { recorddialog, Pay, costDetails },
  data() {
    let $this = this;
    return {
      buts: {},
      buts2: {},
      costVisible: false,
      payVisible: false,
      recordVisible: false,
      defaultData: {
        dates: ["", ""]
      },
      formData: [
        {
          width: "50%",
          value: "teammoney",
          name: "已缴团费",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "teamusemoney",
          name: "团总消费",
          type: "text",
          disabled: true
        },
        // {
        //   width: "50%",
        //   value: "teammoney",
        //   name: "已交团费",
        //   type: "text",
        //   disabled: true
        // },
        {
          width: "50%",
          value: "teamname",
          name: "团名",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写团名",
              target: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "teamdiscount",
          name: "团折扣",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写团折扣",
              target: "blur"
            },
            {
              validator: (rule, value, callback) => {
                let num = Number(value);
                if (isNaN(num) || num < 0 || num > 100) {
                  callback(new Error("请填写0-100数字"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          buts: [
            {
              class: "but-T",
              name: "折"
            }
          ]
        },
        {
          width: "50%",
          value: "teamleader",
          name: "团长",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写团长姓名",
              target: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "teamleaderphone",
          name: "团长手机",
          type: "text",
          maxlength: 11,
          rules: [
            {
              required: true,
              message: "请填写团长手机",
              target: "blur"
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
          width: "50%",
          value: "teamyjcount",
          name: "预约人数",
          type: "text"
        },
        {
          width: "50%",
          value: "teamsjcount",
          name: "实际人数",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "teamypcount",
          name: "已排人数",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "teamyproomcount",
          name: "已排房数",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "teamrzcount",
          name: "入住人数",
          type: "text",
          disabled: true
        },

        {
          width: "50%",
          value: "teamrzroomcount",
          name: "入住房数",
          type: "text",
          disabled: true
        },
        {
          value: "teamsdate",
          width: "50%",
          name: "预约开始",
          type: "text",
          disabled: true
        },
        {
          value: "teamedate",
          width: "50%",
          name: "预约结束",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "personcode",
          name: "主账房人",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "personphone",
          name: "主账房联系方式",
          type: "text",
          disabled: true
        },
        {
          width: "50%",
          value: "roomlocation",
          name: "主账房",
          type: "text",
          disabled: true
        }
        // {
        //   width: "50%",
        //   value: "teamstate",
        //   name: "状态",
        //   type: "text",
        //   disabled: true
        // }
      ],
      listBut: []
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.setListBut();
        this.initDefault();
      }
    }
  },
  methods: {
    setListBut() {
      this.listBut = this.entity.listBut.filter(v => {
        if (this.param.teamstate == "0" || this.param.teamstate == "2") {
          if (v.type != "2" && v.type != "6") {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
    },
    onClick(key, obj) {
      if (key == 1) {
        this.costVisible = true;
        this.buts = obj;
      } else if (key == 2) {
        // this.exportBut();
      }
    },
    initDefault() {
      this.$ajax("/team/update/1/getteaminfo", this.param, "1")
        .then(res => {
          this.defaultData = res.result;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    onSubmit(val, obj) {
      if (val == "1") {
        this.payVisible = true;
      } else if (val == "2") {
        this.buts2 = obj;
        this.recordVisible = true;
      } else if (val == "3") {
        this.$refs["felForm"].submitForm();
      } else if (val == "4") {
        this.$confirm("确定要结算退团吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$ajax("/team/update/7/backteam", this.param, "1")
              .then(res => {
                this.$emit("onRefresh");
                this.beforeClose();
                this.$message({
                  showClose: true,
                  message: "结算退团成功!",
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
          })
          .catch(() => {});
      } else if (val == "6") {
        this.costVisible = true;
        this.buts = obj;
      }
    },
    submitForm(obj) {
      let data = {
        teamdiscount: obj.teamdiscount,
        teamid: this.param.teamid,
        teamleader: obj.teamleader,
        teamleaderphone: obj.teamleaderphone,
        teamname: obj.teamname,
        teamyjcount: obj.teamyjcount
      };
      this.$ajax("/team/update/2/updateteaminfo", data, "1")
        .then(res => {
          this.$emit("onRefresh");
          this.beforeClose();
          this.$message({
            showClose: true,
            message: "修改团信息成功!",
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