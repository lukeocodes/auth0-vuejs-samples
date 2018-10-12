import auth0 from "auth0-js";
import { EventEmitter } from "events";

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: location.href + "callback/popup",
  clientID: process.env.VUE_APP_AUTH0_CLIENTID,
  responseType: "id_token",
  scope: "openid profile email"
});

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  login() {
    webAuth.popup.authorize({}, (err, result) => {
      if (err) {
        alert(err);
      } else {
        localStorage.setItem("loggedIn", "true");

        this.idToken = result.idToken;
        this.profile = result.idTokenPayload;
        this.tokenExpiry = new Date(this.profile.exp * 1000);

        this.emit("loginStateChanged", {
          loggedIn: true,
          profile: result.idTokenPayload
        });
      }
    });
  }

  logOut() {
    localStorage.removeItem("loggedIn");
    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;
    this.emit("loginStateChanged", { loggedIn: false });
  }

  isAuthenticated() {
    return localStorage.getItem("loggedIn") === "true";
  }

  isIdTokenValid() {
    return this.idToken && this.tokenExpiry && this.tokenExpiry > new Date();
  }

  popupCallBack() {
    webAuth.popup.callback({});
  }
}

export default new AuthService();
