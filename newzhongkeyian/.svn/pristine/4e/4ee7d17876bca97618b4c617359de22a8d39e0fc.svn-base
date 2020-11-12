<template>
  <el-dialog
    :title="'推送角色管理 - '+defaultData.pushname + '（推送编号：'+defaultData.pushid+'）'"
    width="600px"
    top="12vh"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-container class="dialog-table6 wh100 com-jsgl" :class="{hide:!isBut}">
      <el-button @click="onClick(1)" type="primary" class="jsgl-left" icon="el-icon-d-arrow-left"></el-button>
      <el-transfer class="margins" v-model="cities" :titles="['未添加角色','已添加角色']" :data="list"></el-transfer>
      <el-button @click="onClick(2)" type="primary" class="jsgl-right" icon="el-icon-d-arrow-right"></el-button>
    </el-container>
    <div slot="footer" v-if="isBut" class="dialog-button">
      <el-button class="com-but-small" @click="beforeClose">取消</el-button>
      <el-button class="com-but-small" type="primary" @click="dialogSubmitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    defaultData: Object,
    buts: Array
  },
  data() {
    let $this = this;
    return {
      cities: [],
      letfList: [],
      trole: []
    };
  },
  created() {
    if (this.defaultData.pushid) {
      this.ingetrole();
      this.ingetpushrole();
    }
  },
  computed: {
    isBut() {
      let arr = this.buts.filter(obj => {
        return obj.id == "695";
      });
      return Boolean(arr.length > 0);
    },
    list() {
      return [...this.trole, ...this.letfList];
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        if (this.defaultData.pushid) {
          this.ingetrole();
          this.ingetpushrole();
        }
      }
    }
  },
  methods: {
    onClick(key) {
      if (key == 1) {
        this.cities = [];
      } else {
        this.cities = this.list.map(obj => obj.key);
      }
    },
    ingetrole() {
      this.trole = [];
      this.$ajax(
        "/push/limit/1/getrole",
        {
          pushid: this.defaultData.pushid
        },
        "1"
      )
        .then(res => {
          this.trole = (res.result || []).map(obj => {
            return {
              key: obj.rolename,
              label: obj.rolename
            };
          });
        })
        .catch(err => {});
    },
    ingetpushrole() {
      this.letfList = [];
      this.$ajax(
        "/push/limit/2/getpushrole",
        {
          pushid: this.defaultData.pushid
        },
        "1"
      )
        .then(res => {
          this.letfList = (res.result || []).map(obj => {
            return {
              key: obj.rolename,
              label: obj.rolename
            };
          });
          this.cities = this.letfList.map(obj => obj.key);
        })
        .catch(err => {});
    },
    dialogSubmitForm() {
      // if (this.cities && this.cities.length > 0) {
      this.$ajax(
        "/push/limit/3/savepushrole",
        {
          pushid: this.defaultData.pushid
        },
        "1",
        this.cities,
        true
      )
        .then(res => {
          this.$emit("onRefresh");
          this.beforeClose();
          this.$message({
            message: "推送角色修改成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
      // } else {
      //   this.$message({
      //     message: "请添加推送消息角色",
      //     type: "warning"
      //   });
      // }
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

<style lang="scss">
.margins {
  .el-transfer__buttons {
    .el-button {
      display: block;
      margin: 10px 0;
    }
  }
}
.com-jsgl {
  position: relative;
  &.hide {
    .el-button {
      display: none;
    }
  }
  .jsgl-left {
    position: absolute;
    width: 56px;
    margin-left: -28px;
    top: 50%;
    left: 50%;
    margin-top: -100px;
  }
  .jsgl-right {
    width: 56px;
    margin-left: -28px;
    position: absolute;
    bottom: 50%;
    margin-bottom: -100px;
    left: 50%;
  }
}
</style>