//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Usuario from "../models/Usuario";

const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).send(usuarios);
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

    let usuario = await Usuario.findOne({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(400).send({
        message: `Não foi encontrada usuario com o id ${id}`
      });
    }

    return res.status(200).send(usuario);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persistir = async (req, res) => {
  try {
    let { id, nome, cpfcnpj, email, telefone } = req.params;
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
  let { id, nome,cpfcnpj, email, telefone } = dados;

  let usuarioExistente = await Usuario.findOne({
    where: {
      cpfcnpj
    }
  });

  if (usuarioExistente) {
    return res.status(400).send({
      message: 'Já existe um usuario cadastrado com esse cpf/cnpj'
    })
  }

  let usuario = await Usuario.create({
    nome, cpfcnpj, email, telefone

  });
  return res.status(201).send(usuario)
}

const update = async (id, dados, res) => {
  let { nome,cpfcnpj, email, telefone } = dados;
  let usuario = await Usuario.findOne({
    where: {
      id
    }
  });

  if (!usuario) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrada usuario com o id ${id}` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => usuario[field] = dados[field]);

  await usuario.save();
  return res.status(200).send({
    message: `usuario ${id} atualizado com sucesso`,
    data: usuario
  });
}

const deletar = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;//toString
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para deletar o usuario'
      });
    }

    let usuario = await Usuario.findOne({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(400).send({ message: `Não foi encontrado usuario com o id ${id}` })
    }

    await usuario.destroy();
    return res.status(200).send({
      message: `usuario id ${id} deletado com sucesso`
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