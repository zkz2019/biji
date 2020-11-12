<!-- NB锁心跳统计 -->
<template>
  <el-container class="nbsrz313">
    <el-header class="elheader query_headbox">
      <com-title>{{toParam.alias}}</com-title>
      <retrieval class="query_head">
        <inpbox :inpb="true">
          <!-- <el-date-picker
            v-model="param.date"
            class="qh_date_p"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :picker-options="{disabledDate(time) {return time.getTime() > Date.now()}}"
            placeholder="选择时间" 
          ></el-date-picker>-->
          <!-- <fel-date class="qh_date" v-model="dates"></fel-date> -->
          <dateSelect ref="dates" class="qh_date" v-model="dates"></dateSelect>
          <!-- <el-date-picker
            v-model="dates"
            size="mini"
            class="con-daterange"
            popper-class="fel-dateW miniDateMin"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :picker-options="pickerOptions"
          ></el-date-picker>-->
        </inpbox>
        <inpbox :inpb="true">
          <queryPosition
            :showCheckbox="false"
            ref="queryPosition"
            class="qh_inp con-popover"
            @onSelection="onChoiceWZ"
            interface="/system/control/nbheart/1/getbuildtree"
          ></queryPosition>
        </inpbox>
        <!-- <inpbox :inpb="true">
          <el-select class="wid100p qh_inp" v-model="param.counttype">
            <el-option
              v-for="item of counttypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input class="wid100p qh_inp" v-model="param.count"></el-input>
        </inpbox>-->
        <inpbox :inpb="true">
          <el-input
            clearable
            class="con-search qh_inp"
            v-model="param.search"
            placeholder="输入门锁唯一ID/创建人查询"
          ></el-input>
        </inpbox>
        <inpbox>
          <el-button class="buta qh_btn" type="primary" @click="search">查询</el-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="elmin query_main">
      <paging-table
        height="100%"
        interface="/system/control/nbheart/2/getnbheart"
        class="heig100"
        :param="param"
        :refresh="refresh"
        :list="list"
        @sort-change="sortChange"
        @onEjectChange="onEjectChange"
      ></paging-table>
    </el-main>
    <!-- <el-dialog
      title="通讯详情"
      width="70%"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      :visible.sync="dialogVisible"
    >
      <el-container class="dialog-table6">
        <statistics :refresh="cardRefresh" :param="statisParam"></statistics>
      </el-container>
    </el-dialog>-->
    <el-dialog
      title="NB锁心跳详情"
      width="70%"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      :visible.sync="dialogVisible"
    >
      <el-container class="dialog-table6 query_main">
        <paging-table
          height="100%"
          interface="/system/control/nbheart/4/getnbheartdetail"
          class="wh100"
          :param="datailParam"
          :refresh="subRefresh"
          :list="datailList"
        >
          <span class="query_head">
            <fel-date class="qh_date" v-model="subDates"></fel-date>
            <!-- <el-date-picker
              v-model="subDates"
              size="mini"
              class="con-daterange"
              popper-class="fel-dateW miniDateMin"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :picker-options="pickerOptions"
            ></el-date-picker>-->
          </span>
          <span class="sli">
            <el-button type="primary" @click="subSearch">查询</el-button>
            <el-button @click="subReset">重置</el-button>
          </span>
        </paging-table>
      </el-container>
    </el-dialog>
  </el-container>
</template>

<script>
import Storages from "../../utils/Storage.js"; //缓存工具
import queryPosition from "../query/queryPosition";
import statistics from "./statistics571";
import { format } from "./../../utils/utils";
export default {
  components: {
    queryPosition,
    statistics,
  },
  props: ["toParam"],
  data() {
    let $this = this;
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dates: [],
      subDates: [],
      subRefresh: 0,
      cardRefresh: 0,
      statisParam: {},
      counttypes: [
        { id: "1", name: "小于" },
        { id: "2", name: "等于" },
        { id: "3", name: "大于" },
      ],
      dialogVisible: false,
      datailParam: {
        sdate: "",
        edate: "",
        roomid: "",
      },
      param: {
        llstate: "",
        counttype: "",
        search: "",
        sdate: "",
        edate: "",
        count: "",
        agid: "",
      },
      listBut: [
        {
          type: "9",
          name: "详情",
        },
      ],
      refresh: 0,
      datailList: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "心跳内容",
          prop: "nhdcontent",
        },
        {
          name: "心跳时间",
          prop: "nhddate",
        },
      ],
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "门锁位置",
          sortable: "custom",
          prop: "roomlocation",
        },
        {
          name: "唯一ID",
          sortable: "custom",
          prop: "roomcode2",
        },
        {
          name: "IMEI",
          sortable: "custom",
          prop: "roomimei",
        },
        {
          name: "IMSI",
          sortable: "custom",
          prop: "roomimsi",
        },
        {
          name: "最后通讯时间",
          sortable: "custom",
          prop: "roomlastactivedate",
        },
        {
          name: "在线状态",
          prop: "roomstate",
          sortable: "custom",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.roomstate;
                if (value == "在线") {
                  return "puc-pg";
                } else if (value == "离线") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
            },
            template: `<span :class='getClass()'>{{scope.row.roomstate}}</span>`,
          },
        },
        {
          name: "心跳次数",
          sortable: "custom",
          prop: "roomcount",
        },
        {
          name: "操作",
          width: "60px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.listBut;
              },
              row() {
                return this.scope.row;
              },
            },
            methods: {
              onClick(key, obj) {
                $this.onClick(key, Object.assign({}, this.scope.row), obj);
              },
            },
            template: `<div class="operat-buts">
             <el-button v-for="(v,i) of listBut" v-if='row.nbstate != v.name' :key="i" type="text" size="small" @click.stop="onClick(v.type, v)">{{v.name}}</el-button>
            </div>`,
          },
        },
      ],
    };
  },
  created() {
    // this.dates = [
    //   format(new Date(), "yyyy-MM-dd"),
    //   format(new Date(), "yyyy-MM-dd"),
    // ];
    this.subDates = this.dates;
    // this.param.sdate = format(this.dates[0], "yyyy-MM-dd");
    // this.param.edate = format(this.dates[1], "yyyy-MM-dd");
    this.datailParam.sdate = this.param.sdate;
    this.datailParam.edate = this.param.edate;
    // this.$ajax("/login/home/2/getsonmenu", { fatherid: this.toParam.id }, "1")
    //   .then(res => {
    //     res.result.forEach(value => {
    //       let id = value.entity.id;
    //       let alias = value.entity.alias;
    //       if (id == "294") {
    //         this.listBut.push({
    //           type: "7",
    //           name: "停止",
    //           alias
    //         });
    //       }
    //     });
    //   })
    //   .catch(err => {});
  },
  mounted() {
    this.getEject();
  },
  watch: {
    dates(val) {
      this.param.sdate = format(val[0], "yyyy-MM-dd");
      this.param.edate = format(val[1], "yyyy-MM-dd");
      this.subDates = val;
    },
    subDates(val) {
      this.datailParam.sdate = format(val[0], "yyyy-MM-dd");
      this.datailParam.edate = format(val[1], "yyyy-MM-dd");
    },
  },
  methods: {
    sortChange(obj) {
      if (obj.order) {
        if (obj.order == "descending") {
          this.param.sequence = "2";
        } else if (obj.order == "ascending") {
          this.param.sequence = "1";
        }
        let sortby = obj.prop;
        this.param.sortby = sortby;
      } else {
        this.param.sequence = "";
        this.param.sortby = "";
      }
      this.search();
    },
    onChoiceWZ(data) {
      this.param.agid = data.buildid;
    },
    //重置事件
    onReset() {
      Object.keys(this.param).forEach((key) => {
        this.param[key] = "";
      });
      this.dates = [];
      this.$refs.dates.value2 = new Date();
      // format(new Date(), "yyyy-MM-dd"),
      // format(new Date(), "yyyy-MM-dd"),
      this.$refs.queryPosition.onClear();
      this.search();
    },
    inSearch() {
      this.cardRefresh = new Date().getTime();
    },
    onSelect(obj) {
      this.gateway = obj;
    },
    beforeClose() {
      this.dialogVisible = false;
    },
    onClick(key, data, obj) {
      console.log("data", data);
      if (key == "9") {
        // this.statisParam = data;
        // this.inSearch();
        this.datailParam.roomid = data.roomid;
        this.subSearch();
        this.dialogVisible = true;
      }
    },
    //查询
    search() {
      this.refresh = new Date().getTime();
    },
    subSearch() {
      this.subRefresh = new Date().getTime();
    },
    subReset() {
      this.subDates = [
        format(new Date(), "yyyy-MM-dd"),
        format(new Date(), "yyyy-MM-dd"),
      ];
      this.subSearch();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "nbsxtjl571");
    },
    getEject() {
      this.$common.getEject(this, "list", "nbsxtjl571");
    },
  },
};
</script>