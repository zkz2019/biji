<template>
  <div class="fel-transfer">
    <div class="fel-transfer-container">
      <div class="fel-transfer-header">
        <el-checkbox
          :indeterminate="isIndeterminates"
          v-model="checkAlls"
          @change="handleCheckAllChanges"
        ></el-checkbox>
        <span>全部角色</span>
      </div>
      <div class="fel-transfer-main">
        <div class="fel-transfer-check">
          <el-checkbox-group v-model="checkedCitiess" @change="handleCheckedCitiesChanges">
            <template v-for="(val,key) of citiess">
              <template v-if="citiesId.includes(val.id)">
                <el-checkbox disabled :key="key">{{val.name}}</el-checkbox>
              </template>
              <template v-else>
                <el-checkbox :label="val.id" :key="key">{{val.name}}</el-checkbox>
              </template>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="fel-transfer-footer">
        <span>{{checkedCitiess.length}}/{{citiess.length}}</span>
        <span @click="onClickAdd" class="fel-transfer-but">添加</span>
      </div>
    </div>
    <div class="fel-transfer-container">
      <div class="fel-transfer-header">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        ></el-checkbox>
        <span>推送消息角色</span>
      </div>
      <div class="fel-transfer-main">
        <div class="fel-transfer-check">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(val,key) of cities" :label="val.id" :key="key">{{val.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="fel-transfer-footer">
        <span>{{checkedCities.length}}/{{cities.length}}</span>
        <span @click="onClickDelete" class="fel-transfer-but">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    citiess: Array
  },
  data() {
    return {
      isIndeterminate: false,
      checkedCities: [],
      checkAll: false,
      cities: [],
      citiesId: [],
      isIndeterminates: false,
      checkedCitiess: [],
      checkAlls: false
    };
  },
  created() {
    this.cities = this.list;
    this.citiesId = this.cities.map(o => o.id);
  },
  watch: {
    list() {
      this.cities = this.list;
      this.citiesId = this.cities.map(o => o.id);
    }
  },
  methods: {
    onClickDelete() {
      if (this.checkedCities && this.checkedCities.length > 0) {
        this.cities = this.cities.filter(obj => {
          return !this.checkedCities.includes(obj.id);
        });
        this.citiesId = this.cities.map(o => o.id);
        this.checkedCities = [];
        this.checkAll = false;
        this.isIndeterminate = false;
      } else {
        this.$message({
          message: "请选择要删除的角色",
          type: "warning"
        });
      }
    },
    onClickAdd() {
      if (this.checkedCitiess && this.checkedCitiess.length > 0) {
        this.cities = this.cities.concat(
          this.citiess.filter(obj => {
            return this.checkedCitiess.includes(obj.id);
          })
        );
        this.citiesId = this.cities.map(o => o.id);
        this.checkedCitiess = [];
        this.checkAlls = false;
        this.isIndeterminates = false;
      } else {
        this.$message({
          message: "请选择要添加的角色",
          type: "warning"
        });
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities.map(o => o.id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckAllChanges(val) {
      if (val) {
        this.checkedCitiess = this.citiess
          .map(o => o.id)
          .filter(id => {
            return !this.citiesId.includes(id);
          });
      } else {
        this.checkedCitiess = [];
      }
      this.isIndeterminates = false;
    },
    handleCheckedCitiesChanges(value) {
      let cl = this.citiess
        .map(o => o.id)
        .filter(id => {
          return !this.citiesId.includes(id);
        }).length;
      let checkedCount = value.length;
      this.checkAlls = checkedCount === cl;
      this.isIndeterminates = checkedCount > 0 && checkedCount < cl;
    }
  }
};
</script>

<style lang='scss'>
.fel-transfer {
  display: flex;
  width: 100%;
  .fel-transfer-container {
    margin: 0 10px;
    border: 1px solid #eee;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .fel-transfer-header {
      height: 40px;
      line-height: 40px;
      background: #f5f7fa;
      span {
        padding-left: 8px;
      }
    }
    .fel-transfer-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 8px;
      .fel-transfer-check {
        flex: 1;
        position: relative;
        .el-checkbox-group {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: auto;
          display: flex;
          flex-direction: column;
          .el-checkbox {
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
    .fel-transfer-footer {
      border-top: 1px solid #eee;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      .fel-transfer-but {
        float: right;
        width: 80px;
        text-align: center;
        cursor: pointer;
        color: #409eff;
      }
    }
  }
}
</style>