<template>
  <el-form class="fel-form1" :model="defaultData" :rules="rules" ref="refForm" :label-width="width">
    <template v-for="(value, key) of formData">
      <el-form-item
        :key="key"
        :style="value.width?'width: '+value.width+';display: '+(value.display ? value.display :'inline-block') +';':''"
        :label="value.name"
        :prop="value.value"
        :label-width="value.labelWidth"
      >
        <template v-if="value.type == 'select'">
          <el-select
            :disabled="value.disabled"
            class="wid100"
            v-model="defaultData[value.value]"
            :placeholder="value.placeholder"
            :value-key="value.vkey"
          >
            <template v-if="typeof(value.select) == 'string'">
              <el-option
                v-for="(v, k) of selects[value.select]"
                :key="k"
                :label="value.slabel ? v[value.slabel] : v.label"
                :value="typeof(value.svalue) == 'undefined' ? v.value : (value.svalue == '' ? v : v[value.svalue])"
              ></el-option>
            </template>
            <template v-else>
              <el-option
                v-for="(v, k) of value.select"
                :key="k"
                :label="value.slabel ? v[value.slabel] : v.label"
                :value="typeof(value.svalue) == 'undefined' ? v.value : (value.svalue == '' ? v : v[value.svalue])"
              ></el-option>
            </template>
          </el-select>
        </template>
        <template v-else-if="value.type == 'cascader'">
          <template v-if="typeof(value.options) == 'string'">
            <el-cascader
              clearable
              :show-all-levels="value.all"
              :change-on-select="value.change"
              :options="selects[value.options]"
              :disabled="value.disabled"
              class="wid100"
              v-model="defaultData[value.value]"
              :placeholder="value.placeholder"
              :props="value.props"
            ></el-cascader>
          </template>
          <template v-else>
            <el-cascader
              clearable
              :show-all-levels="value.all"
              :change-on-select="value.change"
              :options="value.options"
              :disabled="value.disabled"
              class="wid100"
              v-model="defaultData[value.value]"
              :placeholder="value.placeholder"
              :props="value.props"
            ></el-cascader>
          </template>
        </template>
        <template v-else-if="value.type == 'time'">
          <template v-if="value.date == 'select'">
            <el-time-select
              :disabled="value.disabled"
              style="width: 100% !important;"
              v-model="defaultData[value.value]"
              :picker-options="value.options"
              :placeholder="value.placeholder"
            ></el-time-select>
          </template>
          <template v-else>
            <el-time-picker
              :disabled="value.disabled"
              style="width: 100% !important;"
              v-model="defaultData[value.value]"
              :picker-options="value.options"
              :placeholder="value.placeholder"
              :format="value.format"
              :value-format="value.vformat || value.format"
            ></el-time-picker>
          </template>
        </template>
        <template v-else-if="value.type == 'date'">
          <el-date-picker
            :disabled="value.disabled"
            style="width: 100% !important;"
            v-model="defaultData[value.value]"
            :type="value.date"
            :placeholder="value.placeholder"
            :format="value.format"
            :value-format="value.vformat || value.format"
          ></el-date-picker>
        </template>
        <template v-else>
          <template v-if="value.click">
            <span @click="inputClick(value.click)">
              <el-input
                :placeholder="value.placeholder"
                :type="value.type"
                :disabled="value.disabled"
                v-model="defaultData[value.value]"
              ></el-input>
            </span>
          </template>
          <template v-else>
            <el-input
              :placeholder="value.placeholder"
              :type="value.type"
              :disabled="value.disabled"
              v-model="defaultData[value.value]"
            ></el-input>
          </template>
        </template>
      </el-form-item>
    </template>
    <div class="footerButton">
      <template v-for="(o,i) of button">
        <template v-if="o.type == '1'">
          <el-button :key="i" @click="closeForm">{{o.name || "关闭"}}</el-button>
        </template>
        <template v-else-if="o.type == '0'">
          <el-button :key="i" @click="resetForm">{{o.name || "重置"}}</el-button>
        </template>
        <template v-else>
          <el-button :key="i" type="primary" @click="submitForm">{{o.name || "确认"}}</el-button>
        </template>
      </template>
    </div>
  </el-form>
</template>
<script>
/**
 * element-ui中form 表单的组件
  :formData  // 表格列表 Array 
    {
        value: 值,
        width: 列的宽度
        display: 列的展示的样式
        labelWidth: 名称的宽度
        name: 名称,
        disabled: 禁止输入
        placeholder: 输入框提示
        type:  input输入框的类型 或者 select,
        format: date 数据格式
        vformat: date 的 value数据格式 默认和format一样的格式
        select: select列表数据 Array,
            { 
              label: "展示名称",
              value: 值 
            }
        rules: 表格校验 Array 
        class: "样式名"
    }
  :defaultData // 默认表单数据
  :button // 表单按钮 Array 默认确认按钮
    {
        type: "类型", 0 重置 1 关闭 2 确认
        name: "按钮名称",
        class: "样式名"
    },
  @submitForm  // 确认点击按钮回调 (obj)  默认表单数据 + 表单输入数据
  @closeForm // 关闭点击按钮回调
  width // 表单的名称的宽度
  dynamic // 默认表单数据是否默认动态改变
 */
export default {
  name: "fel-form",
  props: {
    selects: Object,
    width: String,
    formData: Array,
    dynamic: Boolean,
    defaultData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    button: {
      type: Array,
      default: function() {
        return [
          {
            type: "2"
          }
        ];
      }
    }
  },
  created: function() {
    let rules = {};
    this.formData.forEach(v => {
      if (v.rules) {
        rules[v.value] = v.rules;
      }
    });
    this.rules = rules;
  },
  data() {
    return {
      rules: {}
    };
  },
  methods: {
    setData(key, value) {
      this.defaultData[key] = value;
    },
    inputClick(callback) {
      if (callback) {
        callback(this.defaultData);
      }
    },
    submitForm() {
      this.$refs["refForm"].validate(valid => {
        if (valid) {
          this.$emit("submitForm", this.defaultData);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      if (this.$refs["refForm"]) {
        this.$refs["refForm"].resetFields();
      }
    },
    closeForm() {
      this.$refs["refForm"].resetFields();
      this.$emit("closeForm");
    }
  },
  components: {}
};
</script>
