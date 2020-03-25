const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User

const { authenticated } = require('../config/auth')
router.all('*', authenticated)

// show all todos
router.get('/', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(err => {
      return console.error(err)
    })
})
// create todo page
router.get('/new', (req, res) => {
  return res.render('new')
})
// get one todo
router.get('/:id', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found");

      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.render('detail', { todo: todo.get() }) })
    .catch((error) => { return res.status(422).json(error) })
})
// create todo
router.post('/', (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then((todo) => {
      return res.redirect('/todos')
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})
// update todo page
router.get('/:id/edit', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((todo) => { return res.render('edit', { todo: todo.get() }) })
})
// update todo
router.put('/:id', (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.name = req.body.name
      todo.done = req.body.done === "on"

      return todo.save()
    })
    .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
    .catch((error) => { return res.status(422).json(error) })
})
// delete todo
router.delete('/:id', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router
