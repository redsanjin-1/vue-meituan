<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>   
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  background-color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
