<template>
  <div class="paging-tables" v-loading="loadingtable">
    <fel-table
      ref="felTable"
      class="paging-table"
      v-on="$listeners"
      :noClickRow="isAll"
      :noOpera="noOpera"
      :noRefresh="noRefresh"
      :height="listHeight"
      :expands="expands"
      @onRefresh="onRefreshTable"
      :defaultSelect="defaultSelect"
      :queryData="queryData"
      :list="lists"
      :buttoms="buttoms"
    >
      <slot></slot>
      <div slot="empty">
        <span v-if="serverText">
          {{serverText}}
          <el-button type="text" size="small" @click.stop="onRefreshTable">刷新数据</el-button>
        </span>
        <span v-else class="el-table__empty-text">暂无数据</span>
      </div>
    </fel-table>
    <div class="fel-pagination">
      <el-button
        class="Textbtn"
        :disabled="firstDisabled"
        @click="toFirstPage"
        size="mini"
      >上{{pageSizeL}}条</el-button>
      <el-pagination
        layout="prev, pager, next"
        class="paging-fy1"
        :page-size="pageSize"
        :total="queryLength"
        background
        :page-sizes="[10,20,30,40,50]"
        :pager-count="5"
        :current-page="current"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
      <el-button
        class="Textbtn"
        :disabled="isLastDisabled"
        @click="toLastPage"
        size="mini"
      >下{{pageSizeL}}条</el-button>
      <el-pagination
        layout="total, sizes, jumper"
        class="paging-fy1"
        :page-size="pageSize"
        :total="queryLength"
        background
        :page-sizes="[10,20,30,40,50]"
        :pager-count="5"
        :current-page="current"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
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
    isAll: Boolean, //是否全部选中
    isPageMax: {
      type: Boolean,
      deafult: true
    },
    noOpera: Boolean,
    noRefresh: Boolean,
    layout: {
      type: String,
      default: "  total, slot, prev, pager, next, slot, sizes, jumper"
    },
    interface: String, //接口
    ajaxType: {
      // 接口类型
      type: String,
      default: "1"
    },
    expands: Array, //展开行 (数组)
    incunum: Number,
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
    paging: {
      type: Number,
      default: 10
    },
    noInit: Boolean,
    buttoms: Array,
    height: String,
    defaultSelect: Number,
    inQueryFilter: Function
  },
  data() {
    return {
      currentL: 1,
      pageSizeL: 1000,
      firstDisabled: true,
      isLastDisabled: false,
      listHeight: this.height,
      queryData: [],
      loadingtable: true,
      queryLength: 0,
      pageSize: this.paging,
      current: 1,
      serverText: "",
      time: null,
      paramCopy: {},
      paramObjCopy: {}
    };
  },
  computed: {
    lists: function() {
      let $this = this;
      return $this.list.filter(value => {
        if (value && value.type && value.type == "$index") {
          value.type = "index";
          value.index = function(i) {
            return (
              ($this.currentL - 1) * $this.pageSizeL +
              (($this.current - 1) * $this.pageSize + i + 1)
            );
          };
        }
        return value;
      });
    }
  },
  watch: {
    refresh() {
      this.onRefresh(true);
    },
    incunum() {
      this.onRefresh();
    }
  },
  created() {
    if (!this.noInit) {
      this.inQuery();
    } else {
      this.loadingtable = false;
    }
  },
  methods: {
    toFirstPage() {
      if (this.currentL > 1) {
        this.currentL--;
        this.current = 1;
        this.inQuery();
      } else if (this.currentL == 1) {
        this.firstDisabled = true;
      }
    },
    toLastPage() {
      this.currentL++;
      this.current = 1;
      this.inQuery();
    },
    sinitCurrent() {
      this.current = 1;
    },
    onRefreshTable() {
      // this.onRefresh();
      this.inQuery(this.paramCopy, this.paramObjCopy);
      this.$emit("onRefreshTable");
    },
    onRefresh(is) {
      if (this.time) {
        clearTimeout(this.time);
        this.time = null;
      }
      this.time = setTimeout(() => {
        this.time = null;
        if (is) {
          this.currentL = 1;
          this.current = 1;
        }
        this.inQuery();
      }, 500);
    },
    setCurrent(row) {
      this.$refs.felTable.setCurrent(row);
    },
    setQueryData(data, acc) {
      this.loadingtable = false;
      if (acc) {
        this.queryLength = Math.ceil(this.queryData.length / this.pageSize);
        let zys = Math.ceil(this.queryLength / this.pageSize);
        if (zys && zys < this.current) {
          this.current = zys;
        }
        this.queryData.push(...data);
      } else {
        if (data && data.length > 0) {
          this.queryLength = Math.ceil(data.length / this.pageSize);
          let zys = Math.ceil(this.queryLength / this.pageSize);
          if (zys && zys < this.current) {
            this.current = zys;
          }
          this.queryData = data;
        } else {
          this.queryLength = 0;
          this.queryData = [];
        }
      }
      if (data) {
        this.setIsAll();
      }
    },
    eliminate() {
      this.current = 1;
      this.loadingtable = false;
      this.queryData = [];
      this.queryLength = 0;
    },
    inQuery(P, Obj) {
      this.serverText = "";
      this.loadingtable = true;
      let param = this.param;
      let paramObj = this.paramObj;
      if (P) {
        param = P;
      }
      if (Obj) {
        paramObj = Obj;
      }
      // if(bool){
      //   this.paramCopy=JSON.parse(JSON.stringify(this.param));
      //   this.paramObjCopy=JSON.parse(JSON.stringify(this.paramObj));
      // }
      if (this.isPageMax) {
        param["page2"] = this.current;
        param["rows2"] = this.pageSize;
        param["page"] = this.currentL;
        param["rows"] = this.pageSizeL;
      } else {
        param["page"] = this.current;
        param["rows"] = this.pageSize;
        param["page2"] = this.currentL;
        param["rows2"] = this.pageSizeL;
      }
      if (this.inQueryFilter) {
        param = this.inQueryFilter(param);
      }
      this.$ajax(this.interface, param, this.ajaxType, paramObj, false)
        .then(res => {
          if (res.result) {
            this.queryLength = res.result.total * 1;
            if (this.queryLength == this.pageSizeL) {
              this.isLastDisabled = false;
            } else {
              this.isLastDisabled = true;
            }
            if (this.currentL == 1) {
              this.firstDisabled = true;
            } else {
              this.firstDisabled = false;
            }
            let zys = Math.ceil(this.queryLength / this.pageSize);
            if (zys && zys < this.current) {
              this.current = zys;
            }
            if (res.result.data.length > 200) {
              this.queryData = res.result.data.slice(0, 200);
            } else {
              this.queryData = res.result.data;
            }
            this.setIsAll();
          }
          this.loadingtable = false;
        })
        .catch(err => {
          this.loadingtable = false;
          this.serverText = `[${err.resultCode}] ` + err.resultMsg;
          // this.queryLength = 0;
          this.queryData = [];
        });
      setTimeout(() => {
        this.paramCopy = JSON.parse(JSON.stringify(param));
        this.paramObjCopy = JSON.parse(JSON.stringify(paramObj));
      }, 15);
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
    },
    currentChange: function(t) {
      this.current = t;
      this.inQuery(this.paramCopy, this.paramObjCopy);
    },
    sizeChange: function(t) {
      this.pageSize = Number(t);
      this.inQuery(this.paramCopy, this.paramObjCopy);
    },
    setIsAll() {
      if (this.isAll) {
        setTimeout(() => {
          this.toggleAllSelection();
        }, 100);
      } else {
        this.clearSelection();
      }
    },
    toggleAllSelection() {
      // this.$refs.felTable.toggleAllSelection();
      this.queryData.forEach(obj => {
        this.$refs.felTable.toggleRowSelection(obj);
      });
    },
    clearSelection() {
      this.$refs.felTable.clearSelection();
    }
  },
  components: {
    "fel-table": FelTable
  }
};
</script>
<style scoped>
.fel-pagination {
  display: block;
  padding-top: 20px;
  text-align: right;
}
.fel-pagination .Textbtn {
  vertical-align: top;
  margin: 3px;
}
.fel-pagination .paging-fy1 {
  display: inline-block;
}
</style>
