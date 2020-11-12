<template>
  <el-dialog
    :title="title"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <fel-form
      v-loading="loading"
      ref="felForm"
      class="single-row"
      :selects="selects"
      @submitForm="submitForm"
      @closeForm="beforeClose"
      width="140px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
    <roomtype
      @onRefresh="onRefresh"
      :dialogVisible="dialogRoomtype"
      @beforeClose="dialogRoomtype=false"
    ></roomtype>
  </el-dialog>
</template>

<script>
import roomtype from "./roomType";
export default {
  components: {
    roomtype,
  },
  props: {
    dialogVisible: Boolean,
    param: Object | Array,
  },
  data() {
    return {
      dialogRoomtype: false,
      loading: false,
      typeResult: {},
      typeArr: [4, 5, 6, 7, "4", "5", "6", "7"],
      title: "",
      defaultData: {},
      selects: {
        sequencebuildid: [],
        buildtype: [],
        roomtype: [],
        areatype: [],
        roomnexttype: [],
      },
      formData: [
        {
          noShow: false,
          value: "buildcode",
          name: "建筑编号",
          maxlength: 4,
          type: "text",
          disabled: true,
          rules: [
            {
              required: true,
              message: "请输入建筑编号",
              trigger: "blur",
            },
            {
              validator: (rule, value, callback) => {
                if (!/^[A-Fa-f0-9]+$/.test(value)) {
                  callback(new Error("建筑编号格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur",
            },
          ],
        },
        {
          noShow: false,
          value: "buildtype",
          name: "房间类型",
          type: "select",
          onChange: this.onChangeType,
          select: "buildtype",
          slabel: "name",
          svalue: "id",
          rules: [
            {
              required: true,
              message: "请选择房间类型",
              trigger: "change",
            },
          ],
        },
        {
          noShow: false,
          value: "buildname",
          name: "建筑名称",
          type: "text",
          rules: [
            {
              required: true,
              message: "请输入建筑名称",
              trigger: "blur",
            },
          ],
        },
        {
          noShow: false,
          value: "agtype",
          name: "房间属性",
          type: "select",
          select: "areatype",
          slabel: "name",
          svalue: "id",
          onChange: this.onChangeAgtype,
          rules: [],
        },
        {
          noShow: true,
          value: "roomtype",
          name: "房型",
          type: "select",
          select: "roomtype",
          onChange: this.onChangetype,
          slabel: "housename",
          vkey: "houseid",
          svalue: "",
          rules: [
            {
              required: true,
              message: "请选择房型",
              trigger: "change",
            },
          ],
          buts: [
            {
              class: "but-connect",
              title: "编辑房型",
              icon: "el-icon-edit",
              onClick: this.personClick,
            },
          ],
        },
        {
          noShow: true,
          value: "houseprice",
          name: "房价",
          type: "text",
          disabled: true,
        },
        {
          noShow: true,
          value: "roommaxperson",
          name: "最大入住人数",
          type: "text",
        },
        {
          noShow: true,
          value: "roomnexttype",
          name: "类别",
          type: "select",
          select: "roomnexttype",
          slabel: "name",
          svalue: "id",
          rules: [
            {
              required: true,
              message: "请选择类别",
              trigger: "change",
            },
          ],
        },
        {
          value: "prebuildid",
          noShow: false,
          name: "位置",
          type: "select",
          select: "sequencebuildid",
          slabel: "name",
          placeholder: "默认不修改位置",
          svalue: "id",
          buts: [
            {
              class: "but-C",
              icon: "el-icon-question",
              isPopover: true,
              popover: {
                content: "建筑可调整到所选位置之后",
              },
            },
          ],
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.inSelectType();
        if (this.param && this.param.length > 0) {
          // this.formData[0].disabled = true;
          this.formData[6].noShow = true;
          this.formData[3].noShow = false;
          this.formData[4].noShow = true;
          this.formData[5].noShow = true;
          this.formData[7].noShow = true;
          this.selects.areatype = this.typeResult.atlist || [];
          this.formData[1].noShow = true;
          if (this.param.length == 1) {
            this.ingetbuildsbyfather(this.param[0]);
            this.formData[0].noShow = false;
            this.formData[2].noShow = false;
            this.formData[3].rules = [
              { required: true, message: "请选择房间属性", trigger: "change" },
            ];
            if (this.$refs["felForm"]) {
              this.$refs.felForm.rules = this.$refs.felForm.rules || {};
              this.$refs.felForm.rules.agtype = [
                {
                  required: true,
                  message: "请选择房间属性",
                  trigger: "change",
                },
              ];
            }
            if (this.param[0].buildtype == 0) {
              this.title = "修改区域建筑";
              this.formData[8].name = "区域位置调整";
            } else if (this.param[0].buildtype == 1) {
              this.title = "修改区域建筑";
              this.formData[8].name = "区域位置调整";
            } else if (this.param[0].buildtype == 2) {
              this.title = "修改楼栋建筑";
              this.formData[8].name = "楼栋位置调整";
            } else if (this.param[0].buildtype == 3) {
              this.title = "修改楼层建筑";
              this.formData[8].name = "楼层位置调整";
            }
            this.inGetroominfo(this.param[0]);
            if (this.typeArr.includes(this.param[0].buildtype)) {
              this.title = "修改房间";
              this.formData[8].name = "房间位置调整";
              this.selects.areatype = this.typeResult.rtlist || [];
              this.formData[1].noShow = false;
            }
          } else {
            this.ingetbuildsbyfather(this.param, true);
            this.defaultData = {
              buildtype: 1,
            };
            if (this.$refs["felForm"] && this.$refs["felForm"].rules) {
              this.$refs.felForm.rules.agtype = [];
            }
            this.formData[0].noShow = true;
            this.formData[2].noShow = true;
            this.title = "批量修改建筑";
            this.formData[8].name = "建筑位置调整";
            if (this.typeArr.includes(this.param[0].buildtype)) {
              this.title = "批量修改房间";
              this.formData[8].name = "房间位置调整";
              this.selects.areatype = this.typeResult.rtlist || [];
            }
          }
        }
      }
    },
  },
  created() {
    // this.inSelectType();
  },
  methods: {
    onRefresh() {
      this.inSelectType();
    },
    personClick() {
      this.dialogRoomtype = true;
    },
    onChangetype(arr, data) {
      let obj = arr[0] || {};
      data.houseid = obj.houseid;
      data.houseprice = obj.houseprice;
      data.roommaxperson = obj.maxperson;
    },
    inGetroominfo(data) {
      this.loading = true;
      this.$ajax("/system/build/update/9/getroominfo", {}, "1", data)
        .then((res) => {
          let result = res.result;
          if (result) {
            if (result.buildcode == "--") {
              result.buildcode = "";
            }
            if (result.buildname == "--") {
              result.buildname = "";
            }
            // if(result.buildtype == 7 || result.buildtype == 6){
            //   this.formData[0].disabled = false;
            // }
            result.roomtype = {
              houseid: result.houseid || "",
              housename: result.housename || "",
              maxperson: result.roommaxperson || "",
              houseprice: result.houseprice || "",
            };
            this.defaultData = result;
            console.log("result", result);
            this.onChangeAgtype([this.defaultData.agtype], this.defaultData);
            this.onChangeType([this.defaultData.buildtype], this.defaultData);
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    onChangeAgtype(arr, data) {
      this.formData[7].noShow = true;
      if (
        data.buildtype == "1" ||
        data.buildtype == "2" ||
        data.buildtype == "3" ||
        data.buildtype == "4"
      ) {
        // this.formData[4].noShow = true;
        // this.formData[5].noShow = true;
        // this.formData[6].noShow = true;
        // } else if (data.buildtype == "4") {
        if (arr[0] == 1) {
          this.formData[6].noShow = false;
          this.formData[4].noShow = true;
          this.formData[5].noShow = true;
        } else if (arr[0] == 4) {
          this.formData[4].noShow = false;
          this.formData[5].noShow = false;
          this.formData[6].noShow = false;
        } else {
          if (arr[0] == 2 && data.buildtype == "4") {
            this.formData[7].noShow = false;
          }
          this.formData[4].noShow = true;
          this.formData[5].noShow = true;
          this.formData[6].noShow = true;
        }
      }
    },
    onChangeType(arr, data) {
      this.formData[6].noShow = true;
      this.formData[7].noShow = true;
      if (arr[0] == 4) {
        this.formData[2].noShow = false;
        this.formData[3].noShow = false;
        if (data.agtype == 1) {
          this.formData[6].noShow = false;
        } else if (data.agtype == 2) {
          this.formData[7].noShow = false;
        }
      } else if (arr[0] == 5) {
        this.formData[2].noShow = true;
        this.formData[3].noShow = true;
      } else if (arr[0] == 6) {
        this.formData[2].noShow = false;
        this.formData[3].noShow = true;
      } else if (arr[0] == 7) {
        this.formData[2].noShow = false;
        this.formData[3].noShow = true;
      }
    },
    ingetbuildsbyfather(data, is) {
      let url = "/system/build/update/d/getbuildsbyfather";
      if (is) {
        url = "/system/build/update/e/getbuildsbyfather2";
      }
      this.$ajax(url, {}, "1", data)
        .then((res) => {
          this.selects.sequencebuildid = res.result || [];
          if (this.selects.sequencebuildid.length == 0) {
            this.formData[8].noShow = true;
          } else {
            this.formData[8].noShow = false;
          }
        })
        .catch((err) => {});
    },
    inSelectType() {
      let url = "/system/build/update/8/getagtype";
      this.$ajax(url, {}, "1")
        .then((res) => {
          this.typeResult = res.result || {};
          this.typeResult.atlist = this.typeResult.atlist.map((obj) => {
            obj.id = obj.id + "";
            return obj;
          });
          this.typeResult.roomlist = this.typeResult.roomlist.map((obj) => {
            obj.id = obj.id + "";
            return obj;
          });
          this.typeResult.rtlist = this.typeResult.rtlist.map((obj) => {
            obj.id = obj.id + "";
            return obj;
          });
          this.selects.areatype = this.typeResult.atlist;
          this.selects.buildtype = this.typeResult.roomlist;
          this.selects.roomnexttype = this.typeResult.publictypelist;
          if (this.typeArr.includes(this.param[0].buildtype)) {
            this.selects.areatype = this.typeResult.rtlist;
          }
          this.selects.roomtype = this.typeResult.houselist.map((obj) => {
            obj.houseid = obj.houseid + "";
            return obj;
          });
          if (this.$refs["felForm"]) {
            let obj = this.$refs["felForm"].ruleForm;
            if (obj && obj.areatype == 4) {
              if (obj.roomtype && obj.roomtype.houseid) {
                let arr = this.selects.roomtype.filter((val) => {
                  return obj.roomtype.houseid == val.houseid;
                });
                if (arr && arr.length > 0) {
                  obj.roomtype = arr[0];
                  obj.houseid = arr[0].houseid;
                  obj.houseprice = arr[0].houseprice;
                  obj.roommaxperson = arr[0].maxperson;
                } else {
                  obj.roomtype = "";
                  obj.houseid = "";
                  obj.houseprice = "";
                  // obj.roommaxperson = "";
                }
              }
            }
          }
        })
        .catch((err) => {});
    },
    inUpdatenextbuild(data) {
      let sequencebuildid = data.prebuildid || "";
      if (this.defaultData.prebuildid == data.prebuildid) {
        sequencebuildid = "";
      }
      let houseid = "";
      if (data.roomtype) {
        houseid = data.roomtype.houseid || "";
      }
      if (data.areatype == 4) {
        if (!houseid) {
          this.$message({
            showClose: true,
            message: "请选择房型",
            type: "error",
          });
          return false;
        }
      }
      delete data.roomtype;
      delete data.prebuildid;
      this.$ajax(
        "/system/build/update/3/updatenextbuild",
        {
          houseid: houseid,
          sequencebuildid: sequencebuildid,
        },
        "1",
        data
      )
        .then((res) => {
          this.$emit("onRefresh");
          this.beforeClose();
          this.$message({
            message: this.title + "成功",
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
    },

    inUpdatenextbuilds(data) {
      if (!data.prebuildid && !data.agtype) {
        this.$message({
          showClose: true,
          message: "请选择要批量修改的内容",
          type: "error",
        });
        return false;
      }
      let sequencebuildid = data.prebuildid || "";
      let houseid = "";
      if (data.roomtype) {
        houseid = data.roomtype.houseid || "";
      }
      if (data.areatype == 4) {
        if (!houseid) {
          this.$message({
            showClose: true,
            message: "请选择房型",
            type: "error",
          });
          return false;
        }
      }
      delete data.roomtype;
      delete data.prebuildid;
      let arr = [];
      // if (data.buildtype) {
      //   arr = this.param.map(obj => {
      //     obj.agtype = data.agtype;
      //     obj.buildtype = data.buildtype;
      //     return obj;
      //   });
      // } else {
      if (data.agtype) {
        this.param.forEach((obj) => {
          let o = Object.assign({}, obj);
          o.agtype = data.agtype;
          o.roommaxperson = data.roommaxperson;
          arr.push(o);
        });
      } else {
        this.param.forEach((obj) => {
          let o = Object.assign({}, obj);
          arr.push(o);
        });
      }

      let callback = () => {
        this.$ajax(
          "/system/build/update/4/updatenextbuilds",
          {
            type: 2,
            sequencebuildid: sequencebuildid,
            houseid: houseid,
          },
          "1",
          arr,
          true
        )
          .then((res) => {
            this.$emit("onRefresh");
            this.beforeClose();
            this.$message({
              message: this.title + "成功",
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
      };

      this.$ajax(
        "/system/build/update/4/updatenextbuilds",
        {
          type: 1,
          sequencebuildid: sequencebuildid,
          houseid: houseid,
        },
        "1",
        arr,
        true
      )
        .then((res) => {
          this.$emit("onRefresh");
          this.beforeClose();
          this.$message({
            message: this.title + "成功",
            type: "success",
          });
        })
        .catch((err) => {
          if (err.resultCode == "05004305") {
            this.$confirm(err.resultMsg, "提示", {
              confirmButtonText: "过滤修改",
              cancelButtonText: "取消",
              showClose: false,
              type: "warning",
            })
              .then(() => {
                callback();
              })
              .catch(() => {});
          } else {
            this.$message({
              showClose: true,
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error",
            });
          }
        });
      // }
    },

    submitForm(data) {
      if (this.param.length == 1) {
        this.inUpdatenextbuild(data);
      } else {
        this.inUpdatenextbuilds(data);
      }
    },
    beforeClose() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.formData[6].noShow = true;
      this.defaultData = {};
      this.$emit("beforeClose");
    },
  },
};
</script>
