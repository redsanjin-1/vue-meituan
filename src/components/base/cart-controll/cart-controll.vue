<template>
  <div class="cart-controll-wrapper"> 
    <transition name="move">
      <div class="remove-wrapper"  @click.stop="remove(food)" v-show="food.count>0">
        <img :src="imgRemove" class="cart remove"/>
      </div>
    </transition>
    <span class="count" v-show="food.count>0">{{food.count}}</span>  
    <img :src="imgAdd" class="cart add" @click.stop="add(food,$event)"/> 
  </div> 
</template>

<script type='text/ecmascript-6'>
import imgRemove from "@/assets/images/cart-controll/remove.png";
import imgAdd from "@/assets/images/cart-controll/add.png";
import { mapMutations } from "vuex";
export default {
  components: {},
  props: {
    food: {
      type: Object,
      default: () => {}
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
    // remove() {
    //   this.food.count && this.food.count--;
    // },
    // add(event) {
    //   if (this.food.count) {
    //     this.food.count++;
    //   } else {
    //     // 重点：使用 set 可以 使新加的 count属性能够 动态响应
    //     this.$set(this.food, "count", 1);
    //   }
    //   // 将当前 dom 传递出去，用来做小球飞入效果
    //   this.$emit("drop", event.target);
    // }
    ...mapMutations({
      addFood: "ADD_FOOD",
      remove: "REMOVE_FOOD"
    }),
    add(food, event) {
      this.addFood(food);
      this.$emit("drop", event.target);
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
  .remove-wrapper {
    transition: all 0.3s linear;
    height: 40px; /*no*/
    .remove {
      transition: all 0.3s linear;
      transform: rotate(0);
    }
    &.move-transition {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
    &.move-enter,
    &.move-leave {
      opacity: 0;
      transform: translate3D(24px, 0, 0);
      .remove {
        transform: rotate(180deg);
      }
    }
  }
  .cart {
    display: inline-block;
    width: 40px;
    height: 40px;
    padding: 20px;
  }
}
</style>