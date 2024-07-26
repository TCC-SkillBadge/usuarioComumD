// src/models/PortfolioTest.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

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
