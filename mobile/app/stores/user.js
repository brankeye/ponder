import { observable, action } from 'mobx';

class user {
  @observable isSignedIn = false;
  id = '53737b83-0333-4b33-aa09-24d6d5f21ff5';

  @action signIn = () => {
    this.isSignedIn = true;
  }

  @action signOut = () => {
    this.isSignedIn = false;
  }
}

const store = new user();
export default store;
