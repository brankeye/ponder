export const authenticate = async authToken => {
  return {
    user_id: authToken,
  };
};
