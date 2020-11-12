<template>
  <el-dialog
    title="推送内容"
    width="60%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  ></el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    defaultData: Object
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>
