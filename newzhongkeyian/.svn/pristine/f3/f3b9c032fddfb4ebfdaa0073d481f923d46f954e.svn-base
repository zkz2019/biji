<template>
  <el-dialog
    class="dialog"
    v-bind="$attrs"
    v-on="$listeners"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      class="single-row"
      ref="felForm"
      :defaultData="defaultData"
      @closeForm="closeForm"
      :width="formWidth"
      :formData="formData"
      v-on="$listeners"
      :dynamic="dynamic"
    ></fel-form>
  </el-dialog>
</template>

<script>
/**
 * element-ui中 el-dialog 弹出框
 * 弹出框是懒渲染 只会渲染一次
 * closeData 关闭弹出框 数字，改变值就关闭
 * openData 显示弹出框 数字，改变值就显示
 * top 里顶部位置
 * button 是否带确认关闭两个按钮
 * 支持插槽插入内容
 * 有确认关闭两个按钮
 * @closeForm 点击关闭按钮触发事件
 * @submitForm 点击确认按钮触发事件
 */
import felForm from "../form/fel-form";
export default {
  name: "ty-el-dialog",
  props: [
    "dialogVisible",
    "top",
    "button",
    "defaultData",
    "formWidth",
    "formData",
    "dynamic"
  ],
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  mounted() {
    if (this.top) {
      const el = this.$el;
      if (el && el.querySelector("div.el-dialog")) {
        el.querySelector("div.el-dialog").style.marginTop = this.top;
      }
    }
  },
  methods: {
    beforeClose() {
      // if (this.$refs["felForm"]) {
      //   this.$refs["felForm"].resetForm();
      // }
      this.$emit("beforeClose");
    },
    closeForm: function() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    },
    submitForm: function() {
      this.$emit("submitForm");
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible == false && this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
    }
  },
  components: {
    "fel-form": felForm
  }
};
</script>
