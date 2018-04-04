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
    let localGoods = utils.store.getLocalstorage('goods')
    if(!localGoods){
      utils.store.setLocalstorage('goods', localGoods);
    }
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
      Vue.set(state.goods[category], 'selected_count', 1);      
      utils.store.setLocalstorage('goods',state.goods);
    } else {
      Vue.set(state.goods[category].foods[index],'count',++ state.goods[category].foods[index].count);
      Vue.set(state.goods[category],'selected_count',++state.goods[category].selected_count);      
      utils.store.setLocalstorage('goods',state.goods);      
    }
  },
  [REMOVE_FOOD](state, food) {
    let category = food.category,
      index = food.index;
      Vue.set(state.goods[category].foods[index],'count',--state.goods[category].foods[index].count);    
      Vue.set(state.goods[category],'selected_count',--state.goods[category].selected_count);            
    utils.store.setLocalstorage('goods',state.goods)    
  },
  [CLEAR_CART](state) {
    state.goods.map(goods => {
      goods.selected_count = 0;
      goods.foods.map(food => {
        food.count = 0
      })
    })
    utils.store.setLocalstorage('goods',state.goods)
  }
}
