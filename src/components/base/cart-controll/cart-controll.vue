<template>
  <div class="cart-controll-wrapper">
    <img :src="imgRemove" class="cart remove" v-show="food.count>0" @click="remove"/>
    <span class="count" v-show="food.count>0">{{food.count}}</span>  
    <img :src="imgAdd" class="cart add" @click="add"/>
  </div> 
</template>

<script type='text/ecmascript-6'>
import imgRemove from "@/assets/images/cart-controll/remove.png";
import imgAdd from "@/assets/images/cart-controll/add.png";
export default {
  components: {},
  props: {
    food: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      imgRemove,
      imgAdd
    };
  },
  computed: {},
  methods: {
    remove() {
      this.food.count && this.food.count--;
    },
    add() {
      if (this.food.count) {
        this.food.count++;
      } else {
        // 重点：使用 set 可以 使新加的 count属性能够 动态响应
        this.$set(this.food, "count", 1);
      }
    }
  },
  created() {},
  mounted() {},
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.cart-controll-wrapper {
  display: flex;
  align-items: center;
  .cart {
    width: 40px;
    height: 40px;
    padding: 20px;
  }
}
</style>