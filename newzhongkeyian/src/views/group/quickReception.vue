<!-- 快速接团 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <com-title>
        <span class="navig" type="text" @click="onReturn">团管理</span>
        <i class="arrow"></i>
        快速接团（{{param.teamname}}）
      </com-title>

      <retrieval class="query_head">
        <inpbox :inpb="true">
          <el-select v-model="paramObj.tpstate" class="con-select qh_inp">
            <el-option v-for="item in gatetypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </inpbox>
        <inpbox :inptext="'请输入'">
          <el-input
            clearable
            class="con-search qh_inp"
            v-model="paramObj.search"
            placeholder="输入团员姓名/团员身份证查询"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="query_main relative">
      <paging-table
        class="tobleList wh100"
        height="100%"
        interface="/team/teamperson/1/getteamperson"
        :list="list"
        @onSelection="(d)=>{selecArr=d}"
        :refresh="refresh"
        :param="paramObj"
      >
        <span
          class="full-list"
        >预约时间：{{param.teamsdate.substring(0, 10) +"~"+ param.teamedate.substring(0, 10)}}</span>
        <template v-if="param.teamstate != '0' &&
                  param.teamstate != '2'">
          <span
            v-for="(v,k) of entity.topButs"
            :key="k"
            class="sli but-blue"
            @click="onClick(v.id, v,'0')"
          >
            <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
            {{v.alias}}
          </span>
        </template>
      </paging-table>
    </el-main>
    <quickCheckIn
      @onRefresh="onRefresh"
      :param="param"
      :dialogVisible="quickCheckInShow"
      @beforeClose="quickCheckInShow=false"
    ></quickCheckIn>
    <matchingCard
      @onRefresh="onRefresh"
      :param="param"
      :choiceObj="choiceObj"
      :dialogVisible="dialogMatchingCard"
      @beforeClose="dialogMatchingCard=false"
    ></matchingCard>
    <addMember
      @onRefresh="onRefresh"
      :param="param"
      :choiceObj="choiceObj"
      :dialogVisible="addMemberShow"
      @beforeClose="addMemberShow=false"
    ></addMember>
    <guideFile
      :dialogVisible="dialogGuideFile"
      :importButs="importButs"
      :exportButs="exportButs"
      @handleClose="dialogGuideFile=false"
    ></guideFile>
    <rowRoom
      @onRefresh="onRefresh"
      :param="param"
      :paramObj="rowRoomObj"
      :dialogVisible="dialogRowRoom"
      @beforeClose="dialogRowRoom=false"
    ></rowRoom>
    <batchCheckout
      :param="outParam"
      :dialogVisible="outDialogVisible"
      @handleClose="outDialogVisible=false"
      @next="onNext"
    ></batchCheckout>
  </el-container>
</template>

<script>
import batchCheckout from "./dialog/batchCheckout";
import guideFile from "@/views/common/guideFile.vue";
import quickCheckIn from "./quickCheckIn";
import addMember from "./addMember";
import rowRoom from "./rowRoom";
import matchingCard from "./matchingCard";
export default {
  components: {
    quickCheckIn,
    addMember,
    guideFile,
    rowRoom,
    matchingCard,
    batchCheckout
  },
  props: {
    param: {
      type: Object,
      default() {
        return {};
      }
    },
    entity: {
      type: Object,
      default() {
        return {
          listBut: [],
          topButs: []
        };
      }
    }
  },
  data() {
    let $this = this;
    return {
      outParam: {},
      outDialogVisible: false,
      dialogMatchingCard: false,
      rowRoomObj: [],
      dialogRowRoom: false,
      selecArr: [],
      dialogGuideFile: false,
      addMemberShow: false,
      quickCheckInShow: false,
      choiceObj: {},
      paramObj: { search: "", tpstate: "" },
      quantitytypes: [],
      refresh: 0,
      gatetypes: [
        { id: "", name: "全部" },
        { id: "0", name: "未排房", css: "Danger" },
        { id: "1", name: "已排房", css: "Blue" },
        { id: "2", name: "已入住", css: "Success" },
        { id: "3", name: "已退房", css: "" }
      ],
      list: [
        {
          show: false,
          type: "selection"
        },
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "姓名",
          prop: "personname"
        },
        {
          name: "性别",
          width: "55px",
          prop: "personsex"
        },
        {
          name: "身份证号码",
          prop: "personcode"
        },
        {
          name: "单位",
          prop: "personcompany"
        },
        {
          name: "手机",
          prop: "personphone"
        },
        {
          name: "排房信息",
          prop: "roomlocation"
        },
        {
          name: "房间类型",
          width: "80px",
          prop: "rtname"
        },
        {
          name: "开门卡",
          prop: "cardcode"
        },
        {
          name: "已入住人数",
          width: "96px",
          prop: "roomstate"
        },
        {
          name: "状态",
          width: "70px",
          prop: "tpstate",
          template: {
            props: ["scope"],
            computed: {
              typeMap() {
                let obj = {};
                $this.gatetypes.forEach(v => {
                  if (v.id) {
                    obj[v.id] = v;
                  }
                });
                return obj;
              }
            },
            template: `<div><span :class="typeMap[scope.row.tpstate].css">{{typeMap[scope.row.tpstate].name}}</span></div>`
          }
        },
        {
          show: false,
          name: "操作",
          width: "210px",
          prop: "",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                let state = this.scope.row.tpstate;
                if (state == "0") {
                  return $this.entity.listBut;
                } else if (state == "1") {
                  return $this.entity.listBut;
                } else if (state == "2") {
                  return $this.entity.listBut.filter(item => {
                    return item.id == 653;
                  });
                }
                return [];
              }
            },
            methods: {
              onClick(key) {
                let obj = Object.assign({}, this.scope.row);
                $this.onClick(key, obj, "1");
              }
            },
            template: `<div class="operat-buts"> 
             <el-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type, v)">{{v.alias}}</el-button>
            </div>`
          }
        }
      ]
    };
  },
  computed: {
    exportButs() {
      let arr = [];
      this.entity.topButs.forEach(element => {
        if (element.id == 5) {
          let childs = element.childs;
          if (childs) {
            childs.forEach(({ entity }) => {
              if (entity.id == "646") {
                arr.push({
                  name: "团员模板导出",
                  url: "/team/teamperson/d/downmodel"
                });
              } else if (entity.id == "647") {
                arr.push({
                  name: "团员导出",
                  url: "/team/teamperson/e/downteamperson",
                  data: this.paramObj
                });
              }
            });
          }
        }
      });
      return arr;
    },
    importButs() {
      let arr = [];
      this.entity.topButs.forEach(element => {
        if (element.id == 5) {
          let childs = element.childs;
          if (childs) {
            childs.forEach(({ entity }) => {
              if (entity.id == "646") {
                arr.push({
                  name: "团员导入",
                  data: this.paramObj,
                  url: "/team/teamperson/b/uploadteamperson",
                  errUrl: "/team/teamperson/c/downfailteamperson"
                });
              }
            });
          }
        }
      });
      return arr;
    }
  },
  created() {
    this.paramObj.teamid = this.param.teamid;
    if (this.param.teamstate != "0" && this.param.teamstate != "2") {
      this.list[12].show = false;
      this.list[0].show = false;
    } else {
      this.list[12].show = true;
      this.list[0].show = true;
    }
  },
  methods: {
    onNext() {
      this.outDialogVisible = false;
      this.onRefresh();
    },
    setGuideFile(childs) {
      // this.exportButs = [
      //   {
      //     name: "团员导出",
      //     url: "/team/teamperson/e/downteamperson",
      //     data: this.paramObj
      //   },
      //   {
      //     name: "团员模板导出",
      //     url: "/team/teamperson/d/downmodel"
      //   }
      // ];
      // this.importButs = [
      //   {
      //     name: "团员导入",
      //     data: this.paramObj,
      //     url: "/team/teamperson/b/uploadteamperson",
      //     errUrl: "/team/teamperson/c/downfailteamperson"
      //   }
      // ];
    },
    onClick(key, obj, type) {
      if (type == "0") {
        if (key == "0") {
          this.quickCheckInShow = true;
        } else if (key == "1") {
          this.choiceObj = {};
          this.addMemberShow = true;
        } else if (key == "3") {
          if (this.selecArr && this.selecArr.length > 0) {
            this.rowRoomObj = this.selecArr;
            this.dialogRowRoom = true;
          } else {
            this.$message({
              showClose: true,
              message: "请选择要排房的团员",
              type: "error"
            });
          }
        } else if (key == "5") {
          this.dialogGuideFile = true;
        } else if (key == "2") {
          if (this.selecArr && this.selecArr.length > 0) {
            this.delete(this.selecArr.map(o => o.tpid));
          } else {
            this.$message({
              showClose: true,
              message: "请选择要删除的团员",
              type: "error"
            });
          }
        } else if (key == "4") {
          if (this.selecArr.length == 1) {
            this.setMain(this.selecArr[0].tpid);
          } else {
            this.$message({
              showClose: true,
              message: "请选择一位团员来设置主账房",
              type: "error"
            });
          }
        } else if (key == "6") {
          if (this.selecArr && this.selecArr.length > 0) {
            this.outParam.teamid = this.param.teamid;
            let tpid = [];
            this.selecArr.forEach(item => {
              if (item.tpstate == "2") {
                tpid.push(item.tpid);
              }
            });
            this.outParam.tpid = tpid;
            // let tpid = this.selecArr.map(item => {
            //   console.log(item);
            //   if (item.tpstate == "2") {
            //     return item.tpid;
            //   }else{
            //     return ""
            //   }
            // });
            // this.outParam.tpid = tpid.filter(item=>{return Boolean(item)==true});
            console.log("jjjjz", this.outParam.tpid);
            this.outDialogVisible = true;
          } else {
            this.$message.error("请选择要退房的人员!");
          }
        }
      } else {
        if (key == "1") {
          this.choiceObj = obj;
          this.dialogMatchingCard = true;
        } else if (key == "2") {
          this.rowRoomObj = [obj];
          this.dialogRowRoom = true;
        } else if (key == "3") {
          this.choiceObj = obj;
          this.addMemberShow = true;
        } else if (key == "4") {
          this.delete([obj.tpid]);
        } else if (key == "6") {
          this.outParam.teamid = this.param.teamid;
          this.outParam.tpid = [obj.tpid];
          this.outDialogVisible = true;
        }
      }
    },
    //删除团员
    delete(arr) {
      this.$confirm("确定要删除当前团员吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax("/team/teamperson/3/delteamperson", {}, "1", arr, true)
            .then(res => {
              this.onRefresh();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error"
              });
            });
        })
        .catch(() => {});
    },
    //设置主账房
    setMain(roomid) {
      this.$confirm("确定要把当前团员设置为主账房吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax(
            "/team/teamperson/a/savemainteamperson",
            { tpid: roomid },
            "1",
            {},
            true
          )
            .then(res => {
              this.onRefresh();
              this.$message({
                message: "设置主账房成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error"
              });
            });
        })
        .catch(() => {});
    },
    onReturn() {
      this.$emit("onReturn");
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onReset() {
      Object.keys(this.paramObj).map(item => {
        this.paramObj[item] = "";
      });
      this.paramObj.teamid = this.param.teamid;
      this.onRefresh();
    }
  }
};
</script>

<style>
</style>