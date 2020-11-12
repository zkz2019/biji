<template>
  <el-container>
    <el-header class="query_headbox">
      <div v-if="!noTitle" class="com-title">
        <span class="ti_text">
          <slot name="title">
            <span class="titlebox">{{title}}</span>
          </slot>
        </span>
      </div>
    </el-header>
    <el-main class="query_main batch">
      <adjust class="batch-authori">
        <adjust-div class="b-left">
          <slot name="left"></slot>
        </adjust-div>
        <adjust-div class="b-centre" noadjust>
          <slot></slot>
        </adjust-div>
        <adjust-div v-if="type==3" class="b-right" dragLeft>
          <slot name="right"></slot>
        </adjust-div>
      </adjust>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    noTitle: Boolean,
    title: String,
    type: {
      type: String,
      default: "3"
    }
  },
  methods: {}
};
</script>

<style lang='scss'>
.batch-authori {
  flex: 1;
}
</style>
