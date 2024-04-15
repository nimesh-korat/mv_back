const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddGalleryImg(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('gallery');

        const imageName = req.file.filename;

        if (!imageName) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            imageName,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Image Added Successfully" });

    } catch (error) {
        console.error("AddGalleryImg.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddGalleryImg };