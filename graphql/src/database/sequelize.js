import config from '@@server/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(config.dbConnUri);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
export { Sequelize };
