import auth0 from "auth0-js";
import { EventEmitter } from "events";

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: `${process.env.VUE_APP_URI}/callback`,
  clientID: process.env.VUE_APP_AUTH0_CLIENTID,
  responseType: "token id_token",
  scope: "openid profile email",
  audience: process.env.VUE_APP_AUTH0_AUDIENCE
});

const localStorageKey = "loggedIn";
const loginEvent = "loginEvent";

const generateSecureString = () => {
  const validChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let array = new Uint8Array(40);

  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));

  return String.fromCharCode.apply(null, array);
};

class AuthService extends EventEmitter {
  idToken = null;
  accessToken = null;
  profile = null;
  tokenExpiry = null;
  accessTokenExpiry = null;

  login(customState) {
    const state = {
      secureString: generateSecureString(),
      customState: customState || {}
    };

    const encodedState = btoa(JSON.stringify(state));

    webAuth.authorize({
      state: encodedState
    });
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.accessToken = null;
    this.tokenExpiry = null;
    this.profile = null;
    this.accessTokenExpiry = null;

    webAuth.logout({
      returnTo: process.env.VUE_APP_URI
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  handleCallback() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  isAuthenticated() {
    return localStorage.getItem(localStorageKey) === "true";
  }

  isIdTokenValid() {
    return this.idToken && this.tokenExpiry && this.tokenExpiry > Date.now();
  }

  isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      this.accessTokenExpiry > Date.now()
    );
  }

  popupCallBack() {
    webAuth.popup.callback({});
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        webAuth.checkSession({}, (err, authResult) => {
          if (err) {
            reject(err);
          } else {
            this.localLogin(authResult);
            resolve(authResult.idToken);
          }
        });
      } else {
        resolve();
      }
    });
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken);
      } else {
        webAuth.checkSession({}, (err, authResult) => {
          if (err) {
            reject(err);
          } else {
            this.localLogin(authResult);
            resolve(authResult.accessToken);
          }
        });
      }
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000);
    
    console.log(authResult);
    console.log(this.accessTokenExpiry);

    localStorage.setItem(localStorageKey, "true");

    let parsedState = {};

    try {
      parsedState = JSON.parse(atob(authResult.state));
    } catch (e) {
      parsedState = {};
    }

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.state,
      stateJson: parsedState.customState || {}
    });
  }
}

const service = new AuthService();
service.setMaxListeners(5);

export default service;
