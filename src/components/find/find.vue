<template>
  <div class="find-list-wrapper">
    <div class="find-item" v-for="item in findList" :key="item.fId">
      <img v-lazy="item.img">
      <h2 class="title">{{item.title}}</h2>
      <div class="title-view">
      <span class="bizType">{{item.bizType}}</span>
      <span class="view">{{item.view}}人看过</span>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script type='text/ecmascript-6'>
import api from "@/api/api.js";
import TabBar from "@/components/base/tab-bar/tab-bar";

export default {
  components: {
    TabBar
  },
  props: {},
  data() {
    return {
      findList: []
    };
  },
  methods: {
    _getFindList() {
      this.$ajax({
        method: "get",
        url: api.findList
      })
        .then(res => {
          this.findList = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  create() {},
  mounted() {
    this._getFindList();
  }
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/mixin.scss";

.find-list-wrapper {
  margin-bottom: 50px; /*no*/
  .find-item {
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 30px;
    background-color: #fff;
    img {
      display: block;
      width: 100%;
    }
    .title {
      margin-top: 20px;
      font-size: 18px; /*no*/
      @include ellipsis();
    }
    .title-view {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      font-size: 14px; /*no*/
      color: #999;
    }
  }
}
</style>