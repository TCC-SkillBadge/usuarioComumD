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
