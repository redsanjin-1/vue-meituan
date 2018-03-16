<template>
  <div>
    <div class="good-list-wrapper">
      <div class="left-bar" :style="{height:barHeight+'px'}">
        <!--  -->
        <div v-for="(item,index) in leftBar" :key="item.name" class="left-item" :class="{activedBar:activedBar===index}" @click.prevent="scrollList(index)">
          <span class="bar-name">{{item.name}}</span>
          <div class="bar-count">
            <mt-badge v-show="item.totallCount>0" type="small" color="#ff7416">{{item.totallCount}}</mt-badge>
          </div>
        </div>    
      </div>
      <div class="right-bar" :style="{height:barHeight+'px'}" ref="listView">
        <div class="food-item" v-for="food in goods" :key="food.name">
          <div class="food-description">{{food.description}}</div>
          <div v-for="item in food.foods" :key="item.item_id" class="right-item">
            <img :src="item.image_path" class="food-img">
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
                  <cart-controll :food="item"></cart-controll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cart :goods="goods"></cart>
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
      listCountMap: [],
      rightBar: [],
      activedBar: 0,
      barHeight: 1000
    };
  },
  computed: {
    leftBar() {
      let leftBar = [];
      this.goods.map(item => {
        leftBar.push({
          name: item.name,
          totallCount: item.totallCount
        });
        // rightBar = rightBar.concat(item.foods);
      });
      return leftBar;
    }
  },
  methods: {
    _getGoods() {
      this.$ajax({
        method: "get",
        url: api.goods
      })
        .then(res => {
          this._normalizeBar(res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    _normalizeBar(arr) {
      let rightBar = [],
        listCountMap = [];
      arr.map(item => {
        listCountMap.push(item.foods.length);
        rightBar = rightBar.concat(item.foods);
      });
      this.goods = arr;
      this.rightBar = rightBar;
      this.listCountMap = listCountMap;
    },
    _setBarHeight() {
      this.barHeight = document.documentElement.clientHeight - 88;
    },
    scrollList(tapindex) {
      let count = 0;
      // 高亮 左侧导航栏
      this.activedBar = tapindex;

      this.listCountMap.map((value, index) => {
        if (index < tapindex) {
          count += value;
        }
      });
      console.log(count);
      console.log(this.$refs.listView.scrollTop);
      this.$refs.listView.scrollTop = count * 100 + tapindex * 24;
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
</style>