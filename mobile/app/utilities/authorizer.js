import OAuthManager from 'react-native-oauth';
import { app_name, config } from 'constants/oauth';
import firebase from 'utilities/firebase';

const manager = new OAuthManager(app_name);

const authorizeGoogle = () => {
  console.log('Handle google signin.');
  manager.configure(config);
  manager
    .authorize('google', { scopes: 'email' })
    .then(result => {
      console.log(JSON.stringify(result));
      const accessToken = result.response.credentials.accessToken;
      const credential = firebase.auth.GoogleAuthProvider.credential(
        null,
        accessToken
      );
      console.log('token: ' + accessToken);
      console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          console.log('User successfully signed in', user);
        })
        .catch(err => {
          console.error('User signin error', err);
          error(err);
        });
    })
    .catch(err => {
      console.log(err);
      error(err);
    });
};

const authorizeFacebook = () => {
  console.log('Handle facebook signin.');
  manager.configure(config);
  manager
    .authorize('facebook', { scopes: 'email' })
    .then(result => {
      console.log(JSON.stringify(result));
      const accessToken = result.response.credentials.accessToken;
      const credential = firebase.auth.FacebookAuthProvider.credential(
        accessToken
      );
      console.log('token: ' + accessToken);
      console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          console.log('User successfully signed in', user);
        })
        .catch(err => {
          console.error('User signin error', err);
        });
    })
    .catch(err => console.log(err));
};

const authorizeTwitter = () => {
  console.log('Handle twitter signin.');
  manager.configure(config);
  manager.deauthorize('twitter');
  manager
    .authorize('twitter', { scopes: 'email' })
    .then(result => {
      console.log(JSON.stringify(result));
      const accessToken = result.response.credentials.access_token;
      const credential = firebase.auth.TwitterAuthProvider.credential(
        accessToken,
        result.response.credentials.access_token_secret
      );
      console.log('token: ' + accessToken);
      console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
          console.log('User successfully signed in', user);
        })
        .catch(err => {
          console.error('User signin error', err);
        });
    })
    .catch(err => console.log(err));
};

export const authorize = provider => {
  switch (provider) {
    case 'google':
      authorizeGoogle();
      break;
    case 'facebook':
      authorizeFacebook();
      break;
    case 'twitter':
      authorizeTwitter();
      break;
  }
};
