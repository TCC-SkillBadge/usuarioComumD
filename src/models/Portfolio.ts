import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
  }
);

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
