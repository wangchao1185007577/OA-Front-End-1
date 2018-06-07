<template>
  <van-row>
    <van-row>
      <van-col class="detail-title van-cell">{{model.ProcessName}}</van-col>
      <van-col class="detail-info">
        <van-col class="van-cell">
          <span class="info-left">流水单号：</span>{{model.Subject}}
        </van-col>
        <van-col class="van-cell">
          <span class="info-left">创建时间：</span>{{model.CreateOn|formatDate("yyyy-MM-dd hh:mm:ss")}}
        </van-col>
        <van-col class="van-cell">
          <span class="info-left">发起人：</span>{{model.Originator}}
        </van-col>
        <van-col class="van-cell">
          <span class="info-left">发起人：</span>1233333333333333333333333333333333333333333333333333333
        </van-col>
        <van-col v-if="showMore">
          <van-col class="van-cell">
            <span class="info-left">发起人：</span>{{model.Originator}}
          </van-col >
          <van-col class="van-cell">
            <span class="info-left">发起人：</span>{{model.Originator}}
          </van-col >
          <van-col class="van-cell">
            <span class="info-left">发起人：</span>1233333333333333333333333333333333333333333333333333333
          </van-col >
        </van-col>
        <div class="van-col van-cell  " @click="toggleShow1111">
          <span class="info-left" v-if="!showMore">......</span><div class="more">展开<i class="fa" :class="[{'fa-arrow-up':showMore},{'fa-arrow-down':!showMore}]" ></i></div>
        </div>
      </van-col>
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
        Id: 1,
        ProcessName: "测试流程22222222222222",
        Subject: "2018-04-08-test01",
        Name: "主管审批",
        Status: "ACTIVE",
        Originator: "陈吟",
        OwnerId: "chenyin99111111111111111111111111111111",
        CreateOn: "2018-04-23T10:09:46"
      }
    };
  },
  methods: {
    toggleShow1111() {
      this.showMore = !this.showMore;
    }
  },
  mounted: function() {
    this.$emit("viewIn", "任务详情");
  },
  updated: function() {}
};
</script>

<style lang="less" scoped>
@import "../styles/vars.less";
.van-cell {
  padding: 10px 30px;
}
.more {
  width: 100%;
  text-align: right;
  color: #999;
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
