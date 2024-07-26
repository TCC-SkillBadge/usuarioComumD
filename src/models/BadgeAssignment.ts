// src/models/BadgeAssignment.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BadgeAssignment extends Model {
  public id!: number;
  public dt_emissao!: Date;
  public dt_vencimento!: Date;
  public email_com!: string;
  public email_empr!: string;
  public id_badge!: number;
  public imagem_b!: string;
  public confirmation_token!: string;
  public descricao!: string;
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
  tableName: 'badge_assignment',
  timestamps: false,
});

export default BadgeAssignment;
