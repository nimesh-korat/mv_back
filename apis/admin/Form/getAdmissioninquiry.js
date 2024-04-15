const connectDB = require("../../../db/dbConnect");

async function GetAdmissionInquiry(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("admissionInquiry");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const addmissionInquiry = await collection.find().toArray();

        if (addmissionInquiry.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Admission Inquiry not found" });
        }

        res.status(200).json({
            addmissionInquiry,
            success: true,
            message: "Admission Inquiry fetched Successfully",
        });

    } catch (error) {
        console.log("GetAdmissionInquiry.js: ", error);
        res.status(500).json({ success: false, message: "Admission Inquiry fetch Failed" });
    }
}

module.exports = { GetAdmissionInquiry };