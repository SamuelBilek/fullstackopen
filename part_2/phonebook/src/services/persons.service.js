import axios from 'axios'

const URL = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios
        .get(URL)
        .then(response => response.data)
}

const createPerson = (newPerson) => {
    return axios
      .post(URL, newPerson)
      .then(response => response.data)
}

const updatePerson = (id, person) => {
    return axios
        .put(`${URL}/${id}`, person)
        .then(response => response.data)
}

const deletePerson = id => {
    return axios.delete(`${URL}/${id}`)
} 

export default { getAllPersons, createPerson, updatePerson, deletePerson }