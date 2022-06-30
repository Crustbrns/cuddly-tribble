const Product = require('../../models/Product')

class adminController {
    async createProduct(req, res) {
        const { Title, Price, Discount, ImageUrl,
            Description, Type, Genetics, IsHit,
            IsInStock } = req.body

        var isHit = IsHit == true;
        var isInStock = IsInStock == true;

        const product = new Product({
            Title: Title,
            Price: Price,
            Discount: Discount,
            ImageUrl: ImageUrl,
            Description: Description,
            Type: Type,
            Genetics: Genetics,
            IsHit: isHit,
            IsInStock: isInStock
        })

        await product.save()
        res.redirect('/admin')
    }

    async updateProductById(req, res) {
        const { Title, Price, ImageUrl,
            Description, Type, Genetics, IsHit,
            IsInStock } = req.body

        var isHit = IsHit == true;
        var isInStock = IsInStock == true;

        const { productId } = req.params

        console.log(Title)
        console.log(productId)

        await Product.replaceOne({ _id: productId }, {
            Title: Title,
            Price: Price,
            Discount: 0,
            ImageUrl: ImageUrl,
            Description: Description,
            Type: Type,
            Genetics: Genetics,
            IsHit: isHit,
            IsInStock: isInStock
        })

        res.redirect('/admin')
    }
}

module.exports = new adminController()