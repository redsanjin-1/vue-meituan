<template>
  <div class="cross-item" :class="{borderBottom:hasBorder,marginBottom:hasMarginBottom}">
    <div class="item-name">
      <i :class="iconfont"></i>
      <span class="item-title">{{title}}</span>
    </div>
    <i class="iconfont icon-right" v-if="hasRightArrow"></i>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    // iconfont 的名称
    name: {
      type: String,
      default: "question"
    },
    // item 的 标题
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
    },
    // 是否有跳转的箭头图标
    hasRightArrow: {
      type: Boolean,
      default: true
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
  padding: 20px 30px;
  font-size: 14px; /*no*/
  background-color: #fff;
  .item-name {
    display: flex;
    align-items: center;
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