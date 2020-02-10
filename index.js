// implement your API here
const express = require('express')
const Users = require('./data/db')

const server = express()

const port = 5000

server.use(express.json())

server.get('/', (req, res) => {
    res.send('online.')
})

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
})

server.listen(port, () => console.log(`Everything is awesome on port ${port}`))