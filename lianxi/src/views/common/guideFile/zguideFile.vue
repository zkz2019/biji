<!-- 房间管理导入导出  -->
<template>
  <el-dialog
    title="导入导出"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    append-to-body
    v-loading="loading"
    :element-loading-text="`文件导出中,预计还需${num>0?num:0}秒...`"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="el-dialogs AFile"
  >
    <div>
      <div v-if="exportButs.length >= 1">
        <h3 class="htitle">
          导出
          <el-button
            v-for="(v,k) of topBtn"
            class="htitle_history maR10"
            type="text"
            @click="onClickHistoryE(v,k)"
          >{{v.name||"导出历史"}}</el-button>
        </h3>
        <div class="content">
          <el-button
            v-for="(v,k) of exportButs"
            :key="'e'+k"
            class="com-but-small"
            type="primary"
            @click.stop="onClickExport(v, k)"
          >{{v.name}}</el-button>
          <div class="download-loading" v-if="downloadLoading">
            <i class="el-icon-loading"></i>导出生成文件中...
          </div>
        </div>
      </div>
      <div v-if="importButs.length > 0">
        <div>
          <h3 class="htitle">
            导入
            <el-button
              v-for="(v,k) of bottomBtn"
              class="htitle_history maR10"
              type="text"
              @click="onClickHistoryI(v,k)"
            >{{v.name||"导入历史"}}</el-button>
          </h3>
          <div class="IbtnBox">
            <uploadBox
              ref="uploadBox"
              :errUrl="errUrl"
              @changeType="changeType"
              @onDetails="onDetails"
            ></uploadBox>
            <div class="but">
              <template v-if="importButs.length>1">
                <div class="but_left">
                  <el-button
                    v-for="(v,k) of exImportButs"
                    :key="k"
                    type="text"
                    @click="onClickExport(v, k)"
                  >{{v.name}}</el-button>
                </div>
              </template>
              <div :class="importButs.length>1?'but_right':'but_right1'">
                <el-button
                  :type="importButs.length>1?'':'primary'"
                  class="com-but-small"
                  v-for="(v,k) of importButs"
                  :key="k"
                  @click="onUpload(v,k)"
                >{{v.name}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <importHistory
      :dialogVisible="iHvisible"
      @beforeClose="()=>{iHvisible=false}"
      :list="list"
      :historyObj="historyObj"
      :uploadid="uploadId"
      :ajaxType="IajaxType"
    ></importHistory>
    <importDetails
      :dialogDetailed="dialogDetailed"
      :uploadid="uploadtotal.uploadid"
      :listObj="{type:uploadtotal.uploadtype}"
      :historyObj="historyObj"
      @beforeDetailed="beforeDetailed"
    ></importDetails>
    <exportHistory
      :historyObj="historyObj1"
      :dialogVisible="iHvisible1"
      @beforeClose="()=>{iHvisible1=false}"
    ></exportHistory>
  </el-dialog>
</template>

<script>
import uploadBox from "./uploadBox";
import importDetails from "./import-details";
import exportHistory from "./export-history";
import importHistory from "./import-history";
import { download } from "@/utils/utils.js";
import Storages from "@/utils/Storage.js";
import { getuploadrate, timerDownload } from "./index.js";
export default {
  componentName: "zguideFile",
  /**
   * type:1入住，2退房，3比对，4公共授权，5账户权限导入，6账号属性导入，7公共退房，8公共比对，9快捷导入,10人员导入，11卡片导入
   * props传参
   * importButs:导入按钮{
                      name: 按钮名称,
                      tempUrl: "模板导出接口"(已废弃),
                      url: "导入接口",
                      errUrl: "失败文件导出接口"(已废弃,现在失败导出接口需要在./progessDetails.vue里面根据判断条件设置),
                      progUrl: "进度查询接口"}
   * exportButs:导出按钮{
                      id: 按钮id(按钮权限id),
                      name: 按钮名称,
                      url: "导出接口",
                      data: "导出接口query参数",
                      obj:  "导出接口body参数",
                      async: "是否异步导出"}
   * exImportButs:导入栏里的导出按钮(多项导入时的模板导出按钮,账户导入导出有使用)
                      参数和导出按钮一致
                      必传:{
                        name: 按钮名称,
                        url: "导出接口",
                      }
   * topBtn: 一般是导出历史按钮(导出详情暂时没做(基本的结构已经写好了,将传参方式进行修改就可以了),如果要做可以参照导入详情){
          name: "按钮名称",
          historyUrl: "导出历史接口",
        }
   * bottomBtn: 一般是导入历史按钮{
          id: 按钮id(未用到),
          type: "5"(导入历史的type值,上面注释第一行有参照),
          name: "授权导入历史",
          url: "导入历史接口",
          interface: "导入详情接口"
          listInfo: 导入详情列表的list数组,
        }
     list: 导入历史的list数组(一般是固定的可以不传,如果要传就需要使用常规函数function(){let $this = this;return[]})
   * **/
  props: {
    dialogVisible: Boolean,
    title: String,
    list: Function,
    importButs: {
      type: Array,
      default() {
        return [];
      },
    },
    exImportButs: {
      type: Array,
      default() {
        return [];
      },
    },
    exportButs: {
      type: Array,
      default() {
        return [];
      },
    },
    topBtn: {
      type: Array,
      default() {
        return [];
      },
    },
    bottomBtn: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { importHistory, importDetails, uploadBox, exportHistory },
  data() {
    return {
      IajaxType: "1",
      historyObj: {},
      historyObj1: {},
      dialogDetailed: false,
      progressShow: false,
      iHvisible: false,
      iHvisible1: false,
      downloadLoading: false,
      loading: false,
      type: 0,
      num: 60,
      urls: "",
      uploadtotal: {},
      format: "xxx",
      errUrl: "",
      uploadId: "",
    };
  },
  watch: {
    dialogVisible(val) {
      this.onInit();
      if (val) {
        this.uploadId = Storages.getStorage("Auploadid");
        this.downloadLoading = false;
        let istype = this.importButs.find((item) => {
          return item.name == this.uploadType;
        });
        if (this.uploadId && istype) {
          this.urls = istype.progUrl;
          getuploadrate(this.uploadId, this, true, this.urls);
        }
      } else {
        this.progressShow = false;
        this.$refs.uploadBox.textShow = false;
      }
    },
    type(val) {},
  },
  computed: {
    topTitle() {
      if (this.importButs.length + this.exportButs.length > 1) {
        return "导入与导出";
      } else if (this.importButs.length != 0) {
        return this.importButs[0].name;
      } else if (this.exportButs.length != 0) {
        return this.exportButs[0].name;
      } else {
        return "导入与导出";
      }
    },
    // uploadId() {
    //   return Storages.getStorage("Auploadid");
    // },
    uploadType() {
      return Storages.getStorage("Auploadtype");
    },
  },
  mounted() {},
  methods: {
    onInit() {
      if (this.$refs.uploadBox) {
        this.$refs.uploadBox.clearFiles();
        this.$refs.uploadBox.onRemove();
      } else {
        setTimeout(() => {
          this.onInit();
        }, 1000);
      }
    },
    changeType(key) {
      this.type = key;
      this.errUrl = this.importButs[key].errUrl;
      this.urls = this.importButs[key].progUrl;
    },
    beforeDetailed() {
      this.dialogDetailed = false;
    },
    onDetails(obj) {
      this.uploadtotal = obj;
      this.historyObj = this.bottomBtn.filter((item) => {
        if (item.type == obj.uploadtype) {
          return item;
        }
      })[0];
      this.dialogDetailed = true;
      // this.$emit("onDetails");
    },

    onUpload(v, k) {
      // let obj = this.importButs[k];
      this.$refs.uploadBox.onUpload(v, k);
    },
    onClickTemp() {
      let obj = this.importButs[this.type];
      let t = this.title || "";
      this.inExport(obj.tempUrl, t + obj.name + "模板");
    },
    onClickHistoryI(obj) {
      this.IajaxType = obj.ajaxType || "1";
      this.historyObj = obj;
      this.iHvisible = true;
    },
    onClickHistoryE(obj) {
      this.historyObj1 = obj;
      this.iHvisible1 = true;
    },
    onClickExport(obj, key) {
      console.log("obj", obj);
      if (
        obj.async
        // obj.id == "464" ||
        // obj.id == "393" ||
        // obj.id == "489" ||
        // obj.id == "364" ||
        // obj.id == "355"
      ) {
        let t = this.title || "";
        this.inExportPackage(
          obj.url,
          obj.fileName || t + obj.name,
          obj.data,
          obj.obj,
          obj.historyUrl
        );
      } else if (this.exportButs.length > 1) {
        let down = true;
        if (obj.name == "导入历史") {
          this.$emit("showHistory");
        } else if (obj.url) {
          let t = this.title || "";
          this.inExport(
            obj.url,
            obj.fileName || t + obj.name,
            obj.data,
            obj.obj,
            down
          );
        }
      } else {
        let t = this.title || "";
        this.inExport(obj.url, obj.fileName || t + obj.name, obj.data, obj.obj);
      }
    },
    inExportPackage(url, name, data = {}, obj = {}, historyUrl) {
      this.$ajax(url, data, "1", obj, true, 60000)
        .then((res) => {
          this.$message({
            message: name + "已下发，文件正在生成中",
            type: "success",
          });
          this.downloadLoading = true;
          timerDownload(res.result, historyUrl, this, name);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    inExport(url, name, data = {}, obj = {}, down = true) {
      this.num = 60;
      clearInterval(this.times);
      this.times = setInterval(() => {
        this.num -= 1;
        if (this.num <= 0) {
          clearInterval(this.times);
          this.num = 60;
        }
      }, 1000);
      this.loading = true;
      this.$ajax(url, data, "3", obj, false, 60000)
        .then((res) => {
          if (this.times) {
            clearInterval(this.times);
          }
          this.loading = false;
          if (res.size) {
            if (down) {
              download(res, name);
            }
            this.$notify({
              title: "成功",
              message: name + "文件导出成功！",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          clearInterval(this.times);
          this.loading = false;
          if (err && err.resultCode) {
            this.$message.error(
              `文件导出失败！失败原因：[${err.resultCode}] ` + err.resultMsg
            );
          } else {
            this.$message.error(`文件导出失败！失败原因：未知错误`);
          }
        });
    },
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script> 

<style lang="scss">
.AFile {
  .el-upload-dragger {
    width: 100%;
    min-height: 80px;
    .text {
      padding-top: 10px;
    }
  }
  .el-dialog {
    min-width: 760px;
    overflow: hidden;
  }
  .min_h {
    min-height: 130px;
  }

  .IbtnBox {
    width: 100%;
    display: flex;
    .content {
      position: relative;
      flex: 1;
    }

    .but {
      width: 260px;
      margin: 15px 30px;
      .el-button {
        margin: 0;
        height: 32px;
        margin-bottom: 10px;
        line-height: 0;
      }
      .but_left {
        float: left;
        width: 50%;
      }
      .but_right1 {
        padding-top: 35px;
        text-align: right;
      }
    }
    // .disIB {
    //   height: 100px;
    // }
    // .errorText {
    //   position: absolute;
    //   bottom: 50px;
    // }
    // .progress_box {
    //   position: absolute;
    //   bottom: 0px;
    //   padding-top: 5px;
    //   max-width: 375px;
    //   .progress_title {
    //     float: left;
    //   }
    //   .progress {
    //     // float:left;
    //     min-width: 220px;
    //     margin-right: 10px;
    //   }
    //   .progress_box_btn {
    //     padding: 2px;
    //     font-size: 14px;
    //   }
    // }
  }
  @media screen and (max-width: 1450px) {
    // .content {
    //   width: 100%;
    //   display: flex;
    // .disIB {
    //   flex: 1;
    //   .el-upload {
    //     width: 100%;
    //     .el-upload-dragger {
    //       width: 100%;
    //     }
    //   }
    // }
    // .but {
    //   margin: 0 30px;
    //   width: 260px;
    // }
    // }
  }
}
</style>
