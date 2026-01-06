require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const Contact = require('./models/contact')

const app = express()
app.use(express.json())

morgan.token('req-body', (req) => JSON.stringify(req.body))
const morganFormat = morgan(':method :url :status :res[content-length] - :response-time ms :req-body')

app.use(morganFormat)
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
    Contact.find({})
        .then(contacts => {
            response.json(contacts)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
    contact.save()
        .then((result) => {
            response.json(result)
        })
        .catch(error => next(error))
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

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = request.body
    Contact.findById(request.params.id)
        .then(contact => {
            if(!contact) {
                return response.status(404).end()
            }

            contact.name = person.name
            contact.number = person.number

            return contact.save().then((updatedContact)=> {
                response.json(updatedContact)
            })
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const peopleCount = persons.length
    const date = Date().toString()
    response.send(
        `<p>Phonebook has info for ${peopleCount} people</p><p>${date}</p>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    return response.status(500).send({ error: 'A server error occurred. Try again later.' })
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})