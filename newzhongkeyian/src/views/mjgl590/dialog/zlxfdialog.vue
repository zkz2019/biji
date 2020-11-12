<!--  输入密码弹出框 -->
<template>
  <el-dialog
    :title="type=='0'?'编辑密码':'修改密码'"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose"
    append-to-body
  >
    <!-- <el-input v-model="input" placeholder="输入密码"></el-input>-->
    <fel-form
      :selects="selects"
      v-loading="loading"
      ref="felForm"
      @submitForm="onClick"
      @closeForm="handleClose"
      width="140px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
    <!-- <span slot="footer" class="dialog-footer"
      :selects="selects"
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onClick">确 定</el-button>
    </span>-->
  </el-dialog>
</template>

<script>
export default {
  props: {
    type: String,
    dialogVisible: Boolean,
    paramObj: Array
  },
  data() {
    var $this = this;
    return {
      loading: false,
      defaultData: {},
      selects: {ordertypeSel:[]},
      formData: [
        {
          value: "ordertype",
          name: "请选择下发指令",
          type: "select",
          select: "ordertypeSel",

        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {},
    paramObj(val){
        if(val){
            this.selects.ordertypeSel = val.map((item)=>{return item.entity});
        }
    }
  },
  methods: {
    onClick(data) {
      this.$emit("beforeClose");
    },
    handleClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>

