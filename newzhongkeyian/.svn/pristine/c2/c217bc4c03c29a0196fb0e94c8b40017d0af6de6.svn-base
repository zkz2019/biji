<!-- 弹出窗口 管理员-->
<template>
  <!--添加界面-->
  <el-dialog
    class="fel-left-tree dialog27box fel-admin"
    title="角色推送管理"
    top="8vh"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    width="80%"
  >
    <adjust class="adm_con">
      <adjust-div width="200px" class="asidebox left">
        <el-container class="adm_con2">
          <paging-table
            height="100%"
            interface="/push/role/1/getrole"
            ref="fuPaging"
            layout="total, prev, next"
            @onSelect="onSelect"
            @onAajx="onAajx"
            :list="leftList"
            :param="{}"
            :refresh="fuRefresh"
          >
            <div class="full-list">角色名称</div>
          </paging-table>
        </el-container>
      </adjust-div>
      <adjust-div class="container" noadjust>
        <el-container class="adm_con2">
          <paging-table
            ref="pagingTable"
            height="100%"
            noInit
            interface="/push/role/2/getmsgpush"
            @onSelection="onSelection"
            :list="list"
            :param="param"
            :refresh="refresh"
            :refreshTable="refreshTable"
          >
            <div class="full-list">推送信息{{param && param.rolename ? "-" + param.rolename : ''}}</div>
            <batch-but
              class="sli but-blue"
              type="1"
              :list="selecArr"
              :param="buts"
              @onClick="onAction"
            ></batch-but>
          </paging-table>
        </el-container>
      </adjust-div>
    </adjust>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    buts: Array,
  },
  data() {
    let $this = this;
    return {
      param: {
        rolename: "",
      },
      leftList: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          prop: "rolename",
          tooltip: true,
          name: "角色名称",
        },
      ],
      list: [
        {
          type: "selection",
        },
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "推送消息名称",
          prop: "pushname",
        },
        {
          name: "推送频率",
          prop: "pushcycle",
        },
        {
          name: "操作",
          template: {
            props: ["scope"],
            computed: {
              isIds() {
                return $this.buts.map((o) => o.id);
              },
            },
            methods: {
              onClick(key, obj) {
                $this.modify(key, [this.scope.row.prid]);
              },
            },
            template: `<div class="operat-buts"> 
             <el-button type="text" size="small" v-if='scope.row.prstate == 0 && isIds.includes(692)' @click.stop="onClick(1)">启用</el-button>
             <el-button type="text" size="small" v-if='scope.row.prstate != 0 && isIds.includes(693)' @click.stop="onClick(0)">停用</el-button>
             <el-button type="text" size="small" v-if="isIds.includes(694)"  @click.stop="onClick(-1)">删除</el-button>
            </div>`,
          },
        },
      ],
      fuRefresh: 0,
      selecArr: [],
      isInit: true,
      refresh: 0,
      refreshTable: 0,
    };
  },
  created() {},
  watch: {
    dialogVisible(v) {
      if (v) {
        this.onFuRefresh();
      }
    },
  },
  methods: {
    onAajx(data, index) {
      if (data && data.length > 0 && this.isInit && index == 1) {
        this.isInit = false;
        this.$refs.fuPaging.setCurrent(data[0]);
      }
    },
    modify(key, arr, is) {
      let text = "删除";
      if (key == 0) {
        text = "停用";
      } else if (key == 1) {
        text = "启用";
      }
      let firms =
        "确定要把" + this.param.rolename + "角色的这推送消息" + text + "吗？";
      if (is) {
        firms =
          "确定要把" +
          this.param.rolename +
          "角色这些选中的推送消息" +
          text +
          "吗？";
      }
      this.$confirmCon(firms, () => {
        this.$ajax(
          "/push/role/3/startorstoppushrole",
          { prstate: key },
          "1",
          arr,
          true
        )
          .then((res) => {
            this.onRefreshTable();
            this.$message({
              message: text + "成功",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error",
            });
          });
      });
    },
    onAction(key) {
      let arr = this.selecArr.map((o) => o.prid);
      this.modify(key, arr, true);
    },
    onFuRefresh() {
      this.fuRefresh = new Date().getTime();
      this.isInit = true;
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect(data) {
      this.param.rolename = data.rolename;
      this.onRefresh();
    },
    onSelection(data) {
      this.selecArr = data;
    },
    onClick(val, obj) {
      this.$emit("onClick", val, obj);
    },
  },
};
</script>
