const connectDB = require("../../db/dbConnect");

async function GetStaff(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("staff");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const staff = await collection.find({status: "active"}).toArray();

        if (staff.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Staff not found" });
        }

        res.status(200).json({
            staff,
            success: true,
            message: "Staff fetched Successfully",
        });

    } catch (error) {
        console.log("GetStaff.js: ", error);
        res.status(500).json({ success: false, message: "staff fetch Failed" });
    }
}

module.exports = { GetStaff };