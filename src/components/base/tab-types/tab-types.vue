<template>
  <div class="tab-type-item">
    <img :src="imgSrc">
    <span>{{title}}</span>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    title: {
      type: "",
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  create() {}
};
</script>

<style scoped>
.tab-type-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25%;
}
.tab-type-item img {
  width: 100px;
  height: 100px;
  padding: 24px 0;
}
.tab-type-item span {
  font-size: 14px; /*no*/
  color: #2f2f2f;
}
</style>