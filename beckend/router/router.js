const router = require("express").Router();
const shooperAddUpload = require('../controllers/shopperControler')
const userControler = require('../controllers/userControler');
const orderController = require('../controllers/orderController');
const cartController = require('../controllers/cartController');
const express = require('express');
const { authMiddleware } = require("../middleware/auth");
const { adminAuth } = require("../middleware/adminAuth");

router.use('/upload',shooperAddUpload);
router.use("/images", express.static('uploads'));
router.use("/user", userControler);
router.use("/shoop", authMiddleware, cartController);
router.use("/order", authMiddleware, orderController);



module.exports = router