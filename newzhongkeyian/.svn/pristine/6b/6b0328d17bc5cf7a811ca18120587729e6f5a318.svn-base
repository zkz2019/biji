<!-- 低电量报警统计 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <inpbox :inptext="'选择位置'">
          <queryPosition
            ref="queryPosition"
            class="qh_inp wid2050"
            @onChoice="onChoiceWZ"
            interface="/analysis/quantityanalysis/1/getbuildtree"
          ></queryPosition>
        </inpbox>
        <inpbox :inptext="'电量顺序'">
          <el-select class="con-select qh_inp" v-model="param.quantityseq">
            <el-option
              v-for="item in quantityseqs"
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
            placeholder="输入位置/房间号查询"
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
        interface="/analysis/quantityanalysis/2/getquantityanalysis"
        :list="list"
        :refresh="refresh"
        :param="param"
        :paramObj="paramObj"
        @onEjectChange="onEjectChange"
      />
    </el-main>
  </el-container>
</template>

<script>
import Storages from "../../utils/Storage.js"; //缓存工具
import queryPosition from "./queryPosition";
export default {
  name: "ddlbjtj261",
  components: {
    queryPosition
  },
  data() {
    return {
      paramObj: [],
      quantityseqs: [
        {
          id: "0",
          name: "正序"
        },
        {
          id: "1",
          name: "逆序"
        }
      ],
      param: { search: "", quantityseq: "0" },
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "房间类型",
          prop: "roomtype"
        },
        {
          name: "房间位置",
          prop: "roomlocation2"
        },
        {
          name: "时间",
          prop: "roomdate"
        },
        {
          name: "剩余电量",
          prop: "roomquantity"
        },
        {
          name: "报警类型",
          prop: "bjtype"
        }
      ],
      refresh: 0
    };
  },
  mounted() {
    this.getEject();
  },
  methods: {
    //重置事件
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach(key => {
        this.param[key] = "";
      });
      this.$refs.queryPosition.onClear();
      this.search();
    },
    onChoiceWZ(data) {
      this.paramObj = data;
    },
    search() {
      this.refresh = new Date().getTime();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "ddlbjtj261");
    },
    getEject() {
      this.$common.getEject(this, "list", "ddlbjtj261");
    }
  }
};
</script>