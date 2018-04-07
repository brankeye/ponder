import BaseConnector from '../BaseConnector';
import DataLoader from 'dataloader';

class ModelConnector extends BaseConnector {
  constructor({ modelName, ...config }) {
    super(config);
    this.loader = new DataLoader(
      methods => Promise.all(methods.map(({ fn }) => Promise.resolve(fn()))),
      {
        cacheKeyFn: ({ name, key }) => {
          const nextKey = JSON.stringify(key);
          const cacheKey = modelName + '/' + name + '/' + nextKey;
          console.log('Cache key: ', cacheKey);
          return cacheKey;
        },
      }
    );
  }

  load = ({ fn, name, key }) => this.loader.load({ fn, name, key });
}

export default ModelConnector;
