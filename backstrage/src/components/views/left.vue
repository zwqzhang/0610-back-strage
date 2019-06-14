<template>
  <div>
    <router-link to="/index/adminParent" v-if="this.type=='0'" active-class="select">管理员管理</router-link>
    <router-link to="/index/userParent" v-if="this.type!='2'" active-class="select">用户管理</router-link>
    <router-link to="/index/informParent" active-class="select">通知</router-link>
    <router-link to="/index/deviceParent" active-class="select">设备管理</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from "jquery";
export default {
  components: {},
  props: [],
  data() {
    return {
      type: ""
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.type = JSON.parse(localStorage.getItem("aaa")).type;
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

a {
  display: block;
  width: 190px;
  height: 50px;
  line-height: 50px;
  background: $bgcolor4;
  margin: 20px auto;
  text-align: center;
  font-size: $h4;
  border-radius: 25px;
}
a:hover{
  background:$bgcolor5;
}
.select{
  background $select;
  color $bgcolor
}
</style>
