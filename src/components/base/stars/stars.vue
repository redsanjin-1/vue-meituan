<template>
  <span class="stars-list">
    <span v-for="item in monthSaleNumArray" :key="item.key">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star0.png" v-if="item==0">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star1.png" v-if="item==1">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star2.png" v-if="item==2">
    </span>
  </span>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    resScore: {
      type: Number,
      default: 0.0
    }
  },
  data() {
    return {};
  },
  computed: {
    monthSaleNumArray: function() {
      let score = this.resScore.toString(),
        count = score.slice(0, 1),
        hasHalf = score.slice(2) === "0" ? 0 : 1,
        arr = [],
        i;
      for (i = 0; i < 5; i++) {
        if (i < count) {
          arr.push(2);
        } else {
          if (i == count && hasHalf) {
            arr.push(1);
          } else {
            arr.push(0);
          }
        }
      }
      return arr;
    }
  },
  methods: {},
  mounted() {},
  create() {}
};
</script>

<style lang='scss' scoped>
.stars-list {
  display: flex;
  height: 12px; /*no*/
  img {
    display: block;
    width: 12px; /*no*/
    height: 12px; /*no*/
  }
}
</style>