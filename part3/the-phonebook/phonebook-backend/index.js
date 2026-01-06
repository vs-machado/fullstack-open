require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const Contact = require('./models/contact')
const { default: mongoose } = require('mongoose')

const app = express()
app.use(express.json())

morgan.token('req-body', (req) => JSON.stringify(req.body))
const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms :req-body')

app.use(morganFormat)
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(person)

    if (!person.name || !person.number) {
        return response.status(400).json({ 
            error: 'Name and number information are mandatory' 
        })
    }

    const contact = new Contact({
        name: person.name,
        number: person.number
    })
    contact.save().then((result) => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(!person) {
        response.status(404).end()
        return
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const peopleCount = persons.length
    const date = Date().toString()
    response.send(
        `<p>Phonebook has info for ${peopleCount} people</p><p>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})