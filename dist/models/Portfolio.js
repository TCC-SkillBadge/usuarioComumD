"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
});
class Portfolio extends sequelize_1.Model {
}
Portfolio.init({
    codigoPortfolio: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: 'Portfolio',
    tableName: 'portfolio',
    timestamps: false,
});
exports.default = Portfolio;
