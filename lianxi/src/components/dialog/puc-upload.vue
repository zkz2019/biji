<!-- 图片上传组件 -->
<template>
  <div>
    <div v-if="file" class="img">
      <i class="el-icon-close" @click="onDelete"></i>
      <img :src="file">
    </div>
    <fel-upload
      v-else
      :intercept="intercept"
      accept="image/*"
      :drag="false"
      :showFileList="false"
      @uploadFile="uploadFile"
      :url="url"
    >
      <el-button class="com-but-small" type="primary">点击上传</el-button>
    </fel-upload>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    urlObtain: String,
    value: String
  },
  watch: {
    value() {
      if (this.value) {
        this.queryLogo();
      } else {
        this.file = "";
      }
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  data() {
    return {
      file: ""
    };
  },
  methods: {
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
    onDelete() {
      this.file = "";
      this.$emit("input", "");
    },
    uploadFile(file, data) {
      this.$emit("input", data);
      this.file = window.URL.createObjectURL(file);
      this.$emit("uploadFile", file, data);
    },
    intercept(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
<style lang='scss' scoped>
.img {
  position: relative;
  width: 50px;
  height: 50px;
  i {
    position: absolute;
    top: 0;
    right: -10px;
    background: rgb(255, 0, 0);
    color: #fff;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>