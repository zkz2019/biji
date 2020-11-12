<template>
  <el-popover
    class="disIB"
    @show="onShowPopover"
    @hide="onHidePopover"
    placement="bottom-start"
    trigger="click"
  >
    <fel-tree1
      ref="fel-tree1"
      class="tree1"
      :idArr="[0]"
      interface="/access/v2.0/deleteauth/1/listAccessDoorTree"
      ajaxType="9"
      nodeKey="agid"
      iconName="agtype"
      :param="{agfatherid:'',agtype:0}"
      paramKey="agfatherid"
      :defaultProps="{children: 'children',label: 'agname',isLeaf: 'isLeaf'}"
      @checkchange="checkchange"
    ></fel-tree1>
    <div slot="reference" class="tree-select" @mouseout="onmouseout" @mouseover="onmouseover">
      <el-tooltip :disabled="disabled" class="item" effect="dark" :content="value" placement="top">
        <el-input
          ref="input"
          :suffix-icon="suffixIcon"
          readonly
          v-model="value"
          placeholder="请选择位置"
        >
          <i
            @click.stop="onClear"
            v-show="isClear"
            slot="suffix"
            class="el-input__icon el-icon-circle-close el-input__clear"
          ></i>
        </el-input>
      </el-tooltip>
    </div>
  </el-popover>
</template> 

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    ajaxType: {
      type: String,
      default: "1",
    },
    interface: String,
  },
  data() {
    return {
      type: "0",
      inputWin: 250,
      value: "",
      suffixIcon: "el-icon-arrow-down",
      isClear: false,
    };
  },
  computed: {
    disabled() {
      return this.byteLength(this.value) < this.inputWin / 9;
    },
    interfaceUrl() {
      return this.interface;
    },
  },
  mounted() {
    this.inputWin = this.$refs["input"].$el.offsetWidth;
  },
  methods: {
    ...mapGetters(["getIsClassify"]),
    byteLength(val) {
      return val.replace(/[^x00-xFF]/g, "**").length;
    },
    onTabClick() {
      this.onClear();
    },
    onmouseout() {
      if (this.isClear) {
        this.isClear = false;
      }
    },
    onmouseover() {
      if (this.value) {
        this.isClear = true;
      }
    },
    onShowPopover() {
      this.suffixIcon = "el-icon-arrow-up";
    },
    onHidePopover() {
      this.suffixIcon = "el-icon-arrow-down";
    },
    onClear() {
      this.value = "";
      if (this.$refs.tree1) {
        this.$refs.tree1.resetChecked();
      }
      this.$emit("onSelection", {}, this.type);
      this.$emit("onChoice", [], this.type);
    },
    handleNodeClick(data) {
      if (!this.showCheckbox) {
        this.value = data.buildname;
        this.$emit("onSelection", data, this.type);
      }
    },
    checkchange(data, obj) {
      obj.checkedNodes.forEach((item, key) => {
        if (item.top == "0") {
          for (let i = obj.checkedNodes.length - 1; i >= 0; i--) {
            let x = obj.checkedNodes[i];
            if (x.num == item.num && x.top == "1") {
              obj.checkedNodes.splice(i, 1);
            }
          }
        }
      });
      let arr = obj.checkedNodes;
      this.value = arr.map((o) => o.agname).join(",");
      console.log("arr,this.value", arr, this.value);
      this.$emit("onChoice", arr, this.type);
    },
  },
};
</script>
