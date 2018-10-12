<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link to="/" class="navbar-brand">Auth0 Vue.js Sample</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <a id="qsLoginBtn" class="nav-link" @click.prevent="login">Login</a>
      </li>
      <template v-if="loggedIn">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item"><a href="#" @click.prevent="logout" class="nav-link" id="qsLogoutBtn">Log Out</a></li>
      </template>
    </ul>
  </div>
</nav>  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  methods: {
    login() {
      console.log("Logging in..");
    },
    logout() {
      console.log("Logging out..");
    }
  },
  computed: mapState({
    loggedIn: "loggedIn"
  })
};
</script>

<style>
.nav-link.router-link-exact-active {
  color: #fff !important;
}
</style>
