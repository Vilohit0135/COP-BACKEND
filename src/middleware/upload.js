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

const MEDIA_MIME = /^(image\/(jpe?g|png|webp|gif|svg\+xml|avif)|video\/(mp4|webm|quicktime|x-matroska|ogg)|application\/pdf)$/i

export const uploadMedia = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB (videos)
    fileFilter: (req, file, cb) => {
        if (!MEDIA_MIME.test(file.mimetype)) {
            return cb(new Error("Only image, video, or PDF files are allowed"))
        }
        cb(null, true)
    },
})
