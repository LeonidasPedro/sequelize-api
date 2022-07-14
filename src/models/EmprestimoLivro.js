import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import Emprestimo from "./Emprestimo";
import Livro from "./Livro";

const EmprestimoLivro = sequelize.define(
  'emprestimo_livros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // idEmprestimo: {
    //   type: DataTypes.INTEGER,
    //   field: 'id_emprestimo',
    //   allowNull: false,
    //   references: {
    //     model: Emprestimo,
    //     key: 'id'
    //   }
    // },
    // idLivro: {
    //   type: DataTypes.INTEGER,
    //   field: 'id_emprestimo',
    //   allowNull: false,
    //   references: {
    //     model: Livro,
    //     key: 'id'
    //   }
    // }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Emprestimo.belongsToMany(Livro, { 
  through: EmprestimoLivro,
  as: 'emprestimo',
  foreignKey: {
    name: 'idLivro',
    allowNull: false,
    field: 'id_livro'
  } 
});

Livro.belongsToMany(Emprestimo, { 
  through: EmprestimoLivro,
  as: 'livro',
  foreignKey: {
    name: 'idEmprestimo',
    allowNull: false,
    field: 'id_emprestimo'
  }
});

export default EmprestimoLivro;