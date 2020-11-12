<template>
  <el-dialog
    title="新增门禁"
    width="70%"
    top="10vh"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container>
      <fel-left-tree class="building-copy">
        <div slot="left" class="left-tree">
          <fel-tree1
            slot="top"
            :showCheckbox="false"
            class="tree1 co_tree"
            :idArr="[0]"
            :refresh="refresh"
            interface="/system/device/deviceaccess/saveaccess/1/getbuildtree"
            @handleNodeClick="handleNodeClick"
          ></fel-tree1>
        </div>
        <fel-form
          class="single-row"
          ref="felForm"
          :selects="selects"
          @submitForm="submitForm"
          @closeForm="beforeClose"
          width="140px"
          dynamic
          :button="[]"
          :defaultData="defaultData"
          :formData="formData"
        ></fel-form>
      </fel-left-tree>
    </el-container>
    <div slot="footer" class="dialog-button">
      <el-button @click="beforeClose">取消</el-button>
      <el-button type="primary" @click="dialogSubmitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    dialogVisible: Boolean,
    defaultData: {
      type: Object,
      default() {
        return {};
      }
    },
    param: Object
  },
  data() {
    var $this = this;
    return {
      refresh: 0,
      fatheragid: {},
      build: {},
      inputStr: false,
      selects: {
        accesstxtype: [],
        buildtype2: [
          { buildtype2: "1", name: this.getRoomtype2()()[1] || "宿舍房间" },
          { buildtype2: "2", name: this.getRoomtype2()()[2] || "公共房间" }
        ]
      },
      formData: [
        // {
        //   noShow: false,
        //   value: "accesstxtype",
        //   name: "门禁通讯类别",
        //   type: "select",
        //   select: "accesstxtype",
        //   svalue: "accesstxtype",
        //   slabel: "typename",
        //   rules: [
        //     {
        //       required: false,
        //       validator: (rule, value, callback) => {
        //         if ($this.inputStr&&value==undefined) {
        //           callback(new Error("请选择通讯类别"));
        //         } else {
        //           callback();
        //         }
        //       },
        //       trigger: "blur"
        //     }
        //   ]
        // },
        {
          noShow: false,
          value: "accessname",
          name: "主控板名称",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写主控板名称",
              trigger: "blur"
            }
          ]
        },
        {
          noShow: false,
          value: "accesscode",
          name: "主控板唯一ID",
          type: "text",
          onInput: this.onInput
        }
        // {
        //   noShow: false,
        //   value: "buildtype2",
        //   name: "区域类型",
        //   type: "select",
        //   select: "buildtype2",
        //   svalue: "buildtype2",
        //   slabel: "name",
        //   rules: [
        //     {
        //       required: true,
        //       message: "请填写主控板名称",
        //       trigger: "blur"
        //     }
        //   ]
        // }
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
    dialogVisible(val) {
      if (val) {
        this.getaccesstxtype();
      }
    }
  },
  created() {},
  methods: {
    ...mapGetters(["getRoomtype2"]),
    onInput(str) {
      if (str[0] != "") {
        this.inputStr = true;
      } else {
        this.inputStr = false;
      }
    },
    getaccesstxtype() {
      this.$ajax(
        "/system/device/deviceaccess/saveaccess/3/getaccesstxtype",
        {},
        "1"
      )
        .then(res => {
          this.selects.accesstxtype = res.result;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    dialogSubmitForm() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].submitForm();
      }
    },
    handleNodeClick(data) {
      this.build = data;
      // if (data.buildtype2 != 3) {
      //   this.formData[2].noShow = true;
      // } else {
      //   this.formData[2].noShow = false;
      // }
    },

    submitForm(data) {
      this.$ajax(
        "/system/device/deviceaccess/saveaccess/2/saveaccess",
        data,
        "1",
        this.build
      )
        .then(res => {
          this.beforeClose();
          this.$message({ type: "success", message: "新增门禁已下发!" });
        })
        .catch(err => {
          this.beforeClose();
          this.$message({
            type: "error",
            message:
              `[${err.resultCode}] ` + err.resultMsg || "新增门禁下发失败!"
          });
          console.log("err", err);
        });
    },
    beforeClose() {
      this.fatheragid = {};
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose");
    }
  }
};
</script>
