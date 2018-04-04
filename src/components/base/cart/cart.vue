<template> 
  <div class="cart-wrapper">
    <!-- 购物车底部栏 -->
    <div class="cart-content">
      <div class="mt-cart" :class="{emptyCart:!hasGood,noemptyCart:hasGood,bounce:bounce}" @click="tapShowActivity" ref="logo">
        <div class="totall-count">
          <mt-badge v-show="totallCount>0" type="small" color="#ff7416">{{totallCount}}</mt-badge>        
        </div>
      </div>
      <div class="cart-price-wrapper" @click="tapShowActivity">
        <div v-if="hasGood">
          <p class="cart-price" :class="{highlight:totallAmount>0}">{{totallAmount}}</p>
          <p class="delivery-fee">配送费:¥{{deliveryFee}}</p>
        </div>
        <p v-else>购物车空空如也 ~</p>
      </div>
      <div class="btn-wrapper" :class="{btnHightlight:totallAmount>minOrderAmount}">
        <p v-show="!hasGood">¥{{minOrderAmount}}起送</p>
        <p v-show="hasGood&&totallAmount<minOrderAmount">还差¥{{minOrderAmount-totallAmount}}</p>
        <p v-show="hasGood&&totallAmount>minOrderAmount" @click="pay">去结算</p>
      </div> 
    </div>
      <!-- 购物车列表 -->
    <transition name="slide">
      <div class="cart-list-wrapper" v-show="showCart">
        <div class="list-header">
          <span class="list-title">已选商品</span>
          <span class="btn-clearcart" @click="clearAllGoods">
            <i class="iconfont icon-delete"></i> 清空
          </span>
        </div>
        <div class="list-content">
          <ul class="food-list-wrapper">
            <li v-for="item in cartList" :key="item.item_id" class="food-item">
              <span class="food-name">{{item.name}}</span>
              <span class="food-price price-highlight">¥{{item.price}}</span>
              <span class="food-price-cartcontroll">
                <cart-controll :food="item" ></cart-controll>
              </span>
            </li>
          </ul>
          <div class="food-box-fee-wrapper">
            <span class="title">餐盒</span>
            <span class="food-box-fee price-highlight">¥{{foodBoxFee}}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 遮罩 --> 
    <transition name="fade">
      <div class="mask" v-show="showCart" @click="tapShowActivity"></div>
    </transition>
    <!-- 飞行小球 -->
    <div class="ball-content">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop"
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import utils from "@/assets/js/utils.js";
import CartControll from "@/components/base/cart-controll/cart-controll";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    CartControll
  },
  props: {
    goods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      minOrderAmount: 0,
      deliveryFee: 0,
      foldCartList: false,
      // 每个小球当前的状态
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      // 已经下落的小球（show = true）
      dropBalls: [],
      bounce: false
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
    ...mapGetters(["totallCount"]),
    hasGood() {
      return this.cartList.length > 0;
    },
    foodAmount() {
      let price = 0;
      this.cartList.map(item => {
        price += item.price * item.count;
      });
      return price;
    },
    foodBoxFee() {
      let fee = 0;
      this.cartList.map(item => {
        fee += item.count;
      });
      return fee;
    },
    totallAmount() {
      return this.foodAmount + this.foodBoxFee;
    },
    showCart: {
      // 没有 set会报错
      set(value) {
        // this.tapShowActivity();
      },
      get() {
        if (!this.hasGood) {
          this.foldCartList = true;
          return false;
        }
        return !this.foldCartList;
      }
    }
  },
  methods: {
    _initCart() {
      let resInfo = JSON.parse(utils.store.getLocalstorage("resInfo"));
      this.minOrderAmount = resInfo.float_minimum_order_amount;
      this.deliveryFee = resInfo.float_delivery_fee;
    },
    tapShowActivity() {
      this.foldCartList = !this.foldCartList;
    },
    ...mapMutations({
      clearAllGoods: "CLEAR_CART"
    }),
    // 点击 + 派发的事件
    // 取一个未下落的小球执行接下来的下落动作
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    // 对 show = true 的小球设置动作
    beforeDrop(el) {
      let count = this.balls.length;

      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);

          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;

          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight; // 重绘，否则小球不会消失
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";

        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";

        el.addEventListener("transitionend", done);
      });

      // 购物车图片 scale 动画
      this.bounce = true;
    },
    // 动作做完就把该小球 show=false
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }

      // 去除动画
      this.bounce = false;
    },
    pay() {
      let title = "提示",
        message = `确认提交订单，需支付¥${this.totallAmount}`;
      this.$messagebox.confirm(message, title);
    }
  },
  created() {},
  mounted() {
    this._initCart();
  },
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/mixin.scss";

.cart-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px; /*no*/
  .cart-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px; /*no*/
    color: #999;
    background-color: rgba(51, 51, 51, 0.9);
    z-index: 999;
    .mt-cart {
      position: absolute;
      top: -18px; /*no*/
      left: 20px; /*no*/
      width: 50px; /*no*/
      height: 57px; /*no*/
      background: url("http://xs01.meituan.net/waimai_i/img/cart.ab827c23.png")
        no-repeat;
      background-size: 50px auto; /*no*/
      .totall-count {
        position: absolute;
        top: 0;
        left: 34px; /*no*/
      }
    }
    .emptyCart {
      background-position: 0 -114px; /*no*/
    }
    .noemptyCart {
      background-position: 0 -171px; /*no*/
    }
    .cart-price-wrapper {
      margin-left: 80px; /*no*/

      .cart-price {
        font-size: 20px; /*no*/
      }
      .delivery-fee {
        font-size: 12px; /*no*/
      }
    }
    .btn-wrapper {
      height: 48px; /*no*/
      width: 110px; /*no*/
      line-height: 48px; /*no*/
      text-align: center;
    }
    .highlight {
      color: #fff;
    }
    .btnHightlight {
      background-color: #ffd161;
      color: #333;
    }
  }
  .cart-list-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-bottom: 10px; /*no*/
    background-color: #eceff1;
    z-index: 99;
    transform: translate3d(0, -100%, 0);
    transition: all 0.4s linear;
    &.slide-enter,
    &.slide-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      height: 88px;
      border-bottom: 1px solid #ddd; /*no*/
      font-size: 16px; /*no*/
      .list-title:before {
        content: "";
        display: inline-block;
        background-color: #fb8000;
        width: 8px;
        height: 26px;
        margin-right: 10px;
      }
    }
    .list-content {
      max-height:250px;/*no*/
      overflow: auto;
      font-size: 16px; /*no*/
      .food-list-wrapper {
        margin-bottom: 20px;
      }
      .food-item {
        display: flex;
        align-items: center;
        background-color: #fff;
        &:not(:last-child) {
          border-bottom: 1px solid #eee; /*no*/
        }
      }
      .food-name {
        flex: 1;
        margin-left: 40px;
        @include ellipsis();
      }
      .food-price {
        width: 90px;
      }
      .food-price-cartcontroll {
        width: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 40px;
      }
      .food-box-fee-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        background-color: #fff;
        .title {
          margin-left: 40px;
        }
        .food-box-fee {
          width: 90px;
          margin-right: 220px;
        }
      }
      .price-highlight {
        color: #fb8000;
      }
    }
  }
  .mask {
    @include over-screen();
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    transition: all 0.4s linear;
    &.enter-active,
    &.leave-active {
      opacity: 0;
    }
  }
  // 飞行小球
  .ball-content {
    .ball {
      position: fixed;
      left: 32px; /*no*/
      bottom: 22px; /*no*/
      z-index: 9999;
      // http://cubic-bezier.com
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .inner {
      width: 16px; /*no*/
      height: 16px; /*no*/
      border-radius: 50%;
      background-color: #ffd161;
      transition: all 0.4s linear;
    }
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  .bounce {
    animation: bounce 0.3s 0.1s;
  }
}
</style>