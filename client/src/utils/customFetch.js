import axios from 'axios'


// create custom url with axios ...
const customFetch = axios.create({
    baseURL: '/api/v1'
})

export default customFetch