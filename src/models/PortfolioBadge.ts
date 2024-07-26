// src/models/PortfolioBadge.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class PortfolioBadge extends Model {
  public idBadge!: number;
  public imagemBadge!: string;
  public descricaoCertificado!: string;
  public emissor!: string;
  public dataEmissao!: Date;
  public dataVencimento!: Date;
}

PortfolioBadge.init({
  idBadge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  imagemBadge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricaoCertificado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emissor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataEmissao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataVencimento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'PortfolioBadge',
  tableName: 'badge',
  timestamps: false,
});

export default PortfolioBadge;
