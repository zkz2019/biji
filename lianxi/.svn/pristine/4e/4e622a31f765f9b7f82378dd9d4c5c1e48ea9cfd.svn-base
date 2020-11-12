<template>
  <el-container>
    <batch
      v-if="isBatch"
      :toRoute="toRoute"
      :buts="batchButs"
      ref="batch"
      @onReturn="isBatch = false"
    ></batch>
    <fel-container
      v-else
      title="批量操作门锁"
      @onQuery="onQuery"
      @onReset="onReset"
    >
      <template slot="retrieve">
        <el-select class="qh_inp maR10" v-model="param.actiontype">
          <el-option label="全部操作类型" value></el-option>
          <el-option label="批量授权" value="1"></el-option>
          <el-option label="批量删除授权" value="2"></el-option>
        </el-select>
        <fel-retrie
          v-model="param.search"
          :placeholder="'输入' + getNumber() + '/姓名查询'"
        ></fel-retrie>
      </template>
      <paging-table
        interface="/face/auth/1/listLotFaceAuth"
        class="heig100"
        :param="param"
        :list="list"
        ajaxType="9"
        :refresh="refresh"
      >
        <span
          v-if="grant.showBut.right"
          class="sli but-blue"
          @click="onClick('02')"
        >
          <i class="ficon-image403"></i>
          批量授权人脸授权
        </span>
        <span
          v-if="grant.showBut.delRight"
          class="sli but-blue"
          @click="onClick('01')"
        >
          <i class="ficon-image403"></i>
          批量删除人脸授权
        </span>
      </paging-table>
      <fel-popup
        width="80%"
        title="操作详情"
        @close="grant.box = false"
        :value="grant.box"
      >
        <paging-table
          ref="person-paging-table"
          :list="grant.list"
          interface="/face/auth/2/listLotFaceAuthDetails"
          :param="grant.param"
          ajaxType="9"
          :refresh="grant.refresh"
        >
          <span
            v-for="(v, k) of grant.title == '删除授权列表'
              ? grant.delTopButs
              : grant.topButs"
            :key="k"
            class="sli but-blue"
            @click="onClick(v.id, v)"
          >
            <i v-if="v.icon" :class="'ficon-' + v.icon"></i>
            {{ v.alias }}
          </span>
        </paging-table>
      </fel-popup>
    </fel-container>
    <batchDelRight
      :dialogVisible="DelVisible"
      isType="1"
      @beforeClose="DelVisible = false"
    ></batchDelRight>
  </el-container>
</template>

<script>
import batchDelRight from "./batchDelRight";
import { mapGetters } from "vuex";
import batch from "./batch";
export default {
  props: {
    toRoute: Object,
    toParam: Object,
  },
  components: {
    batch,
    batchDelRight,
  },
  data() {
    let $this = this;
    return {
      DelVisible: false,
      batchButs: [
        {
          id: 0,
          alias: "清空",
          icon: "empty",
        },
        {
          id: 2,
          alias: "修改",
          icon: "image30",
        },
      ],
      grant: {
        box: false,
        title: "授权列表",
        topButs: [],
        delTopButs: [],
        showBut: {
          right: false,
          delRight: false,
        },
        param: { sfeid: "" },
        list: [
          {
            name: "序号",
            type: "$index",
            width: "60px",
          },
          {
            name: "门锁位置",
            // prop: "roomlocation",
            template: {
              props: ["scope"],
              methods: {
                onClick() {
                  let row = this.scope.row;
                  let arr = row.roomlocation2.split(",");
                  let roomlocationName = row.roomlocation;
                  let roomlocation = [];
                  arr.forEach((item) => {
                    if (item) {
                      roomlocation.push(item);
                    }
                  });
                  $this.grant.box = false;
                  $this.$router.push({
                    name: "房间管理",
                    params: {
                      roomid: row.roomid,
                      roomlocation,
                      roomlocationName,
                      toTarget: "sfxx-adminKinguser",
                    },
                  });
                },
              },
              template: `<el-button type="text" size="small" @click.stop="onClick">{{scope.row.roomlocation}}</el-button>`,
            },
          },
          {
            name: "人脸编号",
            prop: "facecode",
          },
          {
            name: "姓名",
            prop: "personname",
          },
          {
            minWidth: "90px",
            name: this.getNumber(),
            prop: "personcode",
          },

          {
            name: "授权详情",
            minWidth: "90px",
            template: {
              props: ["scope"],
              template: `
            <el-tooltip placement="bottom-end">
              <div slot="content">
              授权开始时间 : {{scope.row.empsdate}}<br/>
              授权结束时间 : {{scope.row.empedate}}<br/> 
              可刷卡次数 : {{scope.row.rfusecount}}<br/>
              可用时间段 : {{scope.row.opentime}}<br/>
              </div>
            <fel-button size="small" type="text">查看</fel-button>
            </el-tooltip>`,
            },
          },
          // {
          //   minWidth: "110px",
          //   name: "授权开始时间",
          //   prop: "empsdate",
          // },
          // {
          //   minWidth: "110px",
          //   name: "授权结束时间",
          //   prop: "empedate",
          // },
          // {
          //   minWidth: "92px",
          //   name: "可开门次数",
          //   prop: "rfusecount",
          // },
          // {
          //   minWidth: "92px",
          //   name: "可用时间段",
          //   prop: "opentime",
          // },
          {
            name: "处理状态",
            prop: "sfedstatus",
            custom: "color",
            value(obj) {
              let map = { 1: "处理成功", 0: "正在处理", "-1": "处理失败" };
              return map[obj.row.sfedstatus];
            },
            formatter(obj) {
              if (obj.row.sfedstatus == 1) {
                return 1;
              } else if (obj.row.sfedstatus == -1) {
                return 2;
              }
              return "";
            },
          },
          {
            name: "下发状态",
            prop: "issend",
            template: {
              props: ["scope"],
              methods: {
                getClass() {
                  let value = this.scope.row.issend;
                  if (value == "下发成功") {
                    return "puc-pg";
                  } else if (value == "下发失败" || value == "授权已删除") {
                    return "puc-px";
                  } else {
                    return "";
                  }
                },
              },
              template: `<span :class='getClass()'>{{scope.row.issend}}</span>`,
            },
          },
          {
            name: "失败原因",
            prop: "sfedremark",
          },
          // {
          //   name: "备注",
          //   prop: "failtype",
          // },
        ],
        refresh: 0,
      },
      isBatch: false,
      param: { search: "", actiontype: "" },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        // {
        //   name: "创建时间",
        //   prop: "aaflcdate"
        // },
        {
          name: "操作时间",
          prop: "sfecdate",
        },
        // {
        //   name: "下发方式",
        //   prop: "aafltype",
        //   formatter(a) {
        //     let map = {
        //       1: "立即下发",
        //       2: "延时下发"
        //     };
        //     return map[a.aafltype];
        //   }
        // },
        // {
        //   name: "授权类型",
        //   prop: "personlocation",
        //   width: "110px"
        // },
        {
          name: "操作类型",
          prop: "actiontype",
          formatter(row) {
            return row.actiontype == "1" ? "批量授权" : "批量删除授权";
          },
        },
        {
          name: "操作总数",
          prop: "sfeallcount",
          custom: "num",
          formatter(obj) {
            let num = obj.row.sfeallcount;
            if (num) {
              return /^[0-9]*$/.test(num);
            }
            return false;
          },
          click(obj, value) {
            $this.grant.param.sfeid = obj.row.sfeid;
            $this.grant.param.actiontype = obj.row.actiontype;
            $this.onGrantRefresh();
            if (obj.row.actiontype == "1") {
              $this.grant.title = "授权列表";
              $this.grant.list[5].show = false;
            } else {
              $this.grant.title = "删除授权列表";
              $this.grant.list[5].show = true;
            }
            $this.grant.box = true;
          },
        },
        {
          name: "操作成功数",
          prop: "sfeokcount",
          width: "110px",
        },
        {
          name: "操作失败数",
          prop: "sfenocount",
          width: "110px",
        },
        {
          name: "指令成功数",
          prop: "sfezlokcount",
          width: "110px",
        },
        {
          name: "指令失败数",
          prop: "sfezlnocount",
          width: "110px",
        },
        {
          name: "操作人账号",
          prop: "userlogin",
          width: "110px",
        },
        {
          name: "操作人姓名",
          prop: "username",
          width: "110px",
        },
        {
          name: "操作IP",
          width: "120px",
          prop: "ip",
        },
      ],
      refresh: 0,
      sonmenu: 0,
    };
  },
  created() {
    this.inGetsonmenu();
    if (this.toRoute.personcode) {
      this.isBatch = true;
    }
  },
  watch: {
    toRoute(obj) {
      if (this.toRoute.personcode) {
        this.isBatch = true;
      }
    },
  },
  methods: {
    ...mapGetters(["getNumber"]),
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", {
        fatherid: "923",
      })
        .then((res) => {
          this.sonmenu = 4;
          res.result.forEach((value) => {
            let id = value.entity.id;
            let alias = value.entity.alias;
            if (id == "943") {
              this.grant.topButs.push(value.entity);
            } else if (id == "934") {
              this.grant.showBut.right = true;
              this.batchButs.push(value.entity);
            } else if (id == "990") {
              this.grant.delTopButs.push(value.entity);
            } else if (id == "989") {
              this.grant.showBut.delRight = true;
            }
          });
        })
        .catch((err) => {
          console.log("err", err);
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    onEjectChange() {},
    onGrantRefresh() {
      this.grant.refresh = new Date().getTime();
    },
    onClick(key, obj) {
      console.log("obj", obj);
      let url = "/face/auth/reload/1/reloadFaceAuth";
      let data = {
        sfeid: this.grant.param.sfeid,
      };
      if (this.grant.title == "删除授权列表") {
        url = "/auth/facecenter/deleteauth/4/reloadDeleteFaceAuth";
        data = {
          sfbid: this.grant.param.sfeid,
        };
      }
      if (key == 943 || key == 990) {
        this.$confirmCon("确定要" + obj.alias + "吗？", () => {
          this.$ajax(url, data, "9", {}, true)
            .then((res) => {
              this.$message({
                message: obj.alias + "已下发",
                type: "success",
              });
              this.onGrantRefresh();
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error",
              });
            });
        });
      } else if (key == "01") {
        this.DelVisible = true;
      } else if (key == "02") {
        this.isBatch = true;
      }
    },
    onQuery() {
      this.refresh = new Date().getTime();
    },
    onReset() {
      this.param.search = "";
      this.param.actiontype = "";
      this.onQuery();
    },
  },
};
</script>

<style>
</style>