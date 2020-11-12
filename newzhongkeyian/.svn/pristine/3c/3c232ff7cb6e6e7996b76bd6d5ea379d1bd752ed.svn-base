<!-- 修改蓝牙钥匙授权 -->
<template>
  <el-dialog
    title="修改蓝牙钥匙授权"
    width="60%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      ref="felForm"
      @submitForm="onClick"
      width="160px"
      dynamic
      :defaultData="ismj?mjdefaultData:defaultData"
      :formData="ismj?mjformData:formData"
      @closeForm="beforeClose"
    />
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
    list: Array,
    dialogVisible: Boolean,
    ismj: Boolean
  },
  data() {
    return {
      button: [
        {
          type: "0",
          name: "清空"
        },
        {
          type: "2",
          name: "确认"
        }
      ],
      mjformData: [
        {
          width: "50%",
          value: "auaempsdate",
          name: "授权开始时间",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "auaempedate",
          name: "授权结束时间",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "auaopenstime",
          name: "每日可开门起始时间",
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
          value: "auaopenstime",
          name: "每日可开门结束时间",
          type: "time",
          format: "HH:mm",
          rules: [
            {
              required: true,
              message: "请选择每日可开门结束时间",
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "auausecount",
          name: "开门使用次数",
          type: "text"
        }
      ],
      formData: [
        {
          width: "50%",
          value: "empsdate",
          name: "授权开始时间",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "empedate",
          name: "授权结束时间",
          type: "date",
          date: "datetime",
          format: "yyyy-MM-dd HH:mm:ss"
        },
        {
          width: "50%",
          value: "openstime",
          name: "每日可开门起始时间",
          type: "time",
          format: "HH:mm",
          rules: [
            {
              required: true,
              message: "请选择每日可开门起始时间",
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "openetime",
          name: "每日可开门结束时间",
          type: "time",
          format: "HH:mm",
          rules: [
            {
              required: true,
              message: "请选择每日可开门结束时间",
              trigger: "blur"
            }
          ]
        },
        {
          width: "50%",
          value: "opencount",
          name: "开门使用次数",
          type: "text"
        }
      ],
      defaultData: {
        personcode: this.param.personcode,
        personname: this.param.personname,
        empsdate: "",
        empedate: "",
        openstime: "00:00",
        openetime: "23:59",
        opencount: ""
      },
      mjdefaultData: {
        personcode: this.param.personcode,
        personname: this.param.personname,
        auaempedate: "",
        auaempsdate: "",
        auaopenstime: "00:00",
        auaopenetime: "23:59",
        auausecount: ""
      }
    };
  },
  watch: {
    dialogVisible(val) {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.defaultData = {
        personcode: this.param.personcode,
        personname: this.param.personname,
        empsdate:
          this.paramObj.empsdate == "立即生效" ? "" : this.paramObj.empsdate,
        empedate:
          this.paramObj.empedate == "长期" ? "" : this.paramObj.empedate,
        openstime: this.paramObj.openstime ? this.paramObj.openstime : "00:00",
        openetime: this.paramObj.openetime ? this.paramObj.openetime : "23:59",
        opencount: this.paramObj.count == "不限次数" ? "" : this.paramObj.count
      };
      console.log("this.paramObj", this.param, this.paramObj, this.defaultData);
    }
  },
  methods: {
    ...mapGetters(["getNumber"]),
    beforeClose() {
      this.$emit("beforeClose");
    },
    onClick(data) {
      this.$emit("confirm", data, this.paramObj);
    }
  }
};
</script>
