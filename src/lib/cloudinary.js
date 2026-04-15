import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

/**
 * Upload a buffer to Cloudinary.
 * @param {Buffer} buffer
 * @param {{folder?: string, publicId?: string, resourceType?: string}} opts
 * @returns {Promise<{url: string, publicId: string, width?: number, height?: number, format?: string, bytes?: number}>}
 */
export function uploadBuffer(buffer, opts = {}) {
    const { folder = "cop", publicId, resourceType = "image" } = opts
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, public_id: publicId, resource_type: resourceType, overwrite: true },
            (err, result) => {
                if (err) return reject(err)
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    bytes: result.bytes,
                })
            }
        )
        stream.end(buffer)
    })
}

/**
 * Delete a Cloudinary asset by public_id.
 */
export async function deleteAsset(publicId, resourceType = "image") {
    if (!publicId) return { result: "skipped" }
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

export default cloudinary
