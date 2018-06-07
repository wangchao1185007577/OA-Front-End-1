<template>
  <van-row class="container">
    <!-- <van-row class="header">
        <van-col span="24" class="header-title">{{Title}}</van-col>
    </van-row>   -->
    <van-nav-bar :title="Title"  :left-arrow="History.length>0" class="header" @click-left="back">
    </van-nav-bar>    
    <van-row class="row-container">
      <router-view  v-on:viewIn="changeTitle"  v-on:History="addHistory"></router-view>
    </van-row>  
    <van-row>
      <van-tabbar v-model="active">
        <van-tabbar-item to="/main">
            <span>主页</span>
            <template slot="icon" slot-scope="props">
              <i class="fa fa-home" v-bind:class="props.active?'icon-active':''"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/List">
            <span>任务</span>
            <template slot="icon" slot-scope="props">
              <i class="fa fa-list" v-bind:class="props.active?'icon-active':''"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item to="/CheckList">
            <span>CheckList</span>
            <template slot="icon" slot-scope="props">
              <i class="fa fa-list" v-bind:class="props.active?'icon-active':''"></i>
            </template>
        </van-tabbar-item>
         <van-tabbar-item to="/demo">
            <span>demo</span>
            <template slot="icon" slot-scope="props">
              <i class="fa fa-th-large" v-bind:class="props.active?'icon-active':''"></i>
            </template>
        </van-tabbar-item>
         <van-tabbar-item to="/demo">
            <span>我的</span>
            <template slot="icon" slot-scope="props">
              <i class="fa fa-user" v-bind:class="props.active?'icon-active':''"></i>
            </template>
        </van-tabbar-item>
      </van-tabbar>
    </van-row>
  </van-row>
</template>

<script>
export default {
  data() {
    return {
      Title: "h5",
      active: 0,
      History: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    back() {
      this.$router.push(this.History.pop());
    },
    changeTitle(title) {
      switch (title) {
        case "任务管理":
          this.active = 1;
          this.History = [];
          break;
        case "首页":
          this.active = 0;
          this.History = [];
          break;
        case "CheckList":
          this.active = 2;
          this.History = [];
          break;
      }
      this.Title = title;
    },
    addHistory(url) {
      this.History.push(url);
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {},
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    }
  },
  mounted() {
    this.Title = this.$route.name;
  }
};
</script>

<style lang="less">
@import "../styles/vars.less";
@import "../styles/animate.min.css";

.container {
  top: 0px;
  bottom: 0px;
  .header {
    height: 50px;
    line-height: 50px;
    color: white;
    text-align: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: url("../assets/bg_1.jpg");
    // box-shadow: 0 0 8px rgba(0,0,0,0.12), 0 0px 4px rgba(0,0,0,0.24);
    .van-nav-bar__left {
      .van-nav-bar__title {
        font-weight: bold;
        font-size: @font-size-middle;
      }
      .van-icon {
        color: white;
      }
    }
    .reflash-time {
      text-align: right;
      font-size: 14px;
    }
  }
  .row-container {
    position: absolute;
    top: 50px;
    bottom: 50px;
    overflow-x: hidden;
    width: 100%;
    // padding: 10px 0;
  }
  .van-tabbar {
    background: url("../assets/bg_1.jpg");
  }
  .van-tabbar-item {
    color: white;
  }
  .van-tabbar-item--active {
    color: #1085e9 !important;
  }
}
</style>