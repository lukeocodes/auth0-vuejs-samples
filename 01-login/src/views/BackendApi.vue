<template>
 <div>
    <div class="mb-5">
      <h1>Backend API</h1>
      <p>Ping your back-end API by clicking the button below. This will call the API endpoint using your ID token.</p>

      <button class="btn btn-primary" @click="callApi">Ping</button>
    </div>

    <div v-if="apiMessage">
      <h2>Result</h2>
      <p>{{ apiMessage }}</p>
    </div>

 </div>
</template>

<script>
import auth from "../authService";

export default {
  name: "Api",
  data() {
    return {
      apiMessage: null
    };
  },
  methods: {
    async callApi() {
      const idToken = await auth.getIdToken();

      try {
        const { data } = await this.$http.get("/api/private", {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });

        this.apiMessage = `Response from the server: ${data.msg}`;
      } catch (e) {
        this.apiMessage = `Error: the server responded with '${
          e.response.status
        }: ${e.response.statusText}'`;
      }
    }
  }
};
</script>
