import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";


const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpfcnpj: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            
        },
        telefone: {
            type: DataTypes.STRING(16),
            
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'emprestado_em',
        updatedAt: 'updated_at'
    }
)

export default Usuario;

