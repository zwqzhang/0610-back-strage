<template>
  <div class="adminlist">
    <h2>{{$route.name}}</h2>
    <el-button type="success" round @click="toAdmincreate()">新建</el-button>
    <el-table :data="tableData" border style="width: 100%" highlight-current-row>
      <el-table-column label="序号" width="80" type="index"></el-table-column>
      <el-table-column label="账号" width="180" prop="name"></el-table-column>
      <el-table-column label="属性" prop="prop"></el-table-column>
      <el-table-column label="注册时间" prop="time" width="400">
        <template slot-scope="scope">
          <span>{{scope.row.time.substr(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="change(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import login from "../../common/js/fn";

export default {
  inject: ["reload"],
  components: {},
  props: [],
  data() {
    return {
      tableData: [
        {
          id: "",
          name: "",
          pass: "",
          prop: "",
          time: ""
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 去新建
    toAdmincreate() {
      this.$router.push("/index/adminParent/admincreate/" + "0");
    },
    // 去修改
    change(id) {
      this.$router.push("/index/adminParent/admincreate/" + id);
    },
    // 删除
    del(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http({
            url: API.delManage,
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
    // 一旦进入就开始查询数据库获取数据
    this.$http({
      url: API.findManage,
      method: "get"
    }).then(d => {
      if (d.data.code == -1) {
        login(this, b);
      }
      // console.log(d);
      this.tableData = d.data.data;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.adminlist {
  h2();
}

.adminlist >>>.el-table td, .adminlist >>>.el-table th {
  text-align: center;
}

.adminlist>>>.el-table td {
  padding: 0;
}
</style>
