"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = void 0;
exports.uploadToCloudinary = uploadToCloudinary;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadToCloudinary(fileBase64, options) {
    try {
        const res = await cloudinary_1.v2.uploader.upload(fileBase64, {
            folder: options?.folder || "uploads",
            public_id: options?.publicId,
        });
        return res.secure_url;
    }
    catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw new Error("Failed to upload image");
    }
}
const deleteFromCloudinary = async (url) => {
    try {
        const segments = url.split("/");
        const filename = segments.pop();
        const folder = segments.slice(segments.indexOf("upload") + 1, -1).join("/");
        const publicId = folder ? `${folder}/${filename?.split(".")[0]}` : filename?.split(".")[0];
        if (!publicId)
            return;
        await cloudinary_1.v2.uploader.destroy(publicId);
        console.log(`Deleted Cloudinary image: ${publicId}`);
    }
    catch (err) {
        console.warn("Failed to delete image from Cloudinary:", err);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
