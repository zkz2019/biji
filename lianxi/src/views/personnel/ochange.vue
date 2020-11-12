<template>
  <el-dialog
    title="组织变更"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      ref="felForm"
      :selects="selects"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="140px"
      dynamic
      :formData="formData"
    ></fel-form>
  </el-dialog>
</template>

<script>
// import { mapGetters } from "vuex";
// import judge from "@/utils/judge.js";
export default {
  props: {
    dialogVisible: Boolean,
    changetype: String,
    param: Object,
    changearr: Array
    // defaultData: Object,
    // type: null
  },
  data() {
    let $this = this;
    return {
      pgidObj: {},
      selects: {
        pgid: [{ pgid: "", pgname: "正在加载中...", isroom: true }],
        persontype: [],
        personstate: []
      },
      formData: [
        {
          value: "pgid",
          name: "归属组织",
          type: "cascader",
          options: "pgid",
          change: true,
          //   filterable: true,
          props: {
            label: "pgname",
            value: "pgid",
            children: "children"
          }
        }
      ],
      button: [
        {
          type: "2",
          name: "确认"
        },
        {
          type: "1",
          name: "取消"
        }
      ]
    };
  },
  watch: {
    // dialogVisible(val) {
    //   if (val) {
    //     if (this.type == 1) {
    //       this.formData[0].disabled = false;
    //       this.formData[1].disabled = false;
    //     } else {
    //       if (this.defaultData && this.defaultData.pgid) {
    //         this.defaultData.pgid = this.pgidObj[this.defaultData.pgid[0]];
    //       }
    //       this.formData[0].disabled = true;
    //       this.formData[1].disabled = true;
    //     }
    //   }
    // }
  },
  created() {
    this.inGetpersontree();
    // this.inSelectType();
  },
  methods: {
    // ...mapGetters(["getNumber"]),
    // persontypeChange(arr, data) {
    //   let $this = this;
    //   if (arr[0] == "3") {
    //     this.$refs["felForm"].rules["personcode"] = [];
    //   } else {
    //     this.$refs["felForm"].rules["personcode"] = [
    //       {
    //         required: true,
    //         message: "请输入" + $this.getNumber(),
    //         trigger: "blur"
    //       }
    //     ];
    //   }
    // },
    // inSelectType() {
    //   let url = "/person/save/3/getpersonstateandtype";
    //   this.$ajax(url, {}, "1")
    //     .then(res => {
    //       let result = res.result;
    //       this.selects.personstate = result.state;
    //       this.selects.persontype = result.type;
    //     })
    //     .catch(err => {});
    // },
    inGetpersontree() {
      this.$ajax("/person/save/1/getpersontree", {}, "1")
        .then(res => {
          this.setObjData(res.result);
          this.selects.pgid = res.result;
          //   if (this.defaultData && this.defaultData.pgid) {
          //     this.defaultData.pgid = this.pgidObj[this.defaultData.pgid[0]];
          //   }
        })
        .catch(err => {});
    },
    setObjData(arr) {
      arr.forEach(obj => {
        this.pgidObj[obj.pgfatherid] = this.pgidObj[obj.pgfatherid] || [];
        this.pgidObj[obj.pgid] = [...this.pgidObj[obj.pgfatherid], obj.pgid];
        if (obj.children) {
          this.setObjData(obj.children);
        }
      });
    },
    submitForm(data) {
      let pgids = data.pgid;
      if (pgids && pgids.length > 0) {
        data.pgid = pgids[pgids.length - 1];
      }
      //   let pgids = data.pgid;
      //   if (pgids && pgids.length > 0) {
      //     data.pgid = pgids[pgids.length - 1];
      //   }
      //   let url = "/person/update/7/batchupdatepersonlocation";
      //   if (this.type == 1) {
      //     url = "/person/save/2/saveperson";
      //   }
      if (this.changetype == "1") {
        //批量变更组织
        this.$ajax(
          "/person/update/7/batchupdatepersonlocation",
          {
            newpgid: data.pgid
            // personcodes :arr,
          },
          "1",
          this.changearr,
          true
        )
          .then(res => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.beforeClose();
            this.$emit("onRefresh");
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] `+err.resultMsg ,
              type: "error"
            });
          });
      } else if (this.changetype == "2") {
        let obj = Object.assign({ newpgid: data.pgid }, this.param);
        this.$ajax(
          "/person/update/6/updatepersonlocationall",
          obj,
          "1",
          {},
          true
        )
          .then(res => {
            this.$message({
              message: "变更成功",
              type: "success"
            });
            this.beforeClose();
            this.$emit("onRefresh");
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] `+err.resultMsg ,
              type: "error"
            });
          });
      }
    },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>
