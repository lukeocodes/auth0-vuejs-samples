import auth0 from "auth0-js";
import { EventEmitter } from "events";

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: "http://localhost:3000/callback",
  clientID: process.env.VUE_APP_AUTH0_CLIENTID,
  responseType: "id_token",
  scope: "openid profile email"
});

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  login() {
    webAuth.authorize({});
  }

  logOut() {
    localStorage.removeItem("loggedIn");

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    this.emit("loginStateChanged", { loggedIn: false });
  }

  handleCallback() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, result) => {
        if (err) {
          reject(err);
        } else {
          localStorage.setItem("loggedIn", "true");

          this.idToken = result.idToken;
          this.profile = result.idTokenPayload;
          this.tokenExpiry = new Date(this.profile.exp * 1000);

          this.emit("loginStateChanged", {
            loggedIn: true,
            profile: result.idTokenPayload
          });

          resolve(result);
        }
      });
    });
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
            this.idToken = result.idToken;
            this.profile = result.idTokenPayload;
            this.tokenExpiry = new Date(this.profile.exp * 1000);

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
