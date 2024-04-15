const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteGalleryImg(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('gallery');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { imgId } = req.body;

        if (!ObjectId.isValid(imgId)) {
            return res.status(400).json({ success: false, message: "Invalid Image ID!" });
        }

        const deletedImgs = await collection.updateOne({ _id: ObjectId.createFromHexString(imgId) }, { $set: { status: "inactive" } });

        if (deletedImgs.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Image not found!" });
        }

        return res.status(200).json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("DeleteGalleryImg.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteGalleryImg };
