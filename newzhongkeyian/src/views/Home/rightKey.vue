<template>
  <div class="right-key" v-show="flag" :style="style">
    <ul class="right-ul">
      <li v-for="(v,k) of list" :key="k" @click.stop="onClick(v)" class="right-li">
        <i :class="v.icon"></i>
        <span>{{v.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "right-key",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [
        {
          id: 5,
          icon: "el-icon-back",
          name: "关闭左侧"
        },
        {
          id: 6,
          icon: "el-icon-right",
          name: "关闭右侧"
        },
        {
          id: 7,
          icon: "el-icon-close",
          name: "关闭其它"
        },
        {
          id: 0,
          icon: "el-icon-error",
          name: "关闭全部"
        }
      ]
    };
  },
  computed: {
    flag: {
      get() {
        if (this.visible) {
          // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
          window.addEventListener("mousedown", this.watchContextmenu);
        }
        return this.visible;
      },
      set(newVal) {
        this.$emit("update:visible", newVal);
      }
    },
    style() {
      let ww = window ? window.innerWidth : 0;
      let kw = 0;
      if (ww != 0 && this.x + 120 > ww) {
        kw = 0 - (this.x + 120 - ww);
      }
      return {
        left: this.x + kw + "px",
        top: this.y + "px",
        display: this.visible ? "block" : "none "
      };
    }
  },
  methods: {
    onClick(v) {
      this.flag = false;
      this.$emit("onClick", v);
    },
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0)
        this.flag = false;
      window.removeEventListener("mousedown", this.watchContextmenu);
    }
  },
  mounted() {
    // 将菜单放置到body下
    document.querySelector("body").appendChild(this.$el);
  }
};
</script>

<style>
</style>
