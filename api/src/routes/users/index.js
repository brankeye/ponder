const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    handler: ({ context: { user } }, res) => {
      return res.json(user);
    },
  },
};

export default routes;
