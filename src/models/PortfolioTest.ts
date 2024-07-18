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

class PortfolioTest extends Model {
  public idTeste!: number;
  public tituloTeste!: string;
  public descricaoTeste!: string;
  public notaTeste!: number;
  public dtRealizacao!: Date;
}

PortfolioTest.init({
  idTeste: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  tituloTeste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricaoTeste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notaTeste: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dtRealizacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PortfolioTest',
  tableName: 'testec_softskill',
  timestamps: false,
});

export default PortfolioTest;
