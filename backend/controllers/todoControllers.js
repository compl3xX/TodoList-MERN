const todoModel = require('../models/todoModel')


const showTodo = async (req, res) => {
  const notes = await todoModel.find({})
  res.send(notes)
}

const addTodo = async (req, res) => {

  try {

    const { id, title, content } = req.body;

    const newNote = await todoModel.create({ id, title, content });

    res.send(newNote)

  } catch (error) {
    res.send(error)             // unique title error , req title and content error
  }

}

const delTodo = async (req, res) => {

  const todoId = req.params.id;

  const { deleteType } = req.query



  console.log(todoId, deleteType)

  try {

    if (deleteType === '1') {
      const todo = await todoModel.findOneAndDelete({ id: todoId })
      res.send(todo)
    }

    else if (deleteType === '2') {

      const todo = await todoModel.deleteMany({ isDone: true })
      res.send(todo)

    }

  } catch (error) {
    res.send(error)
  }

}

const updateTodo = async (req, res) => {

  const todoId = req.params.id;

  console.log(typeof (todoId))

  try {

    if (todoId === "1") {

      const { body } = req

      const updateObj = {}

      console.log('it is working')

      if (body.hasOwnProperty('content')) {
        updateObj.content = body.content
      }
      if (body.hasOwnProperty('title')) {
        updateObj.title = body.title
      }
      if (body.hasOwnProperty('isDone')) {
        updateObj.isDone = body.isDone
      }

      const todo = await todoModel.findOneAndUpdate({ id: body.id }, updateObj)

      res.send(todo)

    }

    else if (todoId === "2") {
      const { body } = req
      const todos = await todoModel.updateMany({ isDone: false }, body)
      res.send(todos)
    }

  } catch (error) {
    res.send(error)
  }

}

module.exports = { showTodo, addTodo, delTodo, updateTodo }