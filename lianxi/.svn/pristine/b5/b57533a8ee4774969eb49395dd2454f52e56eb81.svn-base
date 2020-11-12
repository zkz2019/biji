<template>
  <fel-popup footer :width="width" css="com-face" title="录入人脸" @close="entryClose" :value="value">
    <div v-loading="isLoading" class="see">
      <img v-if="imgUrl" :src="imgUrl" />
      <video v-show="!imgUrl" id="myVideo" muted loop playsinline @loadedmetadata="fnRun"></video>
      <canvas v-show="!imgUrl" id="myCanvas" :style="{'margin-left': marginLeft}" />
    </div>
    <template slot="footer">
      <template v-if="imgUrl">
        <el-button class="com-but-small" @click="entryAgain">重新拍照</el-button>
        <el-button class="com-but-small" type="primary" @click="submitForm1">确定</el-button>
      </template>
      <template v-else>
        <el-button class="com-but-small" @click="entryClose">取消</el-button>
        <el-button class="com-but-small" type="primary" @click="submitForm">拍照</el-button>
      </template>
    </template>
  </fel-popup>
</template>

<script>
import * as faceapi from "face-api.js";
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      width: "70%",
      boxData: {},
      imgUrl: "",
      isLoading: true,
      marginLeft: "-50%",
      box: true,
      nets: "tinyFaceDetector", // 模型
      options: null, // 模型参数
      withBoxes: true, // 框or轮廓
      detectFace: "detectSingleFace", // 单or多人脸
      detection: "landmark",
      videoEl: null,
      canvasEl: null,
      context: null,
      timeout: 0,
      // 视频媒体参数配置
      constraints: {
        audio: false,
        video: {
          // ideal（应用最理想的）
          width: {
            min: 320,
            ideal: 1280,
            max: 1920
          },
          height: {
            min: 240,
            ideal: 720,
            max: 1080
          },
          // frameRate受限带宽传输时，低帧率可能更适宜
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60
          },
          // 显示模式前置后置
          facingMode: "user"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.fnInit().then(() => {
        this.fnOpen();
      });
      // 节点属性化
      this.videoEl = this.$el.querySelector("#myVideo");
      this.canvasEl = this.$el.querySelector("#myCanvas");
      this.context = this.canvasEl.getContext("2d");
    });
  },
  methods: {
    entryAgain() {
      this.width = "70%";
      this.imgUrl = "";
      this.isLoading = true;
      this.boxData = {};
      this.fnOpen();
    },
    submitForm1() {
      this.$emit("submit", this.imgUrl);
    },
    submitForm() {
      if (this.boxData.box) {
        // this.width = "30%";
        this.handleTracked();
        this.fnClose();
      }
    },
    entryClose() {
      this.fnClose();
      this.$emit("close");
    },
    // 初始化模型加载
    async fnInit() {
      await faceapi.nets[this.nets].loadFromUri("/models"); // 算法模型
      await faceapi.loadFaceLandmarkModel("/models"); // 轮廓模型

      this.options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 512, // 160 224 320 416 512 608
        scoreThreshold: 0.5 // 0.1 ~ 0.9
      });
    },
    // 人脸面部勘探轮廓识别绘制
    async fnRunFaceLandmark() {
      console.log("RunFaceLandmark");
      if (this.videoEl.paused) return clearTimeout(this.timeout);
      // 识别绘制人脸信息
      const result = await faceapi[this.detectFace](
        this.videoEl,
        this.options
      ).withFaceLandmarks();
      if (result && !this.videoEl.paused) {
        const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
        const resizeResult = faceapi.resizeResults(result, dims);
        this.draw(resizeResult.detection);
      } else {
        this.canvasEl
          .getContext("2d")
          .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      }
      this.timeout = setTimeout(() => this.fnRunFaceLandmark());
    },
    draw(data) {
      this.boxData = data;
      let ctx = this.context;
      let boxColor = "#409EFF",
        lineWidth = "2px";
      let z = data.box.height / 4;
      let _b = data.box,
        x = _b.x,
        y = _b.y,
        width = _b.width,
        height = _b.height + z * 1.2;
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(x, y - z, width, height);
    },
    handleTracked() {
      let data = this.boxData;
      let z = data.box.height / 4;
      let canvas = this.canvasEl;
      // canvas.width = data.box.width;
      // canvas.height = data.box.height + z * 1.2;

      let height = data.box.height + z * 2;
      let w = data.box.width * 2;
      let s = (w - data.box.width) / 2;
      canvas.width = w;
      canvas.height = height;
      this.context.drawImage(
        this.videoEl,
        data.box.x,
        data.box.y - z,
        data.box.width,
        data.box.height + z * 1.2,
        (w - data.box.width) / 2,
        (height - data.box.height - z * 1.2) / 2,
        data.box.width,
        data.box.height + z * 1.2
      );
      this.imgUrl = canvas.toDataURL("image/png");
      // canvas.toBlob(blob => {
      //   this.imgBlob = blob;
      // }, "image/png");
    },
    // 执行检测识别类型
    fnRun() {
      this.isLoading = false;
      let m = this.videoEl.clientWidth / 2;
      this.marginLeft = 0 - m + "px";
      this.fnRunFaceLandmark();
    },
    // 启动摄像头视频媒体
    fnOpen() {
      if (typeof window.stream === "object") return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.getUserMedia(this.constraints, this.fnSuccess, this.fnError);
      }, 300);
    },
    getUserMedia(constrains, success, error) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //最新标准API
        navigator.mediaDevices
          .getUserMedia(constrains)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        navigator
          .webkitGetUserMedia(constrains)
          .then(success)
          .catch(error);
      } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        navigator
          .mozGetUserMedia(constrains)
          .then(success)
          .catch(error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator
          .getUserMedia(constrains)
          .then(success)
          .catch(error);
      } else {
        this.$alert("你的浏览器不支持访问用户媒体设备", "错误提示", {
          confirmButtonText: "确定",
          showClose: false,
          callback: action => {
            this.entryClose();
          }
        });
        // alert("你的浏览器不支持访问用户媒体设备");
      }
    },
    // 成功启动视频媒体流
    fnSuccess(stream) {
      window.stream = stream; // 使流对浏览器控制台可用
      this.videoEl.srcObject = stream;
      this.videoEl.play();
    },
    // 失败启动视频媒体流
    fnError(error) {
      console.log(error);
      this.$alert(
        "启动视频媒体流失败，没有获取到媒体设备或没有授权相机访问权限，" + error,
        "错误提示",
        {
          confirmButtonText: "确定",
          showClose: false,
          callback: action => {
            this.entryClose();
          }
        }
      );
      // alert("启动视频媒体流失败， 没有获取到摄像头或者授权相机访问权限，" + error);
    },
    // 结束摄像头视频媒体
    fnClose() {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.videoEl.pause();
      clearTimeout(this.timeout);
      if (typeof window.stream === "object") {
        window.stream.getTracks().forEach(track => track.stop());
        window.stream = "";
        this.videoEl.srcObject = null;
      }
    }
  },
  beforeDestroy() {
    this.fnClose();
  }
};
</script>

<style lang="scss">
.com-face {
  height: 60vh;
  padding: 0;
  .see {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    video,
    img,
    canvas {
      height: 100%;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 50%;
    }
  }
}
</style>