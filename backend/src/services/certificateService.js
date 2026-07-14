const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Enrollment = require("../models/Enrollment");
const ApiError = require("../utils/ApiError");

const certificatesPath = path.join(
    __dirname,
    "../../uploads/certificates"
);

if (!fs.existsSync(certificatesPath)) {
    fs.mkdirSync(certificatesPath, { recursive: true });
}

const generateCertificateService = async (enrollmentId, studentId) => {
    const enrollment = await Enrollment.findById(enrollmentId)
        .populate("student", "name email")
        .populate("course", "title instructor");

    if (!enrollment) {
        throw new ApiError(404, "Enrollment not found.");
    }

    if (enrollment.student._id.toString() !== studentId.toString()) {
        throw new ApiError(403, "Access denied.");
    }

    if (!enrollment.completed) {
        throw new ApiError(
            400,
            "You must complete the course before downloading the certificate."
        );
    }

    const fileName = `certificate-${enrollmentId}.pdf`;
    const filePath = path.join(certificatesPath, fileName);

    // Generate PDF
    await new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            layout: "landscape",
            size: "A4",
            margin: 0,
        });

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Background
        doc.rect(0, 0, pageWidth, pageHeight).fill("#ffffff");

        // Purple border
        doc.rect(20, 20, pageWidth - 40, pageHeight - 40)
            .lineWidth(3)
            .stroke("#6c63ff");

        // Inner border
        doc.rect(30, 30, pageWidth - 60, pageHeight - 60)
            .lineWidth(1)
            .stroke("#d0ccff");

        // Header background strip
        doc.rect(0, 0, pageWidth, 100).fill("#6c63ff");

        // Header text
        doc.fillColor("#ffffff")
            .fontSize(36)
            .font("Helvetica-Bold")
            .text("LearnHub", 0, 30, {
                align: "center",
            });

        // Certificate of Completion
        doc.fillColor("#6c63ff")
            .fontSize(26)
            .font("Helvetica-Bold")
            .text("Certificate of Completion", 0, 120, {
                align: "center",
            });

        // Divider line
        doc.moveTo(100, 165)
            .lineTo(pageWidth - 100, 165)
            .lineWidth(1)
            .stroke("#6c63ff");

        // This is to certify
        doc.fillColor("#555555")
            .fontSize(14)
            .font("Helvetica")
            .text("This is to certify that", 0, 185, {
                align: "center",
            });

        // Student name
        doc.fillColor("#222222")
            .fontSize(32)
            .font("Helvetica-Bold")
            .text(enrollment.student.name, 0, 210, {
                align: "center",
            });

        // Has successfully completed
        doc.fillColor("#555555")
            .fontSize(14)
            .font("Helvetica")
            .text("has successfully completed the course", 0, 260, {
                align: "center",
            });

        // Course title
        doc.fillColor("#6c63ff")
            .fontSize(22)
            .font("Helvetica-Bold")
            .text(enrollment.course.title, 0, 285, {
                align: "center",
            });

        // Divider
        doc.moveTo(100, 330)
            .lineTo(pageWidth - 100, 330)
            .lineWidth(1)
            .stroke("#dddddd");

        // Date
        const completionDate = new Date(
            enrollment.updatedAt
        ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        doc.fillColor("#777777")
            .fontSize(12)
            .font("Helvetica")
            .text(`Date of Completion: ${completionDate}`, 0, 350, {
                align: "center",
            });

        // Certificate ID
        doc.fillColor("#aaaaaa")
            .fontSize(10)
            .text(`Certificate ID: ${enrollmentId}`, 0, 375, {
                align: "center",
            });

        doc.end();

        stream.on("finish", resolve);
        stream.on("error", reject);
    });

    return {
        fileName,
        filePath,
        url: `/uploads/certificates/${fileName}`,
    };
};

module.exports = {
    generateCertificateService,
};