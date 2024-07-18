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

class BadgeAssignment extends Model {
  public id!: number;
  public dt_emissao!: Date;
  public dt_vencimento!: Date;
  public email_com!: string;
  public email_empr!: string;
  public id_badge!: number;
  public imagem_b!: string;
  public confirmation_token!: string;
  public descricao!: string; // Adicionando a propriedade descricao
}

BadgeAssignment.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  dt_emissao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dt_vencimento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email_com: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_empr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_badge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imagem_b: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmation_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'BadgeAssignment',
  tableName: 'badge',
  timestamps: false,
});

export default BadgeAssignment;
