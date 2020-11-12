<template>
  <div class="operat-buts">
    <template v-if="formatter">
      <template v-for="(v,i) of buts">
        <el-button
          v-if="formatter(v,i)"
          :key="i"
          type="text"
          size="small"
          @click.stop="onClick(v.id, v)"
        >{{v.alias}}</el-button>
      </template>
    </template>
    <template v-else>
      <el-button
        v-for="(v,i) of buts"
        :key="i"
        type="text"
        size="small"
        @click.stop="onClick(v.id, v)"
      >{{v.alias}}</el-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    buts: {
      type: Array
    },
    formatter: {
      type: Function
    }
  },
  methods: {
    onClick(id, obj) {
      this.$emit("click", id, obj);
    }
  }
};
</script>

<style>
</style>