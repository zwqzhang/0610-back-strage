// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 非父子组件传值
Vue.prototype.ev=new Vue()
// 引入axios
import axios from 'axios'
Vue.prototype.$http=axios
// 引入qs
import qs from 'qs'
Vue.prototype.$qs=qs
// 引入jquery
import jquery from 'jquery'
Vue.prototype.$=jquery

// 引入动画
import 'animate.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
