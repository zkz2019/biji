<!-- 无线联网锁信息 -->
<template>
  <el-dialog
    title="无线联网锁详情"
    width="60%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <form-table v-loading="loading" thwidth="10%" tdwidth="40%" :column="2" :param="defaultData" :list="formData"></form-table>
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
      selects: {
        roommodel: [],
        gatewaytype: []
      },
      defaultData: {},
      formData: [
        {
          value: "roomlocation",
          name: "房间位置"
        },
        {
          value: "roomcode2",
          name: "唯一ID"
        },
        {
          value: "roomtx",
          name: "通讯方式"
        },
        {
          value: "roomsq",
          name: "支持授权类型"
        },
        {
          value: "roommodel",
          name: "门锁型号"
        },
        {
          value: "lockver",
          name: "软件版本号"
        },
        {
          value: "roomcharge",
          name: "电量"
        },
        {
          value: "roompowertype",
          name: "电源类型"
        },
        {
          value: "roomnetquality",
          name: "通讯状态"
        },
        {
          value: "roomworkmode",
          name: "工作模式"
        },
        {
          value: "roomstatus",
          name: "开关门状态"
        },
        {
          value: "roomforcelock",
          name: "强制锁门控制"
        },
        {
          value: "roomspecial",
          name: "支持特殊卡片"
        },
        {
          value: "roommcardtype",
          name: "管理卡开门方式"
        },
        {
          value: "roomwarnstatus",
          name: "拆机报警"
        },
        // {
        //   value: "roomissyso",
        //   name: "调试信息"
        // },
        {
          value: "roomcard",
          name: "卡片授权"
        },
        {
          value: "roompass",
          name: "密码授权"
        },
        {
          value: "roomfinger",
          name: "指纹授权"
        },
        {
          value: "lastactivedate",
          name: "最后通讯时间"
        },
        {
          value: "roomcode",
          name: "通讯ID"
        },
        {
          value: "gatewaycode",
          name: "网关唯一ID"
        },
        {
          value: "channelid",
          name: "信道ID"
        },
        {
          value: "channel",
          name: "信道"
        },
        {
          value: "powerlev",
          name: "功率等级"
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
    onChange(arr, data) {
      if (arr[0]) {
        data.gatewaycode = arr[0];
      }
    },
    inGetupdategatewayinfo() {
      if (this.param.roomid) {
        this.loading = true;
        this.$ajax(
          "/system/device/devicelock/4/getlockdetails",
          { roomid: this.param.roomid },
          "1"
        )
          .then(res => {
            this.defaultData = res.result;
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] `+err.resultMsg ,
              type: "error"
            });
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
