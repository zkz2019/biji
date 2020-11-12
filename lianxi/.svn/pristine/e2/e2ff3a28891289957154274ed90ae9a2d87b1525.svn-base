<!-- 弹出窗口 管理员-->
<template>
  <fel-admin
    ref="admin"
    :title="title"
    :dialogVisible="dialogVisible"
    :botButs="botButs"
    :param="paramObj"
    leftInterfaceUrl="/system/device/fingerprint/manager/save/1/getuser"
    interfaceUrl="/system/device/fingerprint/manager/1/getfingerprintmanager"
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
          name: "设备唯一ID",
          prop: "fpcode"
        },
        {
          name: "授权账号",
          prop: "userlogin2",
          // formatter(a, b, c) {
          //   if (a.userlogin == "admin" && c == "admin") {
          //     return "--";
          //   }
          //   return c;
          // }
        },
        {
          name: "授权生效日期",
           minWidth: "100px",
          prop: "fpmdate"
        }
      ]
    };
  },
  computed: {
    paramObj() {
      return { fpcode: this.param.fpcode };
    },
    title() {
      return this.param.fpname + "-管理员";
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
      if (val == "461") {
        //添加负责人
        if (!this.rowpersonnel.userlogin) {
          this.$message({
            message: "请先选中左侧人员",
            type: "warning"
          });
          return;
        }
        this.savefatheruser();
      } else if (val == "462") {
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
      }
    },
    //添加管理员接口
    savefatheruser() {
      this.$ajax(
        "/system/device/fingerprint/manager/save/2/savefingerprintmanager",
        {
          fpcode: this.param.fpcode,
          userlogin: this.rowpersonnel.userlogin
        },
        "1",
        {},
        true
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
        `/system/device/fingerprint/manager/delete/1/deletefingerprintmanager`,
        {
          // fpmid: this.param.fpmid
        },
        "1",
        this.aggregation.map(o => o.fpmid),
        true
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