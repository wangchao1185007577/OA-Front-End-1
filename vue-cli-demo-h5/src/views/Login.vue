<template>
  <van-cell-group class="login-container">
    <h3 class="title">
      微创协同办公
      <br/>
      系统登录
    </h3>
    <van-field v-model="ruleForm.account"  icon="clear" label="账号" placeholder="请输入账号" :error-message="rules.account.errorMessage" @click-icon="ruleForm.account = ''">
    </van-field>
    <van-field  v-model="ruleForm.checkPass"  type="password"  label="密码" placeholder="请输入密码" :error-message="rules.checkPass.errorMessage" @keyup.enter.native="handleSubmit2">
    </van-field>
    <van-cell class="button-group">
      <van-button type="primary" size="normal"  class="login-button" @click.native.prevent="handleSubmit2" :loading="logining">登录</van-button>
    </van-cell>
  </van-cell-group>
</template>

<script>
import { requestLogin } from "../api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        account: "001",
        checkPass: "123456"
      },
      rules: {
        account: { errorMessage: "" },
        checkPass: { errorMessage: "" }
      },
      checked: true
    };
  },
  watch:{
    ruleForm:{
      handler(){
        this.checkAccount();
        this.checkPass();
      },
      deep:true
    }
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm.resetFields();
    },
    checkAccount() {
      if (!this.ruleForm.account) {
        this.$set(this.rules.account,"errorMessage","请输入账号");
      } else {
        this.rules.account.errorMessage = "";
      }
    },
    checkPass() {
      if (!this.ruleForm.checkPass) {
        this.rules.checkPass.errorMessage = "请输入密码";
      } else {
        this.rules.checkPass.errorMessage = "";
      }
    },
    handleSubmit2(ev) {
      var _this = this;
      //_this.$router.replace('/table');
      this.logining = true;
      //NProgress.start();
      if (this.ruleForm.account && this.ruleForm.checkPass) {
        var loginParams = {
          StaffCode: this.ruleForm.account,
          Password: this.ruleForm.checkPass
        };
        this.$router.push({ path: "/main" });
      } else {
        this.logining = false;
      }
      // requestLogin(loginParams).then(data => {
      //   this.logining = false;
      //   if (data.Code != 0) {
      //     this.$message({
      //       message: data.Message,
      //       type: "error"
      //     });
      //   } else {
      //     sessionStorage.setItem("user", JSON.stringify(data.Data));
      //     this.$router.push({ path: "/main" });
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
h3 {
  line-height: 40px;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 100px 35px 15px 35px;
  background:url("../assets/bg_1.jpg");
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  height: 100%;
  .title {
    margin: 0px auto 50px auto;
    text-align: center;
    color: white;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }

  .van-cell {
    padding: 15px 15px;

    &.button-group {
      background: transparent;
      margin: 40px auto;
      padding: 0;
    }
  }
}
.login-button {
  line-height: 24px;
  width: 100%;
  height: 35px;
  background-color: #2a9cd2;
  border: 1px solid #2a9cd2;
}
</style>