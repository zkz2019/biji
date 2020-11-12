<template>
  <div class="fel-num-but">
    <template v-if="custom">
      <span v-if="isJump">
        <a class="a-click" @click.stop="onClick">{{value}}</a>
      </span>
      <span v-else>{{value}}</span>
    </template>
    <template v-else>
      <span v-if="formatter(value)">
        <a class="a-click" @click.stop="onClick">{{value}}</a>
      </span>
      <span v-else>{{value}}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String | Number
    },
    formatter: {
      type: Function,
      default(num) {
        if (num) {
          return /^[0-9]*$/.test(num);
        }
        return false;
      }
    },
    isJump: Boolean,
    custom: Boolean
  },
  methods: {
    onClick() {
      this.$emit("click", this.value);
    }
  }
};
</script>

<style>
</style>