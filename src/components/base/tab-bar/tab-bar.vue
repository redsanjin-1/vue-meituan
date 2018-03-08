<!-- 底部导航栏 组件 -->
<template>
  <ul class="tab-bar"> 
    <router-link class="index" tag="li" to="/index">
      <i class="ico-index"></i>
      <span>首页</span>
    </router-link>

    <router-link class="find" tag="li" to="/find">
      <i class="ico-find"></i>
      <span>发现</span>
    </router-link>

    <router-link class="order" tag="li" to="/order">
      <i class="ico-order"></i>
      <span>订单</span>
    </router-link>

    <router-link class="myinfo" tag="li" to="/myInfo">
      <i class="ico-myinfo"></i>
      <span>我的</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  filters: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px; /*no*/
  text-align: center;
  display: flex;
  flex-direction: row;
  background-color: #fcfcfc;
  li {
    flex: 1;
    color: #999;
    display: block;
    i {
      display: block;
      width: 25px; /*no*/
      height: 25px; /*no*/
      margin: 3px auto; /*no*/
      background: url("~@/assets/images/tab-bar/tab-icons.png") no-repeat;
      background-size: 25px auto; /*no*/
    }
    span {
      display: block;
      font-size: 12px; /*no*/
    }
  }

  li.router-link-active {
    color: #333;
  }

  .ico-index {
    background-position: 0 -75px; /*no*/
  }
  .index.router-link-active .ico-index {
    background-position: 0 -50px; /*no*/
  }

  .ico-find {
    background-image: url("~@/assets/images/tab-bar/find.png");
  }
  .find.router-link-active .ico-find {
    background-image: url("~@/assets/images/tab-bar/find1.png");
  }

  .ico-order {
    background-position: 0 -25px; /*no*/
  }
  .order.router-link-active .ico-order {
    background-position: 0 0;
  }

  .ico-myinfo {
    background-position: 0 -125px; /*no*/
  }
  .myinfo.router-link-active .ico-myinfo {
    background-position: 0 -100px; /*no*/
  }
}
</style>
