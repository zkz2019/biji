<!-- 楼层效果弹出框 -->
<template>
  <div class="effect-layer">
    <div v-if="buildinfo.ismanager == 1" class="roomBox_buts">
      <el-button @click="onReverse(1)" icon="ficon-diandou" type="text" size="small">颠倒顺序</el-button>
      <el-button @click="onReverse(4)" type="text" icon="ficon-diandou" size="small">名称排序</el-button>
    </div>
    <div class="room—const">
      <div class="tec">楼顶</div>
      <div class="header">
        <h3
          class="name"
        >{{buildinfo.buildlocation||'建筑'}}-{{buildinfo.buildname}}(区域编号{{buildinfo.buildcode||'0'}})</h3>
      </div>
      <div class="roomBox">
        <div class="roomBox_list" :key="key">
          <!-- <el-input v-model="value3"></el-input> -->
          <div v-for="(obj, key) of list" :key="key">
            <div class="roomBox_title">
              <div></div>
              <div>
                <h3>{{obj.buildname}}</h3>
              </div>
              <div>
                <img src="../../assets/image/list-fjgl.png" alt />
              </div>
            </div>
          </div>
          <div v-if="list.length == 0 && isLoad" class="listNull">暂无楼层</div>
        </div>
      </div>
    </div>
    <div class="room_buts">
      <span class="room_buts_left">可用鼠标拖拽项目进行位置调整</span>
      <el-button class="com-but-small" @click="onAdjustment(0)">取消</el-button>
      <el-button class="com-but-small" type="primary" @click="onAdjustment(2)">确定</el-button>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { arrSort } from "@/utils/utils.js";
export default {
  name: "effect-layer",
  props: {
    buildinfo: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      isLoad: false,
      key: 0,
      list: [],
      array: [],
      sorta: null
    };
  },
  created() {},
  mounted: function() {
    this.getroomlayout();
    // this.setSortable();
  },
  methods: {
    onAdjustment(key) {
      if (key == 0) {
        // this.setLiData();
        this.$emit("beforeClose");
      } else if (key == 2) {
        this.$confirm("是否确定把楼层当前的位置?", "提示", {
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
        "/system/build/update/c/updatebuildslayout",
        {
          farheragid: this.buildinfo.buildid
        },
        "1",
        this.array, // 排序对象
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
    getroomlayout() {
      this.isLoad = false;
      if (this.buildinfo && this.buildinfo.buildtype == 2) {
        this.$ajax("/system/build/1/getbuild", {}, "1", this.buildinfo)
          .then(res => {
            this.list = res.result || [];
            this.array = [...this.list];
            this.isLoad = true;
            this.key = new Date().getTime();
            setTimeout(() => {
              this.setSortable();
            }, 0);
          })
          .catch(err => {});
      }
    },
    onReverse(key) {
      if (key == 1 && this.array.length > 1) {
        if (this.sorta) {
          this.sorta.destroy();
          this.sorta = null;
        }
        this.array.reverse();
        this.list = this.array;
        this.array = [...this.list];
        this.key = new Date().getTime();
        setTimeout(() => {
          this.setSortable();
        }, 0);
      } else if (key == 4 && this.array.length > 1) {
        if (this.sorta) {
          this.sorta.destroy();
          this.sorta = null;
        }
        this.list = arrSort(this.array, "buildname", true);
        this.array = [...this.list];
        this.key = new Date().getTime();
        setTimeout(() => {
          this.setSortable();
        }, 0);
      }
    },
    setSortable() {
      if (this.sorta) {
        this.sorta.destroy();
        this.sorta = null;
      }
      var _this = this;
      var $ul = this.$el.querySelector(".roomBox .roomBox_list");
      this.sorta = new Sortable($ul, {
        ghostClass: "blue-background-class",
        onUpdate: function(event) {
          var newIndex = event.newIndex,
            oldIndex = event.oldIndex;
          var item = _this.array.splice(oldIndex, 1);
          _this.array.splice(newIndex, 0, item[0]);
          // 下一个tick就会走patch更新
        },
        animation: 150
      });
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getroomlayout();
      }
    }
  }
};
</script>
<style lang='scss'>
.effect-layer {
  position: relative;
  .roomBox_buts {
    position: absolute;
    top: 0;
    right: 0;
    .el-button {
      margin-left: 20px;
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
  .room—const {
    margin: 10px 20% 30px;
    .tec {
      margin-bottom: -34px;
      text-align: center;
    }
  }
  .header {
    width: 100%;
    height: 80px;
    background: url("../../assets/image/wuding.png") no-repeat;
    background-size: 100% 102%;
    display: flex;
    flex-direction: column;
    padding: 0;
    .name {
      flex: 1;
      font-size: 16px;
      line-height: 90px;
      padding-top: 14px;
      margin: 0 auto;
      text-align: center;
    }
  }
  .roomBox {
    padding: 1px;
    overflow-y: auto;
    .roomBox_list {
      margin: -1px 0;
      .roomBox_title {
        position: relative;
        text-align: center;
        h3 {
          text-align: center;
          position: absolute;
          white-space: nowrap;
          top: 0;
          width: 100%;
          left: 7px;
        }
      }
    }
  }
}
</style>