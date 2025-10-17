const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Optimization = sequelize.define('Optimization', {
  asin: { type: DataTypes.STRING, allowNull: false },
  original_title: { type: DataTypes.TEXT },
  original_bullets: { type: DataTypes.TEXT },
  original_description: { type: DataTypes.TEXT },
  optimized_title: { type: DataTypes.TEXT },
  optimized_bullets: { type: DataTypes.TEXT },
  optimized_description: { type: DataTypes.TEXT },
  optimized_keywords: { type: DataTypes.STRING },
  optimization_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Optimization;
