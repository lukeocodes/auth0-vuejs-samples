import auth0 from "auth0-js";
import { EventEmitter } from "events";

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: "http://localhost:3000/callback/popup",
  clientID: process.env.VUE_APP_AUTH0_CLIENTID,
  responseType: "id_token",
  scope: "openid profile email"
});

let idToken = null;
let profile = null;
let tokenExpiry = null;

class AuthService extends EventEmitter {
  login() {
    webAuth.popup.authorize({}, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        localStorage.setItem("loggedIn", "true");

        idToken = result.idToken;
        profile = result.idTokenPayload;
        tokenExpiry = new Date(profile.exp * 1000);

        this.emit("loginStateChanged", {
          loggedIn: true,
          profile: result.idTokenPayload
        });
      }
    });
  }

  logOut() {
    localStorage.removeItem("loggedIn");

    idToken = null;
    tokenExpiry = null;
    profile = null;

    this.emit("loginStateChanged", { loggedIn: false });
  }

  isAuthenticated() {
    return localStorage.getItem("loggedIn") === "true";
  }

  isIdTokenValid() {
    return this.idToken && this.tokenExpiry && this.tokenExpiry > Date.now();
  }

  popupCallBack() {
    webAuth.popup.callback({});
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else {
        webAuth.checkSession({}, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);

            idToken = result.idToken;
            profile = result.idTokenPayload;
            tokenExpiry = new Date(profile.exp * 1000);

            if (!this.isAuthenticated()) {
              localStorage.setItem("loggedIn", "true");

              this.emit("loginStateChanged", {
                loggedIn: true,
                profile: result.idTokenPayload
              });
            }

            resolve(this.idToken);
          }
        });
      }
    });
  }
}

export default new AuthService();
