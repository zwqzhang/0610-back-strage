<template>
  <div class="informcreate">
    <h2>{{$route.name}}</h2>
    <div class="box">
      <em>题目</em>
      <div class="input">
        <el-input v-model="arr[0].tit" :disabled="type==2"></el-input>
      </div>
    </div>
    <div class="box">
      <em>内容</em>
      <div class="input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="arr[0].con" :disabled="type==2"></el-input>
      </div>
    </div>
    <div class="box">
      <em>时间</em>
      <div class="input">
        <el-date-picker v-model="arr[0].time" type="date" placeholder="选择日期" :disabled="type==2"></el-date-picker>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" round @click="send($route.params.id)" v-if="type!=2">{{change}}</el-button>
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
          id: "",
          tit: "",
          con: "",
          time: ""
        }
      ],
      change: "",
      onOff:true,
      type:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    send(id) {
      // 发布一条新通知
      if (this.$route.params.id == 0) {
        this.$http({
          url: API.addNews,
          method: "get",
          params: {
            tit: this.arr[0].tit,
            con: this.arr[0].con,
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
        // 修改
        this.$http({
          url: API.updateNews,
          method: "get",
          params: {
            id: this.$route.params.id,
            tit: this.arr[0].tit,
            con: this.arr[0].con,
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
    }
  },
  mounted() {
    if (this.$route.params.id == 0) {
      this.change = "发布";
    } else {
      this.change = "修改";
      this.$http({
        url: API.findNews,
        method: "get",
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        if (d.data.code == -1) {
              login(this, b);
            }
        // console.log(d);
        this.arr = d.data.data;
      });
      this.type =JSON.parse(localStorage.getItem('aaa')).type
    }
  }

};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.informcreate {
  h2();
}

box();
</style>
