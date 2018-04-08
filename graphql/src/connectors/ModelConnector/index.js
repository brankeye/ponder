import BaseConnector from '../BaseConnector';
import DataLoader from 'dataloader';

class ModelConnector extends BaseConnector {
  constructor({ modelName, ...config }) {
    super(config);
    this.loader = new DataLoader(
      methods =>
        Promise.all(
          methods.map(async ({ fn, name, verbose }) => {
            const result = await Promise.resolve(fn());
            if (verbose) {
              console.log(
                modelName + '.' + name + ': ',
                JSON.stringify(result, null, 2)
              );
            }
            return result;
          })
        ),
      {
        cacheKeyFn: ({ name, key }) => {
          const nextKey = JSON.stringify(key);
          const cacheKey = modelName + '/' + name + '/' + nextKey;
          //console.log('Cache key: ', cacheKey);
          return cacheKey;
        },
      }
    );
  }

  load = args => this.loader.load(args);
}

export default ModelConnector;
