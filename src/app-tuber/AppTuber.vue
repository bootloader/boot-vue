<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
// Disable Vue's custom element warning for A-Frame components
Vue.config.ignoredElements = [/^a-/];

export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
