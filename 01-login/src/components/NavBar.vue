<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link to="/" class="navbar-brand">Auth0 Vue.js Sample</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <a href="#" id="qsLoginBtn" class="nav-link" @click.prevent="login">Login</a>
      </li>
      <template v-if="loggedIn">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item"><a href="#" @click.prevent="logout" class="nav-link" id="qsLogoutBtn">Log Out</a></li>
      </template>
    </ul>
    <span v-if="loggedIn && profile" class="navbar-text">
      <img :src="profile.picture" :alt="profile.name" class="thumb">
      {{ profile.name }}
    </span>
  </div>
</nav>  
</template>

<script>
import auth from "../authService";

export default {
  name: "NavBar",
  methods: {
    login() {
      auth.login();
    },
    logout() {
      auth.logOut();
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      loggedIn: false,
      profile: {}
    };
  },
  created() {
    auth.addListener("loginEvent", authResult => {
      this.loggedIn = authResult.loggedIn;
      this.profile = authResult.profile;
    });
  }
};
</script>

<style>
.nav-link.router-link-exact-active {
  color: #fff !important;
}

img.thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
