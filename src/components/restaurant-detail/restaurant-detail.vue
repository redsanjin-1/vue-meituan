<template>
  <div>
    <h1>res-detail</h1>
    <div class="btn-back" @click="back">back</div>  
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  mounted() {},
  create() {}
};
</script>

<style lang='scss' scoped>

</style>