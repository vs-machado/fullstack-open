const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(person)

    if (!person.name || !person.number) {
        return response.status(400).json({ 
            error: 'Name and number information are mandatory' 
        })
    }

    const personDataAlreadyInserted = persons.some(item => item.name == `${person.name}`)
    if(personDataAlreadyInserted) {
        return response.status(400).json({ 
            error: 'This name was already inserted in the phonebook' 
        })
    }

    person.id = String(Math.floor(Math.random() * 100000))
    persons = persons.concat(person)

    response.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})