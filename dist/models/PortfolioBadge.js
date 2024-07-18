"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
});
class PortfolioBadge extends sequelize_1.Model {
}
PortfolioBadge.init({
    idBadge: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    imagemBadge: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descricaoCertificado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    emissor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dataEmissao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dataVencimento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'PortfolioBadge',
    tableName: 'badge',
    timestamps: false,
});
exports.default = PortfolioBadge;
