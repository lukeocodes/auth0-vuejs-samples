<template>
  <div v-if="profile">
    <div class="row">
      <div class="col-md-3">
        <img :src="profile.picture" :alt="profile.name" class="profile-lg img-thumbnail">
      </div>
      <div class="col-md">
        <h1 class="display-4">{{ profile.name }}</h1>
        <p class="lead">{{ profile.email }} <span v-if="profile.email_verified" class="badge badge-success">verified</span> </p>
      </div>
    </div>

    <div class="card bg-light mt-2 p-2">
      <pre>{{ JSON.stringify(profile, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import auth from "../authService";

export default {
  data() {
    return {
      profile: auth.profile
    };
  },
  created() {
    auth.addListener("loginEvent", data => {
      this.profile = data.profile;
    });
  }
};
</script>

<style>
.profile-lg {
  width: 200px;
  height: 200px;
}

.display-4 {
  font-weight: 100;
}
</style>
