<template>
  <div class="infoWrapper">
    <cross-item v-for="item in sellerInfo" :key="item.title"
                :name="item.name"
                :title="item.title"
                :hasBorder="item.hasBorder"
                :hasMarginBottom="item.hasMarginBottom"
                :hasRightArrow="item.hasRightArrow"></cross-item>
    <div class="line"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import CrossItem from "@/components/base/cross-item/cross-item";
import utils from "@/assets/js/utils.js";

export default {
  name: "seller",
  components: {
    CrossItem
  },
  props: {},
  data() {
    return {
      sellerInfo: []
    };
  },
  methods: {
    _normalize() {
      let resInfo = JSON.parse(utils.store.getLocalstorage("resInfo"));
      this.sellerInfo = [
        {
          name: "form",
          title: "商家店名：" + resInfo.name,
          hasBorder: true,
          hasMarginBottom: false,
          hasRightArrow: false
        },
        {
          name: "i-good",
          title: "菜色品类：" + resInfo.flavors,
          hasBorder: false,
          hasMarginBottom: true,
          hasRightArrow: false
        },
        {
          name: "time",
          title: "配送时间：" + resInfo.opening_hours.join(","),
          hasBorder: true,
          hasMarginBottom: false,
          hasRightArrow: false
        },
        {
          name: "location",
          title: "商家地址：" + resInfo.address,
          hasBorder: false,
          hasMarginBottom: true,
          hasRightArrow: false
        },
        {
          name: "deliver",
          title: "配送方式：" + resInfo.delivery_mode,
          hasBorder: true,
          hasMarginBottom: false,
          hasRightArrow: false
        },
        {
          name: "phone",
          title: "联系电话：" + resInfo.phone,
          hasBorder: false,
          hasMarginBottom: true,
          hasRightArrow: false
        }
      ];
    }
  },
  created() {},
  mounted() {
    this._normalize();
  },
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.infoWrapper {
  margin-top: 20px;
}
.line {
  height: 5px;
}
</style>