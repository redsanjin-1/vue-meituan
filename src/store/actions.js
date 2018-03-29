import api from '../api/api.js'
import Vue from 'vue'

import {
  GET_RESINFO,
  GET_GOODS,
  GET_RATINGS
} from './mutations-type'

import axios from 'axios'

export default {
  getResInfo({
    commit,
    state
  }) {
    Vue.$indicator.open("加载中...");
    axios.get(api.resInfo).then(res => {
      Vue.$indicator.close();
      commit(GET_RESINFO, res.data.data)
    })
  },
  getGoods({
    commit,
    state
  }) {
    Vue.$indicator.open("加载中...");
    axios.get(api.goods).then(res => {
      Vue.$indicator.close();
      // 初始化商品数据,添加类别和索引
      let good = [];
      res.data.data.map((goods, category) => {
        goods.foods.map((food, index) => {
          food.category = category;
          food.index = index
        })
        good.push(goods)
      });
      commit(GET_GOODS, good)
    })
  },
  getRatings({
    commit,
    state
  }) {
    Vue.$indicator.open("加载中...");
    axios.get(api.ratings).then(res => {
      Vue.$indicator.close();
      commit(GET_RATINGS, res.data.data)
    })
  }
}