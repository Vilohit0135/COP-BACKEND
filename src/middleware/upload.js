import multer from "multer"

const storage = multer.memoryStorage()

export const uploadImage = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        if (!/^image\/(jpe?g|png|webp|gif|svg\+xml|avif)$/i.test(file.mimetype)) {
            return cb(new Error("Only image files are allowed"))
        }
        cb(null, true)
    },
})
