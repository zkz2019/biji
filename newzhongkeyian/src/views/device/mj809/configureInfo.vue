<!-- 配置门禁 -->
<template>
  <el-dialog
    class="configureInfo"
    top="5%"
    title="配置门禁"
    width="70%"
    v-loading.fullscreen.lock="loadingBody"
    :element-loading-text="loadText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="firstPane" label="基础信息" name="first">
        <form-table
          v-loading="loading"
          thwidth="18%"
          tdwidth="32%"
          :column="2"
          :param="defaultData"
          :list="single ? formDataSingle : formData"
        ></form-table>
      </el-tab-pane>
      <el-tab-pane label="功能配置" name="second">
        <fel-form
          ref="felForm"
          class="single-row"
          :selects="selects"
          @submitForm="submitForm"
          @closeForm="beforeClose"
          width="140px"
          dynamic
          :defaultData="defaultDataGNPZ"
          :formData="formData1"
        ></fel-form>
        <div class="config_second_text">
          同步模式、消防报警将应用到门禁下全部门锁，请按需配置
        </div>
      </el-tab-pane>
      <el-tab-pane label="自动开关门时段" name="third">
        <div v-if="autoData.length === 0" class="config_null">暂无数据</div>
        <div v-else class="config_box" id="autoScrollDev">
          <template v-for="(obj, key) in autoData">
            <div class="config_box_top" :key="'third|top|' + key">
              <span class="config_text">{{ obj.name }}</span>
              <fel-button
                :disabled="obj.start"
                @click="onReturn('1', obj)"
                type="text"
                >启用</fel-button
              >
              <fel-button
                :disabled="obj.stop"
                @click="onReturn('0', obj)"
                type="text"
                >停用</fel-button
              >
              <fel-button type="text" @click="onReturn('-1', obj)"
                >删除</fel-button
              >
            </div>
            <el-form
              :key="'third|form|' + key"
              ref="autoForm"
              :rules="rules"
              :model="obj.form"
              label-width="130px"
              size="mini"
            >
              <el-form-item label="自动开关门时段" prop="dates">
                <el-time-picker
                  is-range
                  v-model="obj.form.dates"
                  range-separator="至"
                  format="HH:mm"
                  class="config_sel"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                ></el-time-picker>
              </el-form-item>
              <el-form-item label="每周运行日期" prop="week">
                <el-select
                  multiple
                  class="config_sel"
                  v-model="obj.form.week"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataKGM.weeks"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="常开后控制" prop="control">
                <el-select
                  class="config_sel"
                  v-model="obj.form.control"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataKGM.attypes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联动门" prop="linkage">
                <el-select
                  multiple
                  class="config_sel"
                  v-model="obj.form.linkage"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataKGM.doors"
                    :key="item.adid"
                    :label="item.adname"
                    :value="item.adid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div>同一个门禁最多设置12个时段</div>
        <div class="config_bottom">
          <fel-button class="qh_btn" @click="onAdd('0')">新增时段</fel-button>
          <fel-button class="qh_btn" @click="beforeClose">取消</fel-button>
          <fel-button class="qh_btn" type="primary" @click="onSubmit"
            >确定</fel-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="门配置" name="fourth">
        <div v-if="autoDataMS.length === 0" class="config_null">暂无数据</div>
        <div v-else class="config_box">
          <template v-for="(obj, key) in autoDataMS">
            <div class="config_box_top" :key="'fourth|top|' + key">
              <span class="config_text">{{ obj.name }}</span>
              <el-button
                @click="onStartOrStop('1', obj)"
                v-if="obj.isStop"
                type="text"
                >启用</el-button
              >
              <el-button
                @click="onStartOrStop('0', obj)"
                v-if="!obj.isStop"
                type="text"
                >停用</el-button
              >
            </div>
            <el-form
              :key="'fourth|form|' + key"
              :model="obj.form"
              label-width="110px"
              size="mini"
            >
              <el-form-item label="门名称">
                <el-input
                  class="config_sel"
                  placeholder="请填写门名称"
                  v-model="obj.form.name"
                ></el-input>
              </el-form-item>
              <el-form-item label="联动读头">
                <el-select
                  multiple
                  class="config_sel"
                  v-model="obj.form.hade"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in obj.heads"
                    :key="item.ahid"
                    :label="item.ahname"
                    :value="item.ahid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作模式">
                <el-select
                  class="config_sel"
                  v-model="obj.form.mode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adworkmodes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="门磁开关">
                <el-select
                  class="config_sel"
                  v-model="obj.form.off"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adcontactswiths"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="强制锁门">
                <el-select
                  class="config_sel"
                  v-model="obj.form.lock"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adforcelocks"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="门关闭时间">
                <el-select
                  class="config_sel maR24"
                  v-model="obj.form.adclosetime"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adclosetimes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-popover
                  :placement="'top-start'"
                  :trigger="'hover'"
                  content="门为常闭时，开门后门自动关闭的时间"
                >
                  <em slot="reference" class="form-but" style="color: #409eff">
                    <i class="el-icon-question"></i>
                  </em>
                </el-popover>
              </el-form-item>

              <el-form-item label="门类型">
                <el-select
                  class="config_sel"
                  @change="
                    (val) => {
                      onChangeAdtype2(val, obj.form);
                    }
                  "
                  v-model="obj.form.adtype2"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adtypes2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="锁类型">
                <el-select
                  class="config_sel"
                  v-model="obj.form.adtype"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataMS.adtypes[obj.form.adtype2]"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="obj.form.adtype == 4" label="锁动作时间">
                <el-select
                  class="config_sel maR24"
                  v-model="obj.form.adactivetime"
                >
                  <el-option
                    v-for="item in defaultDataMS.adactivetimes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-popover
                  :placement="'top-start'"
                  :trigger="'hover'"
                  content="开关门时，门锁运转时间"
                >
                  <em slot="reference" class="form-but" style="color: #409eff">
                    <i class="el-icon-question"></i>
                  </em>
                </el-popover>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div class="config_bottom">
          <fel-button class="qh_btn" @click="beforeClose">取消</fel-button>
          <fel-button class="qh_btn" type="primary" @click="onSubmit('1')"
            >确定</fel-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="读头配置" name="fifth">
        <div v-if="autoDataDT.length === 0" class="config_null">暂无数据</div>
        <div v-else class="config_box">
          <template v-for="(obj, key) in autoDataDT">
            <div class="config_box_top" :key="'fifth|top|' + key">
              <span class="config_text">{{ obj.name }}</span>
              <fel-button
                :disabled="obj.start"
                @click="onReturn2('1', obj)"
                type="text"
                >启用</fel-button
              >
              <fel-button
                :disabled="obj.stop"
                @click="onReturn2('0', obj)"
                type="text"
                >停用</fel-button
              >
              <!-- <fel-button v-if="!single" type="text" @click="onReturn2('-1', obj)">删除</fel-button> -->
            </div>
            <el-form
              :key="'fifth|form|' + key"
              :model="obj.form"
              label-width="110px"
              size="mini"
            >
              <el-form-item label="读头ID">
                <el-input
                  class="config_sel"
                  disabled
                  v-model="obj.form.ahcode"
                ></el-input>
              </el-form-item>
              <el-form-item label="读头支持授权">
                <el-input
                  class="config_sel"
                  disabled
                  v-model="obj.form.ahauths"
                ></el-input>
              </el-form-item>
              <el-form-item label="读头软件版本号">
                <el-input
                  class="config_sel"
                  disabled
                  v-model="obj.form.ahver"
                ></el-input>
              </el-form-item>
              <el-form-item label="读头状态">
                <el-input
                  class="config_sel"
                  disabled
                  v-model="obj.form.ahstate"
                ></el-input>
              </el-form-item>
              <el-form-item label="读头位置">
                <el-select
                  class="config_sel"
                  v-model="obj.form.ahlocation"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataDT.ahlocations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="刷卡模式">
                <el-select
                  class="config_sel"
                  v-model="obj.form.ahpassmodetype"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in defaultDataDT.ahpassmodetypes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </div>
        <div class="config_bottom">
          <fel-button class="qh_btn" @click="onAdd('2')">探测读头</fel-button>
          <fel-button class="qh_btn" @click="beforeClose">取消</fel-button>
          <fel-button class="qh_btn" type="primary" @click="onSubmit('2')"
            >确定</fel-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="联动门锁授权" name="sixth">
        <fel-form
          ref="felForm"
          class="single-row"
          :selects="selects"
          @submitForm="submitFormDoor"
          @closeForm="beforeCloseDoor"
          width="140px"
          dynamic
          :defaultData="defaultDataMSSQ"
          :formData="formDataDoor"
        ></fel-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { getAccessOrderResult } from "./getResult.js";
import { format } from "@/utils/utils.js";
import { Form } from "element-ui";
export default {
  props: {
    param: Object,
    dialogVisible: Boolean,
  },
  data() {
    let $this = this;
    return {
      num: 0,
      num1: 0,
      single: false,
      isSync: true,
      autoData: [],
      autoDataMS: [],
      autoDataDT: [],
      rules: {
        linkage: [{ required: true, message: "请选择联动门", trigger: "blur" }],
        control: [
          {
            required: true,
            message: "请选择常开后控制模式",
            trigger: "change",
          },
        ],
        week: [
          { required: true, message: "请选择每周运行日期", trigger: "change" },
        ],
        dates: [
          {
            required: true,
            message: "请选择自动开关门时段",
            trigger: "change",
          },
        ],
      },
      loading: false,
      loadingBody: false,
      count: 60,
      loadText: "正在加载中...",
      activeName: "first",
      selects: {
        amwarns: [],
        doors: [],
        amsyncs: [],
        amsyncauths: [],
        amsyncdels: [
          { name: "是", id: 1 },
          { name: "否", id: 0 },
        ],
      },
      defaultData: {},
      defaultDataGNPZ: {},
      defaultDataMSSQ: {},
      defaultDataKGM: {},
      defaultDataMS: {},
      defaultDataDT: {},
      formData1: [
        {
          noShow: false,
          value: "amsync",
          name: "同步模式",
          type: "select",
          select: "amsyncs",
          slabel: "name",
          svalue: "id",
          onChange: this.onChangeSync,
        },
        {
          noShow: true,
          value: "amsyncauths",
          name: "同步授权类型",
          type: "template",
          template: {
            computed: {
              options() {
                return $this.selects["amsyncauths"];
              },
              amsyncauths: {
                get() {
                  return $this.defaultDataGNPZ.amsyncauths;
                },
                set(val) {
                  $this.defaultDataGNPZ.amsyncauths = val;
                },
              },
            },
            template: `<el-select size="small" v-model="amsyncauths" :multiple="true" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>`,
          },
        },
        {
          noShow: true,
          value: "amsyncdel",
          name: "是否删除同步授权",
          type: "select",
          select: "amsyncdels",
          slabel: "name",
          svalue: "id",
        },
        {
          noShow: false,
          value: "amwarn",
          name: "消防报警",
          type: "select",
          select: "amwarns",
          slabel: "name",
          svalue: "id",
          onChange: this.onChangeWarn,
        },
        {
          value: "door",
          name: "消防联动门",
          type: "template",
          template: {
            computed: {
              options() {
                return $this.selects["doors"];
              },
              door: {
                get() {
                  return $this.defaultDataGNPZ.door;
                },
                set(val) {
                  $this.defaultDataGNPZ.door = val;
                },
              },
            },
            template: `<el-select size="small" v-model="door" :multiple="true" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.adid"
                :label="item.adname"
                :value="item.adid">
              </el-option>
            </el-select>`,
          },
        },
      ],
      formData: [
        {
          value: "amname",
          name: "门禁名称",
        },
        {
          value: "amcode",
          name: "门禁唯一ID",
        },
        {
          value: "amtype",
          name: "门禁类型",
        },
        {
          value: "amver",
          name: "门禁软件版本",
        },
        {
          // value: "amstate",
          name: "门禁状态",
          render(obj, add) {
            if (obj.amstate == "在线") {
              return add("div", { class: "puc-pg" }, obj.amstate);
            } else {
              return add("div", { class: "puc-px" }, obj.amstate);
            }
          },
        },
        {
          name: "消防报警功能状态",
          // value: "amwarn",
          render(obj, add) {
            if (obj.amwarn == "启用") {
              return add("div", { class: "puc-pg" }, obj.amwarn);
            } else {
              return add("div", { class: "puc-px" }, obj.amwarn);
            }
          },
        },
        // {
        //   value: "",
        //   name: ""
        // },
        {
          value: "adisopen1",
          name: "1号门开关门状态",
        },
        {
          // value: "amisfirewarn",
          name: "1号门消防报警状态",
          render(obj, add) {
            if (obj.amisfirewarn == "未触发") {
              return add("div", { class: "puc-pg" }, obj.amisfirewarn);
            } else {
              return add("div", { class: "puc-px" }, obj.amisfirewarn);
            }
          },
        },
        {
          value: "adisopen2",
          name: "2号门开关门状态",
          noShow: false,
        },
        {
          // value: "amisfirewarn",
          name: "2号门消防报警状态",
          render(obj, add) {
            if (obj.amisfirewarn == "未触发") {
              return add("div", { class: "puc-pg" }, obj.amisfirewarn);
            } else {
              return add("div", { class: "puc-px" }, obj.amisfirewarn);
            }
          },
          noShow: false,
        },
        {
          //10
          value: "ambdcards",
          name: "卡片授权数量",
        },
        // {
        //   value: "",
        //   name: "蓝牙授权数量"
        // },
        {
          value: "ambdpasss",
          name: "密码授权数量",
        },
        {
          value: "ambdapp",
          name: "蓝牙授权数量",
        },
        {
          value: "ahbdfinger1",
          name: "1号读头指纹授权数量",
          noShow: false,
        },
        {
          value: "ahbdfinger2",
          name: "2号读头指纹授权数量",
          noShow: false,
        },
      ],
      formDataDoor: [
        {
          value: "aarstatus",
          name: "联动门锁授权",
          type: "select",
          select: [
            { name: "启用", id: "1" },
            { name: "停用", id: "0" },
          ],
          slabel: "name",
          svalue: "id",
          onChange: this.onChangeSync,
        },
        {
          value: "aardays",
          type: "text",
          name: "有效天数",
        },
      ],
      formDataSingle: [
        {
          value: "amname",
          name: "门禁名称",
        },
        {
          value: "amcode",
          name: "门禁ID",
        },
        {
          value: "amtype",
          name: "门禁类型",
        },
        {
          value: "amver",
          name: "门禁软件版本",
        },
        {
          value: "amstate",
          name: "门禁状态",
        },
        {
          value: "",
          name: "",
        },
        {
          value: "adisopen1",
          name: "1号门开关门状态",
        },
        {
          value: "",
          name: "",
        },
        {
          value: "ambdcard",
          name: "1号读头人脸授权数量",
        },
      ],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getAccessMainInfo();
      } else {
        this.activeName = "first";
      }
    },
  },
  computed: {
    defaultTimeMap() {
      let times = this.defaultDataMS.adactivetimes.map((item) => {
        return item.id;
      });
      console.log("times", times);
      return times;
    },
  },
  methods: {
    onChangeAdtype2(val, obj) {
      let a = this.defaultDataMS.adtypes[val];
      obj.adtype = a[0].id;
    },
    onLockTypeChange(val) {
      console.log("val", val);
    },
    onDoorTypeChange(val) {
      console.log("chagne", val);
    },
    // 消防报警
    onChangeWarn(val, obj) {
      if (val == 1) {
        this.formData1[4].noShow = false;
      } else {
        this.formData1[4].noShow = true;
      }
    },
    onChangeSync(val, obj) {
      if (val == 1) {
        this.isSync = true;
        this.formData1[1].noShow = false;
        this.formData1[2].noShow = true;
      } else {
        this.isSync = false;
        this.formData1[1].noShow = true;
        this.formData1[2].noShow = false;
      }
    },
    //获取功能配置
    getAccessMainDeploy() {
      this.$ajax(
        "/access/v2.0/main/9/getAccessMainDeploy",
        { amid: this.param.amid },
        "9"
      )
        .then((res) => {
          this.selects.amwarns = res.result.amwarns;
          if (res.result.amwarn != "0" && res.result.amwarn != "1") {
            res.result.amwarn = "";
          }
          this.selects.doors = res.result.doors;
          this.selects.amsyncs = res.result.amsyncs;
          this.selects.amsyncauths = res.result.amsyncauths;
          this.defaultDataGNPZ = res.result;
          this.defaultDataGNPZ.door = this.defaultDataGNPZ.door.map((item) => {
            return item.adid;
          });
          // this.defaultDataGNPZ.amsyncauths = this.defaultDataGNPZ.amsyncauths.map(
          //   item => {
          //     return item.id;
          //   }
          // );
          let amsyncauths = [];
          this.defaultDataGNPZ.amsyncauths.forEach((item) => {
            if (item.state != 0) {
              amsyncauths.push(item.id);
            }
          });
          this.defaultDataGNPZ.amsyncauths = amsyncauths;
          if (this.defaultDataGNPZ.amsync == 1) {
            this.onChangeSync(1);
          } else {
            this.onChangeSync(0);
          }
          if (this.defaultDataGNPZ.amwarn == 1) {
            this.onChangeWarn(1);
          } else {
            this.onChangeWarn(0);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    //获取门禁基础信息
    getAccessMainInfo() {
      if (true) {
        this.loading = true;
        this.$ajax(
          "/access/v2.0/main/8/getAccessMainInfo",
          { amid: this.param.amid },
          "9"
        )
          .then((res) => {
            this.defaultData = res.result;
            this.defaultData.adisopen1 = res.result.doors[0].adisopen;
            this.defaultData.adisopen2 = res.result.doors[1]
              ? res.result.doors[1].adisopen
              : false;
            console.log(
              "this.defaultData.adisopen2",
              this.defaultData.adisopen2
            );
            if (this.defaultData.adisopen2) {
              this.formData[8].noShow = false;
              this.formData[9].noShow = false;
              this.formData[14].noShow = false;
            } else {
              this.formData[8].noShow = true;
              this.formData[9].noShow = true;
              this.formData[14].noShow = true;
            }
            if (
              res.result.heads[0] &&
              res.result.heads[0].ahbdfinger != undefined &&
              res.result.heads[0].ahisfinger
            ) {
              this.formData[13].noShow = false;
              this.defaultData.ahbdfinger2 = this.defaultData.ahbdfinger1 =
                res.result.heads[0].ahbdfinger +
                "/" +
                res.result.heads[0].ahmaxfinger;
            } else {
              this.formData[13].noShow = true;
            }
            if (
              res.result.heads[1] &&
              res.result.heads[1].ahbdfinger != undefined &&
              res.result.heads[1].ahisfinger
            ) {
              this.formData[14].noShow = false;
              this.defaultData.ahbdfinger2 =
                res.result.heads[1].ahbdfinger +
                "/" +
                res.result.heads[1].ahmaxfinger;
            } else {
              this.formData[14].noShow = true;
            }
            this.defaultData.ambdcards =
              res.result.ambdcard + "/" + res.result.ammaxcard;
            this.defaultData.ambdpasss =
              res.result.ambdpass + "/" + res.result.ammaxpass;
            console.log("this.defaultData", this.defaultData);
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log("err", err);
          });
      }
    },
    // 获取自动开关门时段
    getAccessMainTime() {
      this.$ajax(
        "/access/v2.0/main/b/getAccessMainTime",
        { amid: this.param.amid },
        "9"
      )
        .then((res) => {
          this.defaultDataKGM = res.result;
          this.num = 0;
          this.autoData = res.result.times.map((item, index) => {
            // state: item.atstatus,
            this.num++;
            return {
              id: new Date().getTime(), //this.autoData.length,
              name: "自动开门时段" + this.num, //(this.autoData.length + 1),
              start: item.atstatus == 0 ? false : true,
              stop: item.atstatus == 1 ? false : true,
              form: {
                control: item.attype,
                dates: [
                  new Date(
                    0,
                    0,
                    0,
                    item.atstime.slice(0, 2),
                    item.atstime.slice(3, 5)
                  ),
                  new Date(
                    0,
                    0,
                    0,
                    item.atetime.slice(0, 2),
                    item.atetime.slice(3, 5)
                  ),
                ],
                atid: item.atid,
                linkage: item.door.map((obj) => {
                  return obj.adid;
                }),
                week: item.week.map((obj) => {
                  return obj.id;
                }),
              },
            };
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // 获取门锁配置
    getAccessDoor() {
      this.$ajax(
        "/access/v2.0/main/e/getAccessDoor",
        { amid: this.param.amid },
        "9"
      )
        .then((res) => {
          this.defaultDataMS = res.result;
          let adtypes = {};
          res.result.adtypes2.forEach((obj) => {
            adtypes[obj.id] = obj.adtypes;
          });
          this.defaultDataMS.adtypes = adtypes;
          this.num1 = 0;
          this.autoDataMS = res.result.doors.map((item, index) => {
            this.num1++;
            return {
              id: index, //this.autoData.length,
              name: item.adcode, //this.num1 + "号门", //(this.autoData.length + 1),
              heads: item.heads,
              isStop: item.adstatus == "1" ? false : true,
              form: {
                lock: item.adforcelock,
                off: item.adcontactswith,
                hade: item.adheads.map((obj) => {
                  return obj.ahid;
                }),
                adid: item.adid,
                name: item.adname,
                adactivetime:
                  this.defaultTimeMap.indexOf(item.adactivetime) > -1
                    ? item.adactivetime
                    : 100, //item.adactivetime,
                mode: item.adworkmode,
                adclosetime: item.adclosetime,
                adtype2: item.adtype2,
                adtype: item.adtype,
              },
            };
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    updateResult() {
      this.getAccessHead();
    },
    //获取联动门锁授权
    getAccessAreaRule() {
      this.$ajax(
        "/access/v2.0/door/t/getAccessAreaRule",
        { amid: this.param.amid },
        "1"
      )
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    //获取读头配置
    getAccessHead() {
      this.$ajax(
        "/access/v2.0/main/g/getAccessHead",
        { amid: this.param.amid },
        "9"
      )
        .then((res) => {
          this.defaultDataDT = res.result;
          this.autoDataDT = res.result.heads.map((item, index) => {
            return {
              id: index, //this.autoData.length,
              name: item.ahname, //this.num3 + "读头", //(this.autoData.length + 1),
              start: item.ahstatus == 1 ? true : false,
              stop: item.ahstatus == 0 ? true : false,
              form: {
                ahauths: item.ahauths,
                ahcode: item.ahcode,
                ahid: item.ahid,
                ahdoors: item.ahdoors,
                ahlocation: item.ahlocation,
                ahstate: item.ahstate,
                ahname: item.ahname,
                ahver: item.ahver,
                ahpassmodetype: item.ahpassmodetype,
              },
            };
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // 切换配置tab
    handleClick(data, obj) {
      if (data.name == "first") {
        this.getAccessMainInfo();
      } else if (data.name == "second") {
        this.getAccessMainDeploy();
      } else if (data.name == "third") {
        this.getAccessMainTime();
      } else if (data.name == "fourth") {
        this.getAccessDoor();
      } else if (data.name == "fifth") {
        this.getAccessHead();
      } else if (data.name == "sixth") {
        this.getAccessAreaRule();
      }
    },
    //开关门时间段启用/停用/删除
    onReturn(str, obj) {
      console.log("str,obj", str, obj);
      if (obj.start && obj.stop) {
        if (str === "-1") {
          let index = this.autoData.findIndex((item, ind) => {
            return item.id == obj.id;
          });
          this.autoData.splice(index, 1);
          this.autoData.forEach((item, index) => {
            item.name = "自动开门时段" + (index + 1);
          });
        }
      } else {
        this.$confirm(
          "确定要" +
            (str == "0" ? "停用" : str == "1" ? "启用" : "删除") +
            "该时段吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          let url = "/access/v2.0/main/c/updateAccessMainTimeStatus";
          let data = {
            amid: this.param.amid,
            atid: obj.form.atid,
            atstatus: str,
          };
          this.$ajax(url, data, "9", {}, true)
            .then((res) => {
              this.$message({
                type: "success",
                message:
                  (str == "0" ? "停用" : str == "1" ? "启用" : "删除") +
                  "成功!",
              });
              this.getAccessMainTime();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message:
                  `[${err.resultCode}] ` + err.resultMsg ||
                  (str == "0" ? "停用" : str == "1" ? "启用" : "删除") +
                    "成功!",
              });
              console.log("err", err);
            });
        });
      }
    },
    //读头启用/停用/删除
    onReturn2(str, obj) {
      this.$confirm(
        "确定要" +
          (str == "0" ? "停用" : str == "1" ? "启用" : "删除") +
          "该读头吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let url = "/access/v2.0/main/h/updateAccessHeadStatus";
        let data = {
          amid: this.param.amid,
          ahid: obj.form.ahid,
          ahstatus: str,
        };
        this.$ajax(url, data, "9")
          .then((res) => {
            // if (str === "-1") {
            //   let index = this.autoDataDT.findIndex((item, ind) => {
            //     return item.id == obj.id;
            //   });
            //   this.autoDataDT.splice(index, 1);
            //   this.autoDataDT.forEach((item, index) => {
            //     item.name = index + 1 + "号门";
            //   });
            // }
            this.$message({
              type: "success",
              message:
                (str == "0" ? "停用" : str == "1" ? "启用" : "删除") + "成功!",
            });
            this.getAccessHead();
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message:
                `[${err.resultCode}] ` + err.resultMsg ||
                (str == "0" ? "停用" : str == "1" ? "启用" : "删除") + "成功!",
            });
            console.log("err", err);
          });
      });
    },
    // 新增时间段/门锁/读头
    onAdd(str) {
      if (str == "0") {
        if (this.num >= 12) {
          return;
        }
        this.num++;
        this.autoData.push({
          form: {},
          id: new Date().getTime(), //this.autoData.length,
          name: "自动开门时段" + this.num, //(this.autoData.length + 1),
          start: true,
          stop: true,
        });
        let dom = document.getElementById("autoScrollDev");
        setTimeout(() => {
          this.$refs.autoForm.forEach((item) => {
            item.clearValidate();
          });
          if (dom) {
            let H = dom.scrollHeight;
            if (!dom.scrollTo) {
              Element.prototype.scrollTo = function (x, y) {
                this.scrollLeft = x;
                this.scrollTop = y;
              };
            }
            dom.scrollTo(0, H);
          }
          // console.log("dom.scrollHeight", dom.scrollHeight);
        }, 10);
      }
      //  else if (str == "1") {
      //   this.num1++;
      //   this.autoDataMS.push({
      //     form: {},
      //     id: new Date().getTime(),
      //     name: this.num1 + "号门"
      //   });
      // }
      else if (str == "2") {
        this.$ajax(
          "/access/v2.0/main/j/testAccessHead",
          { amid: this.param.amid },
          "9"
        )
          .then((res) => {
            this.loadingBody = true;
            this.loadText = `等待后台响应,预计${this.count}秒...`;
            getAccessOrderResult(res.result, this);
          })
          .catch((err) => {
            console.log("err", err);
          });
        // this.autoDataDT.push({
        //   form: {},
        //   id: new Date().getTime(),
        //   name: this.num2 + "读头",
        //   start: true,
        //   stop: true
        // });
      }
    },
    onStartOrStop(type, obj) {
      let data = {
        adid: obj.form.adid,
        adstatus: type,
      };
      this.$ajax(
        "/access/v2.0/main/q/updateAccessDoorStatus",
        data,
        "9",
        {},
        true
      )
        .then((res) => {
          this.getAccessDoor();
          this.$message({
            message: (type == "1" ? "启用" : "停用") + "成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: `[${err.resultCode}] ` + err.resultMsg || "请求失败!",
          });
        });
    },
    // 提交表单事件 自动开关门时间段/门配置/读头配置参数处理
    onSubmit(str) {
      if (str == "1") {
        //门锁
        let data = this.autoDataMS.map((item, ind) => {
          let obj = {};
          obj.adtype2 = item.form.adtype2;
          obj.adclosetime = item.form.adclosetime;
          obj.adactivetime = item.form.adactivetime;
          obj.adcontactswith = String(item.form.off) ? item.form.off : "";
          obj.adforcelock = String(item.form.lock) ? item.form.lock : "";
          obj.adheads =
            item.form.hade && item.form.hade.length > 0
              ? this.objMaps(item.form.hade, item.heads, "ahid")
              : [];
          obj.adid = item.form.adid ? item.form.adid : 0;
          obj.adname = item.form.name ? item.form.name : "";
          obj.adtype = String(item.form.adtype) ? item.form.adtype : "";
          obj.adworkmode = String(item.form.mode) ? item.form.mode : "";
          return obj;
        });
        this.onPut(
          "/access/v2.0/main/f/updateAccessDoor",
          { doors: data },
          "1"
        );
      } else if (str == "2") {
        let data = this.autoDataDT.map((item, ind) => {
          let obj = {};
          obj.ahid = item.form.ahid;
          obj.ahlocation = item.form.ahlocation;
          obj.ahpassmodetype = item.form.ahpassmodetype;
          return obj;
        });
        this.onPut(
          "/access/v2.0/main/i/updateAccessHead",
          { heads: data },
          "2"
        );
      } else {
        let next = true;
        this.$refs.autoForm.map((item) => {
          item.validate((valid) => {
            if (!valid) {
              console.log("error ", valid);
              next = false;
            }
          });
        });
        if (!next) {
          return;
        }
        let data = this.autoData.map((item, ind) => {
          let obj = {};
          obj.attype = String(item.form.control) ? item.form.control : "";
          obj.atstime =
            item.form.dates && item.form.dates.length > 0
              ? format(item.form.dates[0], "HH:mm")
              : "";
          obj.atetime =
            item.form.dates && item.form.dates.length > 0
              ? format(item.form.dates[1], "HH:mm")
              : "";
          obj.atid = item.form.atid ? item.form.atid : 0;
          obj.door = item.form.linkage
            ? this.objMaps(item.form.linkage, this.defaultDataKGM.doors, "adid")
            : [];
          obj.week = item.form.week
            ? this.objMaps(item.form.week, this.defaultDataKGM.weeks, "id")
            : [];
          return obj;
        });
        this.onPut(
          "/access/v2.0/main/d/updateAccessMainTime",
          { times: data },
          "3"
        );
      }
    },
    // 提交自动开关门时间段/门配置/读头配置参数处理
    onPut(url, data, str) {
      let text =
        str == "1"
          ? "更新门锁配置成功!"
          : str == "2"
          ? "更新读头配置成功!"
          : "更新自动开关门时段成功!";
      this.$ajax(url, data, "9", { amid: this.param.amid })
        .then((res) => {
          this.$message({
            type: "success",
            message: text,
          });
          setTimeout(() => {
            if (str == "1") {
              this.getAccessDoor();
            } else if (str == "2") {
              this.getAccessHead();
            } else {
              this.getAccessMainTime();
            }
          }, 500);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message:
              `[${err.resultCode}] ` + err.resultMsg ||
              "更新自动开关门时段失败!",
          });
          console.log("err", err);
        });
    },
    // 参数循环处理方法
    objMaps(data, obj, id) {
      let arr = [];
      data.forEach((val) => {
        obj.forEach((item) => {
          if (item[id] == val) {
            arr.push(item);
          }
        });
      });
      return arr;
    },
    // 功能配置提交方法
    submitForm(data) {
      let door = [];
      let amsyncauths = JSON.parse(JSON.stringify(this.selects.amsyncauths));
      this.defaultDataGNPZ.door.forEach((val) => {
        this.selects.doors.forEach((item) => {
          if (item.adid == val) {
            door.push(item);
          }
        });
      });
      // this.defaultDataGNPZ.amsyncauths.forEach(val => {
      //   this.selects.amsyncauths.forEach(item => {
      //     if (item.id == val) {
      //       amsyncauths.push(item);
      //     }
      //   });
      // });
      amsyncauths.forEach((item) => {
        if (this.defaultDataGNPZ.amsyncauths.indexOf(item.id) > -1) {
          item.state = 1;
        } else {
          item.state = 0;
        }
      });
      let obj = {
        amid: this.param.amid,
        amsync: data.amsync,
        amwarn: data.amwarn,
        amsyncdel: this.isSync ? "" : data.amsyncdel,
        door,
        amsyncauths: this.isSync ? amsyncauths : [],
      };
      this.$ajax(
        "/access/v2.0/main/a/updateAccessMainDeploy",
        obj,
        "9",
        {},
        true
      )
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改门禁配置成功!",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message:
              `[${err.resultCode}] ` + err.resultMsg || "修改门禁配置失败!",
          });
          console.log("err", err);
        });
    },
    submitFormDoor(data) {
      console.log("data", data);
      this.$ajax(
        "/access/v2.0/door/u/updateAccessAreaRule",
        {
          aarstatus: data.aarstatus,
          aardays: data.aardays,
          amid: this.param.amid,
        },
        "1"
      )
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // 关闭弹框
    beforeClose() {
      if (this.$refs.felForm) {
        this.$refs.felForm.resetForm();
      }
      this.autoData = [];
      this.autoDataMS = [];
      this.autoDataDT = [];
      this.defaultData = {};
      this.defaultDataMS = {};
      this.defaultDataGNPZ = {};
      this.defaultDataMSSQ = {};
      this.$emit("beforeClose");
    },
    beforeCloseDoor() {},
  },
};
</script>

<style lang="scss">
.configureInfo {
  .firstPane {
    height: 350px;
    padding-top: 15px;
  }
  .config_second_text {
    position: absolute;
    bottom: 60px;
  }
  .form-content {
    padding: 20px 0 120px;
  }
  .config_null {
    width: 100%;
    height: 450px;
    padding-top: 225px;
    text-align: center;
  }
  .config_box {
    // width: 600px;
    height: 450px;
    // margin: 0 auto;
    padding-left: 20%;
    overflow-y: auto;
    .config_box_top {
      margin-top: 15px;
      .config_text {
        margin-right: 30px;
      }
    }
    .config_sel {
      width: 400px;
    }
  }
  .config_bottom {
    padding: 10px 20px 0;
    margin-top: 10px;
    border-top: 1px solid #ccc;
    text-align: right;
    // .qh_btn {
    //   width: 64px;
    //   height: 27px;
    // }
  }
}
</style>
