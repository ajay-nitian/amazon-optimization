const { Sequelize } = require('sequelize');
require('dotenv').config();

const isRender = process.env.DB_HOST?.includes('.render.com'); // detect internal or external host

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: isRender
      ? {} // no SSL for internal Render connections
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connection established successfully.'))
  .catch(err => console.error('❌ PostgreSQL connection failed:', err));

module.exports = { sequelize };

