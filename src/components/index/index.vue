<template>
  <div class="scroll-wrapper" ref="reflist" :style="{height:listWrapperHeight+'px'}">
    <!-- swipe -->
    <mt-swipe :auto="4000" class="swipe-wrapper">
      <mt-swipe-item v-for="item in swipeList" :key="item.src">
        <img :src="item.src" class="swipe-img">
      </mt-swipe-item>
    </mt-swipe>
    <!-- tab-type -->
    <div class="tab-types-wrapper">
      <tab-types v-for="item in itemTypes" 
                :key="item.title" 
                :imgSrc="item.src" 
                :title="item.title"></tab-types>
    </div>
    <!-- res-list -->
    <div class="res-list-wrapper" v-if="restaurantList">
      <title-bar title="附近商家"></title-bar>
      <mt-loadmore :bottom-method="loadBottom" :autoFill="autoFill" :bottom-all-loaded="allLoaded" :bottomLoadingText="bottomLoadingText" ref="loadmore">
        <div class="res-list-wrapper">
          <restaurant-item v-for="item in restaurantList" 
                        :key="item.mt_poi_id"
                        :resId="item.mt_poi_id"
                        :resImgSrc="item.pic_url"
                        :resName="item.name"
                        :resScore="item.wm_poi_score"
                        :monthSaleNum="item.month_sale_num"
                        :deliveryTime="item.mt_delivery_time"
                        :distance="item.distance"
                        :minPriceTip="item.min_price_tip"
                        :shippingFeeTip="item.shipping_fee_tip"
                        :averagePriceTip="item.average_price_tip"
                        :discounts="item.discounts2"
                        @click.native="goResDetail(item.mt_poi_id)"></restaurant-item>
        </div>
      </mt-loadmore>
      <title-bar title="别扯了，我是有底线的" v-if="allLoaded"></title-bar>      
    </div>
    <!-- tab-bar -->
    <tab-bar></tab-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/api.js";
import TabTypes from "@/components/base/tab-types/tab-types";
import RestaurantItem from "@/components/restaurant-item/restaurant-item";
import TabBar from "@/components/base/tab-bar/tab-bar";
import TitleBar from "@/components/base/title-bar/title-bar";
import { mapMutations } from "vuex";

export default {
  components: {
    TabTypes,
    RestaurantItem,
    TabBar,
    TitleBar
  },
  data() {
    return {
      swipeList: [],
      itemTypes: [],
      restaurantList: [],
      pageIndex: 0,
      // 以下属性为 mt-loaded需要的，详见官网
      allLoaded: false,
      listWrapperHeight: 0,
      autoFill: false,
      bottomLoadingText: "正在加载..."
    };
  },
  methods: {
    // indicator 须在 3个请求同时完成时才消失，这里使用 axios.all([...])
    _minit() {
      this.$indicator.open("加载中...");
      this.$ajax
        .all([
          this.$ajax({
            method: "get",
            url: api.getSwipeList
          }),
          this.$ajax({
            method: "get",
            url: api.getItemTypes
          }),
          this.$ajax({
            method: "get",
            url: api["indexList" + this.pageIndex]
          })
        ])
        .then(
          this.$ajax.spread((r1, r2, r3) => {
            // 轮播图
            this.swipeList = r1.data.data;
            // 商家类型
            this.itemTypes = r2.data.data;
            // 商家列表
            this.restaurantList = r3.data.data.poilist;
            this.pageIndex = this.pageIndex + 1;
            this.allLoaded = r3.data.allLoaded;
            this.autoFill = true;
            this.$indicator.close();
          })
        );
    },
    _getSwipeList() {
      this.$ajax({
        method: "get",
        url: api.getSwipeList
      })
        .then(res => {
          this.swipeList = res.data.data;
          // console.log(this.swipeList);
        })
        .catch(e => {
          console.log(e);
        });
    },
    _getItemTypes() {
      this.$ajax({
        method: "get",
        url: api.getItemTypes
      })
        .then(res => {
          this.itemTypes = res.data.data;
          // console.log(this.itemTypes);
        })
        .catch(e => {
          console.log(e);
        });
    },
    _getRestaurantList() {
      this.$ajax({
        method: "get",
        url: api["indexList" + this.pageIndex]
      })
        .then(res => {
          this.restaurantList = res.data.data.poilist;
          this.pageIndex = this.pageIndex + 1;
          this.allLoaded = res.data.allLoaded;
          this.autoFill = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadBottom() {
      console.log("load");
      if (!this.allLoaded) {
        setTimeout(() => {
          this.$ajax({
            method: "get",
            url: api["indexList" + this.pageIndex]
          })
            .then(res => {
              this.restaurantList = this.restaurantList.concat(
                res.data.data.poilist
              );
              this.$refs.loadmore.onBottomLoaded();
              this.pageIndex = this.pageIndex + 1;
              this.allLoaded = res.data.allLoaded;
            })
            .catch(e => {
              console.log(e);
            });
        }, 1500);
      } else {
        this.listWrapperHeight += 50;
      }
    },
    goResDetail(id) {
      this.GO_RESDETAILS(id);
      this.$router.push("/restaurant/" + id);
    },
    ...mapMutations(["GO_RESDETAILS"])
  },
  mounted() {
    this.listWrapperHeight = document.documentElement.clientHeight - 50;
    this._minit();
  }
};
</script>

<style>
.scroll-wrapper {
  overflow-y: auto;
  background-color: #ebebeb;
}
.swipe-wrapper {
  width: 100%;
  height: 340px;
}
.swipe-img {
  display: block;
  width: 100%;
  height: 340px;
}
.tab-types-wrapper {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  margin-bottom: 20px;
  padding-bottom: 28px;
}
/* res-list*/
.res-list-wrapper {
  background-color: #fff;
}
.mint-loadmore-bottom {
  font-size: 16px !important; /*no*/
}
</style>
