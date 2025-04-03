import express from 'express'
import { deleteTodo, getAllTodos, postTodo, putTodo } from '../controllers/todoController.js'

const router = express.Router()

router.post('/',postTodo)
router.delete('/:id',deleteTodo)
router.get('/',getAllTodos)
router.put('/:id',putTodo)

export default router;