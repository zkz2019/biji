<template>
  <div class="help">
    <fel-button class="qh_btn" type="primary" @click="onShow">引导与帮助</fel-button>
    <div v-if="helpShow" class="imgbox">{{imgmsg}}</div>
    <inpbox v-if="helpShow" class="btnbox">
      <fel-button class="qh_btn" type="primary" @click="search(1)">退出</fel-button>
      <fel-button class="qh_btn" type="primary" @click="search(2)">上一页</fel-button>
      <fel-button class="qh_btn" type="primary" @click="search(3)">下一页</fel-button>
    </inpbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpShow: false,
      imgmsg: 111,
      imgmax: 1110,
      imgmin: 111
    };
  },
  methods: {
    onShow() {
      this.helpShow = true;
    },
    search(num) {
      if (num === 1) {
        this.helpShow = false;
        this.imgmsg = 111;
      } else if (num === 2) {
        this.imgmsg -= 111;
        if (this.imgmsg < this.imgmin) {
          this.imgmsg = this.imgmin;
        }
      } else if (num === 3) {
        this.imgmsg += 111;
        if (this.imgmsg > this.imgmax) {
          this.imgmsg = this.imgmax;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.help {
    float:right;
  display: inline-block;
  margin-right: 25px;
  .qh_btn {
    width: auto;
    height: 28px;
    line-height: 0;
    // padding: 0 5px 0 0;
    text-align:center;
    span{
        margin:0 !important;
    }
  }
  .imgbox {
    z-index: 1111;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 700px;
    color: #fff;
    font-size: 56px;
  }
  .btnbox {
    z-index: 2222;
    position: fixed;
    bottom: 5px;
    right: 100px;
  }
}
</style>

