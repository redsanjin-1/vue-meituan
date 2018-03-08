<template>
  <div class="myinfo-wrapper" :style="{height:pageHeight+'px'}">
    <div class="profile">
      <img class="avatar" src="http://i.waimai.meituan.com/static/img/default-avatar.png">
      <div class="username">
        <span>HelloWorld</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div v-for="item in crossItemData" :key="item.title">
      <cross-item :name="item.name"
                  :title="item.title"
                  :hasBorder="item.hasBorder"
                  :hasMarginBottom="item.hasMarginBottom"></cross-item>
    </div>
    <div class="service-wrapper">
      <a href="tel:10109777">客服电话：<label>101-097-77</label></a>
    </div>
    <div class="service-time">服务时间：9:00-23:00</div>
    <tab-bar></tab-bar>
  </div>
</template>

<script type='text/ecmascript-6'>
import TabBar from "@/components/base/tab-bar/tab-bar";
import CrossItem from "@/components/base/cross-item/cross-item";

export default {
  components: {
    TabBar,
    CrossItem
  },
  props: {},
  data() {
    return {
      crossItemData: [
        {
          name: "location",
          title: "收货地址管理",
          hasBorder: true,
          hasMarginBottom: false
        },
        {
          name: "recharge",
          title: "商家代金卷",
          hasBorder: false,
          hasMarginBottom: true
        },
        {
          name: "mail",
          title: "意见反馈",
          hasBorder: true,
          hasMarginBottom: false
        },
        {
          name: "question",
          title: "常见问题",
          hasBorder: false,
          hasMarginBottom: true
        }
      ],
      pageHeight: 667
    };
  },
  methods: {},
  created() {},
  mounted() {
    this.pageHeight = document.documentElement.innerHeight - 50;
  },
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.myinfo-wrapper {
  overflow-y: auto;
  background-color: #ebebeb;
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 320px;
    background: url(//xs01.meituan.net/waimai_i/img/user-banner.8c03fc75.png)
      no-repeat center;
    background-size: cover;
    .avatar {
      width: 144px;
      height: 144px;
      border: 3px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
    }
    .username {
      font-size: 16px; /*no*/
      color: #333333;
      margin-top: 20px;
    }
  }
  .service-wrapper {
    background-color: #fff;
    text-align: center;
    height: 92px;
    line-height: 92px;
    font-size: 15px; /*no*/
    a {
      color: #ffb000;
    }
  }
  .service-time {
    text-align: center;
    font-size: 14px; /*no*/
    color: #999;
    padding-top: 16px;
  }
}
</style>