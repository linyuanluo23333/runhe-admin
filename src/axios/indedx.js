import axios from "axios"

export const url = "http://81.68.121.52:8000/"

export default axios.create ({
    baseURL: url,
    timeout:5000
})