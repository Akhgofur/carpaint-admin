import axios from "axios"

// "http://api.ardotex.uz/"

export const baseUrl = "https://server.carpaint.uz/"

const instance = axios.create({
    baseURL: baseUrl + "api/v1/"
})

export default instance