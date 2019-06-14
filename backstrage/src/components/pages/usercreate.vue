<template>
  <div class="usercreate">
    <h2>{{$route.name}}</h2>
    <div class="box">
      <em>账号</em>
      <div class="input">
        <el-input v-model="arr[0].name" :disabled="turn"></el-input>
      </div>
    </div>
    <div class="box">
      <em>密码</em>
      <div class="input">
        <el-input v-model="arr[0].pass" show-password :disabled="turn"></el-input>
      </div>
    </div>
    <div class="box" v-if="$route.params.id==0">
      <em>确认密码</em>
      <div class="input">
        <el-input v-model="arr[0].pass1" show-password></el-input>
      </div>
    </div>
    <div class="box">
      <em>电话</em>
      <div class="input">
        <el-input v-model="arr[0].tel" @blur="tel()"></el-input>
      </div>
    </div>
    <div class="box">
      <em>邮箱</em>
      <div class="input">
        <el-input v-model="arr[0].email" @blur="email()"></el-input>
      </div>
    </div>
    <div class="box">
      <em>性别</em>
      <div class="input">
        <el-radio v-model="arr[0].sex" label="男">男</el-radio>
        <el-radio v-model="arr[0].sex" label="女">女</el-radio>
      </div>
    </div>
    <div class="box">
      <em>身份证号</em>
      <div class="input">
        <el-input v-model="arr[0].idx" @blur="id()"></el-input>
      </div>
    </div>
    <div class="box">
      <em>备注</em>
      <div class="input">
        <el-input v-model="arr[0].des"></el-input>
      </div>
    </div>
    <div class="box">
      <em>生日</em>
      <div class="input">
        <el-date-picker v-model="arr[0].time" type="date" placeholder="选择日期"></el-date-picker>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" round @click="changeuser(arr.id)">{{change}}</el-button>
      <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import login from "../../common/js/fn";
import API from "../../common/js/API";
// 引入正则
import RE from "../../common/js/regular";
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
          tel: "",
          email: "",
          sex: "",
          idx: "",
          des: "",
          time: ""
        }
      ],
      turn: true,
      change: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeuser(id) {
      if (this.$route.params.id == 0) {
        // 两次密码输入一样，添加用户
        if (this.pass == this.pass1) {
          // 正则判断输入格式是否正确
          if (
            this.arr[0].tel != "" &&
            this.arr[0].idx != "" &&
            this.arr[0].email != ""
          ) {
            RE.all(this, this.arr[0].tel, this.arr[0].idx, this.arr[0].email);
            this.$alert("请输入按格式正确输入", "提示", {
              dangerouslyUseHTMLString: true
            });
            return;
          }
          // 请求数据库添加用户，传入参数
          this.$http({
            url: API.addUser,
            method: "get",
            params: {
              name: this.arr[0].name,
              pass: this.arr[0].pass,
              tel: this.arr[0].tel,
              email: this.arr[0].email,
              sex: this.arr[0].sex,
              idx: this.arr[0].idx,
              des: this.arr[0].des,
              time: this.arr[0].time
            }
          }).then(d => {
            console.log(d);
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
      } else {
        // console.log(this.$route.params.id);
        // 根据id来修改数据。params中的数据是把修改之后的数据更新到数据库中，
        this.$http({
          url: API.updateUser,
          method: "get",
          params: {
            id: this.$route.params.id,
            tel: this.arr[0].tel,
            email: this.arr[0].email,
            sex: this.arr[0].sex,
            idx: this.arr[0].idx,
            des: this.arr[0].des,
            time: this.arr[0].time
          }
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
      }
    },
    // 正则判断输入格式是否正确（单独判断）
    tel() {
      if (this.arr[0].tel != "") {
        RE.tel(this, this.arr[0].tel);
        return;
      }
    },
    id() {
      if (this.arr[0].idx != "") {
        RE.id(this, this.arr[0].idx);
        return;
      }
    },
    email() {
      if (this.arr[0].email != "") {
        RE.email(this, this.arr[0].email);
        return;
      }
    }
  },
  mounted() {
    // 如果传过来的id是0；则为新建，如果不是，则为修改
    if (this.$route.params.id == 0) {
      this.turn = false;
      this.change = "添加";
    } else {
      this.turn = true;
      this.change = "修改";
      // 修改前请求数据，渲染
      this.$http({
        url: API.findUser,
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

.usercreate {
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
  }
}
</style>
