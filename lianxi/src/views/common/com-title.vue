<template>
  <div class="com-title">
    <span class="ti_text">
      <slot></slot>
    </span>
    <span class="ti_text ti_textL">
      <slot name="right"></slot>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
