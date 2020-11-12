<!-- 新增预订 -->
<template>
  <el-dialog
    title="新增预订"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <fel-form
      ref="felForm"
      :selects="selects"
      @submitForm="submitForm"
      @closeForm="handleClose"
      width="130px"
      dynamic
      :defaultData="defaultData"
      :formData="formData"
    ></fel-form>
    <teamInfo
      @onSelection="onSelection"
      :dialogVisible="teanInfoVisible"
      @beforeClose="teanInfoVisible=false"
      url="/lock/operate/hotel/n/getydteam"
      :obj="teamParam"
    />
    <searchPerson
      @onSelection="onSelectionB"
      :dialogVisible="searchVisible"
      @beforeClose="searchVisible=false"
      :checkedroom="checkedroom"
    />
  </el-dialog>
</template>

<script>
import searchPerson from "./searchPerson";
import teamInfo from "./teamInfo";
import judge from "@/utils/judge.js";
export default {
  props: {
    checkedroom: Object,
    dialogVisible: Boolean
  },
  components: { teamInfo, searchPerson },
  data() {
    var $this = this;
    return {
      teanInfoVisible: false,
      searchVisible: false,
      selects: {},
      teamParam: { personcode: "" },
      defaultData: { teamname: "", personname: "", personsex: 1,personcode:"" },
      teamid: "",
      formData: [
        {
          value: "personname",
          name: "姓名",
          width: "50%",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写姓名",
              trigger: "blur"
            }
          ],
          // buts: [
          //   {
          //     class: "but-X",
          //     name: "搜索",
          //     onClick: this.search
          //   }
          // ]
        },
        {
          value: "personsex",
          name: "性别",
          type: "select",
          width: "50%",
          select: [
            {
              value: 1,
              label: "男"
            },
            {
              value: 0,
              label: "女"
            }
          ],
          rules: [
            {
              required: true,
              message: "请选择性别",
              trigger: "blur"
            }
          ]
        },
        {
          value: "personcode",
          name: "身份证号",
          width: "50%",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写身份证号",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (!judge.isCardID(value)) {
                  callback(new Error("身份证号格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          value: "personphone",
          name: "手机",
          width: "50%",
          type: "text",
          rules: [
            {
              required: true,
              message: "请填写手机号码",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (!value && value !== 0) {
                  callback();
                } else if (!judge.isMobile(value)) {
                  callback(new Error("手机号码格式错误!"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          value: "teamname",
          width: "50%",
          name: "团名",
          type: "text",
          // disabled:true,
          readonly: true,
          buts: [
            {
              class: "but-X",
              name: "选择团",
              onClick: this.onDetails
            }
          ]
        },
        {
          value: "personcompany",
          name: "单位",
          width: "50%",
          type: "text"
        },
        {
          value: "dates",
          name: "开始结束时间",
          type: "date",
          date: "datetimerange",
          dTime: ["00:00:00", "23:59:59"],
          onChange: this.onChange,
          options: { 
            disabledDate(time) {
              return time.getTime() < new Date().getTime() - 86400000;
            }
          },
          format: "yyyy-MM-dd HH:mm:ss",
          rules: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (
                  !value ||
                  value.length == 0 ||
                  value[0] == "" ||
                  value[1] == ""
                ) {
                  callback(new Error("请选择时间段"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        },
        {
          value: "tpremark",
          name: "备注",
          width: "50%",
          type: "text"
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {}
  },
  methods: {
    submitForm(data) {
      delete data.teamname;
      let obj = {
        ...data,
        edate: data.dates[0],
        sdate: data.dates[1],
        teamid: this.teamid
      };
      delete obj.dates;
      this.$ajax(
        "/lock/operate/hotel/g/saveteamperson",
        { ...obj, roomid: this.checkedroom.roomid },
        "1"
      )
        .then(res => {
          this.$message({
            showClose: true,
            message: "新增成功!",
            type: "success"
          });
          this.handleClose();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    handleClose() {
      this.defaultData = { teamname: "", personname: "", personsex: 1 };

      this.$emit("handleClose");
    },
    onDetails(arr, value) {
      if (value.personcode) {
        this.teamParam={personcode:value.personcode};
        this.teanInfoVisible = true;
      }
    },
    search() {
      this.searchVisible = true;
    },
    onSelection(data) {
      this.$refs["felForm"].setData("teamname", data.teamname);
      this.teamid = data.teamid;
      // this.defaultData={...this.defaultData,...data};
    },
    onSelectionB(data) {
      this.teamParam = { personcode: data.personcode };
      this.$refs["felForm"].setData("personname", data.personname);
    }
  }
};
</script>


