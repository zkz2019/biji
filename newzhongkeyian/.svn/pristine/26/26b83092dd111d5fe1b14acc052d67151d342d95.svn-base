<!--  楼栋实体组件  -->
<template>
  <el-main v-loading="loading" class="floormax">
    <div class="roomBox_maxbox" ref="scroll">
      <div class="region">
        <template v-for="(item,key) of roomlist">
          <div v-if="item.agtype2 == 1" :key="key" @click="regionClick(item,key)" class="regionBox">
            <div class="regionBox_left">
              <div>
                <img src="../../assets/image/quyu.jpg" alt />
              </div>
            </div>
            <div class="regionBox_right">
              <h3>{{item.agname}}</h3>
              <ul>
                <li>
                  <img src="../../assets/image/xjqy.png" alt />
                  <span>下级区域:</span>
                  <span>{{item.areacount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/xjld.png" alt />
                  <span>下级楼栋:</span>
                  <span>{{item.dongcount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/xiangqing.png" alt />
                  <span>{{getRoomtype2s[1]||"寝室房间"}}:</span>
                  <span>{{item.roomcount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/gonggong.png" alt />
                  <span>{{getRoomtype2s[2]||"公共房间"}}:</span>
                  <span>{{item.publiccount}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else :key="key" @click="floorClick(item,key)" class="floorBox">
            <div class="floorBox_left">
              <div>
                <img src="../../assets/image/room1.png" alt />
              </div>
            </div>
            <div class="floorBox_right">
              <h3>{{item.agname}}</h3>
              <ul>
                <li>
                  <img src="../../assets/image/louceng.png" alt />
                  <span>楼层数:</span>
                  <span>{{item.floorcount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/qinshi.png" alt />
                  <span>{{getRoomtype2s[1]||"寝室房间"}}:</span>
                  <span>{{item.roomcount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/gonggong.png" alt />
                  <span>{{getRoomtype2s[2]||"公共房间"}}:</span>
                  <span>{{item.publiccount}}</span>
                </li>
                <li>
                  <img src="../../assets/image/xiangqing.png" alt />
                  <span>入住详情:</span>
                  <span>{{item.rz}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="item.agtype2 == 1 && roomlist[key+1] && roomlist[key+1].agtype2 != 1"
            :key="'s'+key"
            class="separator"
          ></div>
        </template>
        <div v-if="roomlist.length == 0 && isListLoad" class="listNull">暂无数据</div>
        <div v-if="serverText" class="listNull">{{serverText}}</div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    param: Object,
    refresh: Number
  },
  data() {
    return {
      loading: false,
      page: 1,
      rows: 12,
      roomlist: [],
      getRoomtype2s: {},
      serverText: "",
      isLoad: false,
      isListLoad: false,
      timing: null,
      regionData: null
    };
  },
  created() {
    this.getRoomtype2s = this.getRoomtype2()();
    this.regionData = null;
    if (this.param.agid) {
      this.loading = true;
      this.page = 1;
      this.roomlist = [];
      this.inGetbuildanalysisbylevel();
    }
  },
  mounted() {
    let scrollDom = this.$refs["scroll"];
    if (scrollDom) {
      scrollDom.scrollTop = 0;
      scrollDom.onscroll = e => {
        var dataList = scrollDom.querySelector(".region").clientHeight; // 数据的高度
        var listHeight = scrollDom.clientHeight; // 列表的高度
        if (scrollDom.scrollTop >= dataList - listHeight - 10) {
          if (this.isLoad) {
            this.page++;
            this.inGetbuildanalysisbylevel();
          }
        }
      };
    }
  },
  watch: {
    refresh(val) {
      this.regionData = null;
      this.loading = true;
      this.page = 1;
      let scrollDom = this.$refs["scroll"];
      if (scrollDom) {
        scrollDom.scrollTop = 0;
      }
      this.roomlist = [];
      this.inGetbuildanalysisbylevel();
    }
  },
  methods: {
    ...mapGetters(["getRoomtype2"]),
    inGetbuildanalysisbylevel() {
      if (this.timing) {
        clearTimeout(this.timing);
      }
      this.serverText = "";
      this.isLoad = false;
      this.isListLoad = false;
      this.$ajax(
        "/lock/9/getbuildanalysisbylevel",
        {
          page: this.page,
          rows: this.rows
        },
        "1",
        this.regionData || this.param,
        false,
        30000,
        response => {
          let config = JSON.parse(response.config.data);
          let data = this.regionData || this.param;
          if (config.agid == data.agid) {
            this.loading = false;
            let res = response.data;
            let list = res.result.data || [];
            if (list.length == this.rows) {
              if (this.page < Math.ceil(Number(res.result.total) / this.rows)) {
                this.isLoad = true;
              }
            }
            if (this.page == 1) {
              this.roomlist = list;
              if (Number(res.result.total) > this.rows) {
                this.timing = setTimeout(() => {
                  this.page++;
                  this.inGetbuildanalysisbylevel();
                }, 1000);
              }
            } else {
              this.roomlist.push(...list);
            }
            this.isListLoad = true;
          }
        }
      ).catch(err => {
        this.loading = false;
        this.serverText = `[${err.resultCode}] ` + err.resultMsg;
      });
    },
    regionClick(data) {
      let obj = this.regionData || this.param;
      data.fatherId = obj.agid;
      this.$emit("toRegion", data);
      this.regionData = data;
      this.loading = true;
      this.page = 1;
      let scrollDom = this.$refs["scroll"];
      if (scrollDom) {
        scrollDom.scrollTop = 0;
      }
      this.roomlist = [];
      this.inGetbuildanalysisbylevel();
    },
    floorClick(data) {
      let obj = this.regionData || this.param;
      data.fatherId = obj.agid;
      this.$emit("toFloor", data);
    }
  }
};
</script>

<style lang="scss">
.fjgl38 .floormax .roomBox_maxbox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: auto;
  @media screen and(max-width:1200px) {
    overflow-y: scroll;
  }
  .listNull {
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 250px;
    color: #666;
  }
}
</style>

