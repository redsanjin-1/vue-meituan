<template>  
  <div class="res-item">
    <div class="res-imgSrc">
      <img :src="resImgSrc" >
      <!-- <img v-lazy="resImgSrc" >       -->
    </div>
    <div class="res-details">
      <h2 class="res-name">{{resName}}</h2>
      <div class="res-saleInfo">
        <div class="res-score-sale">
          <stars :resScore="resScore"></stars>
          <span>月售{{monthSaleNum}}</span>
        </div>
        <div class="res-delivTime-distance">
          <span>{{deliveryTime}}</span>
          <span>|</span>
          <span>{{distance}}</span>
        </div>
      </div>
      <div class="res-fee">
        <span>{{minPriceTip}}</span>
        <span>|</span>
        <span>{{shippingFeeTip}}</span>
        <span>|</span>
        <span>{{averagePriceTip}}</span>        
      </div>
      <div class="res-discounts">
        <div v-for="item in discounts" :key="item.info" class="res-discounts-item">
          <img :src="item.icon_url">
          <span>{{item.info}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Stars from "@/components/base/stars/stars";
export default {
  components: {
    Stars
  },
  props: {
    resID: {
      type: Number
    },
    resImgSrc: {
      type: String,
      default: ""
    },
    resName: {
      type: String,
      default: ""
    },
    resScore: {
      type: Number,
      default: 0
    },
    monthSaleNum: {
      type: Number,
      default: 0
    },
    deliveryTime: {
      type: String,
      default: ""
    },
    distance: {
      type: String,
      default: ""
    },
    minPriceTip: {
      type: String,
      default: ""
    },
    shippingFeeTip: {
      type: String,
      default: ""
    },
    averagePriceTip: {
      type: String,
      default: ""
    },
    discounts: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  create() {}
};
</script>

<style lang="scss" scoped>
.res-item {
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  border-bottom: 1px solid #eee; /*no*/
  font-size: 12px; /*no*/
  color: #666;
  line-height: 16px; /*no*/
  .res-imgSrc {
    width: 140px;
    padding: 0 20px;
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
  .res-details {
    flex: 1;
    padding-right: 30px;
    .res-name {
      font-size: 16px; /*no*/
      color: #333;
      font-weight: 700;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .res-saleInfo {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .res-score-sale {
        display: flex;
      }
    }
    .res-fee {
      margin-top: 14px;
    }
    .res-discounts {
      margin-top: 14px;
      color: #b0b0b0;
      .res-discounts-item {
        display: flex;
        align-items: center;
        margin-top: 14px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
    }
  }
}
</style>