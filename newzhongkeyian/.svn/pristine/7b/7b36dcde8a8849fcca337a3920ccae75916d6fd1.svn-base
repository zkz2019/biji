<!--  当前状态 -->
<template>
  <div class="currentState">
    <form-table width="10%" tdwidth="40%" :column="2" :param="defaultData" :list="tableData"></form-table>
  </div>
</template>

<script>
export default {
  props: {
    checkedroom: Object
  },
  components: {},
  data() {
    var $this = this;
    return {
      state: "",
      defaultData: {},
      tableData: [
        {
          name: "房间名称",
          value: "roomname"
        },
        {
          name: "房型",
          value:"hotelname",
        },
        {
          name: "房间状态",
          render(obj, add) {
            return add("displayForm", {
              props: {
                selPlaceholder: "请选择房间状态",
                selectShow: true,
                options: obj.hstype,
                btnText: "修改",
                defaultVal: obj.hotelstatus
              },
              on: {
                onClick(val) {
                  $this.onClick(val);
                },
                onChangeSel(val) {
                  $this.state = val;
                }
              }
            });
          }
        },
        {
          name: "费用标准",
          value: "houseprice"
        },
        {
          name: "入住人数",
          value: "rz"
        },
        {
          name: "主账房",
          value: "mainaccountroom"
        },
        {
          name: "归属团",
          value: "teamname"
        },
        {
          name: "主账房联系人",
          value: "mainaccountperson"
        },
        {
          name: "主账房联系方式",
          value: "mainaccountmobile"
        }
      ]
    };
  },
  created() {
    this.getStates();
  },
  methods: {
    getStates() {
      this.$ajax(
        "/lock/operate/hotel/1/gethotelstatus",
        { roomid: this.checkedroom.roomid },
        "1"
      )
        .then(res => {
          this.defaultData = res.result;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    onClick(val) {
      let data = { roomid: this.checkedroom.roomid, hotelstatusid: this.state };
      this.$ajax("/lock/operate/hotel/2/updatehotelstatus", data, "1")
        .then(res => {
          this.$message({
            message: "修改成功!",
            type: "success"
          });
          this.getStates();
        })
        .catch(err => {
          this.$message({
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    }
  }
};
</script>
