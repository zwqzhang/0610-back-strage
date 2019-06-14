<template>
  <div class="userlist">
    <h2>{{$route.name}}</h2>
    <el-button type="success" round @click="tocreate()">新建</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="80" type="index"></el-table-column>
      <el-table-column prop="name" label="账号" width="150"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="idx" label="身份证号" width="250"></el-table-column>
      <el-table-column prop="des" label="备注" width="150"></el-table-column>
      <el-table-column prop="time" label="生日">
         <template slot-scope="scope">
          <span>{{scope.row.time.substr(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="changeuser(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import login from '../../common/js/fn'
import API from "../../common/js/API";
export default {
  inject: ["reload"],
  components: {},
  props: [],
  data() {
    return {
      tableData: [
        {
          des: "",
          email: "",
          id: "",
          idx: "",
          name: "",
          pass: "",
          sex: "",
          tel: "",
          time: "",
          _id: ""
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocreate() {
      this.$router.push("/index/userParent/usercreate" + "/0");
    },
    changeuser(id) {
      this.$router.push("/index/userParent/usercreate/" + id);
    },
    // 根据id删除
    del(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http({
            url: API.delUser,
            method: "get",
            params: {
              id: id
            }
          }).then(d => {
            if (d.data.code == -1) {
              login(this, b);
            }
            this.reload();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    // 刚进入页面请求数据渲染
    this.$http({
      url: API.findUser,
      method: "get"
    }).then(d => {
      if (d.data.code == -1) {
              login(this, b);
            }
      this.tableData = d.data.data;
    });
    // 获取type值，判断是否是谁进入当前页面
    var a = localStorage.getItem("aaa");
    beforeEnter: (to, from, next) => {
      if (JSON.parse(a).type == "1") {
        next();
      }
    };
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.userlist {
  width: 90%;
  padding: 30px 50px;
}

h2 {
  font-size: $h2;
}

.el-button {
  margin: 20px 10px;
}

.userlist >>>.el-table td, .userlist >>>.el-table th {
  text-align: center;
}

.userlist >>>.el-table td {
  padding: 0;
}
</style>
