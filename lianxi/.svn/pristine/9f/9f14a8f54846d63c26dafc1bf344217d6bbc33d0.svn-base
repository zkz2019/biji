<template>
  <div class="jcxxInfo">
    <div v-if="JSON.stringify(defaultData)== '{}'" class="config_null">暂无数据</div>
    <form-table
      v-else
      v-loading="loading"
      thwidth="18%"
      tdwidth="32%"
      :column="2"
      :param="defaultData"
      :list="formData"
    ></form-table>
  </div>
</template>

<script>
export default {
  props: {
    param: Object,
  },
  data: () => {
    return {
      loading: false,
      defaultData: {},
      formData: [
        {
          value: "personcode",
          name: "人员编号",
        },
        {
          value: "persontype",
          name: "人员类型",
        },
        {
          value: "personname",
          name: "姓名",
        },
        {
          value: "personsex",
          name: "性别",
        },
        {
          value: "personlocation",
          name: "归属组织",
        },
        {
          value: "",
          name: "",
        },
        {
          value: "personcomedate",
          name: "登记日期",
        },
        {
          value: "personmobile",
          name: "手机号",
        },
        {
          value: "personemail",
          name: "邮箱",
        },
        {
          value: "persontype2",
          name: "学历",
        },
        {
          value: "personcard",
          name: "身份证号",
        },
        {
          value: "personremark",
          name: "备注",
        },
        {
          value: "personcreatedate",
          name: "建立人员时间",
        },
        {
          value: "personeditdate",
          name: "最后变更信息时间",
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log("this.param", this.param);
      this.$ajax(
        "/login/main/1/getPersonMes",
        { personcode: this.param.personcode },
        "9"
      ).then((res) => {
        this.defaultData = res.result;
        console.log("res", res);
      });
    },
  },
};
</script>

<style>
</style>