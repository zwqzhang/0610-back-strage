<template>
  <div class="index">
    <v-header class="header"></v-header>
    <v-main class="main"></v-main>
  </div>
</template>

<script type="text/ecmascript-6">
import vHeader from "../views/header";
import vMain from "../views/main";
export default {
  components: {
    vHeader,
    vMain
  },
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 70px;
  background: $bgcolor2;
}

.main {
  flex: 1;
  background:$bgcolor1;
}
</style>
