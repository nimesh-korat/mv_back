const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddNews(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('news');

        const newsPic = req.file.filename;

        if (!newsPic) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            newsPic,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "News Added Successfully" });

    } catch (error) {
        console.error("AddNews.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddNews };