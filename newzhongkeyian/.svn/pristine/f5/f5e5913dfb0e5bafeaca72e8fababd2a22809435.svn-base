<!-- 图片上传组件 -->
<template>
  <div class="fel-img" v-loading="loading" :style="{width: width,height: height}">
    <img :src="file" @error="onError" />
  </div>
</template>

<script>
export default {
  props: {
    urlObtain: { type: String, default: "/login/home/9/downlogo" },
    imgValue: null,
    width: String,
    height: String,
    value: String
  },
  watch: {
    value(val) {
      if (val) {
        this.queryLogo();
      } else {
        this.file = this.imgValue;
        this.$emit("input", this.file);
      }
    }
  },
  created() {
    // this.loading=true;
    if (this.value) {
      this.queryLogo();
    } else {
      this.file = this.imgValue;
      this.$emit("input", this.file);
    }
  },
  data() {
    return {
      loading: false,
      file: null
    };
  },
  methods: {
    queryLogo() {
      this.loading = true;
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
            this.$emit("input", this.file);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    onError() {
      this.file = this.imgValue || "";
      this.$emit("input", this.file);
    }
  }
};
</script>
