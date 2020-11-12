<!-- 批量排房 -->
<template>
  <el-container
    class="batchRoom"
    v-loading="reqLoading"
    :element-loading-text="`请求中,预计还需${count}秒...`"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-header class="query_headbox">
      <com-title>
        <span class="navig" type="text" @click="onReturn">团管理</span>
        <i class="arrow"></i>
        批量排房（{{param.teamname}}）
      </com-title>
    </el-header>
    <el-container class="query_main batch">
      <adjust class="batch-authori">
        <adjust-div class="b-left">
          <div class="tsTop">步骤1：选择待授权位置</div>
          <div class="b-left_box bathRoom">
            <div class="date-le">
              <span class="name">预约时间：</span>
              <div class="pad0-10">
                <span>{{param.teamsdate}}</span>~
                <span>{{param.teamedate}}</span>
              </div>
              <!-- <el-date-picker
                v-model="dates"
                @change="onChange"
                :clearable="false"
                type="datetimerange"
                size="mini"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                disabled
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>-->
            </div>
            <div class="b-left_box_bottom">
              <fel-tree1
                class="tree1"
                ref="tree1"
                :param="paramTree"
                :refresh="refreshTree"
                interface="/team/teamroom/1/getbuildtree"
                @checkchange="checkchange"
                :idArr="[0]"
              ></fel-tree1>
            </div>
            <div>
              <span v-if="room" class="pad0-10">
                <span class="maR10">已选空房{{room.roomyxroom || 0}}</span>
                <span>已选空床{{room.roomyxbed || 0}}</span>
              </span>
            </div>
          </div>
        </adjust-div>
        <adjust-div class="b-centre" noadjust>
          <div class="tsTop">步骤2：未排房团员</div>
          <div class="b-center_box">
            <pfel-table
              class="tobleList wh100"
              height="100%"
              interface="/team/teamroom/3/getteamroomperson"
              :list="list"
              :refresh="refresh"
              :param="paramObj"
              @onSelection="(d)=>{selecArr=d}"
              :pagerCount="4"
              layout="total,prev,pager,next,sizes"
            >
              <span class="sli but-blue">
                <el-checkbox v-model="paramObj.issex" false-label="0" true-label="1">是否男女混住</el-checkbox>
              </span>
              <span class="sli but-blue">
                <el-checkbox v-model="paramObj.isteam" false-label="0" true-label="1">是否不同团混住</el-checkbox>
              </span>
            </pfel-table>
            <div class="b-bottom-btn">
              <fel-button
                :disabled="!selecArr || selecArr.length == 0"
                slot="right"
                class="com-but-small"
                @click="checkAdd"
                :type="selecArr && selecArr.length > 0 ? 'primary':'info'"
              >选择添加</fel-button>
            </div>
          </div>
        </adjust-div>
        <adjust-div class="b-right" dragLeft>
          <div class="tsTop">步骤3：确定生效</div>
          <pfel-table
            class="tobleList wh100"
            height="100%"
            interface="/team/teamroom/4/getteamroompersoninfo"
            :list="list2"
            noInit
            noRefresh
            @onSelection="(d)=>{listArr=d}"
            :refresh="refresh2"
            :param="paramObj"
            :paramObj="paramObj2"
            layout="total,prev,pager,next,sizes"
          ></pfel-table>
          <div class="b-bottom-btn">
            <fel-button
              :disabled="!listArr || listArr.length == 0"
              slot="right"
              class="com-but-small"
              @click="sortroom"
              :type="listArr && listArr.length > 0 ? 'primary':'info'"
            >排房</fel-button>
          </div>
        </adjust-div>
      </adjust>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { arrReduceRightObj } from "@/utils/utils";
export default {
  components: {},
  props: {
    param: Object,
    toParam: null
  },
  data() {
    let $this = this;
    return {
      room: null,
      reqLoading: false,
      count: 120,
      refresh: 0,
      refresh2: 0,
      refreshTree: 0,
      paramObj: {
        edate: this.param.teamedate,
        sdate: this.param.teamsdate,
        teamid: this.param.teamid,
        issex: "0",
        isteam: "0"
      },
      dates: [this.param.teamsdate, this.param.teamedate],
      list: [
        {
          type: "selection"
        },
        {
          name: "序号",
          type: "index",
          width: "60px"
        },
        {
          name: "被授权人",
          width: "80px",
          prop: "personname"
        },
        {
          name: "性别",
          width: "50px",
          prop: "personsex"
        },
        {
          name: "身份证",
          prop: "personcode"
        }
      ],
      list2: [
        {
          type: "selection"
        },
        {
          name: "序号",
          type: "index",
          width: "60px"
        },
        {
          name: "被授权人",
          width: "80px",
          prop: "personname"
        },
        {
          name: "性别",
          width: "50px",
          prop: "personsex"
        },
        {
          name: "身份证",
          prop: "personcode"
        },
        {
          name: "房间位置",
          prop: "roomlocation"
        }
        // {
        //   name: "操作",
        //   template: {
        //     props: ["scope"],
        //     computed: {
        //       listBut() {
        //         return $this.listBut;
        //       }
        //     },
        //     methods: {
        //       onClick() {}
        //     },
        //     template: `<div class="operat-buts">
        //      <fel-button type="text" size="small" @click.stop="onClick">删除</fel-button>
        //     </div>`
        //   }
        // }
      ],
      position: [],
      selecArr: [],
      paramObj2: {
        build: [],
        person: []
      },
      listArr: []
    };
  },
  created() {
    this.paramObj.edate = this.param.teamedate;
    this.paramObj.sdate = this.param.teamsdate;
    this.paramObj.teamid = this.param.teamid;
    this.ingetteamroominfo();
  },
  computed: {
    paramTree() {
      return {
        edate: this.paramObj.edate,
        sdate: this.paramObj.sdate
      };
    }
  },
  methods: {
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTree() {
      this.refreshTree = new Date().getTime();
    },
    onChange() {
      this.paramObj.edate = this.dates[1];
      this.paramObj.sdate = this.dates[0];
      this.onRefreshTree();
      this.onRefresh();
    },
    checkAdd() {
      if (!this.selecArr || this.selecArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择人员",
          type: "error"
        });
        return false;
      }
      if (!this.position || this.position.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择位置",
          type: "error"
        });
        return false;
      }
      this.paramObj2 = {
        build: this.position,
        person: this.selecArr
      };
      this.refresh2 = new Date().getTime();
    },
    sortroom() {
      this.insaveteamroomperson();
    },
    onReturn() {
      this.$emit("onReturn");
    },
    ingetteamroominfo() {
      this.$ajax(
        "/team/teamroom/2/getteamroominfo",
        this.paramObj,
        "1",
        this.position
      )
        .then(res => {
          this.room = res.result || null;
        })
        .catch(err => {});
    },
    insaveteamroomperson() {
      if (!this.listArr || this.listArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要排房的人员",
          type: "error"
        });
        return false;
      }
      this.$ajax(
        "/team/teamroom/5/saveteamroomperson",
        this.paramObj,
        "1",
        this.listArr,
        true
      )
        .then(res => {
          this.$message({
            message: "排房成功",
            type: "success"
          });
          this.onReturn();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    checkchange(a, data) {
      this.position = data.checkedNodes;
      this.ingetteamroominfo();
    }
  }
};
</script>

<style lang="scss">
.batchRoom {
  .paging-fy {
    padding: 10px 120px 0 0;
  }
  .b-bottom-btn {
    border-top: 1px solid #999;
    height: 50px;
    text-align: right;
    padding: 8px 35px;
    background: #fff;
  }
  .box_top {
    background: #fff;
    padding: 5px 5px 0 5px;
    height: 40px;
    justify-content: flex-end;
    display: flex;
    .box_top_rightBtn {
      float: right;
      height: 27px;
      width: 95px;
      margin: 2px 15px;

      line-height: 0px;
    }
    .box_top_btn {
      width: 56px;
      height: 27px;
      margin: 1px 15px 0 0;
    }
  }
  .tsTop {
    text-align: left;
    padding-left: 15px;
    span {
      display: inline-block;
      font-size: 0.85em;
      margin-right: 20px;
      color: #666;
      float: right;
    }
  }
  .b-left {
    width: 20%;
  }
  .b-centre {
    flex: 1;
  }
  .b-left_box {
    background: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    .b-left_box_bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .b-center_box {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
  .b-right {
    width: 50%;
    .tobleList {
      padding-top: 2px;
    }
  }
}
</style>
