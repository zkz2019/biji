<template>
  <div class="fel-select">
    <slot></slot>
    <div class="fel-select_sel_T" v-show="options.length==0&&show">{{loadText}}</div>
    <div class="fel-select_sel" v-show="options.length>0&&show">
      <div
        class="fel-select_sel_item"
        v-for="(item,ind) of options"
        :key="ind"
        @click.stop="onClick(item)"
      >
      <div class="text">{{item.personname}}</div>
      <div class="text">{{item.personcode}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { homeListenClick } from "@/utils/utils"; //这个方法用于监听整个页面的点击事件;
export default {
  props: {
    options: Array,  //下拉框数据
    next: Boolean,   //点击input框时,为true则点击此组件时会重复显示隐藏下拉框,为false则单词点击不控制(然后将next转换为true);
    show: { type: Boolean, default: false },//下拉框是否隐藏显示;
    loadText: { type: String, default: "加载中..." },//下拉框提示文字;
  },
  data() {
    return {
      ShowBool:false,  //点击此组件时往上传的参数,下拉框是否显示隐藏(修改show的值);
      dom:null,
    };
  },
  watch: {
    options(val) {
      console.log(val);
    }
  },
/*
向上暴露的事件;
noNext:用来改变next的值;一般设置为true
onShow:用来改变show的值;
onChange:下拉框选中事件,向上传递选中的值;
*/ 

  mounted() {
    let showDom = this.$el;//document.querySelector(".fel-select");
    showDom.onclick = function(event) {  //点击此组件的时候阻止事件冒泡,避免下拉框显示隐藏触发;
      this.ShowBool=!this.ShowBool;   //点击input框时切换下拉框显示隐藏;
      if(this.next){    //点击input框时,为true则点击此组件时会重复显示隐藏下拉框,为false则此次点击不控制(然后将next转换为true);
        this.$emit('onShow',this.ShowBool);
      }else{            //保证input框聚焦的时候为固定显示下拉框;(input框聚焦的时候在父级的onFocus事件里面直接修改下拉框显示隐藏);
        this.$emit("noNext");
      };
      /* 
        因为点击input框时是将ShowBool取反控制下拉框显示隐藏
        所以有时候input框聚焦时还是会将将input框隐藏
        将next设置为true则可以在上级的focus事件直接修改show的值将下拉框显示;
      */
        window.event? window.event.cancelBubble = true : e.stopPropagation();//阻止冒泡
    }.bind(this);
    this.dom = document.querySelector(".home");
    homeListenClick(this.dom, this.eListen);//监听页面点击事件;将show设置为false;
  },
  activated() {
    homeListenClick(this.dom, this.eListen);
  },
  deactivated() {
    homeListenClick(this.dom, this.eListen, true);
  },
  beforeDestroy() {
    homeListenClick(this.dom, this.eListen, true);
  },
  methods: {
    eListen() {
      //监听事件
        this.$emit("onShow",false);
    },
    onClick(data) {
      this.$emit("onChange", data);
    }
  }
};
</script>

<style lang="scss">
.fel-select {
  position: relative;
  .fel-select_sel_T {
    border: 1px solid #ddd;
    background: #fff;
    width: 100%;
    z-index: 100;
    position: absolute;
    top: 40px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 5px 15px;
    width: 100%;
    height: 40px;
    line-height: 28px;
    color: #666;
  }
  .fel-select_sel {
    border: 1px solid #ddd;
    background: #fff;
    width: 100%;
    z-index: 100;
    position: absolute;
    top: 40px;
    overflow: auto;
    max-height: 300px;
    min-width:200px;
    .fel-select_sel_item {
      float: left;
      padding: 5px 15px;
      width: 100%;
      height: 35px;
      line-height: 25px;
      display:flex;
      text{
        height: 25px;
        padding-right:4%;
        overflow:hidden;
      }
      .text:first-child{
        width:55%;
      }
      .text:last-child{
        width:45%;
      }
    }
    .fel-select_sel_item:hover {
      background: #eee;
      cursor: pointer;
    }
  }
}
</style>
