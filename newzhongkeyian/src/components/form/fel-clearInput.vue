<template>
  <div class="clearInput">
    <slot></slot>
    <el-input v-bind="$attrs" v-on="$listeners" :value="value"></el-input>
  </div>
</template>

<script>
export default {
  name: "fel-clearInput",
  props:{
    value:String|Number,
  },
  model:{
    prop:"value",
    event:"input"
  },
  methods:{
  }
};
</script>
<style lang="scss">
.clearInput{
  position: relative;
  .clearInput_icon{
    position:absolute;
    z-index: 10;
    top: 9px;
    right: 9px;
  }
}
</style>

