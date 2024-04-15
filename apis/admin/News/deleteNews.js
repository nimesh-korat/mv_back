const connectDB = require("../../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteNews(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('news');

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const { newsId } = req.body;

        if (!ObjectId.isValid(newsId)) {
            return res.status(400).json({ success: false, message: "Invalid News ID!" });
        }

        const deletedNews = await collection.updateOne({ _id: ObjectId.createFromHexString(newsId) }, { $set: { status: "inactive" } });

        if (deletedNews.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "News not found!" });
        }

        return res.status(200).json({ success: true, message: "News deleted successfully" });
    } catch (error) {
        console.error("DeleteNews.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { DeleteNews };
