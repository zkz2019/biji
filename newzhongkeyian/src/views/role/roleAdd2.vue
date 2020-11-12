<template>
  <el-dialog
    title="添加角色"
    width="60%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.roledesc"></el-input>
        </el-form-item>
        <el-form-item label="权限信息">
          <el-tree
            :data="jurisdiction"
            show-checkbox
            default-expand-all
            node-key="functionid"
            :props="treeProps"
          ></el-tree>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-button">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="beforeClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      treeProps: {
        label: "functionname",
        children: "childs",
        isLeaf: "isselect"
      },
      jurisdiction: [],
      functions: [],
      form: {
        rolename: "",
        roledesc: ""
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.inGetfunction();
  },
  methods: {
    inGetfunction() {
      this.$ajax("/system/role/save/1/getfunction", {}, "1")
        .then(res => {
          this.jurisdiction = res.result;
        })
        .catch(err => {});
    },
    submitForm() {},
    beforeClose() {
      this.$emit("beforeClose");
    }
  }
};
</script>
