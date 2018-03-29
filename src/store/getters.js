export default {
  activityCount: state => state.resInfo.activities ? state.resInfo.activities.length : 0,
  cartList: state => {
    const cartList = [];
    state.goods.map((good) => {
      let selected_count = 0;
      good.foods.map(item => {
        if (item.count) {
          selected_count += item.count;
          cartList.push(item);
        }
      });
      good.selected_count = selected_count
    });
    return cartList
  },
  totallCount: state => {
    let count = 0;
    state.goods.map(item => {
      count += item.selected_count
    })
    return count
  }
}