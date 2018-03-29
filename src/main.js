// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/rem.min'
import { Toast, Lazyload, Indicator, MessageBox, Swipe, SwipeItem, Loadmore, Popup, Badge } from 'mint-ui'
import axios from 'axios'
import store from './store/index.js'

Vue.config.productionTip = false

// css reset
import '@/assets/scss/reset.scss'
import '@/assets/icon-font/iconfont.css'
// Vue.component(Toast.name, Toast)
// Vue.use(Toast)
Vue.use(Lazyload)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Popup.name, Popup)
Vue.component(Badge.name, Badge)
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;

// axios
axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios

// 图片懒加载
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload, {
//   loading: '/static/loading-bars.svg'
//   // loading: require('@/assets/img/logo.png')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
