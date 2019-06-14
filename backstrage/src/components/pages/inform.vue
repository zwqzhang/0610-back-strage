<template>
  <div class="inform">
    <h2>{{$route.name}}</h2>
    <el-button type="success" round @click="tocreate()" v-if="type!=2">新建</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="tit" label="题目" width="400"></el-table-column>
      <el-table-column prop="time" label="发布时间" width="400">
        <template slot-scope="scope">
          <span>{{scope.row.time.substr(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="update(scope.row.id)"
            v-if="type!=2"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
            v-if="type!=2"
          ></el-button>
          <el-button type="primary" round @click="see(scope.row.id)" v-if="type==2">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import login from "../../common/js/fn";
import API from "../../common/js/API";
export default {
  inject: ["reload"],
  components: {},
  props: [],
  data() {
    return {
      tableData: [
        {
          id: "",
          con: "",
          tit: "",
          time: ""
        }
      ],
      turn: true,
      type:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocreate() {
      this.$router.push("/index/informParent/informcreate" + "/0");
    },
    update(id) {
      this.$router.push("/index/informParent/informcreate/" + id);
    },
    del(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http({
            url: API.delNews,
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
    },
    see(id) {
      this.$router.push("/index/informParent/informcreate/" + id);
    }
  },
  mounted() {
    this.$http({
      url: API.findNews,
      method: "get"
    }).then(d => {
      if (d.data.code == -1) {
        login(this, b);
      }
      this.tableData = d.data.data;
    });
    // 判断是否是用户进入
    this.type=JSON.parse(localStorage.getItem("aaa")).type
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.inform {
  h2();
}

.inform >>>.el-table td, .inform >>>.el-table th {
  text-align: center;
}

.inform >>>.el-table td {
  padding: 0;
}
</style>
