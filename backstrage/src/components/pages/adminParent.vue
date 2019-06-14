<template>
  <div class="adminParent">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],

  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    var a = localStorage.getItem("aaa");
    beforeEnter: (to, from, next) => {
      if (JSON.parse(a).type == "0") {
        next();
      }
    };
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
</style>
