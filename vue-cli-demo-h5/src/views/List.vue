<template>
  <van-tabs :active="active" class="fix-tab" @click="onClick">
      <van-tab  :title="'待办'" >
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div v-for="item in toDoList" v-bind:key="item.Id" class="task-info van-cell" @click="toDetail(item)">
            <div class="task-detail">
              <div class="task-title van-ellipsis">{{item.ProcessName}}</div>
              <div  class="task-importance">
                <van-tag :class="[{'bg-red':item.Importance=='特提'},{'bg-orange':item.Importance=='特急'},{'bg-purple':item.Importance=='紧急'},{'bg-green':item.Importance=='平件'}]">{{item.Importance}}</van-tag>
              </div>
            </div>     
            <div class="task-detail">
              <div class="task-owner van-ellipsis">{{item.OwnerId}}</div>
              <div class="task-time van-ellipsis">{{item.CreateOn|formatDate("yyyy-MM-dd hh:mm:ss")}}</div>
            </div>     
            <i class="van-icon van-icon-arrow task-icon-right"></i>         
          </div>
        </van-list>
      </van-tab>
      <van-tab  :title="'已办'" >
      </van-tab>
      <van-tab  :title="'申请'" >
      </van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      toDoList: [
        {
          Id: 1,
          ProcessName: "测试流程2222222222222222222222222222222222",
          Importance: "特提",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 2,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 3,
          ProcessName: "测试流程3333",
          Importance: "紧急",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 4,
          ProcessName: "测试流程3333",
          Importance: "特急",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 5,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 6,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 7,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 8,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 9,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        },
        {
          Id: 10,
          ProcessName: "测试流程3333",
          Importance: "平件",
          Name: "主管审批",
          Status: "ACTIVE",
          OwnerId: "chenyin99111111111111111111111111111111",
          CreateOn: "2018-05-06T00:00:00"
        }
      ]
    };
  },
  methods: {
    toDetail(task) {
      this.$emit("History", this.$router.history.current.path);
      this.$router.push({ name: "Detail", params: { Id: task.Id } });
    },
    onClick(index) {
      this.active = index;
    },
    onLoad() {}
  },
  mounted: function() {
    this.$emit("viewIn", "任务管理");
  },
  updated: function() {}
};
</script>

<style lang="less">
@import "../styles/vars.less";
.task-info {
  flex-wrap: wrap;
  border-bottom: 1px solid #dedede;
  position: relative;
  padding-right: 30px;
  .task-icon-right {
    position: absolute;
    right: 10px;
    top: 39%;
    font-size: 16px;
  }

  .task-detail {
    .task-title {
      display: inline-block;
      width: 85%;
      font-size: @font-size-small;
    }
    .task-importance {
      width: 12%;
      display: inline-block;
      text-align: right;
      float: right;
    }
    width: 100%;
    .task-owner {
      color: #999;
      width: 38%;
      display: inline-block;
    }
    .task-time {
      color: #999;
      width: 60%;
      display: inline-block;
      text-align: right;
    }
  }
}
.fix-tab {
  .van-tabs__wrap {
    top: 50px;
    position: fixed;
  }
}
</style>
