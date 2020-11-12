<!-- ip/mac地址重复检测 -->
<template>
  <fel-dialog
    class="ipMacCfjc"
    top="8%"
    title="IP/MAC地址重复检测"
    width="85%"
    append-to-body
    min-width="900px"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="IP重复设备" name="first">
        <!-- <div v-if="ip&&ip.length==0" class="config_null">暂无数据</div> -->
        <fel-table
          class="tobleList wh100"
          height="100%"
          style="min-height: 300px;"
          :list="list"
          :queryData="ip"
          @onRefresh="onRefresh"
        ></fel-table>
      </el-tab-pane>
      <el-tab-pane class="tabs" label="MAC重复设备" name="second">
        <!-- <div v-if="ip&&ip.length==0" class="config_null">暂无数据</div> -->
        <fel-table
          class="tobleList wh100"
          :list="list"
          style="min-height: 300px;"
          height="100%"
          :queryData="mac"
          @onRefresh="onRefresh"
        ></fel-table>
      </el-tab-pane>
    </el-tabs>
  </fel-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
  },
  data() {
    return {
      activeName: "first",
      //   queryData: {
      ip: [],
      mac: [],
      //   },
      list: [
        {
          name: "序号",
          type: "index",
          width: "60px",
        },
        {
          name: "设备类型",
          prop: "devicetype",
        },
        {
          name: "设备位置",
          prop: "devicelocation",
        },
        {
          name: "设备唯一ID",
          prop: "devicewcode",
        },
        {
          name: "IP地址",
          prop: "deviceip",
          template: {
            props: ["scope"],
            methods: {
              topath(path) {
                let topath = "http://" + path;
                window.open(topath);
              },
            },
            template: `
            <div>
             <el-button type="text" size="small" @click.stop="topath(scope.row.deviceip)">{{scope.row.deviceip}}</el-button>
            </div>`,
          },
          show: false,
        },
        {
          name: "MAC地址",
          prop: "devicemac",
          show: true,
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onRefresh() {
      this.getList();
    },
    handleClick(val) {
      if (val.name == "first") {
        this.list[4].show = false;
        this.list[5].show = true;
      } else {
        this.list[4].show = true;
        this.list[5].show = false;
      }
      this.getList();
      console.log("val", val);
    },
    getList() {
      this.$ajax("/system/device/gateway/5/checkIpAndMac", {}, "9")
        .then((res) => {
          this.ip = res.result.ips;
          this.mac = res.result.macs;
          console.log("this.queryData", this.mac);
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="scss">
.ipMacCfjc {
  .config_null {
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
}
</style>
