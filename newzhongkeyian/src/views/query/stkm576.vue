<!-- 试探开门 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <inpbox :inptext="'请选择时间'">
          <fel-date class="qh_date" style="width:370px!important;" v-model="dates"></fel-date>
        </inpbox>
        <inpbox :inptext="'选择位置'">
          <queryPosition
            ref="queryPosition"
            class="con-popover qh_inp"
            @onChoice="onChoiceWZ"
            interface="/analysis/nobackrecord/1/getbuildtree"
          ></queryPosition>
        </inpbox>

        <inpbox :inptext="'选择组织'">
          <queryOrgan
            ref="queryOrgan"
            class="con-popover qh_inp"
            @onChoice="onChoiceZZ"
            interface="/analysis/nobackrecord/2/getpersontree"
          ></queryOrgan>
        </inpbox>

        <inpbox :inptext="'异动类型'">
          <el-select class="con-select qh_inp" v-model="param.changetype">
            <el-option
              v-for="item in changetypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </inpbox>

        <inpbox :inptext="'请输入'">
          <el-input
            clearable
            class="con-search qh_inp"
            v-model="param.search"
            :placeholder="'输入姓名/'+getNumber()+'/卡号查询'"
          ></el-input>
        </inpbox>

        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="search">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="padt0 query_main">
      <paging-table
        class="tobleList wh100"
        height="100%"
        interface="/analysis/changerecord/3/getchangerecord"
        :list="list"
        :refresh="refresh"
        :param="param"
        :paramObj="paramObj"
      />
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "@/utils/utils.js";
import queryPosition from "./queryPosition";
import queryOrgan from "./queryOrgan";
export default {
  name: "stkm576",
  components: {
    queryPosition,
    queryOrgan
  },
  data() {
    return {
      paramObj: {
        build: [],
        persontree: []
      },
      dates: [],
      changetypes: [{ id: "", name: "全部" }],
      param: { sdate: "", edate: "", search: "", changetype: "" },
      list: [
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
          name: this.getNumber(),
          prop: "personcode"
        },
        {
          name: "归属组织",
          prop: "personlocation"
        },
        {
          name: "卡号/指纹号",
          prop: "cardcode"
        },
        {
          name: "房间位置",
          prop: "roomlocation"
        },
        {
          name: "异动时间",
          prop: "rd"
        },
        {
          name: "异动类型",
          prop: "rt"
        }
      ],
      refresh: 0
    };
  },
  created() {
    this.inGetType();
  },
  methods: {
    //重置事件
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach(key => {
        this.param[key] = "";
      });
      this.$refs.queryPosition.onClear();
      this.$refs.queryOrgan.onClear();
      this.search();
    },
    ...mapGetters(["getNumber"]),
    inGetType() {
      this.$ajax("/analysis/changerecord/4/getchangetype", {}, "1")
        .then(res => {
          this.changetypes.push(
            ...res.result.map(obj => {
              return {
                id: obj.rt,
                name: obj.rt
              };
            })
          );
        })
        .catch(err => {});
    },
    onChoiceWZ(data) {
      // data.map(item=>{
      //   delete item.isLeaf;
      //   delete item.isnext2;
      // })
      this.paramObj.build = data;
    },
    onChoiceZZ(data) {
      // let data1=[];
      // data.map(item=>{
      // })
      this.paramObj.persontree = data;
    },
    search() {
      if (this.dates && this.dates.length == 2) {
        this.param.sdate = format(this.dates[0], "yyyy-MM-dd HH:mm:ss");
        this.param.edate = format(this.dates[1], "yyyy-MM-dd HH:mm:ss");
      } else {
        this.param.sdate = "";
        this.param.edate = "";
      }
      this.refresh = new Date().getTime();
    }
  }
};
</script>