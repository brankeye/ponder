import mobx from 'mobx';

mobx.useStrict(true);

const makeConfig = config => {
  const initial = {
    remote: false
  };
  return config ? { initial, ...config } : initial;
};

export default makeConfig;
