const express = require('express')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

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

const app = express()

app.use(express.static('dist'))

app.use(express.json())

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res), 'ms',
        tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))

app.get('/info', (request, response) => {
    ret = (
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
    )
    response.send(ret)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const getRandomPositiveInt = () => {
    return Math.floor((Math.random() * (Number.MAX_SAFE_INTEGER - 0 + 1) + 0))
}

const isDupliciteName = name => {
    return persons.find(p => p.name === name) !== undefined
}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!(body.name && body.number)) {
        response.status(400).json({
            error: "Missing name or number"
        })
        return
    }

    if (isDupliciteName(body.name)) {
        response.status(409).json({
            error: "Name must be unique"
        })
        return
    }

    const newPerson = {
        id: String(getRandomPositiveInt()),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).json({
            error: "Not Found"
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        persons = persons.filter(p => p.id !== id)
        response.status(204).end()
        console.log(`Deleted ${person.name}`)
        return
    } else {
        response.status(404).json({
            error: "Not Found"
        })
    }
})

app.listen(PORT)
console.log(`Server listening on port ${PORT}`);

