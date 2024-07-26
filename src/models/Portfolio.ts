// src/models/Portfolio.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Portfolio extends Model {
  public codigoPortfolio!: number;
}

Portfolio.init({
  codigoPortfolio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'Portfolio',
  tableName: 'portfolio',
  timestamps: false,
});

export default Portfolio;
