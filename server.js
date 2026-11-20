const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");
const app = express();

const PORT = 3000;
const URL = "http://localhost:3000"; // replace with your own!!!

function generateFileName(length, originalFileName) {
    const generatedBytes = crypto.randomBytes(length).toString('hex');
    const fileExtension = path.extname(originalFileName) // i used .slice() and lastIndexOf before realizing path had this feature

    return generatedBytes + fileExtension;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const generatedFileName = generateFileName(16, file.originalname);
        cb(null, generatedFileName);
    }
});

const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }, fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Unsupported File Type"));
        }
    }
});

const uploadLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many uploads. Try again later."
});

app.use(helmet());
app.use(express.static(path.join(__dirname, "public/")));

app.post('/memes', uploadLimiter, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    };

    const generatedFileName = req.file.filename;

    res.send(`<h1>Meme uploaded successfully</h1><p>File name: ${generatedFileName}</p><a href="${URL}/uploads/${generatedFileName}">Open Meme</a>`);
    console.log(req.file);
});

app.listen(PORT, () => {
    console.log("Server's running")
});