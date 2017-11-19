import OAuthManager from 'react-native-oauth';
import { app_name, config } from 'constants/oauth';
import firebase from 'utilities/firebase';

const manager = new OAuthManager(app_name);

const signInWithCredential = async credential => {
  try {
    const user = await firebase.auth().signInWithCredential(credential);
    console.log('User successfully signed in', user);
    return user;
  } catch (err) {
    console.log('User signin error', err);
    alert('User signin error');
  }
};

const authorizeGoogle = async auth => {
  console.log(auth);
  const accessToken = auth.response.credentials.accessToken;
  const credential = firebase.auth.GoogleAuthProvider.credential(
    null,
    accessToken
  );
  const user = await signInWithCredential(credential);
  return user;
};

const authorizeFacebook = async auth => {
  const accessToken = auth.response.credentials.accessToken;
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
  const user = await signInWithCredential(credential);
  return user;
};

const authorizeTwitter = async auth => {
  const accessToken = auth.response.credentials.access_token;
  const accessTokenSecret = auth.response.credentials.access_token_secret;
  const credential = firebase.auth.TwitterAuthProvider.credential(
    accessToken,
    accessTokenSecret
  );
  const user = await signInWithCredential(credential);
  return user;
};

export const authorize = async provider => {
  try {
    console.log(`Handle ${provider} signin.`);
    manager.configure(config);
    //manager.deauthorize(provider);
    const auth = await manager.authorize(provider, { scopes: 'email' });
    switch (provider) {
      case 'google':
        return await authorizeGoogle(auth);
      case 'facebook':
        return await authorizeFacebook(auth);
      case 'twitter':
        return await authorizeTwitter(auth);
    }
  } catch (err) {
    console.log(err);
    alert('Failed to sign in!');
  }
};
