const { Sequelize } = require('sequelize');
require('dotenv').config();

const isRender = process.env.RENDER === 'true';

// ✅ Option 1: Use full DATABASE_URL if available
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// ✅ Initialize Sequelize
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,              // Render requires SSL for PostgreSQL
      rejectUnauthorized: false,  // Avoid self-signed cert issues
    },
  },
  logging: false,
});

// ✅ Test connection
sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connection established successfully.'))
  .catch((err) => console.error('❌ PostgreSQL connection failed:', err));

module.exports = { sequelize };
