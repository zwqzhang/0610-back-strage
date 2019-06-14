<template>
  <div>
    <transition enter-active-class="animated zoomIn">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: [],
  provide() {
    // 注册一个方法
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
        console.log("reload");
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.right {
  h2();

  h3 {
    font-size: 30px;
  }
}
</style>
