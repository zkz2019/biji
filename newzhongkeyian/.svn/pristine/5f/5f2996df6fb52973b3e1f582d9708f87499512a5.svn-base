<!-- 办理退房 -->
<template>
  <el-dialog
    title="办理退房"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose"
    append-to-body
  >
    <fel-form
      ref="felForm"
      class="single-row"
      @submitForm="submitForm"
      @closeForm="handleClose"
      width="120px"
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    param: Object,
    dialogVisible: Boolean
  },
  data() {
    var $this = this;
    return {
      defaultData: {},
      formData: [
        {
          value: "",
          name: "姓名",
          type: "text",
          disabled: true
        },
        {
          value: "roomlocation",
          name: "房间",
          type: "text",
          disabled: true
        },
        {
          value: "rtprice",
          name: "房间单价",
          type: "text",
          disabled: true
        },
        {
          value: "trcash",
          name: "押金",
          type: "text",
          disabled: true
        },
        {
          value: "trdays",
          name: "入住天数",
          type: "text",
          disabled: true
        },
        {
          value: "trsdate",
          name: "入住开始时间",
          type: "text",
          disabled: true
        },
        {
          value: "tredate",
          name: "入住结束时间",
          type: "text",
          disabled: true
        },
        {
          value: "trsmoney",
          name: "应收金额",
          type: "text",
          disabled: true
        },
        {
          value: "trrmoney",
          name: "收费金额",
          type: "number",
          rules: [
            {
              required: true,
              message: "请填写收费金额",
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
        // this.$ajax("/lock/operate/hotel/7/getbackroominfo", this.param, "1")
        //   .then(res => {
        //     console.log("res", res);
        //   })
        //   .catch("err", err => {
        //     console.log("err", err);
        //   });
      }
    }
  },
  methods: {
    submitForm() {},
    handleClose() {
      this.$emit("handleClose");
    }
  }
};
</script>


