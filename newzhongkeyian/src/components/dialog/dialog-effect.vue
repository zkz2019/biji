<!-- 楼层效果弹出框 -->
<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
    :width="fatheragid.buildtype == 2?'60%':'80%'"
    :title="title"
  >
    <template v-if="fatheragid">
      <effect-sort
        v-if="fatheragid.buildtype == 3"
        @beforeClose="beforeClose"
        @onRefresh="onRefresh"
        :dialogVisible="dialogVisible"
        :buildinfo="fatheragid"
      ></effect-sort>
      <effect-layer
        v-else-if="fatheragid.buildtype == 2"
        @beforeClose="beforeClose"
        @onRefresh="onRefresh"
        :dialogVisible="dialogVisible"
        :buildinfo="fatheragid"
      ></effect-layer>
      <effect-floor
        v-else
        @beforeClose="beforeClose"
        @onRefresh="onRefresh"
        :dialogVisible="dialogVisible"
        :buildinfo="fatheragid"
      ></effect-floor>
    </template>
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
import effecctSort from "./effect-sort";
import effectLayer from "./effect-layer";
import effectFloor from "./effect-floor";
export default {
  components: {
    "effect-sort": effecctSort,
    "effect-layer": effectLayer,
    "effect-floor": effectFloor
  },
  name: "dialog-effect",
  props: ["dialogVisible", "top", "fatheragid", "title"],
  data() {
    return {};
  },
  mounted() {
    if (this.top) {
      const el = this.$el;
      if (el && el.querySelector("div.el-dialog")) {
        el.querySelector("div.el-dialog").style.marginTop = this.top;
      }
    }

    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  methods: {
    onRefresh() {
      if (this.fatheragid && this.fatheragid.buildtype == 3) {
        this.$emit("onRefresh");
      } else {
        this.$emit("onRefresh", 1);
      }
    },
    beforeClose() {
      this.$emit("beforeClose");
    }
  }
};
</script>
<style lang='scss'>
  .effect-title{
    white-space: nowrap;
  }
</style>