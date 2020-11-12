<!-- 门禁管理 -->
<template>
  <el-container>
    <fel-left-tree class="building">
      <div slot="left" class="left-tree">
        <fel-tree1
          ref="fel-tree1"
          :showCheckbox="false"
          class="tree1"
          :idArr="[0]"
          :refresh="refreshTree"
          interface="/access/1/getbuildtree"
          nodeKey="agid"
          iconName="agtype"
          :defaultProps="{
            children: 'children',
            label: 'agname',
            isLeaf: 'isLeaf'
          }"
          @handleNodeClick="handleNodeClick"
        ></fel-tree1>
      </div>
      <el-container>
        <el-header class="elheader query_headbox">
          <comTitle>
            <div class="titlebox">门禁管理-{{fatheragid.agname || '建筑'}}</div>
          </comTitle>
          <!-- <retrieval class="query_head" v-if="fatheragid.buildtype==1||fatheragid.buildtype==3">
            <inpbox :inpb="true">
              <el-select
                class="inputs qh_inp"
                v-model="param.searchtype"
                value-key="value"
              >
                <el-option label="显示全部" value="0"></el-option>
                <el-option :disabled="fatheragid.buildtype==3" label="仅园区类型" value="1"></el-option>
                <el-option :disabled="fatheragid.buildtype==3" label="仅楼栋类型" value="2"></el-option>
                <el-option :disabled="fatheragid.buildtype==1" label="除门禁" value="3"></el-option>
                <el-option :disabled="fatheragid.buildtype==1" label="仅门禁" value="4"></el-option>
              </el-select>
            </inpbox>
            <inpbox>
              <el-button class="qh_btn" type="primary" @click="onRefresh">查询</el-button>
              <fel-button class="qh_btn" @click="onReset">重置</fel-button>
            </inpbox>
          </retrieval>-->
        </el-header>
        <el-main class="padt0 query_main">
          <paging-table
            class="tobleList wh100"
            height="100%"
            noInit
            interface="/access/2/getaccess"
            @onSelection="onSelection"
            :list="list"
            :refresh="refresh"
            :param="param"
            :paramObj="fatheragid"
            @onEjectChange="onEjectChange"
          >
            <template v-if="batchButs && batchButs.length > 0">
              <!-- <batch-but
                class="sli but-blue"
                text="批量下发"
                :list="listArrs"
                :param="batchButs"
                @onClick="onBatchClick"
              ></batch-but>-->
            </template>
          </paging-table>
        </el-main>
      </el-container>
    </fel-left-tree>
    <!-- 指令下发 -->
    <instructions
      @onRefresh="onRefreshs"
      :param="param"
      :paramObj="paramObjZl"
      :dialogVisible="dialogVisible"
      @beforeClose="beforeClose"
    ></instructions>
    <!-- 设备信息 -->
    <configureInfo :param="param" :dialogVisible="dialogVisibleInfo" @beforeClose="beforeCloseInfo"></configureInfo>
    <!-- 历史开门 -->
    <history
      :paramObj="param"
      :dialogVisibleHistory="dialogVisibleHistory"
      @beforeClose="beforeCloseHistory"
    ></history>
    <!-- <zlxfdialog
      :dialogVisibleHistory="dialogVisibleZl"
      @beforeClose="beforeCloseZl"
      :paramObj="paramObjZl"
    ></zlxfdialog>-->
  </el-container>
</template>

<script>
import Storages from "../../utils/Storage.js"; //缓存工具
import zlxfdialog from "./dialog/zlxfdialog";
import instructions from "./dialog/instructions";
import configureInfo from "./dialog/configureInfo";
import history from "./dialog/history";
export default {
  name: "mjgl590",
  components: { instructions, configureInfo, history, zlxfdialog },
  data() {
    let $this = this;
    return {
      paramObjZl: [],
      dialogVisibleZl: false,
      dialogVisible: false,
      dialogVisibleInfo: false,
      dialogVisibleHistory: false,
      batchButs: [],
      refreshTree: 0,
      fatheragid: {},
      param: {
        searchtype: "0"
      },
      listBut: [],
      list: [
        {
          type: "selection"
        },
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "门禁名称",
          prop: "accessname",
          width: "90px"
        },
        {
          name: "读头唯一ID",
          prop: "readheadcode"
        },
        {
          name: "门禁控制器唯一ID",
          prop: "accesscode"
        },
        {
          name: "通讯类型",
          prop: "accesstype",
          width: "100px"
        },
        {
          name: "控制门锁类型",
          prop: "contacttype"
        },
        {
          name: "卡片授权数",
          prop: "accessbdcard"
        },
        {
          name: "授权未下发名单",
          prop: "failauthcount"
        },
        {
          name: "在线状态",
          prop: "accessstate",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.accessstate;
                if (value == "在线") {
                  return "puc-pg";
                } else if (value == "离线") {
                  return "puc-px";
                } else {
                  return "";
                }
              }
            },
            template: `<span :class='getClass()'>{{scope.row.accessstate}}</span>`
          }
        },
        {
          name: "操作",
          width: "210px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.listBut;
              }
            },
            methods: {
              onClick(key) {
                $this.onClick(key, Object.assign({}, this.scope.row));
              }
            },
            template: `<div class="operat-buts"> 
      <fel-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type)">{{v.name}}</fel-button>
</div>`
          }
        }
      ],
      refresh: 0,
      listArrs: [],
      sonmenu: 0
    };
  },
  created() {
    this.inGetsonmenu();
  },
  mounted() {
    this.getEject();
  },
  computed: {},
  methods: {
    beforeCloseZl() {
      this.dialogVisibleZl = false;
    },
    beforeCloseHistory() {
      this.dialogVisibleHistory = false;
    },
    beforeClose() {
      this.dialogVisible = false;
    },
    beforeCloseInfo() {
      this.dialogVisibleInfo = false;
    },
    //重置事件
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach(key => {
        this.param[key] = "";
      });
      this.onRefresh();
    },
    onSelection(data) {
      this.listArrs = data;
    },
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: "590" }, "1")
        .then(res => {
          res.result.forEach(value => {
            let id = value.entity.id;
            let alias = value.entity.alias;
            if (id == "591") {
              this.listBut.push({ name: "指令下发", type: "1" });
              if (value && value.childs && value.childs.length > 0) {
                this.paramObjZl = value.childs.map(item => {
                  return item.entity;
                });
                this.batchButs = value.childs.map(item => {
                  return item.entity;
                });
              }
            } else if (id == "592") {
              this.listBut.push({ name: "历史开门", type: "2" });
            } else if (id == "594") {
              this.listBut.push({ name: "设备信息", type: "3" });
            }
          });
          this.sonmenu = 4;
        })
        .catch(err => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    onRefreshs() {
      this.onRefresh();
      this.onRefreshTree();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTree() {
      this.refreshTree = new Date().getTime();
    },
    handleNodeClick(data) {
      this.fatheragid = data;
      this.onRefresh();
    },
    onBatchClick(key, obj) {
      let data = "";
      // return;
      if (this.listArrs.length != 0) {
        // if (key == "595") {
        //   //远程开门
        // } else if (key == "596") {
        //   //远程关门
        // } else if (key == "597") {
        //   //常开模式
        // } else if (key == "598") {
        //   //"常闭模式"
        // } else if (key == "599") {
        //   //"状态查询"
        // }
        data = { ordertype: obj.alias };
        this.$ajax("/access/order/1/saveorder", data, "1", this.listArrs)
          .then(res => {
            if (res.result == "") {
              $this.$message({
                showClose: true,
                message: "指令码为0!",
                type: "error"
              });
              return;
            }
            if (res.result.orderid == "" || res.result == "success") {
              $this.$notify({
                title: "成功",
                message: res.result.ordermsg,
                type: "success"
              });
              $this.zlRefresh = new Date().getTime();
              return;
            }
            this.getorderresult(res.result);
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        this.$message({
          showClose: true,
          message: "请先选中区域或建筑",
          type: "warning"
        });
      }
    },
    onClick(key, data) {
      if (key == 1) {
        this.dialogVisible = true;
        this.param = data;
      } else if (key == 2) {
        this.dialogVisibleHistory = true;
        this.param = data;
      } else {
        this.dialogVisibleInfo = true;
        this.param = data;
      }
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "mjgl590");
    },
    getEject() {
      this.$common.getEject(this, "list", "mjgl590");
    }
  }
};
</script>
