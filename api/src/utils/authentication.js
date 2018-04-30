export const authenticate = async authToken => {
  if (!authToken) {
    throw new Error('Missing authentication.');
  }
  return {
    user_id: authToken,
  };
};
