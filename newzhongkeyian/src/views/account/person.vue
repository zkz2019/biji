<!-- 公共表格弹框 -->
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
          <fel-tree
            ref="tree"
            :interface="treeUrl"
            @handleNodeClick="handleNodeClick"
            :refresh="treeRefresh"
            @checkchange="checkchange"
            showCheckbox
            :idArr="[0]"
            :param="treeParam"
          ></fel-tree>
        </div>
        <el-container class="organiztion_container">
          <paging-table
            ref="paging-table"
            :isAll="isAll"
            :class="{'cover-up':isAll}"
            noInit
            height="100%"
            :interface="tabelurl"
            @onSelection="onSelection"
            :list="list"
            :param="param"
            :refresh="tableRefresh"
            @onRefreshTable="onRefreshTable"
          >
            <span class="sli leftInp">
              <el-input
                clearable
                class="search con-search"
                v-model="param.search"
                :placeholder="'输入姓名/'+getNumber()+'查询'"
              ></el-input>
              <fel-button type="primary" @click="onRefresh">查询</fel-button>
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
      },
    }, //默认展开的数组
    button: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isSelectable: true,
      isAll: false,
      tableRefresh: 0,
      treeRefresh: 0,
    };
  },
  created() {
    this.list[0].selectable = this.onSelectable;
  },
  computed: {
    treeParam() {
      return { userlogin: this.param.userlogin };
    },
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.refreshData();
      }
    },
    refresh() {
      this.refreshData();
    },
  },
  methods: {
    onSelectable() {
      return this.isSelectable;
    },
    ...mapGetters(["getNumber"]),
    checkchange(data, Nodes) {
      if (Nodes.checkedKeys.includes(data.pgid)) {
        this.isAll = true;
        this.isSelectable = false;
        this.param.pgid = data.pgid;
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
    onSelection(data) {
      this.$emit("onSelection", data);
    },
    handleNodeClick(val) {
      this.param.pgid = val.pgid;
      let Nodes = this.$refs.tree.getCheckedKeys();
      if (Nodes.includes(this.param.pgid)) {
        this.isAll = true;
        this.isSelectable = false;
      } else {
        this.isAll = false;
        this.isSelectable = true;
        if (this.$refs["paging-table"]) {
          this.$refs["paging-table"].clearSelection();
        }
      }
      this.onRefresh();
    },
    onRefreshTable() {
      this.onTreeRefresh();
    },
    //按钮点击事件
    onClick(key) {
      this.$emit("onClick", key);
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
      setTimeout(() => {
        if (this.$refs.tree) {
          this.$refs.tree.treedatas = [];
        }
      }, 0);
      this.onRefresh();
      this.onTreeRefresh();
    },
    onRefresh() {
      this.tableRefresh = new Date().getTime();
    },
    onTreeRefresh() {
      this.treeRefresh = new Date().getTime();
    },
  },
};
</script>
