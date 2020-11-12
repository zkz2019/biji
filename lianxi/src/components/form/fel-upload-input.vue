<!-- 图片上传组件 -->
<template>
  <div class="fel-upload-input">
    <div v-if="file" class="img" :style="{width: width,height: height}">
      <i class="el-icon-close" @click="onDelete"></i>
      <img :src="file" @error="onError">
    </div>
    <div v-else-if="fileT" class="img" :style="{width: width,height: height}">
      {{fileT}}
      <i class="el-icon-close" @click="onDelete"></i>
    </div>
    <fel-upload
      v-else
      :intercept="intercept"
      accept="txt"
      :drag="false"
      :showFileList="false"
      :isCustom="isCustom"
      @uploadFile="uploadFile"
      @receiveFiles="receiveFiles"
      :url="url"
    >
      <span class="fel-upload-input-but">
        <i class="maR5 ficon-shangchuang"></i>
        {{label||'上传图片'}}
      </span>
    </fel-upload>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    urlObtain: String,
    label: String,
    imgValue: null,
    width: String,
    height: String,
    value: String,
    isCustom: { type: Boolean, default: false }
  },
  watch: {
    value(val) {
      if (val) {
        if (this.imgValue && this.isLoad) {
          this.file = this.imgValue;
        } else {
          if (!this.file) {
            this.queryLogo();
          }
        }
      } else {
        this.file = "";
        this.fileT = "";
      }
    }
  },
  created() {
    if (this.value) {
      if (this.imgValue && this.isLoad) {
        this.file = this.imgValue;
      } else {
        if (!this.file) {
          this.queryLogo();
        }
      }
    } else {
      this.file = "";
      this.fileT = "";
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      file: "",
      isLoad: true,
      fileT: ""
    };
  },
  methods: {
    receiveFiles(file, data, content) {
      this.fileT = file.name;
      content.onSuccess("上传成功");
      console.log("ddddd", file, data, content);
      this.$emit("exportFile", data);
    },
    queryLogo() {
      this.$ajax(
        this.urlObtain,
        {
          filepath: this.value
        },
        "3"
      )
        .then(res => {
          if (res.size) {
            this.file = window.URL.createObjectURL(res);
          }
        })
        .catch(err => {
          // if (err.size) {
          //   this.file = window.URL.createObjectURL(err);
          // }
        });
    },
    onError() {
      if (this.isLoad) {
        this.file = "";
        this.fileT = "";
      }
    },
    onDelete() {
      this.file = "";
      this.fileT = "";
      this.isLoad = false;
      this.$emit("input", "");
    },
    uploadFile(file, data) {
      this.file = window.URL.createObjectURL(file);
      this.$emit("input", data);
      this.$emit("uploadFile", file, data);
    },
    intercept(file) {
      this.isLoad = false;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
