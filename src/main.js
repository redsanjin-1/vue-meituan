// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Toast, Indicator, Lazyload, Swipe, SwipeItem, Loadmore, Popup } from 'mint-ui'
import axios from 'axios'

Vue.config.productionTip = false

// css reset
import '@/assets/scss/reset.scss'
import '@/assets/icon-font/iconfont.css'
// Vue.component(Toast.name, Toast)
Vue.use(Toast)
// Vue.component(Indicator.name, Indicator)
Vue.use(Indicator)
Vue.use(Lazyload)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Popup.name, Popup)

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
  components: { App },
  template: '<App/>'
})
