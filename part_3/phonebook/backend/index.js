require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const PORT = process.env.PORT

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
    Person.find({}).then(persons => {
      ret = (
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
        )
        response.send(ret)  
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!(body.name && body.number)) {
        response.status(400).json({
            error: "Missing name or number"
        })
        return
    }
    Person.find({}).then(persons => {
        if (persons.find(p => p.name === body.name) !== undefined) {
            response.status(409).json({
                error: "Name must be unique"
            })
            return
        }

        const newPerson = new Person({
            name: body.name,
            number: body.number
        })

        newPerson.save().then(savedPerson => {
            response.json(savedPerson)
        })
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                response.status(404).end()
            }
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                response.status(404).end()
            }

            const {name, number} = request.body
            person.name = name
            person.number = number

            person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next()
}

app.use(errorHandler)

app.listen(PORT)
console.log(`Server listening on port ${PORT}`);

