const Product = require('../models/product')



const getAllProductsStatic = async (req, res) => {  
    const products = await Product.find({
         featured: true,
         name: 'vase table'
         })
    res.status(200).json({ count: products.length, products: products })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'products route 🚗' })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}