<!-- 指纹管理 -->
<template>
  <fel-left-tabs :options="options" :paramId="paramId" :params="params"></fel-left-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "zwgl383",
  data() {
    return {
      options: [],
      paramId: "",
      params: {},
      next: false,
    };
  },
  methods: {
    ...mapActions(["getmenu"]),
    setParamId(obj) {
      if (this.next) {
        this.paramId = "批量授权门锁";
        this.params = obj;
      } else {
        setTimeout(() => {
          this.setParamId(obj);
        }, 200);
      }
    },
    setParams(obj) {
      if (this.next) {
        this.paramId = "指纹管理";
        this.params = obj;
      } else {
        setTimeout(() => {
          this.setParams(obj);
        }, 200);
      }
    },
  },
  created() {
    this.getmenu().then((data) => {
      let arr = data["zwgl383"];
      if (arr) {
        this.options = arr.map(({ entity }) => {
          return {
            name: entity.alias,
            obj: entity,
            current: () => import("./" + entity.value),
          };
        });
        this.next = true;
      }
    });
  },
  activated() {
    let obj = this.$route.params;
    console.log("obj", obj);
    if (obj && obj.in && obj.in == "renyuan") {
      this.setParamId(obj);
    } else if (obj && obj.in && obj.in == "renyuan1") {
      this.setParams(obj);
    }
  },
  beforeDestroy() {
    this.next = false;
  },
};
</script>
