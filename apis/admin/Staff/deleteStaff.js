const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteStaff(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('staff');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { staffId } = req.body;

        if (!ObjectId.isValid(staffId)) {
            return res.status(400).json({ success: false, message: "Invalid Staff ID!" });
        }

        const deletedStaff = await collection.updateOne({ _id: ObjectId.createFromHexString(staffId) }, { $set: { status: "inactive" } });

        if (deletedStaff.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Staff not found!" });
        }

        return res.status(200).json({ success: true, message: "Staff deleted successfully" });
    } catch (error) {
        console.error("DeleteStaff.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteStaff };
