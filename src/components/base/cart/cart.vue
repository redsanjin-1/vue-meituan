<template>
  <div>
    <div class="cart-wrapper">
      <i class="mt-cart" :class="{emptyCart:!hasGood,noemptyCart:hasGood}" @click="tapShowActivity"></i>
      <div class="totall-count">
        <mt-badge v-show="totallCount>0" type="small" color="#ff7416">{{totallCount}}</mt-badge>        
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
        <p v-show="hasGood&&totallAmount>minOrderAmount">去结算</p>
      </div> 
    </div>
    <!-- 购物车列表 -->
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
              <cart-controll :food="item"></cart-controll>
            </span>
          </li>
        </ul>
        <div class="food-box-fee-wrapper">
          <span class="title">餐盒</span>
          <span class="food-box-fee price-highlight">¥{{foodBoxFee}}</span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showCart" @click="tapShowActivity"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import utils from "@/assets/js/utils.js";
import CartControll from "@/components/base/cart-controll/cart-controll";

export default {
  components: {
    CartControll
  },
  props: {
    goods: {
      type: Array
    }
  },
  data() {
    return {
      minOrderAmount: 0,
      deliveryFee: 0,
      foldCartList: false
    };
  },
  computed: {
    cartList() {
      const cartList = [];
      this.goods.map(good => {
        let totallCount = 0;
        good.foods.map(item => {
          if (item.count) {
            totallCount += item.count;
            cartList.push(item);
          }
        });
        this.$set(good, "totallCount", totallCount);
      });
      return cartList;
    },
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
    },
    totallCount() {
      let count = 0;
      this.cartList.map(item => {
        count += item.count;
      });
      return count;
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
    clearAllGoods() {
      this.cartList.map(item => {
        if (item.count) {
          item.count = null;
        }
      });
      function bindSort(arr) {
        if (arr.length == 1) {
          return arr;
        }
        let midIndex = Math.floor(arr.length / 2),
          midValue = arr.splice(midIndex, 1)[0],
          left = [],
          right = [];
        arr.map(function(item) {
          if (item <= midValue) {
            left.push(item);
          } else if (item > midValue) {
            right.push(item);
          }
        });
        return bindSort(left)
          .concat([midValue])
          .concat(bindSort(right));
      }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /*no*/
  color: #999;
  background-color: rgba(51, 51, 51, 0.9);
  z-index: 9999;
  .mt-cart {
    position: absolute;
    top: -18px; /*no*/
    left: 20px; /*no*/
    width: 50px; /*no*/
    height: 57px; /*no*/
    background: url("http://xs01.meituan.net/waimai_i/img/cart.ab827c23.png")
      no-repeat;
    background-size: 50px auto; /*no*/
  }
  .totall-count {
    position: absolute;
    top: -15px; /*no*/
    left: 55px; /*no*/
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48px; /*no*/
  padding-bottom: 10px; /*no*/
  background-color: #eceff1;
  z-index: 99;
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
}
</style>