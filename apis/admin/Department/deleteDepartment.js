const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteDepartment(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('departments');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { departmentId } = req.body;

        if (!ObjectId.isValid(departmentId)) {
            return res.status(400).json({ success: false, message: "Invalid Department ID!" });
        }

        const deletedDepartment = await collection.updateOne({ _id: ObjectId.createFromHexString(departmentId) }, { $set: { status: "inactive" } });

        if (deletedDepartment.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "Department not found!" });
        }

        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        console.error("DeleteDepartment.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteDepartment };
