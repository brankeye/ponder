import { useStrict } from 'mobx';
useStrict(true);

const makeConfig = config => {
  const initial = {
    remote: true
  };
  return config ? { ...initial, ...config } : initial;
};

export default makeConfig;
