import axios from 'axios'

// http://localhost:5001/api/admin/orders


export const getOrdersAdmin = async (token) => {
    // code body
    return axios.get('http://localhost:5001/api/admin/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}