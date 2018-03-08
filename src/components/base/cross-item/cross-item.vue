<template>
  <div class="cross-item" :class="{borderBottom:hasBorder,marginBottom:hasMarginBottom}">
    <div class="item-name">
      <i :class="iconfont"></i>
      <span class="item-title">{{title}}</span>
    </div>
    <i class="iconfont icon-right"></i>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    name: {
      type: String
    },
    title: {
      type: String
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    hasMarginBottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconfont: function() {
      return ["iconfont", "icon-" + this.name];
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.cross-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  padding: 0 30px;
  font-size: 14px; /*no*/
  background-color: #fff;
  .item-name {
    color: #333;
    .item-title {
      padding-left: 20px;
    }
  }
  i {
    color: #aaa;
  }
  & > i {
    font-size: 12px; /*no*/
  }
}
.borderBottom {
  border-bottom: 1px solid #e4e4e4; /*no*/
}
.marginBottom {
  margin-bottom: 10px; /*no*/
}
</style>