<template>
  <adjust class="fel-left-tree">
    <adjust-div @complete="onComplete" ref="adjust-left" class="left">
      <!-- <div
        class="tree-left-title com-title"
        :class="{'heg':!type}"
        v-if="leftTitle"
        @click="onClickSpan"
      >
        <span class="tree-text">{{leftTitle}}</span>
        <el-button v-if="type" @click.stop="onClick" class="tree-but" icon="el-icon-d-arrow-left"></el-button>
        <span v-else class="tree-but el-icon-d-arrow-right"></span>
      </div>
      <slot v-show="leftTitle && type || !leftTitle" name="left"></slot> -->
      <slot name="left"></slot>
    </adjust-div>
    <adjust-div class="container" noadjust>
      <slot></slot>
    </adjust-div>
  </adjust>
</template>

<script>
export default {
  props: {
    leftTitle: String
  },
  data() {
    return {
      type: true
    };
  },
  methods: {
    onClickSpan() {
      if (!this.type) {
        this.type = true;
        this.$refs["adjust-left"].width = "250px";
      }
    },
    onClick() {
      this.type = !this.type;
      if (this.type) {
        this.$refs["adjust-left"].width = "250px";
      } else {
        this.$refs["adjust-left"].width = "35px";
      }
    },
    onComplete(width) {
      let w = width.replace("px", "");
      if (Number(w) > 35) {
        this.type = true;
      } else {
        this.type = false;
      }
    }
  }
};
</script>
<style lang="scss">
.tree-left-title {
  background: #fff;
  position: relative;
  &.heg {
    height: 100%;
    width: 32px;
    padding: 0;
    cursor: pointer;
    .tree-but {
      height: 40px;
      padding: 15px 8px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .tree-text {
      display: block;
      height: 60%;
      width: 20px;
      margin: 50px auto;
      white-space: normal;
      word-wrap: break-word;
      text-align: center;
    }
  }
  .tree-but {
    height: 100%;
    padding: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
