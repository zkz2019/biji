<!-- 无线联网锁 -->
<template>
  <el-container>
    <fel-left-tree>
      <template slot="left">
        <el-tabs
          v-if="getIsClassify()"
          class="top-switch"
          stretch
          v-model="type"
          type="border-card"
        >
          <el-tab-pane label="按位置显示" name="1"></el-tab-pane>
          <el-tab-pane label="按分组显示" name="2"></el-tab-pane>
        </el-tabs>
        <template v-if="type == '1'">
          <div slot="left" class="left-tree">
            <fel-tree1
              :showCheckbox="false"
              class="tree1"
              key="position"
              :idArr="[0]"
              interface="/system/device/gateway/1/getbuildtree"
              @handleNodeClick="handleNodeClick"
            ></fel-tree1>
          </div>
        </template>
        <template v-else>
          <div class="left-tree">
            <fel-tree5
              key="group"
              :showCheckbox="false"
              class="tree1"
              interface="/arearoom/public/1/listAreaTree"
              @handleNodeClick="checkchangeGroup"
              ajaxType="9"
              nodeKey="areaid"
              :param="{areafatherid:''}"
              paramKey="areafatherid"
              :defaultProps="{
                    children: 'children',
                    label: 'areaname',
                    isLeaf: 'isLeaf'
                  }"
              :idArr="[0]"
            ></fel-tree5>
          </div>
        </template>
      </template>
      <el-container>
        <el-header class="query_headbox">
          <com-title>{{toParam.alias}}</com-title>
          <retrieval class="query_head">
            <inpbox :inpb="true">
              <el-select v-model="param.roomtype" class="con-select qh_inp">
                <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </inpbox>
            <inpbox :inpb="true">
              <el-select v-model="param.roomnetquality" class="con-select qh_inp">
                <el-option
                  v-for="item in qualityTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </inpbox>

            <inpbox inptext="实际电量">
              <el-select class="con-select qh_inp" v-model="param.chargetype">
                <el-option
                  v-for="item in powerTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </inpbox>
            <inpbox>
              <el-input
                clearable
                class="con-select qh_inp maR24"
                v-model="param.charge"
                placeholder="输入电量"
              ></el-input>
            </inpbox>
            <inpbox :inpb="true">
              <el-input
                clearable
                class="con-search qh_inp"
                v-model="param.search"
                placeholder="输入门锁唯一ID/房间名称查询"
              ></el-input>
            </inpbox>
            <inpbox>
              <fel-button class="qh_btn" type="primary" @click="onRefresh">查询</fel-button>
              <fel-button class="qh_btn" @click="onReset">重置</fel-button>
            </inpbox>
          </retrieval>
        </el-header>
        <el-main class="query_main">
          <paging-table
            class="tobleList"
            height="100%"
            noInit
            ref="paging-table"
            :isAll="range == 2? true:false"
            :class="{'cover-up':range == 2}"
            interface="/parameter/quantity/1/listRoomQuantity"
            :list="list"
            ajaxType="9"
            @sort-change="sortChange"
            @onSelection="onSelection"
            :refresh="refresh"
            :refreshTable="refreshTable"
            :param="param"
            @onEjectChange="onEjectChange"
          >
            <template v-if="quantitytypes && quantitytypes.length > 0">
              <div class="full-list" v-show="!list[0].show">
                <el-checkbox v-model="range" @change="onChange" true-label="2" false-label="1">跨页全选</el-checkbox>
              </div>
              <batch-but
                class="sli but-blue"
                :type="range"
                :list="listArr"
                :param="quantitytypes"
                @onClick="inSavegatewayorder"
              ></batch-but>
            </template>
          </paging-table>
        </el-main>
      </el-container>
    </fel-left-tree>
    <configure
      ref="configure"
      @beforeClose="configVisible=false"
      @submit="onSubmit"
      :dialogVisible="configVisible"
      :param="paramCon"
    ></configure>
  </el-container>
</template>

<script>
import configure from "./configure";
import { mapGetters } from "vuex";
export default {
  components: { configure },
  props: {
    toParam: Object,
    toRoute: Object,
  },
  data() {
    let $this = this;
    return {
      configVisible: false,
      isSelectable: true,
      range: "1",
      type: "1",
      paramCon: {},
      qualityTypes: [
        {
          id: "",
          name: "全部通讯状态",
        },
        {
          id: "0",
          name: "未安装",
        },
        {
          id: "1",
          name: "在线",
        },
        {
          id: "-1",
          name: "离线",
        },
        {
          id: "-2",
          name: "未初始化",
        },
      ],
      powerTypes: [
        {
          id: "2",
          name: "小于等于",
        },
        {
          id: "1",
          name: "大于等于",
        },
      ],
      param: {
        roomtype: "",
        search: "",
        id: "",
        sequence: "1",
        sortby: "",
        type: "1",
        chargetype: "1",
        charge: "",
        roomnetquality: "",
      },
      allData: {},
      refresh: 0,
      refreshTable: 0,
      listArr: [],
      topButs: [],
      listBut: [],
      types: [
        { id: "", name: "全部锁类型" },
        { id: "1", name: "无线联网锁" },
        { id: "2", name: "有线联网锁" },
        { id: "3", name: "NBIOT锁" },
      ],
      quantitytypes: [],
      list: [
        {
          type: "selection",
          selectable: this.onSelectable,
        },
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },

        {
          name: "锁类型",
          minWidth: "80px",
          sortable: "custom",
          prop: "roomtype",
        },
        {
          name: "门锁位置",
          minWidth: "90px",
          sortable: "custom",
          prop: "roomlocation",
        },
        {
          name: "门锁唯一ID",
          minWidth: "90px",
          sortable: "custom",
          prop: "roomcode2",
        },
        {
          name: "配置电量范围",
          minWidth: "100px",
          sortable: "custom",
          prop: "rqlimits",
        },
        {
          name: "自定义电量",
          minWidth: "90px",
          sortable: "custom",
          prop: "rqcharge",
        },
        {
          name: "实际电量",
          minWidth: "80px",
          sortable: "custom",
          prop: "roomquantity",
        },
        {
          name: "通讯状态",
          minWidth: "80px",
          sortable: "custom",
          prop: "roomnetquality",

          template: {
            props: ["scope"],
            template: `<div>
             <span 
             :class="
             this.scope.row.roomnetquality=='离线'?
             'puc-px':
             this.scope.row.roomnetquality=='在线'?
             'puc-pg':
             ''
             ">{{this.scope.row.roomnetquality}}</span>
            </div>`,
          },
        },
        {
          name: "操作",
          width: "120px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.listBut;
              },
            },
            methods: {
              onClick(key) {
                let row = this.scope.row;
                $this.onAction(key, row);
              },
            },
            template: `<div class="operat-buts"> 
             <el-button  v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type)">{{v.name}}</el-button>
            </div>`,
          },
        },
      ],
    };
  },
  watch: {
    type(val) {
      this.param.type = val;
    },
  },
  created() {
    this.inGetsonmenu();
  },
  mounted() {
    this.getEject();
  },
  methods: {
    ...mapGetters(["getIsClassify"]),
    handleNodeClick(data) {
      this.param.id = data.buildid;
      this.onRefresh();
    },
    checkchangeGroup(data) {
      this.param.id = data.areaid;
      this.onRefresh();
    },
    sortChange(obj) {
      if (obj.order) {
        if (obj.order == "descending") {
          this.param.sequence = "2";
        } else if (obj.order == "ascending") {
          this.param.sequence = "1";
        }
        this.param.sortby = obj.prop;
      } else {
        this.param.sequence = "1";
        this.param.sortby = "";
      }
      this.onRefresh();
    },
    onSelectable() {
      return this.isSelectable;
    },
    //重置事件
    onReset() {
      Object.keys(this.param).forEach((key) => {
        if (key != "id") {
          if (key == "sequence" || key == "type" || key == "chargetype") {
            this.param[key] = "1";
          } else {
            this.param[key] = "";
          }
        }
      });
      this.onRefresh();
      this.isSelectable = true;
      this.range = "1";
    },
    onSelection(data) {
      this.listArr = data;
    },
    onSubmit(data) {
      let obj = {
        rqcharge: data.custom,
        rqecharge: data.range[1],
        rqscharge: data.range[0],
        id: this.param.id,
        roomtype: this.param.roomtype,
        search: this.param.search,
        type: this.param.type,
      };
      this.$ajax(
        "/parameter/quantity/2/updateRoomQuantity",
        { ...this.allData, ...obj },
        "9",
        {},
        true
      )
        .then((res) => {
          this.$message({
            message: "配置成功!",
            type: "success",
          });
          if (this.$refs.configure) {
            this.$refs.configure.onClear();
          }
          this.configVisible = false;
          this.onRefreshTable();
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    onAction(key, obj) {
      let data = {};
      if (obj) {
        data.type2 = "1";
        data.roomids = [obj.roomid];
      } else {
        data.type2 = this.range;
        data.roomids = this.listArr.map((item) => {
          return item.roomid;
        });
      }
      this.allData = data;
      if (key == "1") {
        this.paramCon = obj;
        this.configVisible = true;
      } else if (key == "2") {
        this.$confirm("确认清空所选门锁的电量显示配置吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$ajax(
            "/parameter/quantity/3/delRoomQuantity",
            { ...data, ...this.param },
            "9",
            {},
            true
          )
            .then((res) => {
              this.$message({
                message: "清空配置成功!",
                type: "success",
              });
              this.onRefreshTable();
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error",
              });
            });
        });
      }
    },
    onChange(val) {
      if (val == 2) {
        this.$refs["paging-table"].clearSelection();
        this.$refs["paging-table"].toggleAllSelection();
        setTimeout(() => {
          this.isSelectable = false;
        }, 100);
      } else {
        this.$refs["paging-table"].clearSelection();
        this.isSelectable = true;
      }
    },
    inSavegatewayorder(id, obj) {
      if (id == "-7") {
        let data = {
          type2: this.range,
        };
        data.roomids = this.listArr.map((item) => {
          return item.roomid;
        });
        this.allData = data;
        this.paramCon = {};
        this.configVisible = true;
      } else if (id == "-8") {
        this.onAction("2");
      }
    },
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: this.toParam.id }, "1")
        .then((res) => {
          res.result.forEach((value) => {
            let id = value.entity.id;
            let alias = value.entity.alias;
            if (id == "-7") {
              this.quantitytypes.push(value.entity);
              this.listBut.push({
                type: "1",
                name: alias,
              });
            } else if (id == "-8") {
              this.quantitytypes.push(value.entity);
              this.listBut.push({
                type: "2",
                name: alias,
              });
            }
          });
          this.sonmenu = 4;
        })
        .catch((err) => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onEjectChange() {
      this.$common.onEjectChange(this.list, "tscs-101");
    },
    getEject() {
      this.$common.getEject(this, "list", "tscs-101");
    },
  },
};
</script>
