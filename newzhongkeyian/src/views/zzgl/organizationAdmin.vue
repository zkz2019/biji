<!-- 弹出窗口 管理员-->
<template>
  <fel-admin
    ref="admin"
    :title="title"
    :dialogVisible="dialogVisible"
    :botButs="botButs"
    :param="paramObj"
    leftInterfaceUrl="/system/group/savemanager/2/getgroupmanager"
    interfaceUrl="/system/group/savemanager/4/getallgroupmanager"
    :leftList="fuList"
    :list="list"
    @beforeClose="beforeClose" 
    @onSelectLeft="onSelect"
    @onSelection="onSelection"
    @onClick="onClick"
  ></fel-admin>
</template>

<script>
export default {
  props: {
    title: String,
    dialogVisible: Boolean,
    botButs: Array,
    param: Object | Array
  },
  data() {
    return {
      aggregation: [],
      rowpersonnel: {},
      fuList: [
        {
          prop: "userlogin",
          tooltip: true,
          name: "账号"
        },
        {
          prop: "username",
          tooltip: true,
          name: "姓名"
        }
      ],
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
          name: "管理员账号",
          prop: "userlogin"
        },
        {
          name: "使用者姓名",
          prop: "username"
        },
        {
          name: "账号角色",
          prop: "userrole"
        },
        {
          name: "管理权限",
          prop: "pgmmanager",
          formatter(a, b, c) {
            return c == 1 ? "是" : "否";
          }
        },
        {
          name: "授权账号",
          prop: "userlogin2"
          // formatter(a, b, c) {
          //   if (a.userlogin == "admin" && c == "admin") {
          //     return "--";
          //   }
          //   return c;
          // }
        },
        {
          name: "授权生效时间",
          minWidth: "100px",
          prop: "pgmdate"
        }
      ]
    };
  },
  computed: {
    paramObj() {
      return { pgid: this.param.pgid };
    }
  },
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect(data) {
      this.rowpersonnel = data;
    },
    onSelection(data) {
      this.aggregation = data;
    },
    onClick(val) {
      if (val == "g1" || val == 4) {
        //4是后台传过来的添加管理员id
        //添加负责人
        if (!this.rowpersonnel.userlogin) {
          this.$message({
            message: "请先选中左侧人员",
            type: "warning"
          });
          return;
        }
        this.savefatheruser();
      } else if (val == "g4" || val == 8) {
        //8是后台传过来的删除管理员id
        //删除负责人
        if (this.aggregation.length == 0) {
          this.$message({
            message: "请先选中管理员",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否删除选中的管理员?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.delareamanager();
          })
          .catch(err => {});
      } else if (val == "750") {
        //添加
        if (this.aggregation.length == 0) {
          this.$message({
            message: "请先选中管理员",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否删除选中的管理授权?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$confirm("是否删除子组织管理权限?", "提示", {
              confirmButtonText: "是",
              cancelButtonText: "否",
              showClose: false,
              type: "warning"
            })
              .then(() => {
                this.delete(1);
              })
              .catch(err => {
                this.delete(0);
              });
          })
          .catch(err => {});
      } else if (val == "749") {
        //添加
        if (this.aggregation.length == 0) {
          this.$message({
            message: "请先选中管理员",
            type: "warning"
          });
          return;
        }
        this.$confirm("是否给选中添加管理授权?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.add();
            // this.delareamanager();
          })
          .catch(err => {});
      }
    },
    //添加授权
    add() {
      this.$ajax(
        "system/group/savemanager/5/savegroupmanages",
        {},
        "1",
        this.aggregation.map(o => o.pgmid),
        true
      )
        .then(res => {
          this.$refs.admin.refreshData();
          this.$message({
            message: "成功添加授权",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    //添加授权
    delete(isdelson) {
      this.$ajax(
        "/system/group/deletemanager/2/delgroupmanages",
        {
          isdelson: isdelson
        },
        "1",
        this.aggregation.map(o => o.pgmid),
        true
      )
        .then(res => {
          this.$refs.admin.refreshData();
          this.$message({
            message: "成功删除授权",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    //添加管理员接口
    savefatheruser() {
      this.$ajax(
        "/system/group/savemanager/3/savegroupmanager",
        {
          pgid: this.param.pgid
        },
        "1",
        [this.rowpersonnel.userlogin],
        true,
        60000
      )
        .then(res => {
          this.$refs.admin.refreshData();
          this.rowpersonnel = {};
          this.$message({
            message: "成功添加管理员",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
        });
    },
    //删除管理员接口
    delareamanager() {
      this.$ajax(
        `/system/group/deletemanager/1/deletegroupmanager`,
        {
          pgid: this.param.pgid
        },
        "1",
        this.aggregation.map(o => o.userlogin),
        true,
        60000
      )
        .then(res => {
          this.aggregation = [];
          this.$refs.admin.refreshData();
          this.$message({
            message: "成功删除已选中的管理员",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
            type: "error"
          });
        });
    }
  }
};
</script>
