const connectDB = require("../../db/dbConnect");

async function GetActivity(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("activity");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const activity = await collection.find({ status: "active" }).toArray();

        if (activity.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Activity not found" });
        }

        res.status(200).json({
            activity,
            success: true,
            message: "Activity fetched Successfully",
        });

    } catch (error) {
        console.log("GetActivity.js: ", error);
        res.status(500).json({ success: false, message: "Activity fetch Failed" });
    }
}

module.exports = { GetActivity };