<template>
  <el-container>
    <fel-left-tree class="building-copy">
      <div slot="left" class="left-tree">
        <fel-tree1
          slot="top"
          :showCheckbox="false"
          class="tree1 co_tree"
          :idArr="[0]"
          :refresh="zzTreerefresh"
          interface="/system/build/1/getbuild"
          @handleNodeClick="handleNodeClick"
        ></fel-tree1>
      </div>
      <fel-form
        class="single-row"
        ref="felForm"
        @submitForm="submitForm"
        @closeForm="beforeCloseForm"
        width="140px"
        dynamic
        :button="[]"
        :defaultData="defaultData"
        :formData="formData"
      ></fel-form>
    </fel-left-tree>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      zzTreerefresh: 0,
      defaultData: {},
      formData: []
    };
  },
  methods: {
    beforeCloseForm() {},
    beforeClose() {},
    submitForm() {},
    handleNodeClick() {}
  }
};
</script>
