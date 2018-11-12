<template>
  <div id="app">
    <nav-bar />
    <div class="container mt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import "jquery";
import "bootstrap";
import NavBar from "./components/NavBar";
import auth from "./authService";

export default {
  components: {
    NavBar
  },
  async created() {
    try {
      await auth.getIdToken();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
