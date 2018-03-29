import {
  GET_RESINFO,
  GET_GOODS,
  GET_RATINGS,
  GO_RESDETAILS,
  ADD_FOOD,
  REMOVE_FOOD,
  CLEAR_CART
} from './mutations-type'
import utils from '../assets/js/utils'
import Vue from 'vue'

export default {
  [GET_RESINFO](state, res) {
    state.resInfo = res
    utils.store.setLocalstorage('resInfo', res);
  },
  [GET_GOODS](state, res) {
    state.goods = res
    utils.store.setLocalstorage('goods', res);
  },
  [GET_RATINGS](state, res) {
    state.ratings = res
    utils.store.setLocalstorage('ratings', res);
  },
  [GO_RESDETAILS](state, rid) {
    state.currentRID = rid
    utils.store.setLocalstorage('currentRID', rid)
  },
  [ADD_FOOD](state, food) {
    let category = food.category,
      index = food.index;
    if (state.goods[category].foods[index].count === undefined) {
      Vue.set(state.goods[category].foods[index], 'count', 1);
    } else {
      state.goods[category].foods[index].count += 1
    }
  },
  [REMOVE_FOOD](state, food) {
    let category = food.category,
      index = food.index;
    state.goods[category].foods[index].count -= 1
  },
  [CLEAR_CART](state) {
    state.goods.map(goods => {
      goods.selected_count = 0;
      goods.foods.map(food => {
        food.count = 0
      })
    })
  }
}
