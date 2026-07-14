const asyncHandler = require("../handlers/asyncHandler");
const { generateCertificateService } = require("../services/certificateService");
const fs = require("fs");

const downloadCertificate = asyncHandler(async (req, res) => {
    const { enrollmentId } = req.params;

    const { fileName, filePath } = await generateCertificateService(
        enrollmentId,
        req.user._id
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
    );

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

module.exports = {
    downloadCertificate,
};