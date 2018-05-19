class Auth {
  setAccessToken = token => {
    this.token = token;
  };

  getAccessToken = () => this.token;
}

export default new Auth();
