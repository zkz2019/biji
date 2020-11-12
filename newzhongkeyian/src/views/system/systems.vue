<!-- 系统参数 -->
<template>
  <fel-left-tabs :options="options"></fel-left-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "xtcs279",
  data() {
    return {
      options: []
    };
  },
  methods: {
    ...mapActions(["getmenu"])
  },
  created() {
    this.getmenu().then(data => {
      let arr = data["xtcs279"];
      if (arr) {
        this.options = arr.map(({ entity }) => {
          return {
            name: entity.alias,
            obj: entity,
            current: () => import("./" + entity.value)
          };
        });
      }
    });
  }
};
</script>