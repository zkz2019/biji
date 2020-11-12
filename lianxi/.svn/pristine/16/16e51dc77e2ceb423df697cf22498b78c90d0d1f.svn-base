<template>
  <div class="zSelNum">
    <el-select class="zSelNumInp" :value="range[0]" @change="onChangeMin" placeholder="请选择">
      <template v-for="item in loadAll">
        <el-option
          :disabled="Boolean(range[1]&&Number(item.id)>Number(range[1]))"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        ></el-option>
      </template>
    </el-select>&nbsp;&nbsp;-&nbsp;&nbsp;
    <el-select class="zSelNumInp" :value="range[1]" @change="onChangeMax" placeholder="请选择">
      <template v-for="item in loadAll">
        <el-option
          :disabled="Boolean(range[0]&&Number(item.id)<Number(range[0]))"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        ></el-option>
      </template>
    </el-select>
    <span v-show="range[0]||range[1]" @click="onClear" class="el-icon-circle-close zSelNumClear"></span>
  </div>
</template>

<script>
export default {
  props: {
    range: Array,
    loadAll: Array,
  },
  data: () => {
    return {};
  },
  methods: {
    onClear() {
      this.$emit("onClear");
    },
    onChangeMin(val) {
      this.$emit("onChange", "1", val);
    },
    onChangeMax(val) {
      this.$emit("onChange", "2", val);
    },
  },
};
</script>

<style lang="scss">
.zSelNum {
  height: 30px;
  width: 240px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  display: inline-block;
  padding-right: 10px;
  .zSelNumInp {
    .el-input__inner {
      border: none;
      height: 28px;
      padding-right: 15px;
      line-height: 28px;
      width: 92px;
    }
    .el-input__icon {
      display: none;
    }
  }
  .zSelNumClear {
    top: 1px;
    position: relative;
  }
}
</style>