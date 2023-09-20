const { Router } = require("express");
const { getArtworks } = require("../controllers/homepage");

const router = Router();

// GET artworks
router.get("/getartworks", getArtworks);

module.exports = router;