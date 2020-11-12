<template>
  <el-dialog v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    minWidth: String
  },
  mounted() {
    if (this.minWidth) {
      let dom = this.$el.querySelector("div.el-dialog");
      if (dom && dom.style) {
        dom.style.minWidth = this.minWidth;
      }
    }
  }
};
</script>
