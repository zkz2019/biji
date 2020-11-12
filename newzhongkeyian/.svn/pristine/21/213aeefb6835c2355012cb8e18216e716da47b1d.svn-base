<!-- 在线升级 -->
<template>
  <fel-left-tabs :paramId="paramId" :params="$route.params" :options="options"></fel-left-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "sbsj672",
  data() {
    return {
      options: []
    };
  },
  methods: {
    ...mapActions(["getmenu"])
  },
  computed: {
    paramId() {
      let obj = this.$route.params;
      return obj.name || "";
    }
  },
  created() {
    this.getmenu().then(data => {
      let arr = data["sbsj672"];
      if (arr) {
        this.options = arr.map(({ entity }) => {
          return {
            name: entity.alias,
            obj: entity,
            current: () => import("./" + entity.value + "/index.vue")
          };
        });
      }
    });
  }
};
</script>

