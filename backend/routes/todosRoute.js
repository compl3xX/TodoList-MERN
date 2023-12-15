const express = require('express')
const router = express.Router()

const { showTodo, addTodo, delTodo, updateTodo } = require('../controllers/todoControllers')

router.get('/api/showtodo', showTodo)
router.post('/api/addtodo', addTodo)
router.delete('/api/deltodo/:id', delTodo)
router.put('/api/updatetodo/:id', updateTodo)

module.exports = router