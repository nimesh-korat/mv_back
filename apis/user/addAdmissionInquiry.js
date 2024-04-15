const connectDB = require("../../db/dbConnect");

async function AddAdmissionInquiry(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("admissionInquiry");

        const { childName, childDOB, cClass, address, parentEmail, parentPhone, stream, gender } = req.body;

        if (!childName || !childDOB || !cClass || !address || !parentEmail || !parentPhone || !stream || !gender) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            childName,
            childDOB: new Date(childDOB),
            cClass,
            address,
            parentEmail,
            parentPhone,
            stream,
            gender,
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Admission Inquiry added successfully" });

    } catch (error) {
        console.error("AddAdmissionInquiry.js: ", error);
        return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddAdmissionInquiry };
