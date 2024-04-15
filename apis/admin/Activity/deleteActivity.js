const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteActivity(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('activity');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { videoId } = req.body;

        if (!ObjectId.isValid(videoId)) {
            return res.status(400).json({ success: false, message: "Invalid Activity ID!" });
        }

        const deletedActivity = await collection.updateOne({ _id: ObjectId.createFromHexString(videoId) }, { $set: { status: "inactive" } });

        if (deletedActivity.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Activity not found!" });
        }

        return res.status(200).json({ success: true, message: "Activity deleted successfully" });
    } catch (error) {
        console.error("DeleteActivity.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteActivity };
