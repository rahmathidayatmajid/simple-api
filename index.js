const express = require('express')
    , app = express()
    , dotenv = require('dotenv')
    , createError = require('http-errors')
    , cors = require('cors')
    , router = express.Router()
    , Products = require('./product.json')
    , Categories = require('./category.json')

app.use(cors());
app.use((express.json()));
app.use("/api/v1", router);

dotenv.config();
const port = process.env.PORT || 7010
    , env = process.env.NODE_ENV || 'development'

app.use( express.urlencoded({ extended: true}) );
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Playground API"
    });
});

router.get("/products-list"), (req, res) => {
    const result = [];
    Products.forEach((product) => {
        const category = Categories.filter((val) => val ['id'] === product['category']);
        product['category'] = !category ? product[category] : category[0];
        result.push(product);
    });

    return res.status(200).json({ success: true, data: result });
};

// router.post("/product/new"), (req, res) => {
//     const { name = null, price = 0, category = null; qty = 0 } = req.
// }

try {
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} and listening on port ${port}`)
    });
}catch(e){
    const errorMessage = `Failed to connect to port, error: ${e.message}`;
}