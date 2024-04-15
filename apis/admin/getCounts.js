const connectDB = require("../../db/dbConnect");

async function GetCounts(req, res) {

    try {
        const db = await connectDB();
        const eventCollection = db.collection("events");
        const admissionCollection = db.collection("admissionInquiry");
        const contactUsCollection = db.collection("contactUs");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const doneEventCount = await eventCollection.countDocuments({ status: "active" });
        const admissionInquiryCount = await admissionCollection.countDocuments();
        const contactUsCount = await contactUsCollection.countDocuments();

        const counts = {
            doneEventCount,
            admissionInquiryCount,
            contactUsCount
        };

        res.status(200).json({
            counts,
            success: true,
            message: "Counts fetched Successfully",
        });

    } catch (error) {
        console.log("GetCounts.js: ", error);
        res.status(500).json({ success: false, message: "Counts fetch Failed" });
    }
}

module.exports = { GetCounts };