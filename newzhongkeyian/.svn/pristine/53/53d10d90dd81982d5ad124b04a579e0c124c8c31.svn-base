<!-- 不关联树形控件-->
<template>
  <div class="fel-tree">
    <div v-if="treedatas.length == 0" v-loading="loading" class="tree-empty">
      <span v-if="serverText">
        {{serverText}}
        <el-button type="text" size="small" @click.stop="onRefresh(1)">刷新数据</el-button>
      </span>
      <span v-else class="el-table__empty-text">暂无数据</span>
    </div>
    <!-- <span
      v-else-if="treedatas[0][this.nodeKey] == 0"
      @click="onRefresh"
      title="刷新"
      class="float refresh"
    >
      <i class="el-icon-refresh"></i>
    </span>-->
    <el-tree
      ref="tree"
      :check-strictly="true"
      :data="treedatas"
      :props="defaultProps"
      :show-checkbox="true"
      render-after-expand
      empty-text
      :expand-on-click-node="false"
      :auto-expand-parent="false"
      @node-click="handleNodeClick"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      :load="loadin"
      lazy
      :node-key="nodeKey"
      highlight-current
      @check="checkchange"
      :default-expanded-keys="idSets"
    >
      <span class="custom-tree-node" slot-scope="scope">
        <span class="tree-icon">
          <i v-if="scope.data.isnext == 1" class="ficon-zuzhi"></i>
          <i v-else class="ficon-onzuzhi"></i>
          {{ scope.node.label}}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    checkStrictly: Boolean,
    showCheckbox: Boolean,
    refresh: Number, //刷新
    interface: String,
    ajaxType: {
      type: String,
      default: "1"
    },
    param: {
      type: Object,
      default() {
        return {};
      }
    },
    idArr: {
      type: Array,
      default() {
        return [];
      }
    }, //默认展开的数组
    paramKey: {
      type: String
    },
    nodeKey: {
      type: String,
      default: "pgid"
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "pgname",
          isLeaf: "isLeaf"
        };
      }
    },
    dataFilter: {
      type: Function,
      default: function(arrs) {
        return arrs.map(item => {
          if (item.isnext == 1) {
            item.isLeaf = false;
          } else {
            item.isLeaf = true;
          }
          return item;
        });
      }
    }
  },
  data() {
    return {
      loading: true,
      pagesids: this.pagesid,
      thistab: "",
      treedatas: [],
      serverText: "",
      idSets: this.idArr
    };
  },
  methods: {
    checkchange(currentObj, treeStatus) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      let selected = treeStatus.checkedKeys.indexOf(currentObj[this.nodeKey]); // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedChildren(currentObj, true);
      } else {
        this.selectedChildren(currentObj, false);
        this.selectedParent(currentObj);
      }
      setTimeout(() => {
        this.$emit("checkchange", currentObj, {
          checkedNodes: this.$refs.tree.getCheckedNodes(),
          checkedKeys: this.$refs.tree.getCheckedKeys()
        });
      }, 30);
    },
    // 统一处理子节点为选中
    selectedChildren(currentObj, isSelected) {
      let currentNode = this.$refs.tree.getNode(currentObj);
      currentNode.childNodes.map(item => {
        if (item.key !== undefined) {
          this.$refs.tree.setChecked(item, isSelected);
          this.selectedChildren(item, isSelected);
        }
      });
    },
    // 统一处理父节点为选中
    selectedParent(currentObj) {
      let currentNode = this.$refs.tree.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, false);
        this.selectedParent(currentNode.parent);
      }
    },
    addIdSets(id) {
      if (id) {
        if (id instanceof Array) {
          this.idSets.push(...id);
        } else {
          this.idSets.push(id);
        }
        this.idSets = [...new Set(this.idSets)];
      } else {
        this.idSets = [];
      }
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    nodeExpand(data) {
      this.idSets.push(data[this.nodeKey]);
      this.idSets = [...new Set(this.idSets)];
    },
    nodeCollapse(data, ...arr) {
      const index = this.idSets.indexOf(data[this.nodeKey]);
      if (index > -1) {
        this.idSets.splice(index, 1);
      }
    },
    //点击切换表格
    handleNodeClick(data, Nodes) {
      if (!data[this.defaultProps["isLeaf"]]) {
        this.addIdSets(data[this.nodeKey]);
      }
      this.$emit("handleNodeClick", data, Nodes);
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes();
    },
    getCheckedKeys() {
      return this.$refs.tree.getCheckedKeys();
    },
    // //多选节点击
    // checkchange(data, Nodes) {
    //   this.$emit("checkchange", data, Nodes);
    // },
    //获取树形菜单数据
    getTreeData(node, resolve) {
      this.serverText = "";
      let id = "";
      if (node && node.data && node.data[this.nodeKey]) {
        id = node.data[this.nodeKey];
      }
      if (this.paramKey) {
        this.param[this.paramKey] = id || "";
      } else {
        this.param.fatherpgid = id;
      }
      this.$ajax(this.interface, this.param, this.ajaxType)
        .then(res => {
          this.loading = false;
          let aa = this.dataFilter(res.result); //过滤
          if (id == "") {
            if (this.idArr.length === 1) {
              const index = this.idArr[0];
              const key = aa[index][this.nodeKey];
              this.idSets[index] = key;
              if (typeof node != "undefined") {
                setTimeout(() => {
                  this.setCurrentKey(key);
                  this.$emit("handleNodeClick", aa[index]);
                }, 100);
              }
            }
            this.treedatas = aa;
            // } else if (id === "0" || id === 0) {
            //   if (aa.length == 0) {
            //     this.treedatas = [];
            //   } else {
            //     return resolve(aa);
            //   }
          } else {
            // node.data.childList = aa;
            if (node.data) {
              let keys = this.$refs.tree.getCheckedKeys();
              let selected = keys.indexOf(node.data[this.nodeKey]); // -1未选中
              // 选中
              if (selected !== -1) {
                // 子节点只要被选中父节点就被选中
                setTimeout(() => {
                  this.selectedChildren(node.data, true);
                }, 0);
              }
            }
            return resolve(aa);
          }
        })
        .catch(err => {
          node.loaded = false;
          node.loading = false;
          this.loading = false;
          if (id == "") {
            this.serverText = `[${err.resultCode}] ` + err.resultMsg;
          }
        });
    },
    //生成子菜单
    loadin(node, resolve) {
      this.getTreeData(node, resolve);
    },
    setCurrentKey(key) {
      if (this.$refs.tree) {
        this.$refs.tree.setCurrentKey(key);
      }
    },
    onRefresh(key) {
      this.loading = true;
      if (key == 1) {
        let obj = {};
        obj[this.nodeKey] = 0;
        this.getTreeData(obj);
      } else {
        this.getTreeData();
      }
    }
  },
  watch: {
    refresh() {
      this.onRefresh();
    }
  }
};
</script>
