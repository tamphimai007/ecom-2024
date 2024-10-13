import axios from 'axios'

export const createProduct = async (token, form) => {
    // code body
    return axios.post('http://localhost:5001/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (token, count = 20) => {
    // code body
    return axios.get('http://localhost:5001/api/products/'+count, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const uploadFiles = async (token, form) => {
    // code 
    // console.log('form api frontent', form)
    return axios.post('http://localhost:5001/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

