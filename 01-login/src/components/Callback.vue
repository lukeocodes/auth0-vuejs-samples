<template>
  <span></span>
</template>

<script>
import auth from "../authService";
import loginEventMixin from "../mixins/loginEvent";

export default {
  mixins: [loginEventMixin],
  methods: {
    handleLoginEvent(data) {
      if (data.stateJson && data.stateJson.target) {
        this.$router.push(data.stateJson.target);
      } else {
        this.$router.push("/");
      }
    }
  },
  created() {
    auth.handleCallback();
  }
};
</script>
