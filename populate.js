require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('success 🙂 ...')
        console.log('exiting... 🚪')
        process.exit(0)
    } catch (error) {
        console.log(`error 🚑 ${error}`)
        process.exit(1)
    }
}

start()