<template>
  <div>
    <div class="good-list-wrapper">
      <div class="left-bar" :style="{height:barHeight+'px'}">
        <!--  -->
        <div v-for="(item,index) in leftBar" :key="item.name" class="left-item" :class="{activedBar:currentIndex===index}" @click.prevent="scrollList(index)">
          <span class="bar-name">{{item.name}}</span>
          <div class="bar-count">
            <mt-badge v-show="item.totallCount>0" type="small" color="#ff7416">{{item.totallCount}}</mt-badge>
          </div>
        </div>    
      </div>
      <div class="right-bar" :style="{height:barHeight+'px'}" ref="listView" v-mlink>
        <div class="food-item" v-for="food in goods" :key="food.name">
          <div class="food-description">{{food.description}}</div>
          <div v-for="item in food.foods" :key="item.item_id" class="right-item" @click.prevent="showfoodDetail(item)">
            <img v-lazy="item.image_path" class="food-img">
            <div class="food-content">
              <div class="food-details">
                <div class="food-name">{{item.name}}</div>              
                <span class="food-monthsales">月售{{item.month_sales}}份</span>
                <span class="food-rate">好评率{{item.satisfy_rate}}%</span>
              </div>
              <div class="food-price-cart">
                <div class="food-price-wrapper">
                  <span class="food-price">￥{{item.price}}</span>
                  <span class="food-origin-price" v-if="item.original_price">￥{{item.original_price}}</span>
                </div>
                <div class="food-cart">
                  <cart-controll :food="item" @drop="drop"></cart-controll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cart :goods="goods" ref="shopcartRef"></cart>
    <transition name="fade">
      <div class="food-detail-wrapper" v-show="isShowDetail">
        <img :src="foodDetail.image_path" class="food-detail-img">
        <div class="food-detail-content">
          <div class="food-detail-name">{{foodDetail.name}}</div>              
          <div class="food-detail-sale-rates">
            <span class="food-detail-monthsales">月售{{foodDetail.month_sales}}份</span>
            <span class="food-detail-rate">好评率{{foodDetail.satisfy_rate}}%</span>
          </div>
          <div class="food-price-cart">
            <div class="food-price-wrapper">
              <span class="food-price">￥{{foodDetail.price}}</span>
              <span class="food-origin-price" v-if="foodDetail.original_price">￥{{foodDetail.original_price}}</span>
            </div>
            <div class="food-cart">
              <cart-controll :food="foodDetail" @drop="drop"></cart-controll>
            </div>
          </div>
        </div>
      </div>
    </transition>
      <div class="mask" v-show="isShowDetail" @click="hideDetail"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import api from "@/api/api.js";
import Cart from "@/components/base/cart/cart";
import CartControll from "@/components/base/cart-controll/cart-controll";

export default {
  name: "goods",
  components: {
    Cart,
    CartControll
  },
  props: {},
  data() {
    return {
      goods: [],
      // 每一个大类别的高度
      listHeight: [],
      // 右侧列表滚动的距离
      scrollY: 0,
      rightBar: [],
      // 左侧高亮导航的 index
      activedBar: 0,
      barHeight: 1000,
      // 商品详情弹窗
      foodDetail: {},
      isShowDetail: false
    };
  },
  // 试用指令，可以忽略
  directives: {
    mlink: {
      bind(el, binding, vnode) {
        el.addEventListener(
          "scroll",
          function(e) {
            // console.log(e.currentTarget.scrollTop);
          },
          false
        );
      }
    }
  },
  computed: {
    leftBar() {
      let leftBar = [];
      this.goods.map(item => {
        leftBar.push({
          name: item.name,
          totallCount: item.totallCount
        });
      });
      return leftBar;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];

        // 落到这个区间 或者 最后一个(无 h2)
        if ((this.scrollY >= h1 && this.scrollY < h2) || !h2) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    _getGoods() {
      this.$indicator.open("加载中...");
      this.$ajax({
        method: "get",
        url: api.goods
      })
        .then(res => {
          this.$indicator.close();
          this._normalizeBar(res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    _normalizeBar(arr) {
      this.goods = arr;

      this.$nextTick(() => {
        let rightBar = [],
          listHeight = [],
          currentHeight = 0,
          foodList = this.$refs.listView.getElementsByClassName("food-item");
        arr.map(item => {
          rightBar = rightBar.concat(item.foods);
        });

        // 设置 右侧列表每一大项的高度
        listHeight.push(currentHeight);
        for (let i = 0; i < foodList.length; i++) {
          currentHeight += foodList[i].clientHeight;
          listHeight.push(currentHeight);
        }
        this.rightBar = rightBar;
        this.listHeight = listHeight;

        // 右侧列表滚动 事件
        this.$refs.listView.addEventListener(
          "scroll",
          e => {
            this.scrollY = e.currentTarget.scrollTop;
          },
          false
        );
      });
    },
    _setBarHeight() {
      // 88为顶部 tab栏 ( 40 ) 底部购物车栏 ( 48 )
      this.barHeight = document.documentElement.clientHeight - 88;
    },
    // 左侧导航 跳转
    scrollList(tapindex) {
      this.$refs.listView.scrollTop = this.listHeight[tapindex];
    },
    drop(target) {
      // 性能优化，异步异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcartRef.drop(target);
      });
    },
    showfoodDetail(food) {
      this.isShowDetail = true;
      this.foodDetail = food;
    },
    hideDetail() {
      this.isShowDetail = false;
    },
    setScrollY(height) {
      this.scrollY = height;
    }
  },
  created() {},
  mounted() {
    this._setBarHeight();
    this._getGoods();
  },
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/mixin.scss";
.good-list-wrapper {
  display: flex;
  height: 100%;
  font-size: 14px; /*no*/
  margin-bottom: 48px; /*no*/
  background-color: #fff;
  .left-bar {
    background-color: #f8f8f8;
    overflow-y: auto;
    .left-item {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      position: relative;
      width: 150px;
      height: 110px;
      line-height: 24px;
      border-bottom: 1px solid #e8e8e8;
      .bar-count {
        position: absolute;
        top: 10px;
        right: 5px;
      }
    }
    .activedBar {
      background-color: #fff;
    }
  }
  .right-bar {
    flex: 1;
    overflow-y: auto;
    background-color: #fff;
    margin-left: 40px;
    .food-description {
      height: 24px; /*no*/
      line-height: 24px; /*no*/
      font-size: 12px; /*no*/
      color: #666;
    }
    .right-item {
      display: flex;
      height: 70px; /*no*/
      padding: 15px 15px 15px 0; /*no*/
      .food-img {
        width: 70px; /*no*/
        height: 70px; /*no*/
      }
      .food-content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        margin-left: 20px;
        .food-details {
          .food-name {
            font-size: 16px; /*no*/
            font-weight: 700;
            color: #333;
          }
          .food-monthsales,
          .food-rate {
            color: #666;
            font-size: 12px; /*no*/
          }
          .food-monthsales {
            margin-right: 20px;
          }
        }
        .food-price-cart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .food-price-wrapper {
            font-size: 14px; /*no*/
            .food-price {
              color: #fb8000;
            }
            .food-origin-price {
              color: #333;
              text-decoration: line-through;
            }
          }
          .food-cart {
            font-size: 14px; /*no*/
          }
        }
      }
    }
  }
}
.food-detail-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  z-index: 99;
  .food-detail-img {
    display: block;
    width: 100%;
  }
  .food-detail-content {
    padding: 40px 40px 0 40px;
    .food-detail-name {
      font-size: 13px; /*no*/
      font-weight: 700;
    }
    .food-detail-sale-rates {
      margin-top: 20px;
      font-size: 12px; /*no*/
      color: #666;
    }
    .food-price-cart {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .food-price-wrapper {
        font-size: 14px; /*no*/
        .food-price {
          color: #fb8000;
        }
        .food-origin-price {
          color: #333;
          text-decoration: line-through;
        }
      }
      .food-cart {
        font-size: 14px; /*no*/
      }
    }
  }
}
.mask {
  @include over-screen();
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
</style>