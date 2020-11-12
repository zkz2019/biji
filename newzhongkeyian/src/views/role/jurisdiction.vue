<script>
export default {
  props: {
    param: Array,
    value: Array
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      paramObj: {},
      checkboxValue: this.value
    };
  },
  created() {
    if (this.param) {
      this.handleParam(this.param);
    }
  },
  watch: {
    param() {
      this.paramObj = {};
      this.checkboxValue = this.value;
      this.handleParam(this.param);
    }
  },
  render: function(add) {
    if (this.param && this.param.length > 0) {
      let self = this;
      return add(
        "el-checkbox-group",
        {
          class: "total",
          props: {
            value: self.checkboxValue
          }
        },
        this.getLists(add, this.param)
      );
    } else {
      return "";
    }
  },
  methods: {
    getLists(add, arrs) {
      let arr = [];
      arrs.forEach((obj, index) => {
        let sz = [];
        sz.push(this.getChilds(add, obj, index));
        sz.push(
          this.getChildsAll(
            add,
            {
              functionname: "全选",
              functionid: obj.functionid
            },
            this.getAllCss(obj)
          )
        );
        if (obj.childs) {
          sz.push(
            add(
              "div",
              {
                class: "li"
              },
              this.getList(add, obj.childs)
            )
          );
        }
        arr.push(add("div", { class: "lis" }, sz));
      });
      return arr;
    },
    getList(add, arrs) {
      let arr = [];
      arrs.forEach((obj, index) => {
        let sz = [];
        sz.push(this.getChilds(add, obj, index));
        if (obj.childs) {
          sz.push(
            add(
              "div",
              {
                class: "li"
              },
              this.getList(add, obj.childs)
            )
          );
        }
        arr.push(add("div", { class: "lis" }, sz));
      });
      return arr;
    },
    getChilds(add, obj, index) {
      let self = this;
      return add(
        "div",
        {
          class: "checs li-" + index
        },
        [
          add(
            "el-checkbox",
            {
              class: obj.functionid == 302 ? "index" : "",
              props: {
                disabled: obj.functionid == 302 ? true : false,
                checked:
                  obj.functionid == 302 || obj.isselect == 1 ? true : false,
                label: obj.functionid
              },
              on: {
                change: function(event) {
                  if (event) {
                    self.addData(obj.functionid, index);
                  } else {
                    self.deleteDate(obj.functionid);
                  }
                }
              }
            },
            [obj.functionname]
          )
        ]
      );
    },
    getAllCss(obj) {
      let css = "";
      let setValue = o => {
        if (o.childs) {
          if (o.childs.length == 1) {
            setValue(o.childs[0]);
          }
        } else {
          css = "single";
        }
      };
      setValue(obj);
      return css;
    },
    getChildsAll(add, obj, css) {
      let self = this;
      return add(
        "div",
        {
          class: "checs li-SS " + css
        },
        [
          add(
            "el-checkbox",
            {
              class: "",
              props: {
                disabled: false,
                checked: false,
                label: "SS" + obj.functionid
              },
              on: {
                change: function(event) {
                  if (event) {
                    self.addData(obj.functionid, "SS");
                  } else {
                    self.deleteDate(obj.functionid);
                  }
                }
              }
            },
            [obj.functionname]
          )
        ]
      );
    },
    handleParam(arrs) {
      arrs.forEach(obj => {
        this.setObjData(obj);
        if (obj.childs) {
          this.handleParam(obj.childs);
        }
      });
    },
    setObjData(obj) {
      let id = obj.functionid;
      if (obj.isselect == 1) {
        this.checkboxValue.push(id);
        this.$emit("change", this.checkboxValue);
      }
      this.paramObj[id] = this.paramObj[id] || {
        parent: [],
        son: []
      };
      let fid = obj.functionfather;
      if (fid) {
        this.paramObj[fid] = this.paramObj[fid] || {
          parent: [],
          son: []
        };
        this.paramObj[id].parent.push(fid, ...this.paramObj[fid].parent);
        this.paramObj[fid].son.push(id, ...this.paramObj[id].son);
      }
    },
    addData(id, index) {
      if (id) {
        if (index == "SS") {
          let ds = [id];
          this.getSons(id, ds);
          // ds = [...new Set(ds)];
          this.checkboxValue.push(id, ...ds, "SS" + id);
          this.checkboxValue = [...new Set(this.checkboxValue)];
          this.$emit("change", this.checkboxValue);
        } else {
          this.checkboxValue.push(id, ...this.paramObj[id].parent);
          this.checkboxValue = [...new Set(this.checkboxValue)];
          this.$emit("change", this.checkboxValue);
        }
      }
    },
    getSons(id, arr) {
      let ds = this.paramObj[id].son;
      if (ds && ds.length > 0) {
        ds.forEach(v => {
          this.getSons(v, arr);
        });
        arr.push(...ds);
      }
    },
    deleteDate(id) {
      let ds = [id];
      this.getSons(id, ds);
      ds = [...new Set(ds), "SS" + id];
      this.checkboxValue = this.checkboxValue.filter(v => {
        if (v == 302) {
          return true;
        }
        return !ds.includes(v);
      });
      this.$emit("change", this.checkboxValue);
    }
  }
};
</script>