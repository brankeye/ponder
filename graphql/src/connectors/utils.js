export const getPath = (...paths) => {
  if (paths && paths.length) {
    return paths.join('/');
  } else {
    return undefined;
  }
};
