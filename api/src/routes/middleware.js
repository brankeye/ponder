import uuid from 'uuid/v4';

export const authorizationFilter = async (
  { headers: { authorization } },
  res,
  context
) => {
  if (authorization) {
    if (authorization) {
      const clientId = Buffer.from(authorization, 'base64').toString();
      if (clientId) {
        context.clientId = clientId;
        const user =
          (await context.UserService.getUserByClientId(clientId)) ||
          (await context.User.insert({
            id: uuid(),
            client_id: clientId,
            anonymous: true,
          }));
        if (user) {
          context.user = user;
        }
      }
    }
  }
};
