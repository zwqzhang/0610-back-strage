<template>
  <div class="header">
    <div class="photo">
      <img src="../../../static/img/icon.ece29c4.jpg" alt>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{arr.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <div @click="quit()">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      arr: {
        name: "",
        pass: "",
        type: ""
      },
      str: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    quit() {
      this.$http({
        url: API.quit,
        method: "get"
      }).then(d => {
        this.$message({
          message: d.data.info,
          type: "success"
        });
        this.$router.replace("/login");
      });
      this.arr = [];
      localStorage.removeItem("aaa");
    }
  },
  mounted() {
    var n = localStorage.getItem("aaa");
    this.arr = JSON.parse(n);
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.header {
  position: relative;
}

.photo {
  position: absolute;
  right: 0px;
  top: 0;
  width: 200px;
  height: 70px;
  margin-right: 50px;

  img {
    position: absolute;
    left: 0;
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.el-dropdown {
  width: 100px;
  text-align: center;
  height: 70px;
  line-height: 70px;
  margin-left: 80px;
  font-size: $h3;
}

.el-dropdown>>>.el-dropdown-link {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.el-dropdown:hover {
  background: $bgcolor;
}
</style>
