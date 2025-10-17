const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // ✅ Important for Render
        rejectUnauthorized: false // ✅ Allow self-signed SSL certs
      }
    },
    logging: false, // optional, to reduce console spam
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('✅ PostgreSQL connected successfully!'))
  .catch((err) => console.error('❌ PostgreSQL connection failed:', err));

module.exports = { sequelize };
