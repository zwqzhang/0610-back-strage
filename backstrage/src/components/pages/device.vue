<template>
  <div class="device">
    <h2>{{$route.name}}</h2>
    <el-button type="success" round @click="newdevice()" v-if="type!=2">新建</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="序号" width="80" type="index"></el-table-column>
      <el-table-column prop="ip" label="IP" width="150"></el-table-column>
      <el-table-column prop="door" label="机房" width="200"></el-table-column>
      <el-table-column prop="num" label="编号" width="80"></el-table-column>
      <el-table-column prop="width" label="宽带" width="200"></el-table-column>
      <el-table-column prop="status" label="使用" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="updatedevice(scope.row.id)"
            v-if="type!=2"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deldevice(scope.row.id)"
            v-if="type!=2"
          ></el-button>
          <el-button
            type="primary"
            round
            v-if="type==2"
            :disabled="scope.row.status=='已出售'"
            @click="shop(scope.row.id)"
          >购买</el-button>
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
          door: "",
          id: "",
          ip: "",
          num: "",
          status: "",
          width: ""
        }
      ],
      disable: true,
      type:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    newdevice() {
      this.$router.push("/index/deviceParent/devicecreate" + "/0");
    },
    updatedevice(id) {
      this.$router.push("/index/deviceParent/devicecreate/" + id);
    },
    deldevice(id) {
      this.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http({
            url: API.delDevice,
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
    // 购买
    shop(id) {
      // updateDevice?id=11232&status=0
      this.$http({
        url: API.updateDevice,
        method: "get",
        params: {
          id,
          status: "0"
        }
      }).then(d => {
        // console.log(d);
        if (d.data.code == -1) {
              login(this, b);
            }
        if (d.data.code == 0) {
          this.reload();
          this.$message({
            message: '购买成功',
            type: "success"
          });
        } else {
          this.$message({
            message: "购买失败",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.$http({
      url: API.findDevice,
      method: "get"
    }).then(d => {
      if (d.data.code == -1) {
              login(this, b);
            }
      var a = d.data.data;
      a.map(function(item) {
        if (item.status == 0) {
          item.status = "已出售";
          return a;
        } else if (item.status == 1) {
          item.status = "空闲";
          return a;
        }
      });
      this.tableData = a;
    });
    this.type = JSON.parse(localStorage.getItem("aaa")).type
    
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.device {
  h2();
}

.device >>>.el-table td, .device >>>.el-table th {
  text-align: center;
}

.device >>>.el-table td {
  padding: 0;
}
</style>
