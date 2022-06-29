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
        res.redirect('/')
    }
}

module.exports = new adminController()