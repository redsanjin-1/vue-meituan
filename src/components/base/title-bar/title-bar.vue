<template>
  <h2 class="res-list-title">{{title}}</h2>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  create() {},
  mounted() {},
  activated() {},
  destroyed() {}
};
</script>

<style lang='scss' scoped>
.res-list-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px; /*no*/
  line-height: 80px;
  color: #333;
}
.res-list-title:before,
.res-list-title:after {
  display: inline-block;
  content: "";
  width: 60px;
  height: 1px; /*no*/
  background-color: #333;
}
.res-list-title:before {
  margin-right: 40px;
}
.res-list-title:after {
  margin-left: 40px;
}
</style> 