const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todos')

const PORT = 8000
const app = express()

app.use(express.json())



// GET all todos
app.get('/api/all', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.json(todos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// ADD todo
app.post('/api/add', async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({ error: 'Title is required' })
        }

        const todo = new Todo({ title, description })
        const savedTodo = await todo.save()

        res.status(201).json(savedTodo)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE todo
app.delete('/api/delete/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        res.json({ msg: 'The todo is deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
