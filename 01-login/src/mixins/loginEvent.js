import auth from "../authService";

export default {
  created() {
    if (this.handleLoginEvent) {
      auth.addListener("loginEvent", this.handleLoginEvent);
    } else {
      console.warn("No handler 'handleLoginEvent' defined");
    }
  },

  destroyed() {
    if (this.handleLoginEvent) {
      auth.removeListener("loginEvent", this.handleLoginEvent);
    }
  }
};
