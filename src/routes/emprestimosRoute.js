import controller from '../controllers/emprestimosController'

export default (app) => {
    app.post('/emprestimos/verificar-status', controller.status)
	app.post('/emprestimos/deletar', controller.deletar)
	app.get('/emprestimos', controller.getAll)
	app.get('/emprestimos/:id', controller.getById)
	app.post('/emprestimos', controller.persistir)
	app.post('/emprestimos/:id', controller.persistir)
   
}