import { Sequelize } from "sequelize";
import 'dotenv/config';
export const sequelize = new Sequelize(
    process.env.POSTGRESS_DB,
    process.env.POSTGRESS_USERNAME,
    process.env.POSTGRESS_PASSWORD,
    {
        host:process.env.POSTGRESS_HOST,
        dialect: 'postgres'
    }
);
