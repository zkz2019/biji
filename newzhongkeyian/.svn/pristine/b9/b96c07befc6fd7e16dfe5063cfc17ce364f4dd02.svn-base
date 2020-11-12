<!--  -->
<template>
  <el-dialog
    :title="title"
    width="70%"
    class="importHistory"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 query_main">
      <paging-table
        :interface="urls"
        ref="paging-table"
        :list="list"
        :param="param"
        :ajaxType="types=='4'?'9':'1'"
        :refresh="refresh"
      >
        <span class="sli">
          <!-- <inpbox inptext="请输入"> -->
          <el-input
            clearable
            class="search con-search"
            v-model="param.search"
            placeholder="输入授权账户查询"
          ></el-input>
          <!-- </inpbox> -->
          <!-- <inpbox> -->
          <fel-button type="primary" @click="onRefresh">查询</fel-button>
          <fel-button @click="onReset">重置</fel-button>
          <!-- </inpbox> -->
        </span>
      </paging-table>
    </el-container>
    <rightDetails
      :dialogVisible="DetailsVisible"
      :idObj="idObj"
      @beforeClose="DetailsVisible=false"
    ></rightDetails>
  </el-dialog>
</template>

<script>
import rightDetails from "./rightDetails";
export default {
  props: {
    dialogVisible: Boolean,
    types: { type: String, default: "" },
    // title:{type:String,default:""},
    // urls:{type:String,default:""},
  },
  components: {
    rightDetails,
  },
  data() {
    let $this = this;
    return {
      DetailsVisible: false,
      param: { search: "" },
      idObj: {},
      list: [],
      title: "",
      urls: "",
      refresh: 0,
      list: [
        {
          name: "序号",
          type: "$index",
          width: "60px",
        },
        {
          name: "时间",
          prop: "uadate",
          minWidth: "110px",
        },
        {
          name: "操作者姓名",
          prop: "username",
          minWidth: "95px",
        },
        {
          name: "操作账户",
          prop: "userlogin",
          minWidth: "90px",
        },
        {
          name: "授权操作账户",
          minWidth: "105px",
          prop: "userlogin2",
        },

        // {
        //   name: "授权类型",
        //   prop: "uatype",
        //   width: "80px",
        //   formatter(row, b, c, d) {
        //     if (row) {
        //       if (row.uatype == "1") {
        //         return "位置权限";
        //       } else if (row.uatype == "2") {
        //         return "组织权限";
        //       } else if (row.uatype == "3") {
        //         return "人员权限";
        //       }
        //     } else {
        //       return "";
        //     }
        //   }
        // },
        {
          name: "操作类型",
          prop: "uatype2",
          minWidth: "80px",
          formatter(row, b, c, d) {
            if (row) {
              if (row.uatype2 == "1") {
                return "添加";
              } else if (row.uatype2 == "2") {
                return "删除";
              }
            } else {
              return "";
            }
          },
        },
        {
          name: "进度",
          prop: "padallcount",
          width: "60px",
          formatter(row, b, c, d) {
            if (row) {
              let newtotal = Number(row.uanocount) + Number(row.uaokcount);
              let total = Number(row.uaallcount);
              return Math.floor((newtotal / total) * 100) + "%";
            } else {
              return "";
            }
          },
        },
        {
          name: "操作数量",
          prop: "uaallcount",
          minWidth: "80px",
        },
        {
          name: "正在处理数",
          prop: "uacount",
          minWidth: "95px",
        },
        {
          name: "处理成功数",
          prop: "uaokcount",
          minWidth: "95px",
        },
        {
          name: "处理失败数",
          prop: "uanocount",
          minWidth: "95px",
        },

        {
          name: "操作",
          width: "60px",
          template: {
            props: ["scope"],
            methods: {
              onClick(key) {
                $this.onClick(this.scope.row);
              },
            },
            template: `<div class="operat-buts"> 
             <el-button type="text" size="small" @click.stop="onClick">详情</el-button>
            </div>`,
          },
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.types === "1") {
          this.urls = "/system/user/area/save/4/getuserroom";
          this.title = "位置授权操作历史";
          // this.list = this.wzList;
        } else if (this.types === "2") {
          this.urls = "/system/user/supergroup/save/5/getsupergroup";
          this.title = "组织授权操作历史";
          // this.list = this.zzList;
        } else if (this.types === "3") {
          this.urls = "/system/user/group/save/4/getusergroup";
          this.title = "人员授权操作历史";
          // this.list = this.ryList;
        } else if (this.types === "4") {
          this.urls = "/system/user/access/7/listUserAccessDoorAuth";
          this.title = "门禁授权操作历史";
          // this.list = this.ryList;
        }
        this.onRefresh();
      } else {
        this.urls = "";
      }
    },
  },
  methods: {
    onClick(data) {
      console.log("data", data);
      if (this.types === "1") {
        this.idObj = {
          name: "uaid",
          value: data.uaid,
          type: data.uatype2,
          url: "/system/user/area/save/5/getuserroomdetails",
          title: "位置授权详情",
        };
      } else if (this.types === "2") {
        this.idObj = {
          name: "uaid",
          type: data.uatype2,
          value: data.uaid,
          url: "/system/user/supergroup/save/6/getsupergroupdetails",
          title: "组织授权详情",
        };
      } else if (this.types === "3") {
        this.idObj = {
          name: "uaid",
          type: data.uatype2,
          value: data.uaid,
          url: "/system/user/group/save/5/getusergroupdetails",
          title: "人员授权详情",
        };
      } else if (this.types === "4") {
        this.idObj = {
          ismj: true,
          name: "uaid",
          type: data.uatype2,
          value: data.uaid,
          url: "/system/user/access/8/listUserAccessDoorAuthDetails",
          title: "门禁授权详情",
        };
      }
      this.DetailsVisible = true;
      console.log("data", data);
    },
    onReset() {
      this.param.search = "";
      this.onRefresh();
    },
    onRefresh() {
      this.refresh = new Date().getTime();
    },
    beforeClose() {
      this.$emit("beforeClose");
    },
  },
};
</script>
