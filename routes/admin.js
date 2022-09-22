const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now

router.get("/", ensureAuth, postsController.getFeed);
router.get("/staff", postsController.getStaff);
router.post("/createStaff", authController.createStaff);

module.exports = router;