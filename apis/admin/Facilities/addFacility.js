const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddFacility(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('facilities');


        const { facilityName, facilityDesc } = req.body;
        const facilityPics = req.files.map(files => files.filename);

        if (req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images selected!" });
        }

        if (!facilityName || !facilityDesc) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            facilityName,
            facilityDesc,
            facilityPics,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Facility Added Successfully" });

    } catch (error) {
        console.error("AddFacility.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddFacility };