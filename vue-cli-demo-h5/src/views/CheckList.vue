<template>
  <van-row>
    <van-row class="check-list">
      <van-col class="detail-title van-cell">CheckList</van-col>
        <van-cell v-for="item in model.CheckList" :key="item.Id">
          <template slot="title">
            <span class="van-cell-text">{{item.Name}}1233333333333333333333333333333333333333333333</span>
            <div class="van-cell__label">{{item.StartDate|formatDate("yyyy-MM-dd hh:mm")}} 开始 | {{item.EndtDate|formatDate("yyyy-MM-dd hh:mm")}} 结束</div>
          </template>
          <template slot="">
            <van-checkbox :name="item.Name"  v-model="item.isChecked"/>
          </template>
        </van-cell>
    </van-row>
    <van-row class="check-list">
      <van-col class="detail-title danger van-cell">CheckList</van-col>
        <van-cell v-for="item in model.CheckList" :key="item.Id">
          <template slot="title">
            <span class="van-cell-text">{{item.Name}}1233333333333333333333333333333333333333333333</span>
            <div class="van-cell__label">{{item.StartDate|formatDate("yyyy-MM-dd hh:mm")}} 开始 | {{item.EndtDate|formatDate("yyyy-MM-dd hh:mm")}} 结束</div>
          </template>
          <van-checkbox :name="item.Name"  v-model="item.isChecked"/>
        </van-cell>
    </van-row>
  </van-row>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      showMore: false,
      model: {
        CheckList: [
          {
            Id: 1,
            Name: "CheckList1",
            StartDate: "2018-05-06T08:00:00",
            EndtDate: "2018-05-06T18:00:00",
            isChecked: false
          },
          {
            Id: 2,
            Name: "CheckList2",
            StartDate: "2018-05-06T08:00:00",
            EndtDate: "2018-05-06T18:00:00",
            isChecked: false
          }
        ]
      }
    };
  },
  methods: {},
  mounted: function() {
    this.$emit("viewIn", "CheckList");
  },
  updated: function() {}
};
</script>

<style lang="less" scoped>
@import "../styles/vars.less";
.van-cell {
  padding: 10px 30px;
  .van-cell__value {
    align-self: center;
  }
}

.van-cell-text {
  word-break: break-all;
}

.detail-title {
  font-weight: bold;
  font-size: @font-size-middle;
  line-height: @font-size-middle;
  word-break: break-all;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background-color: @color-primary;
    width: 5px;
    left: 10px;
    top: 10px;
    bottom: 10px;
  }
  &.danger {
    &::before {
      background-color:@color-r;
    }
  }
}

.detail-info {
  padding: 10px 0;
  background: #ffffff;
  .van-cell {
    padding: 0 30px;
    word-break: break-all;
  }
  .info-left {
    color: #999;
    min-width: 60px;
  }
}
</style>
