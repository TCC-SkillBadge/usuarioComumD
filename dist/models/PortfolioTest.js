"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
});
class PortfolioTest extends sequelize_1.Model {
}
PortfolioTest.init({
    idTeste: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    tituloTeste: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descricaoTeste: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    notaTeste: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dtRealizacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PortfolioTest',
    tableName: 'testec_softskill',
    timestamps: false,
});
exports.default = PortfolioTest;
