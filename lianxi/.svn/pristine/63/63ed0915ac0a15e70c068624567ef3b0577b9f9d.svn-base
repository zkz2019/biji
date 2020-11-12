<template>
  <div class="paging-tables" v-loading="loadingtable">
    <fel-table
      ref="felTable"
      class="paging-table"
      v-on="$listeners"
      :noOpera="noOpera"
      :noRefresh="noRefresh"
      :height="listHeight"
      :expands="expands"
      @onRefresh="onRefresh"
      :defaultSelect="defaultSelect"
      :queryData="queryData"
      :list="list"
      :buttoms="buttoms"
    >
      <slot></slot>
      <div slot="empty">
        <span v-if="serverText">
          {{serverText}}
          <el-button type="text" size="small" @click.stop="onRefresh">刷新数据</el-button>
        </span>
        <span v-else class="el-table__empty-text">暂无数据</span>
      </div>
    </fel-table>
  </div>
</template>

<script>
/**
 * 自行封装的列表加分页的组件
 * 只支持数据一次性返回的情况
 * queryList 要展示的数据列表
 * list 要展示数据了列 （数组）
    {
        type: "索引", $index 分页 index 单页
        name: "列名",
        width: "列宽",
        prop: "列值",
        formatter: "方法 数据过滤" (row, column, 当前的值, index)
        template:  // 组件
            {
                name: "", // 组件名称
                props:["scope"], // 父类传的值 scope 
                template: "" // 组件体
            }
    }
 * height 列表的高度
 * paging 分页的条数
 * @onSelect 选中的事件 （currentRow）选中行的数据
 */
import FelTable from "./fel-table";
export default {
  name: "paging-table",
  props: {
    noRefresh: Boolean,
    noOpera: Boolean,
    interface: String, //接口
    ajaxType: {
      // 接口类型
      type: String,
      default: "1"
    },
    expands: Array, //展开行 (数组)
    refresh: Number, //刷新
    param: {
      // 接口参数
      type: Object,
      default() {
        return {};
      }
    },
    paramObj: {
      // 接口参数
      type: Object | Array,
      default() {
        return {};
      }
    },
    list: Array,
    noInit: Boolean,
    buttoms: Array,
    height: String,
    defaultSelect: Number,
    inQueryFilter: Function
  },
  data() {
    return {
      listHeight: this.height,
      queryData: [],
      loadingtable: true,
      queryLength: 0,
      pageSize: this.paging,
      serverText: "",
      time: null
    };
  },
  watch: {
    refresh() {
      this.onRefresh();
    }
    // height() {
    //   this.setHeight();
    // }
  },
  // activated() {
  //   this.setHeight();
  // },
  created() {
    if (!this.noInit) {
      this.inQuery();
    } else {
      this.loadingtable = false;
    }
  },
  methods: {
    onRefresh() {
      if (this.time) {
        clearTimeout(this.time);
        this.time = null;
      }
      this.time = setTimeout(() => {
        this.time = null;
        this.inQuery();
      }, 300);
    },
    setCurrent(row) {
      this.$refs.felTable.setCurrent(row);
    },
    setQueryData(data, acc) {
      this.loadingtable = false;
      if (acc) {
        this.queryData.push(...data);
      } else {
        this.queryData = data;
      }
    },
    eliminate() {
      this.loadingtable = false;
      this.queryData = [];
    },
    inQuery() {
      this.serverText = "";
      this.loadingtable = true;
      let param = Object.assign({}, this.param);
      if (this.inQueryFilter) {
        param = this.inQueryFilter(param);
      }
      this.$ajax(this.interface, param, this.ajaxType, this.paramObj, false)
        .then(res => {
          if (res.result) {
            if (res.result.length > 200) {
              this.queryData = res.result.slice(0, 200);
            } else {
              this.queryData = res.result;
            }
          }
          this.loadingtable = false;
        })
        .catch(err => {
          this.loadingtable = false;
          this.serverText = `[${err.resultCode}] ` + err.resultMsg;
          this.queryData = [];
        });
    },
    setHeight() {
      // if (!this.height) {
      //   let height = this.$config.winHeight;
      //   let tableRect = this.$el.getBoundingClientRect();
      //   let top = tableRect.top;
      //   this.listHeight = height - top - 50 + "px";
      // } else {
      this.listHeight = this.height;
      // }
    }
  },
  components: {
    "fel-table": FelTable
  }
};
</script>
