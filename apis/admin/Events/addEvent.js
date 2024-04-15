const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddEvent(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('events');

        const { eventName, eventDesc, dateOfEvent } = req.body;
        const eventImgs = req.files.map(files => files.filename);

        if (!eventName || !eventDesc || !dateOfEvent) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        if (req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images selected!" });
        }

        await collection.insertOne({
            eventName,
            eventDesc,
            dateOfEvent: new Date(dateOfEvent),
            eventImgs,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Event Added Successfully" });

    } catch (error) {
        console.error("AddEvent.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddEvent };