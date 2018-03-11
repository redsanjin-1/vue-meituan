import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const Index = (resolve) => {
  import('@/components/index/index').then((module) => {
    resolve(module)
  })
}
const Find = (resolve) => {
  import('@/components/find/find').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('@/components/order/order').then((module) => {
    resolve(module)
  })
}
const MyInfo = (resolve) => {
  import('@/components/my-info/my-info').then((module) => {
    resolve(module)
  })
}
const RestaurantDetail = (resolve) => {
  import('@/components/restaurant-detail/restaurant-detail').then((module) => {
    resolve(module)
  })
}
const Goods = (resolve) => {
  import('@/components/restaurant-detail/goods/goods').then((module) => {
    resolve(module)
  })
}
const Ratings = (resolve) => {
  import('@/components/restaurant-detail/ratings/ratings').then((module) => {
    resolve(module)
  })
}
const Seller = (resolve) => {
  import('@/components/restaurant-detail/seller/seller').then((module) => {
    resolve(module)
  })
}
const login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    // 根路径
    {
      path: '/',
      redirect: '/index'
    },
    // 首页
    {
      path: '/index',
      component: Index,
      name: 'index',
      meta: {
        keepAlive: true
      }
    },
    // 登录
    {
      path: '/login',
      component: login,
      name: 'login'
    },
    // 商家模块
    {
      path: '/restaurant/:rid',
      component: RestaurantDetail,
      name: 'restaurant',
      children: [
        {
          path: '',
          component: Goods,
          name: 'goods',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'ratings',
          component: Ratings,
          name: 'ratings',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'seller',
          name: 'seller',
          component: Seller,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    // 发现
    {
      path: '/find',
      component: Find,
      name: 'find',
      meta: {
        keepAlive: true
      }
    },
    // 订单
    {
      path: '/order',
      component: Order,
      name: 'order',
      meta: {
        keepAlive: true
      }
    },
    // 我的
    {
      path: '/myInfo',
      component: MyInfo,
      name: 'myInfo',
      meta: {
        keepAlive: true
      }
    }
  ]
})
