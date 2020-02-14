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
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})

server.delete('/api/users/:id', (req, res) => {
    users.findById(req.params.id)
    .then(user => {
        if (user) {
            Users.remove(req.params.id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The user could not be removed" })
            })
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    
})

server.post('/api/users', (req, res) => {
    if (req.body.name && req.body.bio) {
        Users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
})

server.put('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            if (req.body.name && req.body.bio) {
                Users.update(req.params.id, req.body)
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "The user information could not be modified." })
                })
            }
            else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            }
        }
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
})

server.listen(port, () => console.log(`Everything is awesome on port ${port}`))

