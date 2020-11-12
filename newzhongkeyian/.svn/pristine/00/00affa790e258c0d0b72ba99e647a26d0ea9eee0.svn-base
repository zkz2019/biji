<!-- 楼层效果弹出框 -->
<template>
  <div class="effect-sort roomBox">
    <div class="roomBox_header">
      <div class="roomBox_title">
        <div>
          <h3 class="effect-title">{{buildinfo.buildlocation||'建筑'}}-{{buildinfo.buildname}}(区域编号{{buildinfo.buildcode||'0'}})</h3>
        </div>
      </div>
      <div
        v-if="buildinfo.ismanager == 1 && (topData.length > 0 || !isAdjust)"
        class="roomBox_buts"
      >
        <template v-if="!isAdjust">
          <template v-if="isBottom">
            <el-button @click="onInteractive" type="text" icon="ficon-sahngxia" size="small">上下互换位置</el-button>
            <el-button @click="onReverse(2)" type="text" icon="ficon-diandou" size="small">下排颠倒顺序</el-button>
            <el-button @click="onReverse(5)" type="text" icon="ficon-diandou" size="small">下排名称排序</el-button>
            <el-button @click="onReverse(1)" type="text" icon="ficon-diandou" size="small">上排颠倒顺序</el-button>
            <el-button @click="onReverse(4)" type="text" icon="ficon-diandou" size="small">上排名称排序</el-button>
          </template>
          <template v-else>
            <el-button @click="onReverse(1)" type="text" icon="ficon-diandou" size="small">颠倒顺序</el-button>
            <el-button @click="onReverse(4)" type="text" icon="ficon-diandou" size="small">名称排序</el-button>
          </template>
        </template>
      </div>
    </div>
    <div class="roomBox_scroll">
      <div class="cHeight">
        <div class="room_top">
          <div class="roomBox_box" :key="key" :class="!isAdjust ? 'showHeight':''">
            <div v-show="isLoad && topData.length == 0" class="listNull">暂无房间</div>
            <template v-for="(item,k) of topData">
              <div :key="k" class="roomBox_box_subbox">
                <span :class=" 'type-'+item.roomnetquality"></span>
                <div>
                  <img :class="getCl(item)" v-if="true" :src="getUrl(item)" :title="setTitle(item)" />
                  <div
                    :title="setTitle(item)"
                    class="roomtext"
                  >{{item.roomtype2!=2?/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(item.roomname)?item.roomname.substring(0,3):item.roomname:""}}</div>
                </div>
                <div
                  v-if="item.roomtype2==1"
                >{{item.roomtype==1?item.roomrzperson:item.roombdcard}}/{{item.roomtype==1?item.roommaxperson:item.roommaxcard}}</div>
                <!-- <span v-if="item.ischeck=='1'?true:false" class="roomchecked"></span> -->
              </div>
            </template>
          </div>
        </div>
        <div v-if="isBottom" class="roomBox_center">
          <div>走廊</div>
        </div>
        <div class="room_bottom">
          <div
            v-show="isBottom"
            :key="key2"
            class="roomBox_box"
            :class="!isAdjust ? 'showHeight':''"
          >
            <template v-for="(item,z) of bottomData">
              <div :key="z" class="roomBox_box_subbox">
                <span :class="'type-'+item.roomnetquality"></span>
                <div>
                  <img :class="getCl(item)" v-if="true" :src="getUrl(item)" :title="setTitle(item)" />
                  <div
                    :title="setTitle(item)"
                    class="roomtext"
                  >{{item.roomtype2!=2?/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(item.roomname)?item.roomname.substring(0,3):item.roomname:""}}</div>
                </div>
                <div
                  v-if="item.roomtype2==1"
                >{{item.roomtype==1?item.roomrzperson:item.roombdcard}}/{{item.roomtype==1?item.roommaxperson:item.roommaxcard}}</div>
                <!-- <span v-if="item.ischeck=='1'?true:false" class="roomchecked"></span> -->
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="room_buts" v-if="!isAdjust">
        <span class="room_buts_left">可用鼠标拖拽项目进行位置调整</span>
        <el-button class="com-but-small" @click="onAddBottom">双排排布</el-button>
        <el-button class="com-but-small" @click="onDelBottom">单排排布</el-button>
        <el-button class="com-but-small" @click="onAdjustment(0)">取消</el-button>
        <el-button class="com-but-small" type="primary" @click="onAdjustment(2)">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { arrSort } from "@/utils/utils.js";
export default {
  name: "effect-sort",
  props: {
    buildinfo: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      isLoad: false,
      effectdata: [],
      topData: [],
      isBottom: false,
      bottomData: [],
      isAdjust: false,
      sorta2: null,
      sorta: null,
      array: [],
      array2: [],
      key: 0,
      key2: 0
    };
  },
  created() {
    this.isAdjust = false;
    this.getroomlayout();
  },
  mounted: function() {
    this.$nextTick(() => {
      this.setLiData();
      // Code that will run only after the
      // entire view has been rendered
    });
  },
  methods: {
    getroomlayout() {
      this.isLoad = false;
      if (this.buildinfo && this.buildinfo.buildtype == 3) {
        this.$ajax(
          "/system/build/update/7/getroomlayout",
          {},
          "1",
          this.buildinfo
        )
          .then(res => {
            this.effectdata = res.result;
            this.isLoad = true;
            this.setLiData();
          })
          .catch(err => {});
      }
    },
    onReverse(key) {
      if (key == 2 && this.array2.length > 1) {
        if (this.sorta2) {
          this.sorta2.destroy();
          this.sorta2 = null;
        }
        this.array2.reverse();
        this.bottomData = this.array2;
        this.array2 = [...this.bottomData];
        this.key2 = new Date().getTime();
        setTimeout(() => {
          this.setSortable2();
        }, 0);
      } else if (key == 5 && this.array2.length > 1) {
        if (this.sorta2) {
          this.sorta2.destroy();
          this.sorta2 = null;
        }
        this.bottomData = arrSort(this.array2, "roomname");
        this.array2 = [...this.bottomData];
        this.key2 = new Date().getTime();
        setTimeout(() => {
          this.setSortable2();
        }, 0);
      } else if (key == 1 && this.array.length > 1) {
        if (this.sorta) {
          this.sorta.destroy();
          this.sorta = null;
        }
        this.array.reverse();
        this.topData = this.array;
        this.array = [...this.topData];
        this.key = new Date().getTime();
        setTimeout(() => {
          this.setSortable();
        }, 0);
      } else if (key == 4 && this.array.length > 1) {
        if (this.sorta) {
          this.sorta.destroy();
          this.sorta = null;
        }
        this.topData = arrSort(this.array, "roomname");
        this.array = [...this.topData];
        this.key = new Date().getTime();
        setTimeout(() => {
          this.setSortable();
        }, 0);
      }
    },
    onAddBottom() {
      this.isBottom = true;
      this.key2 = new Date().getTime();
      setTimeout(() => {
        this.setSortable2();
      }, 0);
    },
    onDelBottom() {
      this.isBottom = false;
      if (this.sorta) {
        this.sorta.destroy();
        this.sorta = null;
      }
      if (this.sorta2) {
        this.sorta2.destroy();
        this.sorta2 = null;
      }
      this.topData = this.array.concat(this.array2);
      this.bottomData = [];
      this.array = [...this.topData];
      this.array2 = [...this.bottomData];
      this.key = new Date().getTime();
      setTimeout(() => {
        this.setSortable();
      }, 0);
    },
    onInteractive() {
      if (this.sorta) {
        this.sorta.destroy();
        this.sorta = null;
      }
      if (this.sorta2) {
        this.sorta2.destroy();
        this.sorta2 = null;
      }
      this.topData = this.array2;
      this.bottomData = this.array;
      this.array = [...this.topData];
      this.array2 = [...this.bottomData];
      this.key = new Date().getTime();
      this.key2 = new Date().getTime();
      setTimeout(() => {
        this.setSortable();
        this.setSortable2();
      }, 0);
    },
    setLiData() {
      this.isAdjust = false;
      if (this.sorta) {
        this.sorta.destroy();
        this.sorta = null;
      }
      if (this.sorta2) {
        this.sorta2.destroy();
        this.sorta2 = null;
      }
      if (this.effectdata) {
        if (this.effectdata.leftlist) {
          this.topData = [...this.effectdata.leftlist];
        } else {
          this.topData = [];
        }
        if (this.effectdata.rightlist) {
          this.bottomData = [...this.effectdata.rightlist];
          if (this.bottomData.length > 0) {
            this.isBottom = true;
          } else {
            this.isBottom = false;
          }
        } else {
          this.bottomData = [];
          this.isBottom = false;
        }
      }
      this.array = [...this.topData];
      this.array2 = [...this.bottomData];
      this.key = new Date().getTime();
      if (this.isBottom) {
        this.key2 = new Date().getTime();
      }
      setTimeout(() => {
        this.setSortable();
        if (this.isBottom) {
          this.setSortable2();
        }
      }, 0);
    },
    onAdjustment(key) {
      if (key == 1) {
        // this.isAdjust = false;
        // this.setSortable();
      } else if (key == 0) {
        // this.setLiData();
        this.$emit("beforeClose");
      } else if (key == 2) {
        this.$confirm("是否确定把房间整成当前的位置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.onSuccess();
          })
          .catch(err => {});
      }
    },
    onSuccess() {
      this.$ajax(
        "/system/build/update/b/updateroomslayout",
        {
          farheragid: this.buildinfo.buildid
        },
        "1",
        {
          leftlist: this.array, //上排房间 排序对象
          rightlist: this.array2 //下排房间 排序对象
        },
        true
      )
        .then(res => {
          this.$emit("onRefresh");
          this.$message({
            message: "调整位置成功",
            type: "success"
          });
          this.$emit("beforeClose");
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    setSortable() {
      if (this.sorta) {
        this.sorta.destroy();
        this.sorta = null;
      }
      var _this = this;
      var $ul = this.$el.querySelector(".roomBox_scroll .cHeight");
      let top = $ul.querySelector(".room_top .roomBox_box");
      this.sorta = new Sortable(top, {
        group: "shared", // set both lists to same group
        onUpdate: function(event) {
          var newIndex = event.newIndex - 1,
            oldIndex = event.oldIndex - 1;
          var item = _this.array.splice(oldIndex, 1);
          _this.array.splice(newIndex, 0, item[0]);
          // 下一个tick就会走patch更新
        },
        // 元素从一个列表拖拽到另一个列表
        onAdd: function(event) {
          var newIndex = event.newIndex - 1,
            oldIndex = event.oldIndex;
          var item = _this.array2.splice(oldIndex, 1);
          _this.array.splice(newIndex, 0, item[0]);
        },
        animation: 150
      });
    },
    setSortable2() {
      if (this.sorta2) {
        this.sorta2.destroy();
        this.sorta2 = null;
      }
      var _this = this;
      var $ul = this.$el.querySelector(".roomBox_scroll .cHeight");
      let bot = $ul.querySelector(".room_bottom .roomBox_box");
      this.sorta2 = new Sortable(bot, {
        group: "shared",
        onUpdate: function(event) {
          var newIndex = event.newIndex - 1,
            oldIndex = event.oldIndex - 1;
          var item = _this.array2.splice(oldIndex, 1);
          _this.array2.splice(newIndex, 0, item[0]);
          // 下一个tick就会走patch更新
        },
        // 元素从一个列表拖拽到另一个列表
        onAdd: function(event) {
          var newIndex = event.newIndex,
            oldIndex = event.oldIndex - 1;
          var item = _this.array.splice(oldIndex, 1);
          _this.array2.splice(newIndex, 0, item[0]);
        },
        animation: 150
      });
    },
    setTitle(obj) {
      let map = {
        "1": "宿舍",
        "2": "公共",
        "4": "酒店"
      };
      let map2 = {
        "": "公共",
        "1": "教室",
        "2": "办公室",
        "3": "会议室",
        "4": "实验室"
      };
      let map3 = {
        "1": "房间",
        "2": "楼梯",
        "3": "装饰间"
      };
      let name = map[obj.roomtype] + "\n";
      if (obj.roomtype2 == 2) {
        name = "";
      } else if (obj.roomtype2 == 3) {
        name = "装饰间" + "\n";
      }
      if (obj.roomtype == 2) {
        name = map2[obj.roomnexttype] + "\n";
      }
      return name + obj.roomname;
    },
    getCl2(data) {
      if (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(data)) {
        if (data.length == 2) {
          return "chineseStyle";
        } else if (data.length == 1) {
          return "chineseStyle pt27";
        } else {
          return "chineseStyle pt12";
        }
      } else {
        return "";
      }
      // ?'chineseStyle':''
    },
    getUrl(data) {
      //动态添加src的url
      // if(data==undefined){
      //     return;
      // }
      // openorclose    开关门
      // roomnetquality 通讯状态
      // roomcharge     电量
      // roomtype       房间类型
      // roomtype2      建筑类型
      let img = "";
      if (data.roomtype2 == 1) {
        // 判断是否为房间
        if (data.openorclose == 1) {
          //判断开关门状态
          if (data.roomnetquality > 0) {
            //判断通讯状态
            if (data.roomcharge >= 90) {
              //判断电量
              img = require("../../assets/image/km11.png");
            } else if (data.roomcharge < 90 && data.roomcharge >= 60) {
              img = require("../../assets/image/km21.png");
            } else if (data.roomcharge < 60 && data.roomcharge >= 20) {
              img = require("../../assets/image/km31.png");
            } else {
              img = require("../../assets/image/km41.png");
            }
          } else if (data.roomnetquality == -1 || data.roomnetquality == -3) {
            //判断通讯状态
            if (data.roomcharge >= 90) {
              //判断电量
              img = require("../../assets/image/km10.png");
            } else if (data.roomcharge < 90 && data.roomcharge >= 60) {
              img = require("../../assets/image/km20.png");
            } else if (data.roomcharge < 60 && data.roomcharge >= 20) {
              img = require("../../assets/image/km30.png");
            } else {
              img = require("../../assets/image/km40.png");
            }
          } else {
            img = require("../../assets/image/weianzhuang.png");
          }
        } else {
          //判断开关门状态
          if (data.roomnetquality > 0) {
            //判断通讯状态
            if (data.roomcharge >= 90) {
              //判断电量
              img = require("../../assets/image/gm11.png");
            } else if (data.roomcharge < 90 && data.roomcharge >= 60) {
              img = require("../../assets/image/gm21.png");
            } else if (data.roomcharge < 60 && data.roomcharge >= 20) {
              img = require("../../assets/image/gm31.png");
            } else {
              img = require("../../assets/image/gm41.png");
            }
          } else if (data.roomnetquality == -1 || data.roomnetquality == -3) {
            //判断通讯状态
            if (data.roomcharge >= 90) {
              //判断电量
              img = require("../../assets/image/gm10.png");
            } else if (data.roomcharge < 90 && data.roomcharge >= 60) {
              img = require("../../assets/image/gm20.png");
            } else if (data.roomcharge < 60 && data.roomcharge >= 20) {
              img = require("../../assets/image/gm30.png");
            } else {
              img = require("../../assets/image/gm40.png");
            }
          } else {
            img = require("../../assets/image/weianzhuang.png");
          }
        }
      } else if (data.roomtype2 == 2) {
        // 判断是否为楼梯
        img = require("../../assets/image/stairs.png"); //楼梯
      } else {
        if (data.openorclose == 1) {
          img = require("../../assets/image/shebeijian.png");
        } else {
          img = require("../../assets/image/shebeijian.png");
        }
      }

      return img;
    },
    getCl(data) {
      //楼梯样式
      let cl = "";
      if (data.roomtype2 == 2) {
        // 判断是否为楼梯
        cl = "louti"; //楼梯
      } else {
        cl = "";
      }
      return cl;
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getroomlayout();
        this.isAdjust = false;
      }
    }
  }
};
</script>
<style lang='scss'>
.effect-sort {
  .roomBox_header {
    position: relative;
    .roomBox_buts {
      position: absolute;
      top: 50%;
      margin-top: -15px;
      right: 20px;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  .room_buts {
    .room_buts_left {
      float: left;
    }
    margin-top: 10px;
    border-top: 1px solid #ccc;
    padding-top: 16px;
    text-align: right;
    .el-button {
      margin-left: 20px;
    }
  }
  .room_top,
  .room_bottom {
    overflow-y: auto;
  }
  .showHeight {
    margin: -1px 0;
    min-height: 100px;
  }
}
</style>