<template>
  <van-row class="Menu-wall">
      <van-col :span="spanValue" v-for="menu in MenuList" v-bind:key="menu.name">
          <div class="menu" @click="to(menu)">
            <i class="van-icon" :class="menu.Icon"></i>
            <div class="van-badge__info">{{menu.count}}</div>
            <span>{{menu.Name}}</span>
          </div>
      </van-col>
  </van-row>
</template>

<script>
import {} from "../api/api";

export default {
  data() {
    return {
      spanValue: 6,
      MenuList: [
        { Name: "代办", Icon: "fa fa-tasks red", count: "111", Url: "/List" },
        { Name: "已办1", Icon: "fa fa-flag red", count: "" },
        { Name: "已办3", Icon: "fa fa-plane red", count: "" },
        { Name: "已办8", Icon: "fa fa-suitcase yellow", count: "" },
        { Name: "已办2", Icon: "fa fa-map-o yellow", count: "" },
        { Name: "已办5", Icon: "fa fa-shopping-bag yellow", count: "" },
        { Name: "已办6", Icon: "fa fa-pie-chart indigo", count: "" },
        { Name: "已办7", Icon: "fa fa-star indigo", count: "" },
        { Name: "已办8", Icon: "fa fa-pie-chart indigo", count: "" },
        { Name: "已办9", Icon: "fa fa-pie-chart purple", count: "" },
        { Name: "已办10", Icon: "fa fa-star purple", count: "" },
        { Name: "已办11", Icon: "fa fa-user purple", count: "" }
      ]
    };
  },
  methods: {
    to(menu) {
      this.$router.push(menu.Url);
    }
  },
  mounted: function() {
    this.$emit("viewIn", "首页");
  },
  updated: function() {}
};
</script>

<style lang="less">
@import "../styles/vars.less";
.Menu-wall {
  // padding: 10px 20px;
  border-bottom: 1px solid #dedede;
  .van-col {
    .menu {
      position: relative;
      text-align: center;
      height: 90px;
      float: none;
      display: inline-block;
      vertical-align: middle;
      background: #fff;
      width: 100%;
      border: 0.5px solid #dedede;
      border-bottom: 0px;
    }
  }
  .van-icon {
    display: block;
    font-size: 30px;
    margin: 12px 0;
    color: @color-primary;
  }
}
</style>
