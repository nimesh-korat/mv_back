const connectDB = require("../../db/dbConnect");

async function AddContactUs(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("contactUs");

        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res
                .status(400)
                .json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date(),
        });

        return res
            .status(201)
            .json({ success: true, message: "Contact us added successfully" });

    } catch (error) {
        console.error("AddContactUs.js: ", error);
        return res
            .status(500)
            .json({ success: false, error: "Something went wrong" });
    }
}

module.exports = { AddContactUs };
