<template>
  <fel-dialog
    class="BatchDelRight"
    top="5%"
    :title="title"
    width="80%"
    minWidth="1100px"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-main class="padt0 query_main">
      <retrieval class="query_head marpadbor0">
        <inpbox :inpb="true">
          <queryPosition
            ref="queryPosition"
            class="con-popover qh_inp"
            ajaxType="9"
            @onChoice="onChoiceWZ"
            :interface="getInfo.treeUrl"
          ></queryPosition>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="qh_inp wid250"
            v-model="paramObj.search"
            :placeholder="'输入' + Stext + '姓名/' + getNumber() + '查询'"
          ></el-input>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="onRefresh"
            >查询</fel-button
          >
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
      <paging-table
        class="tobleList wh100"
        :interface="getInfo.tableUrl"
        :list="list"
        :refresh="refresh"
        :refreshTable="refreshTable"
        ref="paging-table"
        :paramObj="paramObj"
        :param="param"
        :isAll="range == 2 ? true : false"
        :class="{ 'cover-up': range == 2 }"
        @onSelection="
          (d) => {
            selecArr = d;
          }
        "
      >
        <template>
          <!-- <span v-for="(v, k) of topButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
            <i v-if="v.icon" :class="'ficon-' + v.icon"></i>
            {{ v.alias }}
          </span>-->
          <template v-if="batchButs.length > 0">
            <div class="full-list" v-show="!list[0].show">
              <el-checkbox
                v-model="range"
                @change="onChange"
                true-label="2"
                false-label="1"
                >跨页全选</el-checkbox
              >
            </div>
            <batch-but
              class="sli but-blue"
              :type="range"
              :list="selecArr"
              :param="batchButs"
              @onClick="onAction"
            ></batch-but>
          </template>
        </template>
      </paging-table>
    </el-main>
  </fel-dialog>
</template>

<script>
import queryPosition from "./../face/plsqms923/queryPosition";
import { mapGetters } from "vuex";
export default {
  components: { queryPosition },
  props: {
    // paramObj: Object,
    btnRight: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dialogVisible: Boolean,
    isType: {
      type: String,
      required: true,
    },
  },
  data() {
    let $this = this;
    return {
      Stext: "",
      refresh: 0,
      topButs: [],
      title: "",
      batchButs: [
        {
          alias: "删除",
          icon: "image106",
          id: "D1",
          isnext: "0",
          value: "shanchu",
        },
      ],
      paramObj: {
        arearoom: [],
        build: [],
        type: "1",
        search: "",
      },
      refreshTable: 0,
      param: {},
      isSelectable: true,
      ahids: [{ id: "", name: "全部读头" }],
      selecArr: [],
      list: [
        {
          type: "selection",
          selectable: this.onSelectable,
        },
        {
          name: "序号",
          type: "$index",
          width: "50px",
        },
        {
          name: "授权位置",
          prop: "roomlocation",
          minWidth: "170px",
        },
        {
          name: "授权详情",
          // prop: "facecode",
          noClose: false,
          show: false,
          minWidth: "110px",
          formatter(row) {
            return (
              row.cardcode || row.fingercode || row.facecode || row.personcode
            );
          },
        },
        {
          name: "姓名",
          prop: "personname",
          minWidth: "80px",
        },
        {
          name: this.getNumber(),
          prop: "personcode",
          minWidth: "100px",
        },
        {
          name: "归属组织",
          prop: "personlocation",
          minWidth: "145px",
        },
        // {
        //   name: "授权状态",
        //   prop: "issend",
        //   template: {
        //     props: ["scope"],
        //     methods: {
        //       getClass() {
        //         let value = this.scope.row.issend;
        //         if (value == "下发成功") {
        //           return "puc-pg";
        //         } else if (value == "下发失败") {
        //           return "puc-px";
        //         } else {
        //           return "";
        //         }
        //       },
        //     },
        //     template: `<span :class="getClass()">{{scope.row.issend}}</span>`,
        //   },
        // },
        {
          name: "下发状态",
          minWidth: "90px",
          noClose: false,
          show: false,
          prop: "issend",
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.issend;
                if (value == "下发成功") {
                  return "puc-pg";
                } else if (value == "下发失败") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
              getText() {
                let value = this.scope.row.issend;
                return value;
              },
            },
            template: `<span :class="getClass()">{{getText()}}</span>`,
          },
        },
        {
          name: "失败原因",
          minWidth: "90px",
          show: false,
          noClose: false,
          prop: "failtype",
        },
        {
          name: "操作",
          width: "75px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.batchButs;
              },
            },
            methods: {
              onClick() {
                $this.onDelete(this.scope.row);
              },
            },
            template: `<div class="operat-buts">
             <fel-button type="text" size="small" @click.stop="onClick">删除</fel-button>
            </div>`,
          },
        },
      ],
      range: "1",
    };
  },
  computed: {
    getInfo() {
      if (this.isType == "3") {
        this.title = "批量删除卡片授权";
        this.Stext = "卡号/";
        //卡片
        return {
          treeUrl: "/auth/facecenter/deleteauth/1/getBuildRoomTree",
          tableUrl: "/auth/cardcenter/lotauth/a/getdelcardauthpage",
          delUrl: "/auth/cardcenter/lotauth/b/savedelcardauthpage",
        };
      } else if (this.isType == "5") {
        //指纹
        this.Stext = "指纹号/";
        this.title = "批量删除指纹授权";
        return {
          treeUrl: "/auth/facecenter/deleteauth/1/getBuildRoomTree",
          tableUrl: "/auth/fingercenter/fingerauth/a/getdelfingerauthpage",
          delUrl: "/auth/fingercenter/fingerauth/b/savedelfingerauthpage",
        };
      } else if (this.isType == "7") {
        //蓝牙
        this.Stext = "";
        this.title = "批量删除蓝牙授权";
        this.list[8].show = true;
        this.list[3].show = true;
        this.list[7].show = true;
        this.list[8].noClose = true;
        this.list[3].noClose = true;
        this.list[7].noClose = true;
        console.log("this.list", this.list);
        return {
          treeUrl: "/auth/facecenter/deleteauth/1/getBuildRoomTree",
          tableUrl: "/auth/app/lotauth/6/getdelappauthpage",
          delUrl: "/auth/app/lotauth/7/savedelappauthpage",
        };
      }
    },
  },
  created() {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.onRefresh();
      }
    },
  },
  mounted() {},
  methods: {
    ...mapGetters(["getNumber"]),

    onChoiceWZ(data, type) {
      if (type == "1") {
        this.paramObj.arearoom = data;
        this.paramObj.build = [];
        this.paramObj.type = "2";
      } else {
        this.paramObj.arearoom = [];
        this.paramObj.build = data;
        this.paramObj.type = "1";
      }
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    onRefreshTable() {
      this.refreshTable = new Date().getTime();
    },
    onReset() {
      //   this.paramObj.search = "";
      this.paramObj = {
        arearoom: [],
        build: [],
        type: "1",
        search: "",
      };
      this.$refs.queryPosition.onClear();
      this.onRefresh();
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
    onAction(val, obj) {
      if (val == "D1") {
        this.onDelete();
      }
    },
    onDelete(obj) {
      let id =
        this.isType == "3" ? "rcid" : this.isType == "5" ? "rfid" : "roid";
      let data = {
        type: this.range == "1" ? "1" : "2",
        authids: obj
          ? [obj[id]]
          : this.selecArr.map((item) => {
              return item.rcid;
            }),
        arearoom: this.paramObj.arearoom,
        build: this.paramObj.build,
        type2: this.paramObj.type,
        search: this.paramObj.search,
      };
      this.$confirm("是否删除该授权", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ajax(this.getInfo.delUrl, {}, "1", data, true)
          .then((res) => {
            this.onRefreshTable();
            this.$message({ type: "success", message: "删除成功!" });
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
    onSelectable() {
      return this.isSelectable;
    },
  },
};
</script>

<style lang="scss">
.BatchDelRight {
  .query_main {
    height: 450px;
    .con-select {
      width: 120px;
    }
    .con-search {
      width: 150px;
    }
    .paging-statistics {
      position: absolute;
      bottom: 40px;
      left: 55px;
      display: flex;
      li {
        padding-right: 10px;
        span {
          padding: 2px;
        }
      }
    }
    @media screen and (max-height: 640px) {
      .paging-statistics {
        bottom: 20px;
      }
    }
  }
}
</style>
