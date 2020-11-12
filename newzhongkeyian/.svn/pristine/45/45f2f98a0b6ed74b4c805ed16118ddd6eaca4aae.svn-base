<!--房间管理获取位置信息下拉框  -->
<template>
  <el-popover
    class="disIB"
    @show="onShowPopover"
    @hide="onHidePopover"
    placement="bottom-start"
    trigger="click"
    v-model="visible"
  >
    <fel-tree3
      :showCheckbox="showCheckbox"
      ref="tree3"
      class="query tree1"
      :interface="interfaceUrl"
      @handleNodeClick="handleNodeClick"
      @checkchange="checkchange"
      :defaultProps="defaultProps"
      nodeKey="id"
    ></fel-tree3>
    <div slot="reference" class="tree-select" @mouseout="onmouseout" @mouseover="onmouseover">
      <el-input :suffix-icon="suffixIcon" readonly v-model="value" placeholder="请选择">
        <i
          @click.stop="onClear"
          v-show="isClear"
          slot="suffix"
          class="el-input__icon el-icon-circle-close el-input__clear"
        ></i>
      </el-input>
    </div>
  </el-popover>
</template> 

<script>
export default {
  props: {
    showCheckbox: {
      type: Boolean,
      default: true
    },
    interface: String
  },
  data() {
    return {
      visible:false,
      value: "",
      value1:"",
      arr:[],
      suffixIcon: "el-icon-arrow-down",
      isClear: false,
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "isLeaf"
      }
    };
  },
  computed: {
    interfaceUrl() {
      return this.interface;
    }
  },
  watch:{
    value(val){
      if(val!=""){
        this.arr.push(val);
        this.value1=this.arr.join("-");
      }else{
        this.value1=val;
      }
    }
  },
  methods: {
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
      this.$emit("onSelection", {});
      this.$emit("onChoice", []);
    },
    handleNodeClick(data) {
      if (!this.showCheckbox) {
        this.value = data.name;
        this.$emit("onSelection", data);
      }
      if(data.isnext==0){  
        this.visible=false;
        
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
      this.value = arr.map(o => o.buildname).join(",");
      this.$emit("onChoice", arr);
    }
  }
};
</script>
