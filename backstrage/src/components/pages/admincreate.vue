<template>
  <div class="admincreate">
    <h2>{{$route.name}}</h2>
    <div class="box">
      <em>账号</em>
      <div class="input">
        <el-input v-model="arr[0].name" :disabled="turn" @blur="account()"></el-input>
      </div>
      <span>{{a}}</span>
    </div>
    <div class="box">
      <em>密码</em>
      <div class="input">
        <el-input v-model="arr[0].pass" show-password :disabled="turn" @blur="pass()"></el-input>
      </div>
      <span>{{b}}</span>
    </div>
    <div class="box" v-if="arr[0].id==0">
      <em>确认密码</em>
      <div class="input">
        <el-input v-model="arr[0].pass1" show-password @blur="passto()"></el-input>
      </div>
      <span>{{c}}</span>
    </div>
    <div class="box">
      <em>属性</em>
      <div class="input">
        <el-input v-model="arr[0].prop"></el-input>
      </div>
      <span></span>
    </div>
    <div class="box">
      <em>注册时间</em>
      <div class="input">
        <el-date-picker v-model="arr[0].time" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <span></span>
    </div>
    <div class="btn">
      <el-button type="primary" round @click="update(arr.id)">{{change}}</el-button>
      <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import $ from "jquery";
import login from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      arr: [
        {
          id: "",
          name: "",
          pass: "",
          pass1: "",
          prop: "",
          time: ""
        }
      ],
      turn: true,
      change: "",
      a: "",
      b: "",
      c: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    update(id) {
      if (this.$route.params.id != 0) {
        // 修改、更新管理员数据
        this.$http({
          url: API.updateManage,
          params: {
            id: this.$route.params.id,
            prop: this.arr[0].prop,
            time: this.arr[0].time
          },
          method: "get"
        }).then(d => {
          if (d.data.code == -1) {
            login(this, b);
          }
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.go(-1);
          } else {
            this.$message({
              message: "更新失败",
              type: "warning"
            });
          }
        });
      } else {
        // 新建，并且判断两次输入密码是否一样
        if (this.arr[0].pass == this.arr[0].pass1) {
          this.$http({
            url: API.addManage,
            method: "get",
            params: {
              name: this.arr[0].name,
              pass: this.arr[0].pass,
              prop: this.arr[0].prop,
              time: this.arr[0].time
            }
          }).then(d => {
            if (d.data.code == -1) {
              login(this, b);
            }
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.go(-1);
          });
        } else {
          this.$message({
            message: "两次密码填写不一致",
            type: "warning"
          });
        }
      }
    },
    // 验证数据库中是否有此账号
    account() {
      this.$http({
        url: API.findManage,
        method: "get"
      }).then(d => {
        // console.log(d);
        d.data.data.filter(item => {
          if (this.arr[0].name == item.name) {
            return (this.a = "账号已存在");
          } else {
            var re1 = /^\w{4,20}$/;
            var re2 = /^\W{4,20}$/;
            if (re1.test(this.arr[0].name) || re2.test(this.arr[0].name)) {
              return (this.a = "账号可以使用");
            } else {
              return (this.a = "账号不符合规则");
            }
          }
        });
      });
    },
    pass() {},
    // 验证密码输入是否一致
    passto() {
      if (this.arr[0].pass != this.arr[0].pass1) {
        this.c = "两次密码输入不一致";
      } else {
        this.c = "";
      }
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    if (this.$route.params.id == 0) {
      this.turn = false;
      this.change = "注册";
    } else {
      this.change = "修改";
      this.turn = true;
      this.$http({
        url: API.findManage,
        method: "get",
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        if (d.data.code == -1) {
          login(this, b);
        }
        this.arr = d.data.data;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.admincreate {
  width: 70%;
  padding: 30px 50px;
}

h2 {
  font-size: $h2;
}

box();

.box {
  span {
    width: 180px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    // color:green;
  }
}
</style>
