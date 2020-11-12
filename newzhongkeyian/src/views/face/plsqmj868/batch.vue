<template>
  <fel-container-batch noRetrie>
    <template slot="title">
      <span class="navig" type="text" @click="onReturn">批量授权门禁</span>
      <i class="arrow"></i>批量授权人脸数据
    </template>
    <template slot="left">
      <div class="tsTop">步骤1：选择待授人脸数据</div>
      <div class="b-center">
        <div class="b-query">
          <el-select
            size="mini"
            class="left-select"
            @change="onLeftChange"
            v-model="left.param.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item of left.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <template v-if="left.param.type == 1">
            <search-select
              @change="onChange"
              class="condition"
              :param="left.param"
              placeholder="输入卡号/姓名/人员编号查询"
              :refresh="left.refresh1"
              ajaxType="9"
              interface="/access/v2.0/auth/j/getFace"
            >
              <!-- <template v-slot:options="options" v-slot:text="loadText">
                <div class="select-tips" v-show="!options || options.length==0">{{loadText}}</div>
                <div class="select-list" v-show="options && options.length>0">
                  <div
                    class="fel-select_sel_item"
                    v-for="(item,key) of options"
                    :key="key"
                    @click.stop="onClick(item)"
                  >
                    <div class="text">{{item.personname}}</div>
                    <div class="text">{{item.personcode}}</div>
                  </div>
                </div>
              </template>-->
            </search-select>
          </template>
          <template v-else>
            <el-cascader
              class="condition"
              size="mini"
              v-model="left.param.pgids"
              :options="left.zzoptions"
              :props="{ checkStrictly: true ,value:'pgid',label:'pgname' }"
              clearable
            ></el-cascader>
            <!-- @change="zzOnchange" -->
          </template>
          <el-button class="box_top_rightBtn" @click="onClick(1)" size="mini" type="primary">查询</el-button>
        </div>
        <div class="b-center2">
          <template v-if="left.param.type == 1">
            <fel-table
              @onSelection="(arr)=>{left.queryDataDel = arr}"
              noRefresh
              :queryData="left.queryData"
              :list="left.list1"
            >
              <div class="full-list">待授权人员列表</div>
              <el-button
                type="text"
                :disabled="left.queryData.length==0"
                class="sli but-blue"
                @click="onDelete('1')"
              >
                <i class="ficon-remove"></i>移除
              </el-button>
              <el-button
                :disabled="left.queryData.length==0"
                class="sli but-blue"
                type="text"
                @click="onDelete('0')"
              >
                <i class="ficon-empty"></i>清空
              </el-button>
            </fel-table>
          </template>
          <template v-else>
            <paging-table
              interface="/access/v2.0/auth/j/getFace"
              layout=" prev, pager, next"
              noInit
              :param="left.param"
              ajaxType="9"
              :refresh="left.refresh"
              :list="left.list"
            >
              <div class="full-list">待授权人员列表</div>
            </paging-table>
          </template>
        </div>
      </div>
    </template>
    <template>
      <div class="tsTop">步骤2：选择位置</div>
      <div class="b-center">
        <div class="box_top">
          <el-button class="box_top_rightBtn" @click="onClick(2)" size="mini" type="primary">确认选择</el-button>
        </div>
        <div class="b-center2 b-tree">
          <fel-tree1
            ref="fel-tree1"
            class="tree1"
            :idArr="[0]"
            :refresh="refreshTree"
            interface="/access/v2.0/auth/2/listAccessDoorTree"
            ajaxType="9"
            nodeKey="agid"
            iconName="agtype"
            :param="{agfatherid:'',agtype:0}"
            paramKey="agfatherid"
            :defaultProps="{children: 'children',label: 'agname',isLeaf: 'isLeaf'}"
            @checkchange="checkchange"
          ></fel-tree1>
        </div>
      </div>
    </template>
    <template slot="right">
      <div class="tsTop">步骤3：批量生成授权</div>
      <div class="b-center">
        <paging-table
          noInit
          height="100%"
          ref="paging-table"
          :param="param"
          interface="/access/v2.0/auth/k/getAccessAuthFace"
          :list="list"
          ajaxType="9"
          @onAajx="onAajx"
          :refresh="refresh"
        >
          <el-button
            v-for="(v,k) of buts"
            type="text"
            :disabled="thridDisabled"
            :key="k"
            class="mar0-10"
            @click="onClickS(v.id, v)"
          >
            <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
            {{v.alias}}
          </el-button>
        </paging-table>
      </div>
    </template>
    <fel-popup form width="60%" title="人脸授权" @close="grantClose" :value="grant.box">
      <fel-form
        noReset
        ref="felForm"
        @submitForm="submitForm"
        @closeForm="grantClose"
        width="140px"
        :defaultData="grant.data"
        :formData="grant.list"
      ></fel-form>
    </fel-popup>
    <fel-popup form width="40%" title="延时下发授权" @close="delayed.box = false" :value="delayed.box">
      <fel-form
        noReset
        ref="felForm"
        @submitForm="submitDelayed"
        @closeForm="delayed.box = false"
        width="140px"
        :defaultData="delayed.data"
        :formData="delayed.list"
      ></fel-form>
    </fel-popup>
  </fel-container-batch>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: { buts: Array },
  data() {
    let $this = this;
    return {
      delayed: {
        box: false,
        data: {},
        list: [
          {
            value: "senddate",
            name: "下发时间",
            type: "date",
            date: "datetime",
            options: {
              disabledDate(time) {
                return time.getTime() < new Date() - 86400000;
              }
            },
            format: "yyyy-MM-dd HH:mm:ss"
          }
        ]
      },
      grant: {
        box: false,
        data: {
          aafldopenstime: "00:00",
          aafldopenetime: "23:59",
          aafldisapp: "0",
          aafldusecount: "",
          aafldsdate: "",
          aafldedate: ""
        },
        list: [
          {
            value: "aafldsdate",
            name: "授权开始时间",
            width: "50%",
            type: "date",
            date: "datetime",
            format: "yyyy-MM-dd HH:mm:ss"
          },
          {
            value: "aafldedate",
            name: "授权结束时间",
            width: "50%",
            type: "date",
            date: "datetime",
            format: "yyyy-MM-dd HH:mm:ss"
          },
          {
            value: "aafldopenstime",
            name: "每日授权开始时间",
            width: "50%",
            type: "time",
            format: "HH:mm",
            rules: [
              {
                required: true,
                message: "请选择每日授权开始时间",
                trigger: "blur"
              }
            ]
          },
          {
            value: "aafldopenetime",
            name: "每日授权结束时间",
            width: "50%",
            type: "time",
            format: "HH:mm",
            rules: [
              {
                required: true,
                message: "请选择每日授权结束时间",
                trigger: "blur"
              }
            ]
          },
          {
            value: "aafldisapp",
            name: "下发蓝牙钥匙权限",
            width: "50%",
            type: "checkbox",
            select: [
              { label: "是", value: "1" },
              { label: "否", value: "0" }
            ]
          },
          {
            value: "aafldusecount",
            width: "50%",
            name: "授权次数",
            type: "tel",
            rules: [
              {
                min: 1,
                max: 255,
                message: "授权次数必须为大于0小于255的整数",
                trigger: "blur"
              }
            ]
          }
        ]
      },
      thridDisabled: true,
      param: {
        areas: [],
        faces: [],
        pgids: [],
        type: ""
      },
      refreshTree: 0,
      list: [
        {
          name: "序号",
          type: "index",
          width: "60px"
        },
        {
          name: "姓名",
          prop: "personname"
        },
        {
          name: this.getNumber(),
          prop: "personcode"
        },
        // {
        //   name: "门名称",
        //   prop: "adname"
        // },
        {
          name: "位置",
          formatter(row, a, b) {
            return (
              row.aglocation +
              " - " +
              row.amname +
              " - " +
              row.adname 
              // " - " +
              // row.ahname
            );
          }
          // prop: "aglocation"
        },
        // {
        //   name: "门禁名称",
        //   prop: "amname"
        // }
      ],
      refresh: 0,
      left: {
        queryDataDel: [],
        zzoptions: [],
        list1: [
          {
            type: "selection"
          },
          {
            name: "序号",
            type: "index",
            width: "60px"
          },
          {
            name: "人脸编号",
            prop: "facecode"
          },
          {
            name: "姓名",
            prop: "personname"
          },
          {
            name: this.getNumber(),
            prop: "personcode"
          }
        ],
        list: [
          {
            name: "序号",
            type: "$index",
            width: "60px"
          },
          {
            name: "人脸编号",
            prop: "facecode"
          },
          {
            name: "姓名",
            prop: "personname"
          },
          {
            name: this.getNumber(),
            prop: "personcode"
          }
        ],
        refresh1: 0,
        refresh: 0,
        queryData: [],
        param: {
          pgids: [],
          search: "",
          type: "1",
          page: 1,
          rows: 10
        },
        options: [
          { value: "1", label: "人员" },
          { value: "2", label: "组织" }
        ]
      }
    };
  },
  created() {
    this.grant.data = {
      aafldisapp: "0",
      aafldopenstime: "00:00",
      aafldopenetime: "23:59",
      aafldusecount: "",
      aafldsdate: "",
      aafldedate: ""
    };
    this.listGroupTree();
  },
  methods: {
    ...mapGetters(["getNumber"]),
    grantClose() {
      this.grant.box = false;
      if (this.$refs["felForm"]) {
        this.$refs["felForm"].resetForm();
        this.$refs["felForm"].ruleForm = Object.assign(
          this.$refs["felForm"].ruleForm,
          this.grant.data
        );
      }
    },
    submitForm(data) {
      this.grant.data = data;
      this.grant.box = false;
    },
    onClickS(key) {
      if (key == 1) {
        this.thridDisabled = true;
        this.$refs["paging-table"].setQueryData([]);
      } else if (key == 2) {
        this.grant.box = true;
      } else if (key == 869) {
        this.saveAccessAuthFace({
          sendtype: 1,
          senddate: ""
        });
      } else if (key == 8691) {
        this.delayed.box = true;
      }
    },
    submitDelayed(data) {
      this.saveAccessAuthFace({
        sendtype: 2,
        senddate: data.senddate
      });
    },
    saveAccessAuthFace(obj) {
      let data = Object.assign(obj, this.param);
      this.$ajax(
        "/access/v2.0/auth/l/saveAccessAuthFace",
        data,
        "9",
        this.grant.data,
        "请求中...",
        120000
      )
        .then(res => {
          this.$message({
            message: "授权已下发!",
            type: "success"
          });
          this.thridDisabled = true;
          this.onReturn();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    onAajx(data) {
      this.thridDisabled = data.length == 0 ? true : false;
    },
    onDelete(key) {
      if (key == 0) {
        this.left.queryData = [];
      } else {
        if (this.left.queryDataDel && this.left.queryDataDel.length > 0) {
          this.left.queryDataDel.forEach(val => {
            let ind = this.left.queryData.indexOf(val);
            this.left.queryData.splice(ind, 1);
          });
        } else {
          this.$message({
            message: "请先选择要删除的人员!",
            type: "warning"
          });
        }
      }
    },
    listGroupTree() {
      this.$ajax("/access/v2.0/auth/3/listGroupTree", {}, "9", true)
        .then(res => {
          this.left.zzoptions = res.result;
        })
        .catch(err => {});
    },
    onChange(data) {
      let next = true;
      this.left.queryData.forEach(item => {
        if (item.facecode == data.facecode) {
          next = false;
        }
      });
      if (next) {
        this.left.queryData.push(data);
      }
    },
    onClick(key) {
      if (key == 1) {
        if (this.left.param.type == 1) {
          this.left.refresh1 = new Date().getTime();
        } else {
          this.left.refresh = new Date().getTime();
        }
      } else if (key == 2) {
        let type = this.left.param.type;
        let queryData = [];
        let pgids = [];
        if (type == 1) {
          queryData = this.left.queryData.map(o => o.facecode);
          if (queryData.length == 0) {
            this.$message({
              message: "请先选择人员!",
              type: "warning"
            });
            return false;
          }
        } else if (type == 2) {
          pgids = this.left.param.pgids;
          if (pgids.length == 0) {
            this.$message({
              message: "请先选择组织!",
              type: "warning"
            });
            return false;
          }
        }
        if (this.param.areas.length == 0) {
          this.$message({
            message: "请先选择建筑!",
            type: "warning"
          });
          return false;
        } else {
          this.param.areas = this.param.areas.map(obj => {
            return {
              agid: obj.agid,
              agtype: obj.agtype
            };
          });
        }
        this.param.type = type;
        this.param.faces = queryData;
        this.param.pgids = pgids;
        this.refresh = new Date().getTime();
      }
    },
    checkchange(val, data) {
      this.param.areas = data.checkedNodes;
    },
    onLeftChange() {},
    onEjectChange() {},
    onReturn() {
      this.$emit("onReturn");
    }
  }
};
</script>

<style lang="scss">
.b-center {
  padding: 8px;
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  .b-query {
    display: flex;
    align-items: center;
    .left-select {
      width: 80px;
      margin-right: 10px;
    }
    .condition {
      flex: 1;
    }
    .box_top_rightBtn {
      height: 26px;
      margin-left: 10px;
    }
  }
  .box_top {
    text-align: right;
  }
  .b-center2 {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .b-tree {
    position: relative;
    .fel-tree {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
    }
  }
  .fel-tables {
    flex: 1;
  }
}
</style>