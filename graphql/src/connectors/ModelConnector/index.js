import BaseConnector from '../BaseConnector';
import DataLoader from 'dataloader';

class ModelConnector extends BaseConnector {
  constructor({ modelName, ...config }) {
    super(config);
    this.loader = new DataLoader(
      methods =>
        Promise.all(
          methods.map(async ({ name, fn, args, options }) => {
            const result = await Promise.resolve(fn(args));
            if (options.verbose) {
              console.log(
                `${modelName}.${name} called with args: ${JSON.stringify(
                  args,
                  null,
                  2
                )} resulting in: `,
                JSON.stringify(result, null, 2)
              );
            }
            return result;
          })
        ),
      {
        cacheKeyFn: ({ name, args }) => {
          const argsKey = JSON.stringify(args);
          const cacheKey = `${modelName}/${name}'/'${argsKey}`;
          return cacheKey;
        },
      }
    );
  }

  load = (name, { fn, ...options }) => args =>
    this.loader.load({ name, fn, options: options || {}, args });
}

export default ModelConnector;
