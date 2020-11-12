<!-- 门禁公共表格弹框 -->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width||'80%'"
    :top="top"
    :before-close="handleClose"
    :close-on-click-modal="false"
    append-to-body
    class="el-dialogs"
  >
    <el-container class="dialog-table wh100">
      <fel-left-tree>
        <div slot="left" class="left-tree">
          <fel-tree4
            ref="tree"
            :interface="treeUrl"
            :checkStrictly="checkStrictly"
            @handleNodeClick="handleNodeClick"
            :refresh="treeRefresh"
            @checkchange="checkchange"
            ajaxType="9"
            showCheckbox
            paramKey="agfatherid"
            nodeKey="agid"
            :defaultProps="{
            children: 'children',
            label: 'agname',
            isLeaf: 'isLeaf'}"
            :idArr="[0]"
            :param="treeParam"
          ></fel-tree4>
          <!-- :dataFilter="checkStrictly&&next?dataFilter:dataFilter1" -->
          <!-- :param="{userlogin: this.param.userlogin,agfatherid:''}" -->
        </div>
        <el-container class="organiztion_container">
          <paging-table
            ref="paging-table"
            :isAll="isAll"
            :class="{'cover-up':isAll}"
            noInit
            ajaxType="9"
            height="100%"
            :interface="tabelurl"
            @onSelection="onSelection"
            :list="list"
            :param="param"
            @sort-change="sortChange"
            :refresh="tableRefresh"
            @onRefreshTable="onRefreshTable"
          >
            <span class="sli leftInp">
              <el-select v-model="param.amstate" class="maR10 qh_inp">
                <el-option
                  v-for="item in states"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <fel-button type="primary" @click="onRefresh">查询</fel-button>
              <fel-button @click="onReset">重置</fel-button>
            </span>
            <span
              v-for="(v,k) of button"
              :key="k"
              class="sli but-blue"
              @click="onClick(v.id||v.type, v)"
            >
              <i v-if="v.icon" :class="'ficon-' + v.icon"></i>
              {{v.alias||v.name}}
            </span>
          </paging-table>
        </el-container>
      </fel-left-tree>
    </el-container>
  </el-dialog>
</template>

<script>
/***
 * paging-table组件的再次封装
 * button 数组按钮
 *  [{
 *    name: "数组名"
 *  }]
 * refresh 刷新
 ***/
import { mapGetters } from "vuex";
export default {
  props: {
    top: String,
    treeUrl: String,
    dialogVisible: Boolean,
    width: String,
    tabelurl: String,
    title: String,
    param: Object,
    refresh: Number,
    list: {
      type: Array,
      default() {
        return [];
      }
    }, //默认展开的数组
    button: {
      type: Array,
      default() {
        return [];
      }
    },
    next: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default() {
        return false;
      }
    },
    prop: String
  },
  data() {
    return {
      isSelectable: true,
      isAll: false,
      tableRefresh: 0,
      treeRefresh: 0,
      states: []
    };
  },
  created() {
    this.list[0].selectable = this.onSelectable;
    this.getType();
  },
  computed: {
    treeParam() {
      return { userlogin: this.param.userlogin };
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.refreshData();
      }
    },
    refresh() {
      this.refreshData();
    }
  },
  methods: {
    getType() {
      this.$ajax("/access/v2.0/main/2/getAccessMainState", {}, "9")
        .then(res => {
          this.states = res.result.amstates;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    onSelectable() {
      return this.isSelectable;
    },
    sortChange(obj) {
      console.log("obj", obj);
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
      this.onRefresh();
    },
    ...mapGetters(["getNumber"]),
    checkchange(data, Nodes) {
      console.log("data", data);
      if (Nodes.checkedKeys.includes(data.agid)) {
        this.isAll = true;
        this.isSelectable = false;
        if (this.prop) {
          this.param[this.prop] = data.agid;
          this.param.agtype = data.agtype;
        } else {
          this.param.agid = data.agid;
          this.param.agtype = data.agtype;
        }

        this.tableRefresh = new Date().getTime();
      } else {
        this.isAll = false;
        if (this.$refs["paging-table"]) {
          this.$refs["paging-table"].clearSelection();
        }
        this.isSelectable = true;
      }
      this.$emit("checkchange", data, Nodes);
    },
    onRefreshTable() {
      this.onTreeRefresh();
    },
    onSelection(data) {
      this.$emit("onSelection", data);
    },
    handleNodeClick(val) {
      console.log("val", val);
      if (this.prop) {
        this.param[this.prop] = val.agid;
        this.param.agtype = val.agtype;
      } else {
        this.param.agid = val.agid;
        this.param.agtype = val.agtype;
      }
      let Nodes = this.$refs.tree.getCheckedKeys();
      if (Nodes.includes(this.param.agid)) {
        this.isAll = true;
        this.isSelectable = false;
      } else {
        this.isAll = false;
        if (this.$refs["paging-table"]) {
          this.$refs["paging-table"].clearSelection();
        }
        this.isSelectable = true;
      }
      this.onRefresh();
    },

    //按钮点击事件
    onClick(key) {
      this.$emit("onClick", key,this.param.amstate);
    },
    handleClose() {
      //关闭
      this.$emit("handleClose");
    },
    refreshData() {
      this.isAll = false;
      this.isSelectable = true;
      if (this.$refs["paging-table"]) {
        this.$refs["paging-table"].clearSelection();
      }
      this.onTreeRefresh();
      this.onRefresh();
      setTimeout(() => {
        if (this.$refs.tree) {
          this.$refs.tree.treedatas = [];
        }
      }, 0);
    },
    onReset() {
      this.param.amstate = "";
      this.onRefresh();
    },
    onRefresh() {
      this.tableRefresh = new Date().getTime();
    },
    onTreeRefresh() {
      this.treeRefresh = new Date().getTime();
    }
    // dataFilter(data) {
    //   return data.map(item => {
    //     if (item.isnext == 1) {
    //       item.isLeaf = false;
    //     } else {
    //       item.isLeaf = true;
    //     }
    //     if (item.isdel == 1) {
    //       item.disabled = false;
    //     } else {
    //       item.disabled = true;
    //     }
    //     return item;
    //   });
    // },
    // dataFilter1(data) {
    //   return data.map(item => {
    //     if (item.isnext == 1) {
    //       item.isLeaf = false;
    //     } else {
    //       item.isLeaf = true;
    //     }
    //     return item;
    //   });
    // }
  }
};
</script>
