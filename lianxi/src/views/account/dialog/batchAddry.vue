<template>
  <adjust class="batchAdd_ry_box">
    <adjust-div width="200px" class="left">
      <div class="left-search maR10">
        <el-input
          size="mini"
          class="wid200 maR10"
          :placeholder="placeholder"
          clearable
          v-model="param1.search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <fel-button size="mini" type="primary" @click="rySearch">查询</fel-button>
      </div>
      <paging-table
        height="100%"
        :interface="leftInterfaceUrl"
        noOpera
        ref="fuPaging"
        layout="total, prev, next"
        @onSelect="onSelectLeft"
        @onSelection="onSelectionLeft"
        :list="leftList"
        :param="param1"
        :paramObj="paramObj"
        :refresh="ryLrefresh"
      />
    </adjust-div>
    <adjust-div class="center">
      <el-container class="conter_box">
        <paging-table
          ref="pagingTable"
          height="100%"
          :interface="interfaceUrl"
          @onSelect="onSelect"
          @onSelection="onSelection"
          :list="list"
          :param="param"
          :paramObj="paramObj"
          :refresh="ryRrefresh"
        >
          <span v-for="(v,k) of botButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
            <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
            {{v.alias}}
          </span>
        </paging-table>
      </el-container>
    </adjust-div>
    <adjust-div class="right" noadjust>
      <el-container class="right_box">
        <paging-table
          ref="pagingTable"
          height="100%"
          :interface="interfaceUrl"
          @onSelect="onSelect"
          @onSelection="onSelection"
          :list="list"
          :param="param"
          :paramObj="paramObj"
          :refresh="ryRrefresh"
        >
          <span v-for="(v,k) of botButs" :key="k" class="sli but-blue" @click="onClick(v.id, v)">
            <i v-if="v.icon" :class="'ficon-'+v.icon"></i>
            {{v.alias}}
          </span>
        </paging-table>
      </el-container>
    </adjust-div>
  </adjust>
</template>
<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      ryLrefresh: 0,
      ryRrefresh: 0,
      leftInterfaceUrl: "",
      interfaceUrl: "",
      placeholder: "",
      param1: {},
      param: {},
      paramObj: {},
      botButs: [],
      leftList: [],
      list: []
    };
  },
  methods: {
    onSelect() {},
    onSelection() {},
    onSelectionLeft() {},
    onSelectLeft() {},
    rySearch() {}
  }
};
</script>

