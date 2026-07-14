const express = require("express");
const { downloadCertificate } = require("../controllers/certificateController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Download Certificate
router.get(
    "/:enrollmentId",
    authMiddleware,
    downloadCertificate
);

module.exports = router;