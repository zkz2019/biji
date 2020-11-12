<template>
  <el-tooltip effect="dark" :content="active ? '退出全屏' : '全屏'" placement="bottom">
    <!-- <el-button type="text" @click="toggle"> -->
      <!-- <div v-if="active" class="ficon-quxiaoquanping" style="font-size: 20px;"></div>
      <div v-else class="ficon-quanping" style="font-size: 16px;"></div> -->
    <!-- </el-button> -->
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("fullscreen", ["active"])
  },
  methods: {
    ...mapActions("fullscreen", ["toggle"])
  }
};
</script>
