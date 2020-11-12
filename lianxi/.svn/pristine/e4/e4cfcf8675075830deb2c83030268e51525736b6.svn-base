<!-- 强锁解除强锁 -->
<template>
  <div>
    <el-dialog
      :title="type==1?'强锁/解除强锁':'工作状态变更'"
      :visible.sync="dialogupdateLock"
      :before-close="lockDialogClose"
      width="500px"
      top="20vh"
    >
      <el-form :model="form" class="formboxLock">
        <el-form-item label="选择指令:" :label-width="formLabelWidth">
          <el-select v-if="type==1" v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-else v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="com-but-small" @click="updateLock">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogupdateLock", "type", "thisroomobj"],
  data() {
    return {
      formLabelWidth: "100",
      form: { value: "" },
      options: [
        {
          label: "强锁",
          value: "1"
        },
        {
          label: "解除",
          value: "0"
        }
      ],
      options1: [
        {
          label: "常开",
          value: "1"
        },
        {
          label: "常闭",
          value: "0"
        }
      ]
    };
  },
  watch: {
    dialogupdateLock(val) {}
  },
  methods: {
    updateLock() {
      if (this.form.value == "") {
        this.$message.error("请选择指令");
        return;
      }
      this.$emit("updateLock", this.form);
      this.lockDialogClose();
    },

    //关闭事件
    lockDialogClose() {
      this.form.value = "";
      this.$emit("lockDialogClose", false);
    }
  }
};
</script>
<style lang="scss">
.formboxLock {
  margin: 50px 50px 50px 100px;
}
</style>