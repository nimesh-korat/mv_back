const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddStaff(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('staff');


        const { name, designation, about, dateOfJoining } = req.body;
        const staffPic = req.file.filename;

        if (!staffPic || !name || !designation || !about || !dateOfJoining) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            name,
            designation,
            about,
            staffPic,
            dateOfJoining: new Date(dateOfJoining),
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Staff Added Successfully" });

    } catch (error) {
        console.error("AddStaff.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddStaff };