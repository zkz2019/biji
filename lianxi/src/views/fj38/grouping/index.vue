<template>
  <div class="grouping">
    <groupHeader :fileParam="fileParam" :roomInfo="roomInfo" class="groupHeader" :btnAll="btnAll"></groupHeader>
    <groupMain
      :roomInfo="roomInfo"
      class="groupMain"
      v-on="$listeners"
      :btnAll="btnAll"
      :refresh="refresh"
    ></groupMain>
  </div>
</template>

<script>
import groupHeader from "./groupHeader";
import groupMain from "./groupMain";
export default {
  props: {
    btnAll: Object,
    roomInfo: Object,
    refresh: Number || String,
    fileParam: Object,
  },
  components: {
    groupHeader,
    groupMain,
  },
  destroyed() {
    this.$store.commit("fj38DelAdminInfo");
  },
};
</script>

<style lang="scss">
.grouping {
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0 16px 16px;
  flex: 1;
  height: 0;
  .groupHeader {
    height: 58px;
    background: #e4f4ff;
    padding: 8px 10px;
    display: flex;
    // justify-content: space-between;
    .btns-right {
      padding: 5px;
      position: absolute;
      right: 20px;
    }
  }
  .groupMain {
    flex: 1;
    overflow: auto;
    padding: 10px;
    .groupMain_top {
      height: auto;
      display: flex;
      flex-direction: column;
      .groupMain_top_top {
        height: 30px;
        line-height: 40px;
      }
      .groupMain_top_bottom {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
      }
    }
    .groupMain_bottom {
      height: auto;
      .groupMain_bottom_top {
        height: 50px;
        display: flex;
        line-height: 50px;
        .groupMain_bottom_top_iconBox {
          margin-left: 10px;
          display: flex;
          .icon1,
          .icon2,
          .icon3 {
            width: 15px;
            height: 15px;
            margin: 17px 10px 0;
          }
          .icon1 {
            border: solid #24a6f9 1px;
          }
          .icon2 {
            border: solid #ff4141 1px;
          }
          .icon3 {
            border: solid #999999 1px;
          }
        }
      }
      .groupMain_bottom_bottom {
        display: flex;
        flex-wrap: wrap;
        .roomtext {
          width: 100%;
          height: auto;
          left: 0 !important;
          text-align: center;
          font-size: 12px;
        }
        .roomBox_box_subbox {
          display: flex;
          flex-direction: column;
          width: 65px;
          height: 120px;
          padding: 20px 8px 0;
          position: relative;

          .roomchecked {
            background: rgba(255, 255, 255, 0.5);
            display: inline-block;
            width: 50px;
            height: 85px;
            position: absolute;
          }

          .iconBox {
            text-align: center;
            position: absolute;
            top: 75px;
            left: 8px;
            z-index: 10;
            width: 50px;
          }

          .roomBox_box_subbox_first {
            position: relative;
            width: 50px;
            height: 85px;
            overflow: hidden;

            .louti {
              width: 50px;
              height: 50px;
              margin-top: 15px;
            }

            img {
              width: 100%;
              height: 100%;
            }

            div {
              position: absolute;
              top: 8px;
              left: 12px;
            }
          }

          .roomBox_box_subbox_second {
            text-align: center;
            line-height: 1.6em;
          }
        }
      }
    }

    .config_null {
      width: 100%;
      height: 350px;
      padding-top: 22%;
      text-align: center;
    }
  }
}
@media screen and(max-height:700px) {
  .grouping {
    margin: 0 6px 6px;
  }
}
</style>
