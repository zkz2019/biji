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
        <template slot="left">
          <el-tabs
            :key="value"
            v-if="getIsClassify()"
            @tab-click="onTabClick"
            class="top-switch"
            stretch
            :value="value"
          >
            <el-tab-pane label="按位置显示" name="1"></el-tab-pane>
            <el-tab-pane label="按分组显示" name="2"></el-tab-pane>
          </el-tabs>
          <div v-if="value == 2" class="left-tree">
            <fel-tree5
              key="group"
              ref="tree5"
              class="tree1"
              :interface="treeUrl5"
              @handleNodeClick="handleNodeClick5"
              @checkchange="checkchange5"
              ajaxType="9"
              nodeKey="areaid"
              :refresh="treeRefresh"
              :param="{areafatherid:'',
                userlogin: param.userlogin }"
              paramKey="areafatherid"
              :defaultProps="{
                    children: 'children',
                    label: 'areaname',
                    isLeaf: 'isLeaf'
                  }"
              :idArr="[0]"
            ></fel-tree5>
          </div>
          <div v-else class="left-tree">
            <fel-tree1
              key="position"
              ref="tree"
              :interface="treeUrl"
              @handleNodeClick="handleNodeClick"
              @checkchange="checkchange"
              :refresh="treeRefresh"
              :param="treeParam"
              :idArr="[0]"
            ></fel-tree1>
          </div>
        </template>
        <el-container class="organiztion_container">
          <paging-table
            noInit
            ref="paging-table"
            :isAll="isAll"
            :class="{'cover-up':isAll}"
            height="100%"
            :interface="tabelurl"
            @onSelection="onSelection"
            :list="list"
            @sort-change="sortChange"
            :param="param"
            :refresh="tableRefresh"
            @onRefreshTable="onRefreshTable"
          >
            <span class="sli leftInp">
              <el-select v-model="param.lockstate" class="con-select maR10 qh_inp">
                <el-option
                  v-for="item in lockstates"
                  :key="item.lockstate"
                  :label="item.statename"
                  :value="item.lockstate"
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
 *.tableRefresh 刷新
 ***/
import { mapGetters } from "vuex";
export default {
  props: {
    value: null,
    top: String,
    treeUrl: String,
    treeUrl5: String,
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
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      lockstates: [{ lockstate: "", statename: "全部状态门锁" }],
      // lockstate: "",
      isSelectable: true,
      isAll: false,
      tableRefresh: 0,
      treeRefresh: 0
    };
  },
  created() {
    this.$ajax("/system/device/devicelock/3/getlockstate", {}, "1")
      .then(res => {
        this.lockstates.push(...res.result);
      })
      .catch(err => {});
    this.list[0].selectable = this.onSelectable;
  },
  computed: {
    treeParam() {
      return { userlogin: this.param.userlogin };
    }
    // tableParam() {
    //   return { ...this.param, lockstate: this.lockstate };
    // }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.refreshData();
        this.param.lockstate = "";
      }
    },
    refresh() {
      this.refreshData();
    }
  },
  methods: {
    ...mapGetters(["getIsClassify"]),
    onTabClick(val) {
      this.param.buildid = "0";
      this.param.type = val.name;
      this.onRefresh();
      this.$emit("input", val.name);
    },
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
      this.onRefresh();
    },
    onSelectable() {
      return this.isSelectable;
    },
    checkchange(data, Nodes) {
      if (Nodes.checkedKeys.includes(data.buildid)) {
        this.isAll = true;
        this.isSelectable = false;
        this.param.buildid = data.buildid;
        this.tableRefresh = new Date().getTime();
      } else if (!Nodes.checkedKeys.includes(this.param.buildid)) {
        this.isAll = false;
        if (this.$refs["paging-table"]) {
          this.$refs["paging-table"].clearSelection();
        }
        this.isSelectable = true;
      }
      this.$emit("checkchange", data, Nodes);
    },
    checkchange5(data, Nodes) {
      if (Nodes.checkedKeys.includes(data.areaid)) {
        this.isAll = true;
        this.isSelectable = false;
        this.param.buildid = data.areaid;
        this.tableRefresh = new Date().getTime();
      } else if (!Nodes.checkedKeys.includes(this.param.buildid)) {
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
      this.param.buildid = val.buildid;
      let Nodes = this.$refs.tree.getCheckedKeys();
      if (Nodes.includes(this.param.buildid)) {
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
    handleNodeClick5(val) {
      this.param.buildid = val.areaid;
      let Nodes = this.$refs.tree5.getCheckedKeys();
      if (Nodes.includes(this.param.buildid)) {
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
    onReset() {
      this.param.lockstate = "";
      this.onRefresh();
    },
    onRefreshTable() {
      this.onTreeRefresh();
    },
    onTreeRefresh() {
      this.treeRefresh = new Date().getTime();
    }
  }
};
</script>
