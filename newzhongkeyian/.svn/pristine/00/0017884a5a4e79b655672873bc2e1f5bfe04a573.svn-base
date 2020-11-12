<template>
  <el-dialog
    title="楼层布局配置"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      class="single-row"
      ref="felForm"
      :selects="selects"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="140px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    param: Object
  },
  data() {
    return {
      defaultData: {},
      pgidObj: {},
      selects: {
        sequence: [],
        LayoutType: []
      },
      formData: [
        {
          value: "lyid",
          name: "房间布局",
          type: "select",
          select: "LayoutType",
          slabel: "lyname",
          onChange: this.onChange,
          vkey: "lyid",
          svalue: ""
        },
        {
          value: "sequence",
          name: "转折点房间序号",
          type: "select",
          select: "sequence",
          slabel: "roomname",
          svalue: "seq"
        }
      ],
      button: [
        {
          type: "2",
          name: "确认"
        },
        {
          type: "1",
          name: "取消"
        }
      ]
    };
  },
  watch: {
    param() {
      if (this.param && this.param.buildtype == 3) {
        this.inSelectType();
        this.inSelectType1();
      }
    },
    dialogVisible: function(val) {
      if (val && this.param && this.param.buildtype == 3) {
        this.inSelectType();
        this.inSelectType1();
      }
    }
  },
  created() {
    if (this.param && this.param.buildtype == 3) {
      this.inSelectType();
      this.inSelectType1();
    }
  },
  methods: {
    onChange(arr, data) {
      if (arr[0].iszz == "0") {
        this.formData[1].noShow = true;
      } else {
        this.formData[1].noShow = false;
      }
    },
    inSelectType() {
      //获取房间转折点序号
      let url = "/system/build/update/5/getallroomsequence";
      this.$ajax(url, {}, "1", this.param)
        .then(res => {
          let result = res.result;
          this.selects.sequence = result.seqs;
        })
        .catch(err => {});
    },
    inSelectType1() {
      //获取房间布局类型
      let url = "/system/build/update/a/getlayouttype";
      this.$ajax(url, {}, "1")
        .then(res => {
          let result = res.result;
          this.selects.LayoutType = result;
        })
        .catch(err => {});
    },
    inUpdateroomlayout(data) {
      // delete data.lyid.iszz
      // delete data.lyid.lyname
      data.lyid = data.lyid.lyid;

      this.$ajax(
        "/system/build/update/6/updateroomlayout",
        data,
        "1",
        this.param
      )
        .then(res => {
          this.beforeClose();
          this.$message({
            message: "调整楼层布局配置成功",
            type: "success"
          });
          this.inSelectType();
          this.$emit("success");
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },

    submitForm(data) {
      this.inUpdateroomlayout(data);
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
