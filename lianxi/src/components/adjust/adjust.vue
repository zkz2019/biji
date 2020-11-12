<template>
  <div class="adjust">
    <slot></slot>
    <div class="adjust-xux" ref="resizeProxy" v-show="tyResize"></div>
  </div>
</template>

<script>
export default {
  name: "adjust",
  props: {
  },
  data() {
    return {
      tyResize: false
    };
  },
  methods: {
    calculationWidth: function(width, slot) {
      // const paneSlots = this.$slots.default.filter(vnode => {
      //   return (
      //     vnode.tag &&
      //     vnode.componentOptions &&
      //     vnode.componentOptions.Ctor.options.name === "adjust-div"
      //   );
      // });
      // const panes = paneSlots.map(({ componentInstance }) => {
      //   return componentInstance;
      // });
      // const len = panes.length;
      // panes.forEach((v, i, o) => {
      //   if (v == slot && i + 1 < len) {
      //     const tslot = o[i + 1].$el;
      //     let initWidth = tslot.style.width;
      //     if (!initWidth.includes("px")) {
      //       initWidth = tslot.offsetWidth;
      //     } else {
      //       initWidth = Number(initWidth.replace("px", ""));
      //     }
      //     let gwd = initWidth - width;
      //     tslot.style.width = gwd + "px";
      //     return false;
      //   }
      // });
    }
  },
  components: {}
};
</script>
