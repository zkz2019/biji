<!--  当前状态 -->
<template>
  <div :key="key" class="currentState">
    <form-table
      class="currentState_table"
      thwidth="10%"
      tdwidth="40%"
      :column="2"
      :param="defaultData"
      :list="tableData"
    ></form-table>
    <fel-button class="currentState_btn com-but-small" type="primary" @click="Determine">确定修改</fel-button>
    <Participants :rrid="defaultData.rrid" :dialogVisible="dialogVisible" @Close="Close" />
    <lockDoor :dialogVisible="lDdialogVisible" :checkedroom="checkedroom" @Close="lDClose" />
  </div>
</template>

<script>
import lockDoor from "./dialog/lockDoor";
import Participants from "./dialog/Participants";
import inpbox from "./../../common/inpbox";
import { format } from "@/utils/utils.js";
export default {
  props: {
    checkedroom: Object
  },
  components: {
    inpbox,
    Participants,
    lockDoor
  },
  data() {
    var $this = this;
    return {
      dialogVisible: false,
      lDdialogVisible: false,
      key: 0,
      defaultData: {},
      roomopentime: [],
      roomopenweek: [],
      roomopencontrol: "",
      tableData: [
        {
          name: "房间名称",
          value: "roomname"
        },
        {
          name: "房间类型",
          value: "roomnexttypename"
        },
        {
          name: "房间管理员",
          //   value: "closeperson"
          render(obj, add) {
            return add(
              "a",
              {
                class: "el-tooptip_btn",
                on: {
                  click: function(event) {
                    $this.lDdialogVisible = true;
                  }
                }
              },
              obj.closeperson
            );
          }
        },
        {
          name: "管理员电话",
          value: "closepersonmobile"
        },
        {
          name: "工作模式",
          value: "workmode"
        },
        {
          name: "自动开放时间",
          value: "",
          render(obj, add) {
            if (obj.isroomopentime) {
              return add("div", {}, [
                add("fel-Stime", {
                  class: "disIB",
                  attrs: {
                    "value-format": "HH:mm",
                    format: "HH:mm"
                  },
                  props: {
                    isEl: true,
                    defaultElValue: obj.opentime
                  },
                  on: {
                    change: function(val) {
                      $this.roomopentime[0] = format(val[0], "HH:mm");
                      $this.roomopentime[1] = format(val[1], "HH:mm");
                    }
                  }
                }),
                add("i", { class: "mal60 el-icon-warning-outline puc-px" })
              ]);
            } else {
              return add("fel-Stime", {
                class: "disIB",
                props: {
                  isEl: true,
                  defaultElValue: obj.opentime
                },
                on: {
                  change: function(val) {
                    $this.roomopentime[0] = format(val[0], "HH:mm");
                    $this.roomopentime[1] = format(val[1], "HH:mm");
                  }
                }
              });
            }
          }
        },
        {
          name: "控制模式",
          render(obj, add) {
            return add(
              "displayForm",
              {
                props: {
                  selectShow: true,
                  defaultVal: $this.roomopencontrol,
                  options: obj.roomopencontroltype,
                  iconShow: Boolean(obj.isroomopencontrole)
                },
                on: {
                  onChangeSel(val) {
                    $this.roomopencontrol = val;
                  }
                }
              },
              []
            );
          }
        },
        {
          name: "周工作日配置",
          value: "",
          render(obj, add) {
            if (obj.isroomopenweek) {
              return add("div", {}, [
                add("checkSelect", {
                  class: "wid450",
                  props: {
                    value: $this.roomopenweek,
                    options: obj.roomopendaytype
                  },
                  on: {
                    change(val) {
                      if (val[val.length - 1] == "0") {
                        $this.roomopenweek = ["0"];
                      } else {
                        $this.roomopenweek = val;
                        if ($this.roomopenweek.includes("0")) {
                          $this.roomopenweek.shift();
                        }
                      }
                      console.log("val", $this.roomopenweek);
                    }
                  }
                }),
                add("i", { class: "mal10 el-icon-warning-outline puc-px" })
              ]);
            } else {
              return add("checkSelect", {
                class: "wid450",
                props: {
                  value: $this.roomopenweek,
                  options: obj.roomopendaytype
                },
                on: {
                  change(val) {
                    if (val[val.length - 1] == "0") {
                      $this.roomopenweek = ["0"];
                    } else {
                      $this.roomopenweek = val;
                      if ($this.roomopenweek.includes("0")) {
                        $this.roomopenweek.shift();
                      }
                    }
                  }
                }
              });
            }
          }
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$ajax(
        "/lock/operate/publicroom/1/getpublicroomstatus",
        { roomid: this.checkedroom.roomid },
        "1"
      ).then(res => {
        this.roomopentime = (res.result.opentime || "").split("~");
        if (this.roomopentime.length != 2) {
          this.roomopentime = ["", ""];
        }
        let arr = new Array(2);
        arr[0] = {
          id: "t1",
          name: "单选",
          options: []
        };
        arr[1] = {
          id: "t2",
          name: "多选",
          options: []
        };
        res.result.roomopencontroltype = res.result.roomopencontroltype.map(
          item => {
            return { value: item.id, label: item.name };
          }
        );
        arr[0].options = res.result.roomopendaytype.filter(item => {
          if (item.isdx) {
            return { id: item.id, name: item.name };
          }
        });
        arr[1].options = res.result.roomopendaytype.filter(item => {
          if (!item.isdx) {
            return { id: item.id, name: item.name };
          }
        });
        this.roomopencontrol = res.result.roomopencontrol
          ? res.result.roomopencontrol
          : "1";
        if (res.result.roomopenweek) {
          this.roomopenweek = res.result.roomopenweek.split(",");
        }
        res.result.roomopendaytype = arr;
        this.defaultData = res.result;
      });
    },
    lDClose(is) {
      this.lDdialogVisible = false;
      if (is) {
        console.log("is", is);

        this.getList();
      }
    },
    Close() {
      this.dialogVisible = false;
    },
    Determine() {
      let param = {
        roomopentime:
          this.roomopentime[0] && this.roomopentime[1]
            ? this.roomopentime.join("~")
            : "",
        roomopenweek: this.roomopenweek.join(","),
        roomopencontrol: this.roomopencontrol,
        roomid: this.checkedroom.roomid
      };
      this.$ajax(
        "/lock/operate/publicroom/a/updateroomconfig",
        param,
        "1",
        {},
        true
      )
        .then(res => {
          this.$message({ message: "修改成功", type: "success" });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    }
  }
};
</script>
