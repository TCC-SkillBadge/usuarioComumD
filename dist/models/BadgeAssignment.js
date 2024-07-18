"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
});
class BadgeAssignment extends sequelize_1.Model {
}
BadgeAssignment.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    dt_emissao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dt_vencimento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    email_com: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email_empr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_badge: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    imagem_b: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    confirmation_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'BadgeAssignment',
    tableName: 'badge',
    timestamps: false,
});
exports.default = BadgeAssignment;
