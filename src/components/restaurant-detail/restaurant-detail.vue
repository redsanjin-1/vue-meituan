<template>
  <div class="res-detail-wrapper">
    <div class="res-header-wrapper">
      <div class="res-header" v-if="resInfo">
        <div class="res-background" :style="{backgroundImage:'url('+resInfo.image_path+')'}"></div>
        <!-- avatar -->
        <img class="res-avatar" :src="resInfo.image_path">
        <!-- detail -->
        <div class="res-detail">
          <p class="res-name">
            <span class="res-brand">{{resInfo.brand}}</span>
            {{resInfo.name}}
          </p>
          <p class="res-info">
            <span class="res-delivery-mode">{{resInfo.delivery_mode}}</span>/
            <span class="res-delivery-time">{{resInfo.avg_delivery_time}}分钟送达</span>
          </p>
          <p class="res-activity" v-if="activityCount>0">
            <span class="res-iconname" :style="{backgroundColor:'#'+resInfo.activities[0].icon_color}">{{resInfo.activities[0].icon_name}}</span>
            <span class="res-activity-name">{{resInfo.activities[0].name}}</span>
          </p>
        </div>
        <!-- fn -->
        <div class="fn-wrapper">
          <i class="iconfont icon-back fn-back" @click="goBack"></i>
          <div class="activity-count" @click="tapShowActivity">
            <span>{{activityCount}}个活动</span>
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
      <div class="bulletin">
        <span class="bulletin-brand">公告</span>
        <span class="bulletin-content">{{resInfo.promotion_info}}</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <!-- 活动列表 -->
    <mt-popup v-model="showActivity" position="bottom">
      <div class="popup-header">
        <span class="popup-title">优惠活动</span>
        <i class="iconfont icon-close popup-close" @click="tapShowActivity"></i>
      </div>
      <div class="popup-content">
        <ul v-if="activityCount>0">
          <li v-for="item in resInfo.activities" :key="item.description" class="activity-item">
            <span :style="{backgroundColor:'#'+item.icon_color}" class="activity-item-iconname">{{item.icon_name}}</span>
            {{item.description}}
          </li>
        </ul>
        <p v-else>"暂无优惠活动。。。"</p>
      </div>
    </mt-popup>

    <!-- tab -->
    <ul class="tab-wrapper">
      <li class="tab-item" @click="tapTabbar('/',0)" :class="{tabActived:activedTabIndex===0}">
        <span>点餐</span>
      </li>
      <li class="tab-item" @click="tapTabbar('/ratings',1)" :class="{tabActived:activedTabIndex===1}">
        <span>评价</span>
      </li>
      <li class="tab-item" @click="tapTabbar('/seller',2)" :class="{tabActived:activedTabIndex===2}">
        <span>商家</span>
      </li>
    </ul>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!-- include中的值是组件中的name值，不是router的name -->
    <!-- <keep-alive include="goods,ratings,seller">
      <router-view></router-view>
    </keep-alive> -->
  </div>
</template>

<script type='text/ecmascript-6'>
import api from "@/api/api.js";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      showActivity: false,
      activedTabIndex: 0
    };
  },
  computed: {
    ...mapGetters(["activityCount"]),
    ...mapState(["resInfo"])
  },
  methods: {
    ...mapActions(["getResInfo"]),
    goBack() {
      this.$router.push("/index");
    },
    tapTabbar(url, index) {
      this.activedTabIndex = index;
      this.$router.push("/restaurant/" + this.$route.params.rid + url);
    },
    tapShowActivity() {
      this.showActivity = !this.showActivity;
    }
  },
  created() {},
  mounted() {
    this.getResInfo();
  },
  activated() {
    // 由于使用 keep-alive ，若每次进入页面需重新获取数据，须在这个钩子函数执行
  },
  destroyed() {}
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/mixin.scss";
.res-detail-wrapper {
  background-color: #efefef;
}
.res-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 120px; /*no*/
  padding: 0 30px;
  background-color: rgba(7, 17, 27, 0.5);
  color: #fff;
  .res-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-size: cover;
    filter: blur(10px); /*no*/
  }
  .res-avatar {
    // flex: 0 0 128px;
    width: 128px;
    height: 128px;
  }
  .res-detail {
    max-width: 400px;
    flex: 1;
    margin-left: 20px;
    .res-name {
      font-size: 16px; /*no*/
      margin-bottom: 14px;
      @include ellipsis();
      .res-brand {
        display: inline-block;
        background-color: red;
        padding: 5px;
        margin-right: 10px;
        font-size: 12px; /*no*/
      }
    }
    .res-info {
      font-size: 14px; /*no*/
      margin-bottom: 12px;
    }
    .res-activity {
      font-size: 12px; /*no*/
      .res-iconname {
        display: inline-block;
        padding: 5px;
        margin-right: 10px;
        font-size: 12px; /*no*/
      }
    }
  }
  .fn-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // flex: 0 0 140px;
    width: 140px;
    height: 160px;
    .fn-back {
      align-self: flex-end;
      padding: 6px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      font-size: 24px; /*no*/
    }
    .activity-count {
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 12px; /*no*/
      i {
        font-size: 12px; /*no*/
      }
    }
  }
}
.bulletin {
  display: flex;
  align-items: center;
  height: 56px;
  line-height: 56px;
  padding: 0 30px;
  background-color: rgba(7, 17, 27, 0.7);
  color: #fff;
  .bulletin-brand {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
    text-align: center;
    background-color: #fff;
    color: #666;
    font-size: 12px; /*no*/
    padding: 6px;
  }
  .bulletin-content {
    flex: 1;
    font-size: 13px; /*no*/
    @include ellipsis();
  }
  i {
    font-size: 12px; /*no*/
  }
}
.popup-header {
  position: relative;
  width: 100%;
  height: 40px; /*no*/
  line-height: 40px; /*no*/
  font-size: 16px; /*no*/
  font-weight: 700;
  text-align: center;
  background-color: #fff;
  .popup-close {
    position: absolute;
    font-size: 24px; /*no*/
    top: 0;
    right: 20px; /*no*/
    color: #666;
  }
}
.popup-content {
  padding: 0 40px;
  .activity-item {
    font-size: 14px; /*no*/
    margin: 20px 0;
    .activity-item-iconname {
      font-size: 12px; /*no*/
      color: #fff;
      padding: 8px;
    }
  }
}
.mint-popup-bottom {
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate3d(0, 0, 0);
}

.tab-wrapper {
  display: flex;
  background-color: #fff;
  color: #999;
  font-size: 16px; /*no*/
  border-bottom: 1px solid #ddd;
  .tab-item {
    flex: 1;
    height: 40px; /*no*/
    line-height: 40px; /*no*/
    text-align: center;
  }
  .tabActived {
    font-weight: 700;
    border-bottom: 3px solid #ffda61; /*no*/
    color: #000;
  }
}
.fixedTop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>