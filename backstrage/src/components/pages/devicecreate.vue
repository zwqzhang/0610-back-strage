<template>
  <div class="devicecreate">
    <h2>{{$route.name}}</h2>
    <div class="box">
      <em>IP</em>
      <div class="input">
        <el-input v-model="arr[0].ip"></el-input>
      </div>
    </div>
    <div class="box">
      <em>机房</em>
      <div class="input">
        <el-input v-model="arr[0].door" show-password></el-input>
      </div>
    </div>
    <div class="box" v-if="turn">
      <em>编号</em>
      <div class="input">
        <el-input v-model="arr[0].num" show-password></el-input>
      </div>
    </div>
    <div class="box">
      <em>宽带</em>
      <div class="input">
        <el-input v-model="arr[0].width"></el-input>
      </div>
    </div>
    <div class="box">
      <em>状态</em>
      <div class="input">
        <el-radio v-model="arr[0].status" label="1">空闲</el-radio>
        <el-radio v-model="arr[0].status" label="0">已出售</el-radio>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" round @click="updatedevice($route.params.id)">{{change}}</el-button>
      <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import login from '../../common/js/fn'
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      arr: [
        {
          door: "",
          id: "",
          ip: "",
          num: "",
          status: "",
          width: ""
        }
      ],
      turn: true,
      change: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    updatedevice(id) {
      if (this.$route.params.id == 0) {
        // 新建
        this.$http({
          url: API.addDevice,
          method: "get",
          params: {
            id: this.$route.params.id,
            door: this.arr[0].door,
            ip: this.arr[0].ip,
            num: this.arr[0].num,
            status: this.arr[0].status,
            width: this.arr[0].width
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
        // 修改
        this.$http({
          url: API.updateDevice,
          params: {
            id: this.$route.params.id,
            door: this.arr[0].door,
            width: this.arr[0].width,
            status: this.arr[0].status,
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
      }
    }
  },
  mounted() {
    if (this.$route.params.id == 0) {
      this.turn = true;
      this.change = "发布";
    } else {
      this.turn = false;
      this.change = "修改";
      this.$http({
        url: API.findDevice,
        method: "get",
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        // console.log(d);
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

.devicecreate {
  h2();
}

box();
</style>
