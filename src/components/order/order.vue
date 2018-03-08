<template>
  <div class="order-wrapper">
    <header class="header">订单</header>
    <div class="order-list" v-if="orderList.length">
      <div class="order-item"></div>
    </div>
    <div class="noOrderData" v-if="!orderList.length">
      <img src="http://xs01.meituan.net/waimai_i/img/spoon.375eb84e.png">
      <p class="info">一个订单都没有哦~</p>
      <span class="meto">给自己定一个小目标，先下一单。</span>
      <div class="toShop" @click="toShop">去逛逛</div>
    </div>
    <tab-bar></tab-bar>    
  </div>
</template>

<script type='text/ecmascript-6'>
import api from "@/api/api.js";
import TabBar from "@/components/base/tab-bar/tab-bar";
export default {
  components: {
    TabBar
  },
  props: {},
  data() {
    return {
      orderList: []
    };
  },
  methods: {
    toShop() {
      this.$router.push("/index");
    }
  },
  created() {},
  mounted() {},
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.order-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px; /*no*/
  background-color: #fff;
  // margin-bottom: 50px; /*no*/
  .header {
    border-bottom: 1px solid #b2b2b2; /*no*/
    font-size: 18px; /*no*/
    line-height: 88px;
    text-align: center;
    color: #333;
  }
  .noOrderData {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 64px; /*no*/
      height: 79px; /*no*/
      margin-top: 200px;
    }
    .info {
      font-size: 15px; /*no*/
      margin-top: 20px;
    }
    .meto {
      margin: 30px 0;
      font-size: 14px; /*no*/
      color: #898989;
    }
    .toShop {
      width: 50%;
      border-radius: 5px;
      background-color: #ffd161;
      font-size: 16px; /*no*/
      line-height: 40px; /*no*/
      text-align: center;
    }
  }
}
</style>