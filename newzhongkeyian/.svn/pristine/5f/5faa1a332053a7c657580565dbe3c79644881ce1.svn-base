<template>
  <div class="content import min_h">
    <fel-upload
      class="disIB"
      ref="felUpload"
      listType="text"
      @onChange="onChange"
      @onRemove="onRemove"
      @uploadFile="uploadFile"
      @uploadError="uploadError"
      showFileList
      :timeout="120000"
      :accept="wjType"
      :intercept="intercept"
      :fileList="fileList"
      noAuto
    >
      <div class="text">
        点击此处,或将文件拖到此处
        <div slot="tip" class="el-upload__tip gui_text">只支持后缀名为{{wjType}}的文件，且文件大小不超过100MB</div>
      </div>
    </fel-upload>
    <progressDetails
      :uploadTitle="uploadTitle"
      :uploadText="uploadText"
      :prcolor="prcolor"
      :textShow="textShow"
      :progressShow="progressShow"
      :uploadtotal="uploadtotal"
      :errorText="errorText"
      :errUrl="errUrl"
      :filepath="filepath"
      @onDetails="onDetails"
    ></progressDetails>
  </div>
</template>

<script>
import Storages from "@/utils/Storage.js";
import { getuploadrate } from "./index.js";
import progressDetails from "./progressDetails";
export default {
  components: { progressDetails },
  props: {
    errUrl: String
  },
  data() {
    return {
      wjType: ".xls,.xlsx",
      uploadtotal: {},
      fileList: [],
      errorText: "",
      filepath: "",
      fileName: "",
      type: 0,
      isFile: 0,
      prcolor: "",
      uploadText: "",
      uploadTitle: "",
      textShow: false,
      progressShow: false,
      // times: null
    };
  },
  watch: {
    // type(val) {
    //   console.log("type", val);
    //   if (val == 1) {
    //     this.urls = "/system/user/uploadauth/6/getuploadrate";
    //   } else if (val == 2) {
    //     this.urls = "/system/user/uploadtype/6/getuploadrate";
    //   }
    // }
  },
  methods: {
    onChange() {
      this.isFile = 1;
      this.$refs.felUpload.showUpload(false);
    },
    onRemove() {
      this.isFile = 0;
      this.errorText = "";
      this.filepath = "";
      if (this.$refs.felUpload) {
        setTimeout(() => {
          this.$refs.felUpload.showUpload(true);
        }, 600);
      }
    },
    onDetails() {
      this.$emit("onDetails", this.uploadtotal);
    },
    onUpload(obj, k) {
      if (obj.progUrl) {
        this.urls = obj.progUrl;
        // this.type = false;
      } else {
        this.urls = null;
        // this.type = true;
      }
      this.$emit("changeType", k);
      if (this.isFile == 1) {
        // let obj = this.importButs[k];
        Storages.setStorage("Auploadtype", obj.name);
        this.$refs.felUpload.submitUpload(obj.url, obj.data);
      } else if (this.isFile == 2) {
        this.$message({
          message: "文件已经上传成功状态，请重新选择",
          type: "warning"
        });
      } else {
        this.$message({
          message: "请先选择要上传的文件",
          type: "warning"
        });
      }
    },
    uploadFile(file, data) {
      this.fileName = file.name;
      if (data.resultfail) {
        this.errorText = data.resultmsg;
        this.filepath = data.resultfail;
      }
      if (!this.urls) {
        this.$notify({
          title: "成功",
          message: this.fileName + "导入完成！",
          type: "success"
        });
      } else {
        Storages.setStorage("Auploadname", file.name);
        Storages.setStorage("Auploadid", data);
        this.isFile = 2;
        let times = Storages.getStorage("Auploadtimes");
        clearTimeout(times);
        this.prcolor = "";
        this.uploadText = "文件导入中...";
        Storages.setStorage("Auploadnum", 0);
        Storages.setStorage("Atimesnum", 0);
        this.uploadTitle = Storages.getStorage("Auploadname");
        this.progressShow = false;
        this.textShow = false;

        getuploadrate(data, this, true, this.urls);
      }
    },
    uploadError(content, err) {
      console.log('err',err);
      this.$message.error("文件上传失败！失败原因：" + err.resultMsg);
    },
    intercept(file) {
      const isLt2M = file.size < 100 * 1024 * 1024;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 100MB!");
      }
      let name = file.name;
      name = name.substr(name.lastIndexOf("."));
      const isTy = this.wjType.includes(name);
      if (!isTy) {
        this.$message.error(`只支持后缀名为${this.wjType}的文件`);
      }
      return isLt2M && isTy;
    },
    clearFiles() {
      if (this.$refs.felUpload) {
        this.$refs.felUpload.clearFiles();
      }
    }
  }
};
</script>

