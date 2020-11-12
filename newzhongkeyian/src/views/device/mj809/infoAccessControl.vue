<!-- 门禁信息 -->
<template>
  <el-dialog
    title="门禁信息"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <form-table v-loading="loading" width="140px" :column="2" :param="defaultData" :list="formData"></form-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    param: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      loading: false,
      defaultData: {},
      formData: [
        {
          value: "person",
          name: "管理责任人"
        },
        {
          value: "personmobile",
          name: "联系方式"
        },
        // {
        //   value: "",
        //   name: "读头类型"
        // },
        // {
        //   value: "",
        //   name: "读头软件版本号"
        // },
        {
          value: "accesstxtype",
          name: "主板通讯类型"
        },
        {
          value: "accesscode",
          name: "门禁控制器唯一ID"
        },
        {
          value: "accessname",
          name: "门禁控制器名称"
        },
        {
          value: "accessmodel",
          name: "门禁控制器型号"
        },
        {
          value: "accessver",
          name: "主控板软件版本号"
        },
        {
          value: "authtype",
          name: "支持授权类型"
        },
        {
          value: "contacttype",
          name: "门锁类型"
        },
        {
          value: "synctype",
          name: "同步模式"
        },
        {
          value: "accessstate",
          name: "通讯状态"
        },
        {
          value: "workmode",
          name: "工作模式"
        },
        {
          value: "isopen",
          name: "开关门状态"
        },
        {
          value: "forcelock",
          name: "强制锁门控制"
        },
        {
          value: "specialcard",
          name: "支持特殊卡片"
        },
        {
          value: "mcardtype",
          name: "管理卡开门方式"
        },
        {
          value: "iswarnstatus",
          name: "拆机报警"
        },
        {
          value: "issyso",
          name: "调试信息"
        },
        {
          value: "authcard",
          name: "卡片授权"
        },
        {
          value: "authpass",
          name: "密码授权"
        },
        {
          value: "authfinger",
          name: "指纹授权"
        },
        {
          value: "lastactivedate",
          name: "最后通讯时间"
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inGetupdategatewayinfo();
      }
    }
  },
  methods: {
    inGetupdategatewayinfo() {
      if (this.param.accessid ) {
        this.loading = true;
        this.$ajax("/system/device/deviceaccess/3/getaccessdetails", { accessid : this.param.accessid }, "1")
          .then(res => {
            this.defaultData = res.result;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.log("err", err.resultMsg);
          });
      }
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

<style>
</style>
