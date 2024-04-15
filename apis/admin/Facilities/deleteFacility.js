const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteFacility(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('facilities');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { facilitiesId } = req.body;

        if (!ObjectId.isValid(facilitiesId)) {
            return res.status(400).json({ success: false, message: "Invalid Facility ID!" });
        }

        const deletedFacilities = await collection.updateOne({ _id: ObjectId.createFromHexString(facilitiesId) }, { $set: { status: "inactive" } });

        if (deletedFacilities.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Facility not found!" });
        }

        return res.status(200).json({ success: true, message: "Facility deleted successfully" });
    } catch (error) {
        console.error("DeleteFacility.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteFacility };
