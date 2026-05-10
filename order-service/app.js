const express = require('express')
const axios = require('axios')

const app = express()

app.get('/orders', async (req, res) => {

    try {

        const userResponse =
            await axios.get('http://user-service/users')

        const productResponse =
            await axios.get('http://product-service/products')

        res.json({
            message: 'Order Service Running',
            userService: userResponse.data,
            productService: productResponse.data
        })

    } catch (error) {

        res.status(500).send(error.message)
    }
})

app.listen(3002, () => {
    console.log('Order service running')
})
