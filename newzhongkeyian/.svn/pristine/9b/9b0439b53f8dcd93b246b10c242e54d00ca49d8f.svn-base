<template>
  <div
    class="adjust-div"
    v-bind="$attrs"
    :class="{'adapt':noadjust}"
    @mousemove="handleMouseMove($event)"
    @mouseout="handleMouseOut"
    @mousedown="handleMouseDown($event)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "adjust-div",
  props: {
    noadjust: Boolean,
    dragLeft: Boolean
  },
  data() {
    return {
      dragState: {},
      width: ""
    };
  },
  methods: {
    hasClass(el, cls) {
      return (" " + el.className + " ").includes(" " + cls + " ");
    },
    addClass(el, cls) {
      if (!this.hasClass(el, cls)) {
        var curClass = el.className;
        el.className = curClass + " " + cls;
      }
    },
    removeClass(el, cls) {
      if (this.hasClass(el, cls)) {
        var curClass = el.className;
        curClass = (" " + el.className + " ").replace(" " + cls + " ", " ");
        el.className = curClass.trim();
      }
    },
    handleMouseMove: function(event) {
      if (!this.noadjust) {
        let target = event.target;
        let rect = this.$el.getBoundingClientRect();
        const bodyStyle = document.body.style;
        if (this.dragLeft) {
          if (rect.width > 12 && event.pageX - rect.left < 11) {
            bodyStyle.cursor = "col-resize";
            this.addClass(event.currentTarget, "noTyclick");
          } else {
            bodyStyle.cursor = "";
            this.removeClass(event.currentTarget, "noTyclick");
          }
        } else {
          if (rect.width > 12 && rect.right - event.pageX < 11) {
            bodyStyle.cursor = "col-resize";
            this.addClass(event.currentTarget, "noTyclick");
          } else {
            bodyStyle.cursor = "";
            this.removeClass(event.currentTarget, "noTyclick");
          }
        }
      }
    },
    handleMouseOut: function() {
      this.removeClass(this.$el, "noTyclick");
      document.body.style.cursor = "";
    },
    handleMouseDown: function(event) {
      const columnEl = this.$el;
      if (!this.noadjust && columnEl && this.hasClass(columnEl, "noTyclick")) {
        const parent = this.$parent;
        parent.tyResize = true;

        const parentEl = parent.$el;

        const parentRect = parentEl.getBoundingClientRect();
        let parentLeft = parentRect.left;
        const columnRect = columnEl.getBoundingClientRect();
        let minLeft = columnRect.left - parentLeft + 35;
        if (this.dragLeft) {
          minLeft = columnRect.left - parentLeft + columnRect.width - 35;
        }

        let initWidth = columnEl.style.width;
        if (!initWidth.includes("px")) {
          initWidth = columnEl.offsetWidth;
        } else {
          initWidth = Number(initWidth.replace("px", ""));
        }
        this.dragState = {
          startMouseLeft: event.clientX,
          initWidth,
          startLeft: columnRect.right - parentLeft,
          startColumnLeft: columnRect.left - parentLeft,
          parentLeft
        };

        const resizeProxy = parent.$refs.resizeProxy;
        if (this.dragLeft) {
          resizeProxy.style.left = this.dragState.startColumnLeft + "px";
        } else {
          resizeProxy.style.left = this.dragState.startLeft + "px";
        }

        document.onselectstart = function() {
          return false;
        };
        document.ondragstart = function() {
          return false;
        };

        const handleMouseMove = event => {
          const deltaLeft = event.clientX - this.dragState.startMouseLeft;
          if (this.dragLeft) {
            let proxyLeft = this.dragState.startColumnLeft + deltaLeft;
            if (proxyLeft > minLeft) {
              proxyLeft = minLeft;
            }
            resizeProxy.style.left = proxyLeft + "px";
          } else {
            const proxyLeft = this.dragState.startLeft + deltaLeft;
            resizeProxy.style.left = Math.max(minLeft, proxyLeft) + "px";
          }
        };

        const handleMouseUp = () => {
          const { startColumnLeft, startLeft, initWidth } = this.dragState;
          const finalLeft = parseInt(resizeProxy.style.left, 10);
          const columnWidth = finalLeft - startColumnLeft;
          if (this.dragLeft) {
            columnEl.style.width = initWidth - columnWidth + "px";
            if (parent.interact) {
              parent.calculationWidth(columnWidth - initWidth, this);
            }
          } else {
            columnEl.style.width = columnWidth + "px";
            if (parent.interact) {
              parent.calculationWidth(columnWidth - initWidth, this);
            }
          }

          // this.store.scheduleLayout();

          // document.body.style.cursor = '';
          // this.removeClass(columnEl, "noTyclick");
          this.dragState = {};

          parent.tyResize = false;

          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;
          this.width = "";
          this.$emit("complete", columnEl.style.width);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    }
  },
  watch: {
    width: function() {
      // if (this.$parent.interact && this.width) {
      if (this.width) {
        this.$el.style.width = this.width;
      }
    }
  },
  components: {}
};
</script>
