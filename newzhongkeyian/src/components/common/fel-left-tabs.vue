<!--  -->
<template>
  <el-container class="fel-left-tabs">
    <el-aside class="navLeft" :width="asideWidth+'%'">
      <div class="uls" :style="{backgroundColor:backgColor,color:textColor}">
        <el-menu
          class="lis"
          :text-color="textColor"
          active-text-color="#157edf"
          :background-color="backgColor"
          :default-active="value"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
        >
          <el-menu-item v-for="(item,key) in options" :key="key" :index="key+''">
            <i v-if="item.obj.icon" :class="'ficon-'+item.obj.icon" :style="{color:textColor}"></i>
            <span class="lip" slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <ul class="but" :style="{backgroundColor:backgColor,color:textColor}">
        <li @click="collapse = !collapse">
          <i v-if="collapse" class="ficon-right"></i>
          <template v-else>
            <i class="ficon-left"></i>
            <span>收起</span>
          </template>
        </li>
      </ul>
    </el-aside>
    <el-container :width="(100-asideWidth)+'%'">
      <!-- <keep-alive> -->
      <component :toRoute="toRoute" :toParam="param" v-bind:is="current"></component>
      <!-- </keep-alive> -->
    </el-container>
  </el-container>
</template>

<script>
/**
 * options 展示列表数据
 *     {
          name: "111", 列表名称
          current: zlfwqgl306, 列表右侧展示的组件
          obj: {} 点击事件传的参数
        },
 */
export default {
  props: {
    options: Array,
    paramId: String | Number,
    params: Object
  },
  data() {
    return {
      backgColor: "#1B2437",
      textColor: "#ffffff",
      collapse: false,
      isFirst: true,
      current: "",
      value: "0",
      param: {},
      toRoute: {}
    };
  },
  created() {
    if (window._ZK_COMFIG_.left_header_backg) {
      this.backgColor = window._ZK_COMFIG_.left_header_backg;
    }
    if (window._ZK_COMFIG_.left_header_color) {
      this.textColor = window._ZK_COMFIG_.left_header_color;
    }
    if (this.paramId) {
      if (this.options.length > 0) {
        this.isFirst = false;
        this.setValue(this.paramId);
        let tle = this.options[this.value];
        if (tle) {
          this.current = tle.current;
          this.param = tle.obj;
          this.toRoute = this.params;
        }
      }
    } else {
      let tle = this.options[this.value];
      if (tle) {
        this.current = tle.current;
        this.param = tle.obj;
        this.toRoute = {};
      }
    }
  },
  computed: {
    asideWidth: function() {
      return this.collapse ? 3.6 : 13;
    }
  },
  watch: {
    paramId(val) {
      if (val) {
        this.setValue(val);
        this.setCurrent(this.value, true);
      }
    },
    options() {
      if (this.paramId && this.isFirst) {
        this.isFirst = false;
        this.setValue(this.paramId);
        let tle = this.options[this.value];
        if (tle) {
          this.current = tle.current;
          this.param = tle.obj;
          this.toRoute = this.params;
        }
      } else {
        let tle = this.options[this.value];
        if (tle) {
          this.current = tle.current;
          this.param = tle.obj;
          this.toRoute = {};
        }
      }
    },
    params() {
      if (this.paramId) {
        if (this.options.length > 0) {
          this.isFirst = false;
          this.setValue(this.paramId);
          console.log("进来了", this.paramId);
          let tle = this.options[this.value];
          if (tle) {
            this.current = tle.current;
            this.param = tle.obj;
            this.toRoute = this.params;
          }
        }
      } else {
        let tle = this.options[this.value];
        if (tle) {
          this.current = tle.current;
          this.param = tle.obj;
          this.toRoute = {};
        }
      }
      console.log("params修改");
    }
  },
  methods: {
    setValue(id) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name == id) {
          this.value = i + "";
          break;
        }
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key) {
      this.setCurrent(key);
    },
    setCurrent(key, is) {
      this.value = key;
      let tle = this.options[key];
      this.current = tle.current;
      this.param = tle.obj;
      if (is) {
        this.toRoute = this.params;
      } else {
        this.toRoute = {};
      }
      this.$emit("tabClick", tle.obj);
    }
  }
};
</script>
