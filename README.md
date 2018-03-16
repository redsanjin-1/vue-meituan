# 仿美团外卖app
基于Vue(2.x)开发的美团外卖app

# 目录
* [预览](#预览)
* [项目简介](#项目简介)
* [功能介绍](#功能介绍)  
* [总结](#总结)

## 预览 

## 项目简介  


1. 使用 vue-cli 构建，配合 webpack ,vue-router , [Mint-ui](http://mint-ui.github.io/docs/#/zh-cn2/quickstart)等完成开发；
2. 数据从 [美团外卖](http://i.waimai.meituan.com) 及 [饿了么外卖](https://h5.ele.me/) 移动端网站抓取，使用easy-mock模拟, axios请求,布局也是借鉴两者来开发；
3. 封装常用的js工具函数库 ， scss的常用mixin库 ， vue常用组件，提高开发效率；

## 功能介绍  

>一共由5大模块，分别是首页，发现，订单，我的信息和商家详情页（重点讲商家详情页）

1. 首页由轮播图，商家类型icon组，和可上拉加载商家信息的商家列表组组成。  

![](http://p53zq2w8v.bkt.clouddn.com/gif/index.gif)  

2. 发现页是一个文章列表，没什么好讲的，使用 v-lazy 来懒加载图片。  

![](http://p53zq2w8v.bkt.clouddn.com/gif/find.gif)  

3. 订单页也是一个列表，同上。  

![](http://p53zq2w8v.bkt.clouddn.com/gif/order.gif)  

4. 我的信息页也仅是简单布局，**下面划重点了**。  

![](http://p53zq2w8v.bkt.clouddn.com/gif/my.jpg)  

5. 商家详情页由三大子路由，分别是点餐，评价和商家  


## 总结

1. 熟练使用 vue 框架，对生命周期，计算属性，vue 指令，组件通信有较深理解
2. 熟练应用 vue 的周边资源， vue-cli, vue-router,(这个版本暂时没用vuex)
3. 熟悉使用 Mint-ui 的各个组件完成项目开发, 如 swipe, lazy-load, load-more等
4. 本次使用 scss 及 postcss 完成开发，特别是 postcss的px2rem插件的运用，详细请了解[这里](https://juejin.im/entry/5a9d07b76fb9a028cb2d2032?utm_medium=fe&utm_source=weixinqun) 
5. 总结了一套 scss 的 mixin 库，常用的 js 工具函数库，vue的通用组件库  

***
**:sunglasses: 以下是鄙人的微信，有兴趣加我一起交流学习前端的心得，**  
**:kissing_heart: 我可以提供 ES6、VUE、小程序、Nodejs 等珍藏的视频给你**  
**:eyes: 其他vue常用库学习请到[隔壁观望](https://github.com/opendigg/awesome-github-vue)**  

![](http://p4v5t5a1b.bkt.clouddn.com/myWeChat.jpg)
