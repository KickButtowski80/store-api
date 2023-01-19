const Product = require('../models/product')
 


const getAllProductsStatic = async (req, res) => {
    const search = 'a'
    // const products = await Product.find({
    //     featured: true,
    //     name: { $regex: search, $options: 'i' }
    // })
    // const products = await Product.find({}).sort('-name price')
    const products = await Product.find({})
    .sort('name')
    .select('name price')
    .skip(5)
    .limit(5)
  
    res.status(200).json({ count: products.length, products: products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    
    let result = Product.find(queryObject)

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if (fields) {
        const feildList = fields.split(',').join(' ')
        result = result.select(feildList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result;
    res.status(200).json({ count: products.length, products: products })

}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}