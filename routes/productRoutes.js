const express = require("express");

const router = express.Router();

const Product = require("../models/product");

const upload = require("../middleware/upload");


// ✅ ADD PRODUCT
router.post(
  "/",
  upload.single("image"),

  async (req, res) => {

    try {

      console.log("BODY:", req.body);

      console.log("FILE:", req.file);

      const product = await Product.create({

        name: req.body.name,

        category: req.body.category,

        shortDesc: req.body.shortDesc,

        size: req.body.size,

        price: req.body.price,

        oldPrice: req.body.oldPrice,

        image: req.file.path,

      });

      res.status(201).json(product);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ✅ GET PRODUCTS
router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// ✅ UPDATE PRODUCT
router.put(
  "/:id",
  upload.single("image"),

  async (req, res) => {

    try {

      // 🌿 Find Product
      const product = await Product.findById(
        req.params.id
      );

      if (!product) {

        return res.status(404).json({
          message: "Product not found",
        });
      }

      // 🌿 Update Fields
      product.name =
        req.body.name || product.name;

      product.category =
        req.body.category ||
        product.category;

      product.shortDesc =
        req.body.shortDesc ||
        product.shortDesc;

      product.size =
        req.body.size || product.size;

      product.price =
        req.body.price || product.price;

      product.oldPrice =
        req.body.oldPrice ||
        product.oldPrice;

      // 🌿 Update Image If New Image Uploaded
      if (req.file) {

        product.image = req.file.path;
      }

      // 🌿 Save Updated Product
      const updatedProduct =
        await product.save();

      res.json(updatedProduct);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


router.get("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;