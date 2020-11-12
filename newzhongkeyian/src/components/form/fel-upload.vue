<template>
  <el-upload
    class="fel-upload fel-uploads"
    ref="upload"
    action
    :show-file-list="showFileList"
    :accept="accept"
    :list-type="listType"
    :file-list="fileList"
    :before-remove="beforeRemove"
    :on-remove="onRemove"
    :on-change="onChange"
    :drag="drag"
    :http-request="httpRequest"
    :auto-upload="!noAuto"
  >
    <slot>
      <div class="text">
        <el-button type="primary">{{butTetx}}</el-button>或，将文件拖到此处
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </div>
    </slot>
  </el-upload>
</template>

<script>
export default {
  name: "fel-upload",
  props: {
    listType: {
      type: String,
      default: "picture"
    },
    noAuto: Boolean,
    drag: {
      type: Boolean,
      default: true
    },
    intercept: Function,
    accept: String,
    url: String,
    fileList: Array,
    showFileList: Boolean,
    butName: String,
    isCustom: Boolean,
    timeout: {
      type: Number,
      default: 30000
    }
  },
  data() {
    return {
      butTetx: this.noAuto ? "选择上传" : "点击上传",
      submitUrl: "",
      uploadData: {}
    };
  },
  methods: {
    onChangeUpload(content) {
      let file = content.file;
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        if (this.isCustom) {// 自定义上传
          this.$emit("receiveFiles", file, formData, content);
        } else if (this.intercept) {
          if (this.intercept(file)) {
            this.$ajax(
              this.submitUrl || this.url,
              this.uploadData,
              "7",
              formData,
              "上传中...",
              this.timeout
            )
              .then(res => {
                content.onSuccess("上传成功");
                this.$emit("uploadFile", file, res.result);
              })
              .catch(err => {
                if (!this.noAuto) {
                  content.onError("上传失败");
                } else {
                  this.$emit("uploadError", content, err);
                }
              });
          }
        } else {
          this.$ajax(this.url, {}, "7", formData, "上传中...", this.timeout)
            .then(res => {
              content.onSuccess("上传成功");
              this.$emit("uploadFile", file, res.result);
            })
            .catch(err => {
              if (!this.noAuto) {
                content.onError("上传失败");
              } else {
                this.$emit("uploadError", content, err);
              }
            });
        }
      }
    },
    beforeRemove: function(data) {
      this.$emit("deleteFile", data);
    },
    httpRequest: function(content) {
      this.onChangeUpload(content);
    },
    submitUpload(url = "", data = {}) {
      this.submitUrl = url;
      this.uploadData = data;
      if (this.$refs.upload) {
        this.$refs.upload.submit();
      }
    },
    onRemove(...arr) {
      console.log("删除");
      this.$emit("onRemove", ...arr);
    },
    onChange(...arr) {
      console.log("添加", arr);
      this.$emit("onChange", ...arr);
    },
    clearFiles() {
      this.fileList.splice(0, this.fileList.length);
      this.$refs.upload.clearFiles();
    },
    showUpload(val) {
      if (this.$el) {
        let dom = this.$el.querySelector("div.el-upload");
        if (dom && dom.style) {
          if (val) {
            dom.style.display = "inline-block";
          } else {
            dom.style.display = "none";
          }
        }
      }
    }
  },
  components: {}
};
</script>
