//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Livro from "../models/Livro";

const getAll = async (req, res) => {
  try {
    const livros = await Livro.findAll({
        include:['autor', 'categoria']
    });
    return res.status(200).send(livros);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;

    //garante que o id só vai ter NUMEROS;
    id = id.replace(/\D/g, '');
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para consulta'
      });
    }
    let livros = {}
    let livro = await Livro.findOne({
      where: {
        id
      },  
    include:['autor', 'categoria']
    });

    if (!livro) {
      return res.status(400).send({
        message: `Não foi encontrada livro com o id ${id}`
      });
    }

    return res.status(200).send(livro);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persistir = async (req, res) => {
  try {
    let { id } = req.params;
    //caso nao tenha id, cria um novo registro
    if (!id) {
      return await create(req.body, res)
    }

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  let {  titulo, sinopse, emprestado, idAutor, idCategoria } = dados;

  // let livroExistente = await Livro.findOne({
  //   where: {
      
  //   }
  // });

  // if (livroExistente) {
  //   return res.status(400).send({
  //     message: 'Já existe um livro cadastrado com esse id'
  //   })
  // }

  let livro = await Livro.create({
    titulo, sinopse, emprestado, idAutor, idCategoria

  });
  return res.status(201).send(livro)
}

const update = async (id, dados, res) => {
  let { titulo, sinopse, emprestado, idAutor, idCategoria } = dados;
  let livro = await Livro.findOne({
    where: {
      id
    }
  });

  if (!livro) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrada livro com o id ${id}` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => livro[field] = dados[field]);

  await livro.save();
  return res.status(200).send({
    message: `livro ${id} atualizado com sucesso`,
    data: livro
  });
}

const deletar = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;//toString
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para deletar o livro'
      });
    }

    let livro = await Livro.findOne(
    {
      where: {
        id
      }

   

    });

    if (!livro) {
      return res.status(400).send({ message: `Não foi encontrado livro com o id ${id}` })
    }

    await livro.destroy();
    return res.status(200).send({
      message: `Livro id ${id} deletado com sucesso`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}


export default {
  getAll,
  getById,
  persistir,
  deletar
};