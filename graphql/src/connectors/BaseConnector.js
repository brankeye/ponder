class BaseConnector {
  constructor(config = {}) {
    Object.keys(config).map(key => {
      this[key] = config[key];
    });
  }
}

export default BaseConnector;
