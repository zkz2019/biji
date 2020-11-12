<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    console.log('this', this);
    console.log('thisoptions', this.$options);
    console.log('thisrouter', this.$router);
    console.log('this_parentVnode', this.$options._parentVnode);
    console.log('this_router', this.$options._router, this.$options._route);
  },
};
</script>

<style>
.el-table th.gutter {
  display: table-cell !important;
}
</style>
