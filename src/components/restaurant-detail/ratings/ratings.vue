<template>
  <div class="ratings-wrapper">
    <div class="ratings-overview">
      <div class="totall-score">
        <p class="totall-score-num">{{ratings.overall_score | toFixed}}</p>
        <p>综合评价</p>
        <p class="percentage">高于周边商家{{ratings.compare_rating | toPercentage}}</p>
      </div>
      <div class="all-scores">
        <div class="service-score">
          <span class="score-title">服务态度</span>
          <stars :score="ratings.service_score" :size="16"></stars>
          <span class="score-num">{{ratings.service_score | toFixed}}</span>
        </div>
        <div class="food-score">
          <span class="score-title">菜品评价</span>
          <stars :score="ratings.food_score" :size="16"></stars>
          <span class="score-num">{{ratings.food_score | toFixed}}</span>          
        </div>
        <div class="delivery-time">
          <span class="score-title">送达时间</span>
          {{ratings.deliver_time}}分钟
        </div>
      </div>
    </div>
    <div class="ratings-comments">
      <div class="comments-header">
        <div class="tab-item" :class="{tabItemActived:activedType===-1}" @click="switchCommentType(-1)">全部{{ratings.totall_count}}</div>
        <div class="tab-item" :class="{tabItemActived:activedType===0}" @click="switchCommentType(0)">好评{{ratings.satisfied_count}}</div>
        <div class="tab-item" :class="{tabItemActived:activedType===1}" @click="switchCommentType(1)">差评{{ratings.unsatisfied_count}}</div>        
      </div>
      <div class="comments-list" >
        <div class="comments-item" v-for="comment in sortComments" :key="comment.id">
          <img :src="comment.avatar" class="user-avatar">
          <div class="comment-content">
          <div class="name-rateTime">
            <span class="user-name">{{comment.username}}</span>
            <span class="user-rateTime">{{comment.rateTime | formateDate}}</span>
          </div>
          <stars :score="comment.score"></stars>
          <p class="user-text">{{comment.text}}</p>
          <ul class="tag-list">
            <li v-for="{index,item} in comment.recommend" class="tag-item" :key="index">{{item}}</li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
// import api from "@/api/api.js";
import Stars from "@/components/base/stars/stars";
import { mapActions, mapState } from "vuex";

export default {
  name: "ratings",
  components: {
    Stars
  },
  props: {},
  filters: {
    toFixed(value, num = 1) {
      if (!value) return 0.0;
      return value.toFixed(num);
    },
    toPercentage(value, num = 1) {
      if (!value) return "0%";
      return (value * 100).toFixed(num) + "%";
    },
    formateDate(value) {
      let date = new Date(value),
        Y = date.getFullYear(),
        M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
        D = date.getDate(),
        h = date.getHours();
      return `${Y}-${M}-${D} ${D}:${h}`;
    }
  },
  computed: {
    // 评论列表
    sortComments() {
      const type = this.activedType;
      if (type === -1) {
        return this.ratings.ratings;
      } else {
        return this.ratings.ratings.filter(item => {
          return item.rateType === type;
        });
      }
    },
    ...mapState(["ratings"])
  },
  data() {
    return {
      activedType: -1 //评论类型
    };
  },
  methods: {
    ...mapActions(["getRatings"]),
    switchCommentType(type) {
      this.activedType = type;
    }
  },
  created() {},
  mounted() {
    this.getRatings();    
  },
  activated() {
  },
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.ratings-wrapper {
  background-color: #f5f5f5;
  .ratings-overview {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 40px 0 40px 10px;
    background-color: #fff;
    color: #666;
    font-size: 14px; /*no*/
    .totall-score {
      flex: 3;
      border-right: 1px solid #ddd;
      text-align: center;
      .totall-score-num {
        font-size: 24px; /*no*/
        color: #ff6000;
        font-weight: 700;
      }
      .percentage {
        color: #999;
        font-size: 10px; /*no*/
      }
    }
    .all-scores {
      flex: 7;
      padding-left: 40px;
      .service-score,
      .food-score {
        display: flex;
        align-items: center;
      }
      .score-title {
        margin-right: 20px;
      }
      .score-num {
        margin-left: 20px;
        color: #ff6000;
      }
    }
  }
  .ratings-comments {
    padding: 20px 40px;
    background-color: #fff;
    .comments-header {
      display: flex;
      margin-bottom: 30px;
      font-size: 14px; /*no*/
      .tab-item {
        background-color: rgba(77, 85, 93, 0.2);
        color: #4d555d;
        padding: 10px 20px;
        margin-right: 20px;
      }
      .tabItemActived {
        color: #fff;
        background-color: #ffb000;
      }
    }
    .comments-list {
      .comments-item {
        display: flex;
        margin-bottom: 20px;
        padding-top: 20px;
        border-top: 1px solid #f0f0f0;
        .user-avatar {
          width: 80px;
          height: 80px;
          margin-right: 20px;
          border-radius: 50%;
        }
        .comment-content {
          flex: 1;
          .name-rateTime {
            display: flex;
            justify-content: space-between;
            .user-name {
              color: #2f2f2f;
              font-size: 16px; /*no*/
            }
            .user-rateTime {
              font-size: 12px; /*no*/
              color: #898989;
            }
          }
          .user-text {
            font-size: 14px; /*no*/
            margin-bottom: 12px;
          }
          .tag-list {
            display: flex;
            flex-wrap: wrap;
            .tag-item {
              margin-bottom: 10px;
              padding: 5px 10px;
              background-color: #fff;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 10px;
              font-size: 12px; /*no*/
              color: #93999f;
            }
          }
        }
      }
    }
  }
}
</style>