const connectDB = require("../../db/dbConnect");

async function GetNews(req, res) {

    try {
        const db = await connectDB();
        const collection = db.collection("news");

        // const userId = req.session.user;
        // if (!userId) {
        //     return res.status(401).json({ success: false, message: "Unauthorized User!" });
        // }

        const news = await collection.find({status: "active"}).toArray();

        if (news.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "News not found" });
        }

        res.status(200).json({
            news,
            success: true,
            message: "News fetched Successfully",
        });

    } catch (error) {
        console.log("GetNews.js: ", error);
        res.status(500).json({ success: false, message: "News fetch Failed" });
    }
}

module.exports = { GetNews };