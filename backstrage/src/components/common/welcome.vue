<template>
 <div class="weclome">
     <h3>欢迎来到XX管理系统</h3>
     <p></p>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 components: {},
 props: [],
 data () {
 return {
 };
 },
 watch: {},
 computed: {},
 methods: {},
 mounted () {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';
.weclome{
    h2()
    h3{
        font-size $h1;
        text-align center;
    }
    p{
        background $bgcolor2;
        width 100%;
        height 3px;
        margin-top 50px;
    }
}
</style>
