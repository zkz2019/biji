<template>
  <div class="inpbox">
    <span class="qh_text" v-if="text">{{text}}:</span>
    <div class="sbox">
      <slot>
        <template v-if="type=='select'">
          <el-select
            :value="model"
            @change="onInput"
            :placeholder="placeholder"
            class="con-select qh_inp"
          >
            <el-option
              v-for="(item,key) of selects"
              :key="key"
              :label="props && props.label ? item[props.label] : item.id"
              :value="props && props.value ? item[props.value] : item.name"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="type=='cascader'">
          <el-cascader
            class="con-popover qh_inp"
            size="mini"
            :value="model"
            @change="onInput"
            :placeholder="placeholder"
            filterable
            :options="selects"
            :props="props"
            clearable
          ></el-cascader>
        </template>
        <template v-else>
          <el-input
            class="con-search qh_inp"
            clearable
            type="text"
            :placeholder="placeholder"
            :value="model"
            @input="onInput"
          ></el-input>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    valuetype: String,
    text: String,
    type: String,
    placeholder: String,
    value: null,
    selects: Array,
    props: {
      type: Object
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      model: this.value
    };
  },
  watch: {
    value(val) {
      this.model = val;
    }
  },
  methods: {
    onInput(val) {
      if (this.valuetype == "String" && this.type == "cascader") {
        let z = val[val.length - 1] || "";
        this.$emit("input", z);
      } else {
        this.$emit("input", val);
      }
    }
  }
};
</script>
