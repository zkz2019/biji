<template>
  <div class="about">
    <h1 @click="onclick">This is an about page</h1>
  </div>
</template>

<script>
export default {
  methods: {
    onclick() {
      this.$notice({
        title: "社会你杨哥喊你来搬砖",
        message: "请求登录!",
        duration: 2000,
      });
    },
  },
};
</script>