<template>
  <el-dialog
    :visible.sync="dialogVisible"
    top="8vh"
    width="70%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    append-to-body
    class="el-dialogs account_batchadd"
  >
    <div slot="title" class="header-title">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">组织</el-menu-item>
        <el-menu-item index="2">人员</el-menu-item>
      </el-menu>
    </div>
    <batchAddzz v-if="activeIndex=='1'"></batchAddzz>
    <batchAddry v-else></batchAddry>
    <div slot="footer" class="dialog-button">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="dialogSubmitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import batchAddry from "./batchAddry";
import batchAddzz from "./batchAddzz";
export default {
  props: {
    dialogVisible: Boolean
  },
  components: { batchAddry, batchAddzz },
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    dialogSubmitForm() {},
    handleSelect(val) {
        this.activeIndex=val;
    }
  }
};
</script>

<style lang="scss">
.account_batchadd {
  .el-dialog__header {
    padding: 0 20px;
  }
  .batchAdd_ry_box {
    height: 60vh;
    .left {
      display: flex;
      flex-direction: column;
      .left-search {
        height: 32px;
      }
      .paging-tables {
        flex: 1;
      }
    }
    .center,
    .right {
      border-left: 5px solid #ccc;
      .conter_box,
      .right_box {
        height: 100%;
        border: 1px solid #ccc;
        margin: 0 10px;
      }
    }
  }
}
</style>

