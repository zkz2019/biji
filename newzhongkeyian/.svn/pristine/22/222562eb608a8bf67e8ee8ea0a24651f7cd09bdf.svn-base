<script>
export default {
  props: {
    list: Array, //展示数据列表
    param: Object, //数据
    width: String, // 宽度
    tdwidth:String, //td宽度
    column: {
      // 展示列数
      type: Number,
      default: 1
    }
  },
  render: function(add) {
    if (this.list && this.list.length > 0) {
      let self = this;
      return add(
        "table",
        {
          class: "form-talbe",
          attrs: {
            cellspacing: "0",
            cellpadding: "0",
            border: "0"
          }
        },
        this.getLists(add, this.list)
      );
    } else {
      return "";
    }
  },
  methods: {
    getLists(add, arrs) {
      let arr = [],
        trs = [],
        lin = 0;
      arrs.forEach((obj, index) => {
        if (!obj.noShow) {
          let is = false;
          if (obj.whole) {
            lin = this.column;
            is = true;
          } else {
            let k = (obj.column || 1) + lin;
            if (k > this.column) {
              lin = obj.column || 1;
              is = true;
            } else {
              lin = k;
              is = false;
            }
          }
          if (is) {
            arr.push(add("tr", {}, trs));
            trs = [];
          }
          trs.push(...this.getTd(add, obj));
          if (lin >= this.column) {
            arr.push(add("tr", {}, trs));
            trs = [];
            lin = 0;
          }
        }
      });
      if(trs.length>0){
        arr.push(add("tr", {}, trs));
      }
      return arr;
    },
    getTd(add, obj) {
      if (!obj.noShowSeize) {
        return [
          add(
            "th",
            {
              style: {
                width: obj.width || this.width
              },
              class: obj.class
            },
            obj.name
          ),
          add(
            "td",
            {
              style: {
                width: obj.tdwidth || this.tdwidth
              },
              attrs: {
                colspan: this.setColspan(obj)
              },
              class: obj.class
            },
            [this.setValeu(obj, add)]
          )
        ];
      } else {
        return [
          add(
            "th",
            {
              style: {
                width: obj.width || this.width
              },
              class: obj.class
            },
            ""
          ),
          add(
            "td",
            {
              style: {
                width: obj.tdwidth || this.tdwidth
              },
              attrs: {
                colspan: this.setColspan(obj)
              },
              class: obj.class
            },
            ""
          )
        ];
      }
    },
    setColspan(obj) {
      if (obj.whole) {
        return (this.column - 1) * 2 + 1;
      } else if (obj.column) {
        return (obj.column - 1) * 2 + 1;
      } else {
        return "";
      }
    },
    // 设置值
    setValeu(obj, add) {
      if (obj.value) {
        return this.param[obj.value];
      } else if (obj.funct) {
        return obj.funct(this.param);
      } else if (obj.render) {
        return obj.render(this.param, add);
      } else {
        return obj.text || "";
      }
    }
  }
};
</script>

<style lang="scss">
.form-talbe {
  width: 100%;
  border: 1px solid #ebeef5;
  /* border-bottom: 1px solid #ebeef5; */
  tr {
    th,
    td {
      font-size: 14px;
    }
    th {
      font-weight: normal;
    }
  }
  tr:nth-child(2n + 1) {
    background: #fafafa;
  }
  tr:first-child {
    background: #f7f7f7;
  }
}

.form-talbe th,
.form-talbe td {
  border: 1px solid #ebeef5;
  /* border-left: 1px solid #ebeef5; */
  text-align: left;
  padding: 6px;
  height: 22px;
  line-height: 22px;
}
</style>
