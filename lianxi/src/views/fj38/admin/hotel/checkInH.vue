<!-- 办理入住--酒店  -->
<template>
  <el-container>
    <fel-left-tree class="checkIn">
      <div slot="left" class="left-tree">
        <adminLeft
          ref="adminLeft"
          :checkedroom="checkedroom"
          @checkp="checkp"
          :refresh="adminRefresh"
          :cwShow="false"
          :ztShow="true"
          url="/lock/operate/hotel/4/getroompersonsimple"
        />
      </div>
      <el-container v-loading="loading1" class="checkIn_right">
        <checkInHead
          :checkedroom="checkedroom"
          :reset="resetHead"
          @onChange="onChange"
          @searchIDCard="searchIDCard"
          @readIDCard="readIDCard"
          @searchID="searchID"
          @onReset="onEmpty"
        ></checkInHead>
        <el-main class="checkIn_right_center">
          <div ref="checkIn_right_table" class="checkIn_right_table">
            <form-table width="140px" :column="1" :param="defaultData" :list="tableData"></form-table>
            <div class="table-img">
              <img :src="personnel.personimage">
            </div>
          </div>
        </el-main>
        <el-footer class="padt10">
          <fel-button class="qh_btn" type="primary" @click="Determine">办理入住</fel-button>
          <fel-button class="qh_btn" type="primary" @click="outClick">办理退房</fel-button>
          <fel-button class="qh_btn" type="primary" @click="onContinue">办理续住</fel-button>
          <div class="flr">
            <el-cascader
              class="wid200 maR10"
              clearable
              placeholder="请选择位置"
              @change="changePsition"
              v-model="outpersoncode"
              :options="states"
              :props="{value:'agid',label:'agname'}"
            ></el-cascader>
            <fel-button class="qh_btn" type="primary" @click="repClick">办理换房</fel-button>
          </div>
        </el-footer>
      </el-container>
    </fel-left-tree>
    <checkOutInfo
      :param="checkOutParam"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
      @next="outNext"
    />
    <teanInfo
      @onSelection="onSelection"
      :dialogVisible="teanInfoVisible"
      @beforeClose="teanInfoVisible=false"
      :obj="{personcode:defaultData.personcode}"
    />
  </el-container>
</template>

<script>
import checkOutInfo from "./dialog/checkOutHInfo";
import checkInHead from "./checkInHead";
import teanInfo from "./dialog/teamInfo";
import { mapGetters } from "vuex";
import { format } from "@/utils/utils.js";
import judge from "@/utils/judge.js";
import adminLeft from "./../admin-left";
export default {
  props: {
    checkedroom: Object
  },
  components: {
    adminLeft,
    teanInfo,
    checkInHead,
    checkOutInfo
  },
  data() {
    var $this = this;
    return {
      resetHead: 0,
      adminRefresh: 0,
      rzdisabled: true,
      tfdisabled: true,
      hfdisabled: true,
      teanInfoVisible: false,
      dialogVisible: false,
      outpersoncode: [],
      states: [],
      nextListen: false,
      nextListenB: false,
      loading1: false,
      loading: false,
      idCardData:{},
      nextrepObj: { isteamrz: "0", isxbrz: "0" },
      DetermineObj: { isxbrz: "0", isydrz: "0", roomid: "0" },
      cardcode: "",
      defaultData: {
        modifiable: false,
        SexInpShow: true,
        personcodeShow: true,
        tpetimeShow: false,
        cardcodeShow: true,
        trcashShow: false,
        teamnameShow: false,
        leftBtnShow: false,
        personphone: "",
        personcompany: "",
        trcash: "",
        personcode: "",
        personname: "",
        personsex: "",
        teamid: "",
        cardcode: "",
        teamname: "",
        tpetime: "",
        idcardErr: "",
        phoneErr: "",
        nameErr:""
      },
      personnel: {},
      tableData: [
        {
          name: "人员信息",
          text: "内容"
        },
        {
          name: "姓名",
          // value: "personname",
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: obj.modifiable,
                input: obj.personname,
                clearable: true,
                issendText: obj.nameErr
              },
              on: {
                onInput(val) {
                  obj.personname = val;
                }
              }
            });
          }
        },
        {
          name: "性别",
          // value: "personsex",
          render(obj, add) {
            return add("displayForm", {
              props: {
                selectShow: obj.SexInpShow,
                selPlaceholder:"请选择性别",
                options: [
                  { value: "1", label: "男" },
                  { value: "2", label: "女" }
                ],
                defaultVal: obj.personsex,
                clearable: true,
                input: obj.personsex
              },
              on: {
                onChangeSel(val) {
                  obj.personsex = val;
                }
              }
            });
          }
        },

        {
          name: "身份证号",
          // value: "personcode"
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: obj.modifiable,
                input: obj.personcode,
                clearable: true,
                issendText: obj.idcardErr
              },
              on: {
                onInput(val) {
                  obj.personcode = val;
                  if(val){
                    obj.trcashShow = false;
                    obj.teamnameShow=true;
                  }
                },
                onBlur(val) {},
                onClick(val) {}
              }
            });
          }
        },

        {
          name: "入住人电话",
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: obj.modifiable,
                clearable: true,
                input: obj.personphone,
                issendText: obj.phoneErr
              },
              on: {
                onInput(val) {
                  let reg = /^[0-9]*$/g;
                  if (reg.test(val) || val == "") {
                    obj.personphone = val;
                  }
                }
              }
            });
          }
        },
        {
          name: "单位",
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: obj.modifiable,
                clearable: true,
                input: obj.personcompany
              },
              on: {
                onInput(val) {
                  obj.personcompany = val;
                }
              }
            });
          }
        },
        {
          name: "团信息",
          render(obj, add) {
            if (!obj.modifiable) {
              return add("displayForm", {
                props: {
                  btnText: obj.teamnameShow
                    ? obj.teamname || "选择团"
                    : obj.teamname,
                  isShow: false,
                  btnTpye: "text",
                  btnStyle: obj.teamnameShow ? "" : "color:#666;cursor:default;"
                },
                on: {
                  onClick(val) {
                    if(obj.personcode==""){
                      $this.$message.error("身份证号不能为空!")
                      return;
                    }
                    if (obj.teamnameShow) {
                      $this.teanInfoVisible = true;
                    }
                  }
                }
              });
            } else {
              return add("div", {}, obj.teamname);
            }
          }
        },
        {
          name: "房卡",
          // value: "cardcode"
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: false,
                input: obj.cardcode,
                clearable: true,
                btnText: obj.leftBtnShow && $this.personnel.trid ? "换卡" : "",
                btnTpye: "text",
                btnArr: [
                  { name: "更新", id: "1", type: "text", show: obj.leftBtnShow }
                ]
              },
              on: {
                onInput(val) {
                  obj.cardcode = val;
                  $this.cardcode = val;
                },
                onClick(val) {
                  if (obj.cardcode && obj.cardcode.length >= 8) {
                    $this
                      .$ajax(
                        "/lock/operate/hotel/l/updatecard",
                        { cardcode: obj.cardcode, trid: $this.personnel.trid },
                        "1"
                      )
                      .then(res => {
                        $this.$message({
                          message: "换卡成功!",
                          type: "success"
                        });
                        $this.leftRefresh();
                      })
                      .catch(err => {
                        $this.$message({
                          message: `[${err.resultCode}] ` + err.resultMsg,
                          type: "error"
                        });
                      });
                  } else {
                    $this.$message.error("请刷卡或填写合法卡号!");
                  }
                },
                onClicks(data) {
                  if (data.id == "1") {
                    $this
                      .$ajax(
                        "/lock/operate/hotel/p/reloadauth",
                        { trid: $this.personnel.trid },
                        "1"
                      )
                      .then(res => {
                        $this.$message({
                          message: "更新成功!",
                          type: "success"
                        });
                        $this.leftRefresh();
                      })
                      .catch(err => {
                        $this.$message({
                          message: `[${err.resultCode}] ` + err.resultMsg,
                          type: "error"
                        });
                      });
                  }
                }
              }
            });
          }
        },
        {
          name: "押金",
          render(obj, add) {
            return add("displayForm", {
              props: {
                inpReadonly: obj.trcashShow,
                input: obj.trcash,
                clearable: true
              },
              on: {
                onInput(val) {
                  let reg = /^[0-9]*$/g;
                  if (reg.test(val) || val == "") {
                  obj.trcash = val;
                  }
                }
              }
            });
          }
        },
        {
          whole: true,
          name: "入住结束日期",
          render(obj, add) {
            return add("div", {}, [
              add("displayForm", {
                class: "tabel_sel",
                props: {
                  dateShow: true,
                  isShow: false, //!obj.tpetimeShow,
                  input: obj.tpetime,
                  dateValueUpdate: obj.tpetime,
                  pickerOptions: {
                    disabledDate(time) {
                      return time.getTime() < new Date(obj.tpetime).getTime();
                    }
                  }
                },
                on: {
                  onDateChange: function(event) {
                    obj.tpetime = format(event, "yyyy-MM-dd HH:mm:ss");
                  }
                }
              })
            ]);
          }
        }
      ]
    };
  },
  computed: {
    checkOutParam() {
      return {
        personcode: this.defaultData.personcode,
        roomid: this.checkedroom.roomid
      };
    },
    personcode() {
      return this.defaultData.personcode;
    },
    personphone() {
      return this.defaultData.personphone;
    },
    personname(){
      return this.defaultData.personname;
    }
  },
  watch: {
    checkedroom(val) {},
    personcode(val) {
      if (this.nextListen) {
        this.nextListen = false;
      } else {
        if (judge.isCardID(val)) {
          this.rightControl("1");
          this.defaultData.idcardErr = "";
        } else {
          this.defaultData.idcardErr = "身份证号格式不正确!";
        }
      }
    },
    personphone(val) {
      if (this.nextListenB) {
        this.nextListenB = false;
      } else {
        if (judge.isMobile(val) || val == "") {
          this.defaultData.phoneErr = "";
        } else {
          this.defaultData.phoneErr = "手机号格式不正确!";
        }
      }
    }
  },
  created() {
    this.getchangeroom(); //获取换入房间列表
  },
  mounted() {},
  methods: {
    onContinue() {
      if (this.defaultData.leftBtnShow) {
        this.$ajax(
          "/lock/operate/hotel/o/updateauth",
          { tredate: this.defaultData.tpetime, trid: this.personnel.trid },
          "1"
        )
          .then(res => {
            this.$message({
              message: "修改成功!",
              type: "success"
            });
            this.leftRefresh();
          })
          .catch(err => {
            this.$message({
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请选择已入住人员进行续住",
          type: "error"
        });
      }
    },
    onSelection(data) {
      //拿到团信息
      this.defaultData.teamid = data.teamid;
      this.defaultData.teamname = data.teamname;
    },
    onChange(data) {
      //选择查询人员返回数据
      // this.defaultData = data;
      // this.rightControl("1");
      this.getpersonInfo(data.personcode, data.teamid);
    },
    searchID(data) {
      this.getpersonInfo(data);
    },
    searchIDCard(data) {
      //读身份证号返回数据
      this.personnel.personimage = data.img;
      this.idCardData=data;
      this.getpersonInfo(data.IDNumber);
    },
    readIDCard(data) {
      this.defaultData.cardcode = data.CardNo;
      this.cardcode = data.CardNo;
    },
    rightControl(val) {
      //按钮权限控制
      if (val == "1") {
        this.rzdisabled = false;
        this.tfdisabled = true;
        this.hfdisabled = true;
      } else {
        this.rzdisabled = true;
        this.tfdisabled = false;
        this.hfdisabled = false;
      }
    },
    changePsition(val) {
      //选择换房位置
    },
    getchangeroom() {
      //获取可换房位置
      this.$ajax("/lock/operate/hotel/a/getchangeroom", {}, "1")
        .then(res => {
          this.states = res.result;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    outClick() {
      //退房按钮
      if (this.tfdisabled) {
        this.$message({
          message: "请选择已入住人员进行退房!",
          type: "error"
        });
      } else {
        this.dialogVisible = true;
      }
    },
    repClick() {
      //换房按钮
      if (this.hfdisabled) {
        this.$message({
          message: "请先选择左侧已入住人员!",
          type: "error"
        });
        return;
      }
      let obj = {
        inroomid: this.outpersoncode[this.outpersoncode.length - 1],
        isteamrz: this.nextrepObj.isteamrz,
        isxbrz: this.nextrepObj.isxbrz,
        personcode: this.personnel.personcode,
        roomid: this.checkedroom.roomid,
        tpetime: this.defaultData.tpetime,
        trcash: this.defaultData.trcash
      };
      this.$ajax("/lock/operate/hotel/b/savechangeauth", obj, "1")
        .then(res => {
          this.$message({
            message: "换房成功!",
            type: "success"
          });
          this.refresh();
          this.leftRefresh();
          this.onEmpty();
        })
        .catch(err => {
          if (err.resultCode == "01105a19") {
            this.nextrepObj.isxbrz = "1";
            this.nextrepClick("性别");
          } else if (err.resultCode == "01105a22") {
            this.nextrepObj.isteamrz = "1";
            this.nextrepClick("团");
          } else {
            this.$message({
              message: `[${err.resultCode}] ` + err.resultMsg,
              type: "error"
            });
          }
        });
    },
    nextrepClick(str) {
      //换房反馈
      this.$confirm("是否忽略" + str + "进行入住？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.repClick();
        })
        .catch(() => {});
    },
    checkp(data, key) {
      //已入住人员点击 = this.personnel
      //选择已入住人员事件
      // Object.assign(this.defaultData, data);
      this.personnel = JSON.parse(JSON.stringify(data));
      this.personnel.personimage = data.imagebase64;
      this.getpersonInfoA(data.personcode, data.teamid);
      this.rightControl();
      this.cardcode = "";
      this.onResetHead();
    },
    getpersonInfoA(val, teamid = "") {
      //表格内查询身份证按钮
      this.$ajax(
        "/lock/operate/hotel/3/getpersoninfo",
        {
          personcode: val,
          roomid: this.checkedroom.roomid,
          teamid: teamid
        },
        "1"
      )
        .then(res => {
          // this.personnel.personimage = res.result.personimage;
          this.defaultData = res.result;
          this.defaultData.tpetimeShow = false;
          this.defaultData.teamnameShow = false;
          this.nextListen = true;
          this.nextListenB = true;
          this.defaultData.leftBtnShow = true;
            this.defaultData.modifiable = true;
            this.defaultData.SexInpShow = false;


        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getpersonInfo(val, teamid = "") {
      this.personnel.personimage = "";
      //表格内查询身份证按钮
      this.$ajax(
        "/lock/operate/hotel/3/getpersoninfo",
        {
          personcode: val,
          roomid: this.checkedroom.roomid,
          teamid: teamid
        },
        "1"
      )
        .then(res => {
          if (res.result.personcode == "") {
            this.defaultData = res.result;
            this.defaultData.personcode = val;
            if(this.idCardData){
              this.personnel.personimage = this.idCardData.img;
              this.defaultData.personname = this.idCardData.Name;
              this.defaultData.personsex = this.idCardData.Sex=="男"?"1":"2";
            }
            this.defaultData.modifiable = false;
            // this.defaultData.cardcodeShow = false;
            this.defaultData.SexInpShow = true;
            this.nextListen = false;
            this.defaultData.leftBtnShow = false;
            this.nextListenB = false;
          } else {
            this.defaultData.cardcodeShow=true;
            let data = res.result;
            data.cardcode=this.defaultData.cardcode;
            this.defaultData = res.result;
            this.defaultData.cardcode = this.cardcode;
            this.nextListen = true;
            this.nextListenB = true;
          }
          this.personnel.trid = res.result.trid;
          this.defaultData.trcashShow = false;
          this.defaultData.teamnameShow = true;
          this.defaultData.tpetimeShow = true;
          this.defaultData.modifiable = false;
            this.defaultData.SexInpShow = true;

          this.rightControl("1");
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    Determine(val) {
      //提交事件
      if (this.rzdisabled) {
        this.$message.error("请查询人员或输入正确身份证号进行入住!");
        return;
      }else if(this.personname==""||this.defaultData.idcardErr=="身份证号格式不正确!"){
        this.$message.error("请输入正确姓名及身份证号!");
        return;
      }else if(this.defaultData.personsex==""){
        this.$message.error("请选择性别!");
        return;
      }else if(this.defaultData.cardcode==""||this.defaultData.cardcode.length < 8){
        this.$message.error("请刷卡或填写合法卡号!");
        return;
      }
      if (true) {
        let data = this.defaultData;
        let obj = {
          isteamrz: this.DetermineObj.isteamrz,
          isxbrz: this.DetermineObj.isxbrz,
          isydrz: this.DetermineObj.isydrz,
          roomid: this.checkedroom.roomid,
          cardcode: data.cardcode,
          personcode: data.personcode,
          personcompany: data.personcompany,
          personname: data.personname,
          personphone: data.personphone,
          personsex: data.personsex == "1" ? "男" : "女",
          teamid: data.teamid,
          tpetime: data.tpetime,
          trcash: data.trcash
        };
        let paramObj = {
          imagebase64: this.personnel.personimage
        };
        this.$ajax("/lock/operate/hotel/6/saveauth", obj, "1", paramObj, true)
          .then(res => {
            this.refresh();
            this.$message({
              message: "入住成功!",
              type: "success"
            });
            this.onEmpty();
            this.leftRefresh();
            this.rzdisabled = true;
          })
          .catch(err => {
            // this.input = "";
            if (err.resultCode == "01105518") {
              this.DetermineObj.isydrz = "1";
              this.nextDetermine("预订");
            } else if (err.resultCode == "01105519") {
              this.DetermineObj.isxbrz = "1";
              this.nextDetermine("性别");
            } else if (err.resultCode == "01105522") {
              this.DetermineObj.isteamrz = "1";
              this.nextDetermine("团");
            } else {
              this.$message({
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error"
              });
            }
          });
      }
    },
    handleClose(val) {
      this.dialogVisible = false;
      this.refresh();
    },
    outNext() {
      this.onEmpty();
      this.dialogVisible = false;
    },
    nextDetermine(str, type) {
      //入住反馈
      this.$confirm("是否忽略" + str + "进行入住？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.Determine(type);
        })
        .catch(() => {});
    },
    onEmpty() {
      //重置事件
      this.defaultData = {
        modifiable: false,
        SexInpShow: true,
        personcodeShow: true,
        tpetimeShow: false,
        cardcodeShow: true,
        trcashShow: false,
        teamnameShow: false,
        leftBtnShow: false,
        personphone: "",
        personcompany: "",
        trcash: "",
        personcode: "",
        personname: "",
        personsex: "",
        teamid: "",
        cardcode: "",
        teamname: "",
        tpetime: "",
        idcardErr: "",
        phoneErr: "",
        nameErr:""
      };
      this.personnel = {};
      this.DetermineObj = { isxbrz: "0", isydrz: "0", roomid: "0" };
      this.nextrepObj = { isteamrz: "0", isxbrz: "0" };
      this.nextListen = true;
      this.nextListenB = true;
      this.cardcode = "";
      this.outpersoncode=[];
      this.leftRefresh();
      this.onResetHead();
    },
    onResetHead() {
      this.resetHead = new Date().getTime();
    },
    leftRefresh() {
      this.adminRefresh = new Date().getTime();
    },
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>