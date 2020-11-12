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
            @onChoice="onChoiceWZ"
            ajaxType="9"
            :interface="getInfo.treeUrl"
          ></queryPosition>
        </inpbox>
        <inpbox :inpb="true">
          <el-input
            clearable
            class="qh_inp wid250"
            v-model="param.search"
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
        ajaxType="9"
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
import queryPosition from "./queryPositionMj";
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
      refresh: 0,
      Stext: "",
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
        areas: [],
      },
      refreshTable: 0,
      param: {
        search: "",
      },
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
          minWidth: "170px",
          prop: "amlocation",
        },
        {
          name: "授权详情",
          // prop: "facecode",
          show: false,
          noClose: false,
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
          prop: "issend",
          noClose: false,
          show: true,
          template: {
            props: ["scope"],
            methods: {
              getClass() {
                let value = this.scope.row.issend;
                if (value == "1") {
                  return "puc-pg";
                } else if (value == "-1") {
                  return "puc-px";
                } else {
                  return "";
                }
              },
              getText() {
                let issend = this.scope.row.issend;
                let value =
                  issend == "1"
                    ? "下发成功"
                    : issend == "-1"
                    ? "下发失败"
                    : "正在下发";
                return value;
              },
            },
            template: `<span :class="getClass()">{{getText()}}</span>`,
          },
        },
        {
          name: "失败原因",
          minWidth: "90px",
          noClose: false,
          show: false,
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
      if (this.isType == "2") {
        //人脸
        this.title = "批量删除人脸授权";
        this.Stext = "人脸编号/";
        return {
          treeUrl: "/access/v2.0/deleteauth/1/listAccessDoorTree",
          tableUrl: "/access/v2.0/deleteauth/2/listAccessAuthFace",
          delUrl: "/access/v2.0/deleteauth/3/deleteAccessAuthFace",
        };
      } else if (this.isType == "4") {
        //卡片
        this.Stext = "卡号/";
        this.title = "批量删除卡片授权";
        return {
          treeUrl: "/access/v2.0/deleteauth/1/listAccessDoorTree",
          tableUrl: "/access/v2.0/deleteauth/8/listAccessAuthCard",
          delUrl: "/access/v2.0/deleteauth/9/deleteAccessAuthCard",
        };
      } else if (this.isType == "6") {
        //指纹
        this.Stext = "指纹号/";
        this.title = "批量删除指纹授权";
        return {
          treeUrl: "/access/v2.0/deleteauth/1/listAccessDoorTree",
          tableUrl: "/access/v2.0/deleteauth/5/listAccessAuthFinger",
          delUrl: "/access/v2.0/deleteauth/6/deleteAccessAuthFinger",
        };
      } else if (this.isType == "8") {
        //蓝牙
        this.title = "批量删除蓝牙授权";
        this.Stext = "";
        this.list[7].show = true;
        this.list[3].show = true;
        this.list[8].show = true;
        this.list[7].noClose = true;
        this.list[3].noClose = true;
        this.list[8].noClose = true;
        console.log("this.list", this.list);
        return {
          treeUrl: "/access/v2.0/deleteauth/1/listAccessDoorTree",
          tableUrl: "/access/v2.0/deleteauth/b/listAccessAuthApp",
          delUrl: "/access/v2.0/deleteauth/c/deleteAccessAuthApp",
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
      this.paramObj.areas = data;
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
      this.param.search = "";
      this.paramObj = {
        areas: [],
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
        this.isType == "4" ? "aucid" : this.isType == "6" ? "aufid" : "auaid";
      let data =
        this.isType == "2"
          ? {
              actiontype: this.range == "1" ? "勾选范围" : "全选范围",
              search: this.param.search,
              auths: obj ? [obj] : this.selecArr,
              // ...this.param,
              areas: this.paramObj.areas,
              adaftype: "1",
              // ...this.paramObj,
            }
          : {
              type: this.range == "1" ? "2" : "1",
              search: this.param.search,
              auths: obj
                ? [obj[id]]
                : this.selecArr.map((item) => {
                    return item[id];
                  }),
              areas: this.paramObj.areas,
            };
      this.$confirm("是否删除该授权", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ajax(this.getInfo.delUrl, data, "9")
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
