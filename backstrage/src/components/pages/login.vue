<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header">
        <span>登录</span>
      </div>
      <div class="text item">
        <el-select v-model="user.type" placeholder="-----请选择-----">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
        <el-input v-model="user.name" placeholder="用户名"></el-input>
        <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
        <el-button type="primary" @click="login()" :plain="true">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import login from "../../common/js/fn";
import qs from "qs";
export default {
  components: {},
  props: [],
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ],
      value: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    login() {
      var data = this.user;
      this.$http({
        url: API.login,
        method: "post",
        data: data
      }).then(d => {
        // 如果操作中途断网或者用户一段时间未操作，则退出至登录界面
        if (d.data.code == -1) {
          login(this, b);
        }
        var b = d.config.data;
        // 当超级管理员登录时，如果返回0，登录成功，如果返回3，账号密码错误
        if (this.user.type == 0 && d.data.code == 0) {
          this.$router.replace("/index");
          localStorage.setItem("aaa", b);
          this.$message({
            message: d.data.info,
            type: "success"
          });
        } else if (this.user.type == 0) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
        // 管理员登录时，如果返回0，登录成功，如果返回3，账号密码错误
        if (this.user.type == 1 && d.data.code == 0) {
          this.$router.replace("/index");
          localStorage.setItem("aaa", b);
          this.$message({
            message: d.data.info,
            type: "success"
          });
        } else if (this.user.type == 1) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
        // 用户登录时，如果返回0，登录成功，如果返回3，账号密码错误
        if (this.user.type == 2 && d.data.code == 0) {
          this.$router.replace("/index");
          localStorage.setItem("aaa", b);
          this.$message({
            message: d.data.info,
            type: "success"
          });
        } else if (this.user.type == 2) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: $bgcolor1;
}

.box-card {
  width: 500px;
  height: 300px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  text-align: center;
}

.box-card>>>.el-card__header {
  text-align: center;
  font-size: $h2;
}

.box-card>>>.el-select {
  width: 100%;
}

.box-card>>>.el-input__inner {
  margin: 5px 0;
}
</style>



