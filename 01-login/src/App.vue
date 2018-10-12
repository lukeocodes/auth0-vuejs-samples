<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
</style>
