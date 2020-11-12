<template>
  <el-select @change="change" multiple size="mini" :value="value" placeholder="请选择">
    <el-option-group
      v-for="group in options"
      :key="group.value||group.id"
      :label="group.label||group.name"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value||item.id"
        :label="item.label||item.name"
        :value="item.value||item.id"
      ></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    subOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: Array || String
  },
  data() {
    return {};
  },
  methods: {
    change(val) {
      console.log("val", val);
      this.$emit("change", val);
    }
  }
};
</script>