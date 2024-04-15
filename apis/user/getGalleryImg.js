const connectDB = require("../../db/dbConnect");

async function GetGalleryImg(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("gallery");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const galleryImgs = await collection.find({status: "active"}).toArray();

        if (galleryImgs.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Images not found" });
        }

        res.status(200).json({
            galleryImgs,
            success: true,
            message: "Images fetched Successfully",
        });

    } catch (error) {
        console.log("GetGalleryImg.js: ", error);
        res.status(500).json({ success: false, message: "Images fetch Failed" });
    }
}

module.exports = { GetGalleryImg };