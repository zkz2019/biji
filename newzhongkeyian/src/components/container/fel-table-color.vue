<template>
  <div class="fel-num-but">
    <span :class="typeCss">
      <slot>{{value}}</slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String | Number
    },
    type: {
      type: String | Number
    }
  },
  computed: {
    typeCss() {
      switch (this.type + "") {
        case "1":
          return "puc-pg";
        case "2":
          return "puc-px";
        default:
          return "";
      }
    }
  }
};
</script>

<style>
</style>