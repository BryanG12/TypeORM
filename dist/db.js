"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDateSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDateSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.CONNECTION_TYPEORM_HOST,
    username: process.env.CONNECTION_TYPEORM_USERNAME,
    password: process.env.CONNECTION_TYPEORM_PASSWORD,
    port: Number(process.env.CONNECTION_TYPEORM_PORT),
    database: process.env.CONNECTION_TYPEORM_DATABASE,
    entities: [User_1.User],
    logging: true,
    synchronize: true,
});
