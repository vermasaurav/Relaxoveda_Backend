const express = require("express");

const router = express.Router();

const Advertise = require("../models/advertise");

const upload = require("../middleware/upload");


// ✅ ADD SINGLE IMAGE
router.post(
  "/",

  upload.single("image"),

  async (req, res) => {

    try {

      const advertise =
        await Advertise.create({

          image: req.file.path,

        });

      res.json(advertise);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ✅ GET ALL IMAGES
router.get("/", async (req, res) => {

  try {

    const images =
      await Advertise.find();

    res.json(images);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// ✅ DELETE IMAGE
router.delete("/:id", async (req, res) => {

  try {

    await Advertise.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;