<template>
  <span class="stars-list" :style="{fontSize:size+'px'}">
    <span v-for="item in monthSaleNumArray" :key="item.key">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star0.png" v-if="item==0" :style="{width:size+'px',height:size+'px'}">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star1.png" v-if="item==1" :style="{width:size+'px',height:size+'px'}">
      <img src="http://p53zq2w8v.bkt.clouddn.com/star/star2.png" v-if="item==2" :style="{width:size+'px',height:size+'px'}">
    </span>
  </span>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    score: {
      type: Number,
      default: 0.0
    },
    size: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {};
  },
  computed: {
    // 将传入的 score 转换成 输入
    // 4.5 -> [2,2,2,2,1]  2是整颗星，1是半颗星，0是没有星
    monthSaleNumArray: function() {
      let score = this.score.toString(),
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
  display: inline-block;
  img {
    display: inline-block;
  }
}
</style>