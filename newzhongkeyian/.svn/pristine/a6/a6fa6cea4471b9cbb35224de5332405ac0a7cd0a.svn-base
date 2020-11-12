<template>
  <div v-if="exportButs.length >= 1">
    <span
      class="sli but-blue"
      v-for="(v,k) of exportButs"
      :key="'e'+k"
      @click.stop="onClickExport(v, k)"
    >
      <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
      {{v.name}}
    </span>
    <exportHistory
      historyUrl="/system/log/upload/3/downhistory"
      :dialogVisible="iHvisible"
      @beforeClose="()=>{iHvisible=false}"
    ></exportHistory>
  </div>
</template>

<script>
import { download } from "@/utils/utils.js";
import exportHistory from "../personnel/export-history";
import { timerDownload } from "../personnel/index.js";
export default {
  components: { exportHistory },
  props: {
    url: String,
    param: Object,
    fatherid: String
  },
  watch: {
    url(str) {
      this.exportButs = [];
      this.sonmenu = 0;
      this.inGetsonmenu();
    }
  },
  data() {
    return {
      iHvisible: false,
      exportButs: [],
      sonmenu: 0
    };
  },
  created() {
    this.inGetsonmenu();
  },
  methods: {
    inGetsonmenu() {
      this.$ajax("/login/home/2/getsonmenu", { fatherid: this.fatherid }, "1")
        .then(res => {
          res.result.forEach(value => {
            let id = value.entity.id;
            let alias = value.entity.alias;
            if (id == "517") {
              this.exportButs.push(
                {
                  id: id,
                  icon: "image583",
                  name: alias,
                  url: this.url,
                  data: this.param
                },
                {
                  id: 9,
                  name: "导出历史记录",
                  icon: "history"
                }
              );
            }
          });
          this.sonmenu = 4;
        })
        .catch(err => {
          if (this.sonmenu < 3) {
            setTimeout(() => {
              this.sonmenu++;
              this.inGetsonmenu();
            }, 1000);
          }
        });
    },
    //日志导出
    onClickExport(obj, key) {
      if (obj.id == 9) {
        this.iHvisible = true;
      } else {
        obj.data.sdate = this.param.sdate;
        obj.data.edate = this.param.edate;
        let t = this.title || "";
        this.inExportPackage(
          obj.url,
          obj.fileName || t + obj.name,
          obj.data,
          obj.obj
        );
      }
    },
    inExportPackage(url, name, data = {}, obj = {}) {
      this.$ajax(url, data, "1", obj, true, 60000)
        .then(res => {
          this.$message({
            message: name + "文件导出已下发，文件正在生成中",
            type: "success"
          });
          timerDownload(
            res.result,
            "/system/log/upload/3/downhistory",
            this,
            name
          );
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    }
    // inExport(url, name, data = {}, obj = {}) {
    //   // return
    //   this.$ajax(url, data, "3", obj, "文件导出中...", 60000)
    //     .then(res => {
    //       if (res.size) {
    //         download(res, name);
    //         this.$notify({
    //           title: "成功",
    //           message: name + "文件导出成功！",
    //           type: "success"
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.error(
    //         `文件导出失败！失败原因：[${err.resultCode}] ` + err.resultMsg
    //       );
    //     });
    // }
  }
};
</script>
