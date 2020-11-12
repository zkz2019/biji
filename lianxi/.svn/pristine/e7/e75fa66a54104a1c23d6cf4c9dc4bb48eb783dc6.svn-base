<!-- 新增更换门禁 -->
<template>
  <el-dialog
    :title="isAdd?'新增门禁':'更换门禁'"
    :width="isAdd?'70%':'60%'"
    top="10vh"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container>
      <fel-left-tree v-if="isAdd" class="building-copy">
        <div slot="left" class="left-tree">
          <fel-tree1
            ref="felTree1"
            slot="top"
            :showCheckbox="false"
            class="tree1 co_tree"
            :idArr="[0]"
            ajaxType="9"
            :param="{agfatherid:''}"
            paramKey="agfatherid"
            iconName="agtype"
            nodeKey="agid"
            :defaultProps="{
            children: 'children',
            label: 'agname',
            isLeaf: 'isLeaf'}"
            interface="/access/v2.0/main/1/listAreaTree"
            :refresh="refresh"
            @handleNodeClick="handleNodeClick"
          ></fel-tree1>
        </div>
        <fel-form
          class="single-row"
          ref="felForm"
          style="margin-top:18%"
          :selects="selects"
          @submitForm="submitForm"
          @closeForm="beforeClose"
          width="140px"
          dynamic
          :button="[]"
          :defaultData="isAdd?addDefault:defaultData"
          :formData="formDatas"
        ></fel-form>
      </fel-left-tree>
      <el-main v-else>
        <fel-form
          class="single-row"
          ref="felForm"
          style="margin:10% 0;"
          :selects="selects"
          @submitForm="submitForm"
          @closeForm="beforeClose"
          width="140px"
          dynamic
          :button="[]"
          :defaultData="isAdd?addDefault:defaultData"
          :formData="formDatas"
        ></fel-form>
      </el-main>
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
    isAdd: { type: Boolean, defult: true },
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
      idArr: [0],
      isfirst: true,
      refresh: 0,
      addDefault: { position: "建筑" },
      fatheragid: {},
      agid: {},
      urls: "",
      text: "新增",
      initUpdate: true,
      inputStr: false,
      selects: {
        // accesstxtype: [],
        // buildtype2: [
        //   { buildtype2: "1", name: this.getRoomtype2()()[1] || "宿舍房间" },
        //   { buildtype2: "2", name: this.getRoomtype2()()[2] || "公共房间" }
        // ]
      },
      formDatas: [],
      formData: [
        {
          noShow: false,
          value: "position",
          name: "门禁位置",
          type: "text",
          disabled: true
        },
        {
          noShow: false,
          value: "amname",
          name: "门禁名称",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写门禁名称",
              trigger: "blur"
            }
          ]
        },
        {
          noShow: false,
          value: "amcode",
          name: "门禁唯一ID",
          type: "text",
          onInput: this.onInput,
          rules: [
            {
              validator: (rule, value, callback) => {
                let reg = /^[0-9]*$/;
                let next = reg.test(value);
                if (
                  (next && value.length == 10) ||
                  value == undefined ||
                  value == ""
                ) {
                  callback();
                } else {
                  callback(new Error("请输入10位数字"));
                }
              },
              trigger: "blur"
            }
          ]
        }
      ],
      formData1: [
        {
          disabled: true,
          value: "aglocation",
          name: "当前位置",
          type: "text"
        },
        {
          noShow: false,
          value: "amname",
          name: "门禁名称",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写门禁名称",
              trigger: "blur"
            }
          ]
        },
        {
          disabled: true,
          value: "oldAmcode",
          name: "现有门禁唯一ID",
          type: "text",
          onInput: this.onInput
        },
        {
          noShow: false,
          value: "amcode",
          name: "新门禁唯一ID",
          type: "text",
          onInput: this.onInput,
          rules: [
            {
              validator: (rule, value, callback) => {
                let reg = /^[0-9]*$/;
                let next = reg.test(value);
                if (
                  (next && value.length == 10) ||
                  value == undefined ||
                  value == ""
                ) {
                  callback();
                } else {
                  callback(new Error("请输入10位数字"));
                }
              },
              trigger: "input"
            }
          ]
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
    dialogVisible(val) {
      if (val) {
        if (this.isAdd) {
          this.text = "新增";
          this.formDatas = this.formData;
          this.urls = "/access/v2.0/main/5/addAccessMain";
          this.setName();
          this.setId();
        } else {
          this.text = "更换";
          this.urls = "/access/v2.0/main/7/updateAccessMain";
          this.formDatas = this.formData1;
          this.agid.agid = this.defaultData.agid;
          this.initUpdate = false;
          // this.getUpdates();
        }
        // this.idArr = this.param.buildidArr;
        this.refresh = new Date().getTime();
        // this.getaccesstxtype();
      }
    }
  },
  mounted() {
    if (this.isAdd) {
      this.setId();
      this.setName();
    }
  },
  methods: {
    getUpdates() {
      this.$ajax(
        "/access/v2.0/main/6/getUpdateAccessMain",
        { amid: this.defaultData.amid },
        "9"
      )
        .then(res => {
          this.agid.agid = res.result.agid;
          this.defaultData = res.result;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    setName() {
      if (this.$refs.felForm && !this.first) {
        let position = this.param.buildnameArr.join("-");
        this.$refs.felForm.setData("position", position);
      } else {
        setTimeout(() => {
          this.setName();
        }, 100);
      }
    },
    setId(num = 0) {
      if (this.$refs.felTree1) {
        this.$refs.felTree1.addIdSets(this.param.buildidArr);
        let key = this.param.buildidArr[this.param.buildidArr.length - 1];
        this.agid.agid = key;
        let timeNum = 0;
        let clearNum = this.param.buildidArr.length
          ? this.param.buildidArr.length + 3
          : 3;
        let timer = setInterval(() => {
          timeNum++;
          if (timeNum >= clearNum) {
            clearInterval(timer);
          }
          this.$refs.felTree1.setCurrentKey(key);
        }, 300);
      } else {
        if (num > 10) {
          return;
        }
        setTimeout(() => {
          this.setId(num + 1);
        }, 200);
      }
    },
    ...mapGetters(["getRoomtype2"]),
    onInput(str) {
      if (str[0] != "") {
        this.inputStr = true;
      } else {
        this.inputStr = false;
      }
    },
    // getaccesstxtype() {
    //   this.$ajax(
    //     "/system/device/deviceaccess/saveaccess/3/getaccesstxtype",
    //     {},
    //     "1"
    //   )
    //     .then(res => {
    //       this.selects.accesstxtype = res.result;
    //     })
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // },
    dialogSubmitForm() {
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].submitForm();
      }
    },
    getPosition(node) {
      if (node.parent) {
        let last = node.data.agname;
        let first = this.getPosition(node.parent);
        return first ? first + "-" + last : last;
      } else {
        return;
      }
    },
    handleNodeClick(data, obj) {
      if (!this.isfirst) {
        this.isfirst = true;
      }
      let position;
      if (this.$refs.felTree1) {
        let k = this.$refs.felTree1.getNode(data.agid);
        position = this.getPosition(k);
      }
      if (this.isAdd) {
        this.agid.agid = data.agid;
        this.$refs.felForm.setData("position", position);
      } else {
        if (this.initUpdate) {
          this.agid.agid = data.agid;
        }
      }
    },

    submitForm(data) {
      if (this.agid.agid == "0") {
        this.$message({ type: "error", message: "请勿选择顶级建筑进行操作!" });
        return;
      }
      data.amcode = data.amcode ? data.amcode : "";
      this.$ajax(this.urls, data, "9", this.agid)
        .then(res => {
          this.beforeClose(true);
          this.$message({
            type: "success",
            message: this.text + "配置成功!"
          });
        })
        .catch(err => {
          // this.beforeClose();
          this.$message({
            type: "error",
            message:
              `[${err.resultCode}] ` + err.resultMsg ||
              this.text + "门禁下发失败!"
          });
          console.log("err", err);
        });
    },
    beforeClose(bool = false) {
      this.fatheragid = {};
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
      }
      this.$emit("beforeClose", bool);
    }
  }
};
</script>
