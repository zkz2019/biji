<!-- 添加卡片 修改卡片授权 -->
<template>
  <el-dialog
    title="未下发授权详情"
    width="60%"
    class="reload"
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <paging-table
      ref="paging-table"
      noOpera
      interface="/lock/operate/info/k/getperson"
      class="card-paging reload_h"
      @onSelect="onSelect"
      layout="total, prev, pager, next"
      :refresh="refresh"
      :param="param"
      :list="list"
    >
      <template v-if="batchButs.length > 0">
        <batch-but class="sli but-blue" :list="selecArr" :param="batchButs" @onClick="onAction"></batch-but>
      </template>
    </paging-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { format } from "@/utils/utils.js";
export default {
  components: {},

  props: {
    defaultData: {
      type: Object,
      default() {
        return {};
      }
    },
    dialogVisible: Boolean
  },
  data() {
    let $this = this;
    return {
      refresh: 0,
      param: {},
      batchButs: [],
      selecArr: [],
      listBut: [{ type: 1, name: "重载未生效授权" }],
      list: [
        {
          type: "selection"
        },
        {
          name: "序号",
          type: "$index",
          width: "60px"
        },
        {
          name: "归属人",
          prop: ""
        },
        {
          name: "授权类型",
          prop: ""
        },
        {
          name: "最后下发时间",
          prop: ""
        },
        {
          name: "操作",
          width: "150px",
          template: {
            props: ["scope"],
            computed: {
              listBut() {
                return $this.listBut;
              }
            },
            methods: {
              onClick(key) {
                $this.onClick(key, Object.assign({}, this.scope.row));
              }
            },
            template: `<div class="operat-buts"> 
      <fel-button v-for="(v,i) of listBut" :key="i" type="text" size="small" @click.stop="onClick(v.type)">{{v.name}}</fel-button>
</div>`
          }
        }
      ]
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    ...mapGetters(["getNumber"]),
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSelect() {},
    onClick(id, obj) {},
    onAction() {}
  }
};
</script>
<style lang="scss">
.reload {
  .reload_h {
    height: 450px;
  }
}
</style>
