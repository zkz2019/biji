<!-- 左侧头像栏  -->
<template>
  <div class="adminLeft">
    <div class="checkIn_left_top" v-loading="loading">
      <div
        @click="checkp(item, ind)"
        v-for="(item,ind) of checked"
        class="checkIn_left_box"
        :key="ind"
        :class="{'active':isActive == ind }"
      >
        <div class="checkIn_left_box1">
          <div class="checkIn_left_headIcon">
            <img
              :class="{grayscale:item.issend=='0'?false:true}"
              :src="item.imagebase64==''?item.personsex==0?require('./../../../assets/image/n2.png'):require('./../../../assets/image/n1.png'):'data:image/png;base64'+item.imagebase64"
              alt
            />
            <!-- <fel-img  data:image/png;base64,
              width="100%"
              height="100%"
              urlObtain="/lock/operate/auth/7/downpersonimage"
              :value="item.personimage"
              @input="(val)=>{
                item.personimageData = val
              }"
              :imgValue="item.personsex==0?require('./../../../assets/image/n2.png'):require('./../../../assets/image/n1.png')"
            />-->
          </div>
          <div class="checkIn_left_text" :class="{padt10:true}">
            <div class="checkIn_left_text_head">{{item.personname}}</div>
            <div class="checkIn_left_text_main">
              <span>性别：{{item.personsex== 1?"男":"女"}}</span>
              <span v-if="cwShow">| 床位：{{item.roomseq}}</span>
              <span v-if="ztShow">
                | 状态:
                <span
                  :class="item.isduedate=='0'?'puc-pg':'puc-px'"
                >{{item.isduedate=='0'?'正常入住':'已到期'}}</span>
              </span>
            </div>
            <!-- <div></div> -->
          </div>
        </div>
      </div>
      <div class="checkIn_left_isNull" v-if="checked.length == 0 && isLoad">暂无数据</div>
    </div>
    <div class="checkIn_left_bottom">
      <span>入住人数: {{adminInfo.roomtype==1||adminInfo.roomtype==4?adminInfo.roomrzperson:adminInfo.roombdcard}}/{{adminInfo.roomtype==1||adminInfo.roomtype==4?adminInfo.roommaxperson:adminInfo.roommaxcard}}</span>
      <div class="search">
        <div class="query_head marpadbor0" v-if="isInput">
          <el-input
            class="qh_inp"
            placeholder="输入姓名/人员编号/卡号查询"
            suffix-icon="el-icon-search"
            v-model="search"
            clearable
            @input="inGetroomperson"
          ></el-input>
          <i @click="isInput = false" class="el-icon-arrow-right"></i>
        </div>
        <div class="search_bottom" v-else @click="isInput = true">
          <i style="font-size: 16px;" class="el-icon-search"></i>
          <!-- <i class="el-icon-arrow-left"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    checkedroom: Object,
    cwShow: { type: Boolean, default: true },
    ztShow: { type: Boolean, default: false },
    url: String,
    refresh: String | Number,
  },
  data() {
    return {
      isInput: false,
      loading: false,
      checked: [],
      search: "",
      isLoad: false,
      isActive: null,
    };
  },
  created() {
    this.inGetroomperson();
  },
  watch: {
    checkedroom(val) {
      this.inGetroomperson();
    },
    refresh(val) {
      this.inGetroomperson();
    },
  },
  computed: {
    ...mapState({
      adminInfo: (state) => state.fj38.adminInfo,
    }),
  },
  methods: {
    inGetroomperson(data) {
      //查询事件
      this.loading = true;
      this.isLoad = false;
      this.$ajax(
        this.url,
        {
          roomid: this.checkedroom.roomid,
          search: this.search,
        },
        "1"
      )
        .then((res) => {
          this.checked = res.result;
          this.loading = false;
          this.isLoad = true;
          let num = 0;
          if (data) {
            this.checked.forEach((item, ind) => {
              if (item.personcode == data.personcode) {
                this.isActive = ind;
                this.checkp(this.checked[ind], ind);
                num = 1;
              }
            });
          }
          if (num == 0) {
            this.isActive = -1;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message({
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error",
          });
        });
    },
    checkp(data, key) {
      //人员选中事件
      this.isActive = key;
      this.$emit("checkp", data, key);
    },
  },
};
</script>

<style lang="scss" scoped>
.grayscale {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>
