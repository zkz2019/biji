<template>
  <span class="fel-time">
    <el-time-picker
      is-range
      :arrow-control="arrow"
      :value="value"
      @input="onInput"
      
      :disabled="disabled"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    ></el-time-picker>
  </span>
<!-- :picker-options="pickerOptions" -->
</template>
<script>
export default {
  props: {
    value: null,
    pickerOptions: Object,
    valueFormat: String,
    format: String,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: "选择时间范围"
    },
    arrow:{type:Boolean,default:true},
  },
  model: {
    prop: "value",
    event: "input"
  },
  name: "fel-time",
  methods: {
    onInput(data) {
      this.$emit("input", data);
    }
  }
};
</script>

<style>
</style>
