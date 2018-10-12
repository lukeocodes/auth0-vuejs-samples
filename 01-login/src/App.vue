<template>
  <div id="app">
    <nav-bar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import "jquery";
import "bootstrap";
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
