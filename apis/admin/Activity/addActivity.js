const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddActivity(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('activity');

        const activityVideo = req.file.filename;

        if (!activityVideo) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }
        await collection.insertOne({
            activityVideo,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Activity Added Successfully" });

    } catch (error) {
        console.error("AddActivity.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddActivity };