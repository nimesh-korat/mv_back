const connectDB = require("../../db/dbConnect");

async function GetDepartment(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("departments");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const department = await collection.find({status: "active"}).toArray();

        if (department.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Department not found" });
        }

        res.status(200).json({
            department,
            success: true,
            message: "Department fetched Successfully",
        });

    } catch (error) {
        console.log("GetDepartment.js: ", error);
        res.status(500).json({ success: false, message: "department fetch Failed" });
    }
}

module.exports = { GetDepartment };