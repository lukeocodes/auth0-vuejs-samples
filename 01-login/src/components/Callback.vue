<template>
</template>

<script>
import auth from "../authService";

export default {
  async created() {
    await auth.handleCallback();
    this.$router.push("/");
  }
};
</script>
