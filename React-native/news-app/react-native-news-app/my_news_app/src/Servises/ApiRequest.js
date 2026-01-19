import React from 'react'
import axios from 'axios'

const ApiRequest =  async (options) => {
    const apiRequest = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    })

    try{
        const response = await apiRequest(options)
        return response.data
    }catch(error){
       return Promise.reject(error.response);
    }
}

export default ApiRequest