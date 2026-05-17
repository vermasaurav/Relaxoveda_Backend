const express = require("express");

const router = express.Router();

const Category = require("../models/category");


// ✅ ADD CATEGORY
router.post("/", async (req, res) => {

  try {

    const category = await Category.create({

      name: req.body.name,

    });

    res.status(201).json(category);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// ✅ GET ALL CATEGORIES
router.get("/", async (req, res) => {

  try {

    const categories =
      await Category.find();

    res.json(categories);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// ✅ DELETE CATEGORY
router.delete("/:id", async (req, res) => {

  await Category.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
});

module.exports = router;