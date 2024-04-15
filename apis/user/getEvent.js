const connectDB = require("../../db/dbConnect");

async function GetEvent(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("events");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const events = await collection.find({ status: "active" }).toArray();

        if (events.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Events not found" });
        }

        res.status(200).json({
            events,
            success: true,
            message: "Events fetched Successfully",
        });

    } catch (error) {
        console.log("GetEvent.js: ", error);
        res.status(500).json({ success: false, message: "Events fetch Failed" });
    }
}

module.exports = { GetEvent };