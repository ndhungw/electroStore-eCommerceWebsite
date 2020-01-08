const Product = require('../models/productModel');

controller = {}

controller.displayProductListingPage = (req, res, next) => {
    res.render('pages/products/list', {
        title: 'Tất cả sản phẩm',
        paginatedResult: res.paginatedResults,
        products: res.paginatedResults.products,
        previousPage: res.paginatedResults.previous,
        currentPage: res.paginatedResults.current,
        nextPage: res.paginatedResults.next,
        totalPage: res.paginatedResults.totalPage,
    })
}

controller.displaySingleProductDetails = async (req, res) => {
    try {
        const product = await Product.getProduct(req.params.id);
        res.render('pages/products/details', { foundProduct: product });
    } catch (err) {
        console.log('Error in displaySingleProductDetails- ' + err)
    }
}

controller.displayProductListingByBrand = async (req, res) => {
    try {
        const product = await Product.getProductByBrand(req.params.brand);
        res.render('pages/products/brand-list',{title: 'Sản phẩm theo thương hiệu', brandProducts: product, brand: req.params.brand});
    } catch (err) {
        console.log();
    }
}
module.exports = controller