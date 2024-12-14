const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ShoopModel = require('../src/models/productModel');
const { JWT_SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = require('../src/constant/constant');
const jwt = require('jsonwebtoken');

const bodyparser = require('body-parser');


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, category, new_price, old_price, sizes } = req.body;
        let image_filename = `${req.file.filename}`

        const productData = {
            name,
            category,
            new_price: Number(new_price),
            old_price: Number(old_price),
            image: image_filename,
            sizes: JSON.parse(sizes),
            date: Date.now()
        }

        const product = new ShoopModel(productData)

        await product.save()
        res.json({ success: true, message: `Product ${req.body.name} added successfully` })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error :success', });
    }
})

router.get("/list", async (req, res) => {
    try {
        const products = await ShoopModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
})

router.post("/remove-product", async (req, res) => {
    try {
        const products = await ShoopModel.findById(req.body.id);
        fs.unlink(`uploads/${products.image}`, () => { })

        await ShoopModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Success Deelete product" })
    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting" })
    }
})

router.get("/list/:id", async (req, res) => {
    try {
        const product = await ShoopModel.findById(req.params.id)

        res.json({ success: true, product });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
})

module.exports = router