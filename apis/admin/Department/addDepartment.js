const { Timestamp } = require("mongodb");
const connectDB = require("../../../db/dbConnect");

async function AddDepartment(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('departments');

        const { departmentName, details  } = req.body;
        const image = req.file.filename;

        if (!departmentName || !details || !image) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            departmentName,
            details,
            image,
            status: "active",
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Department Added Successfully" });

    } catch (error) {
        console.error("AddDepartment.js:", error);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddDepartment };