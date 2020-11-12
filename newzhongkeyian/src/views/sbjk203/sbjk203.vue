<!-- 日志监控 -->
<template>
  <fel-left-tabs :options="options"></fel-left-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name:"sbjk203",
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
      let arr = data["sbjk203"];
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