// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public email!: string;
  public password!: string;
  public fullName!: string;
  public occupation!: string;
  public country!: string;
  public phoneNumber!: string;
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'senha' // Mapeando a coluna senha do banco de dados
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nome_completo' // Mapeando a coluna nome_completo do banco de dados
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ocupacao' // Mapeando a coluna ocupacao do banco de dados
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'pais_origem' // Mapeando a coluna pais_origem do banco de dados
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'phoneNumber' // Mapeando a coluna phoneNumber do banco de dados
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'usuarios_comuns',
  timestamps: false,
});

export default User;
