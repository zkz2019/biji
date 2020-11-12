<template>
  <div class="table-bottom">
    <span
      class="bjbox"
      v-for="(value,key) of buttoms"
      :key="key"
      @click.stop="scecountclick(value)"
    >
      <i v-if="map[value]" :class="map[value].css" :title="map[value].title"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    buttoms: Array
  },
  created() {
  },
  data() {
    return {
      map: {
        "374": {
          css: "el-icon-upload2", //设备管理
          title: "上移"
        }, //上移
        "375": {
          css: "el-icon-download", //设备管理
          title: "下移"
        }, //
        "5": {
          css: "el-icon-edit-outline", //设备管理
          title: "修改"
        },
        "4": {
          css: "el-icon-plus", //设备管理
          title: "管理员"
        },
        "460": {
          css: "el-icon-plus", //设备管理
          title: "管理员"
        },
        "34": {
          css: "el-icon-plus", //设备管理
          title: "重新录入"
        },
        "7": {
          css: "el-icon-delete", //设备管理
          title: "删除"
        },
        "277": {
          css: "el-icon-zoom-in", //录入机
          title: "查询"
        },
        "265": {
          css: "el-icon-edit-outline", //录入机
          title: "修改"
        },
        "266": {
          css: "el-icon-delete", //录入机
          title: "删除"
        }
      }
    };
  },
  methods: {
    scecountclick(key) {
      this.$emit("onClick", key);
    }
  }
};
</script>
