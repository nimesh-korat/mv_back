const connectDB = require("../../db/dbConnect");

async function GetFacility(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("facilities");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const facilities = await collection.find({status: "active"}).toArray();

        if (facilities.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Facilities not found" });
        }

        res.status(200).json({
            facilities,
            success: true,
            message: "Facilities fetched Successfully",
        });

    } catch (error) {
        console.log("GetFacility.js: ", error);
        res.status(500).json({ success: false, message: "facilities fetch Failed" });
    }
}

module.exports = { GetFacility };