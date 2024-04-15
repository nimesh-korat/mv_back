const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const session = require("express-session");
const { AddAdmissionInquiry } = require("./apis/user/addAdmissionInquiry");
const { GetAdmissionInquiry } = require("./apis/admin/Form/getAdmissioninquiry");
const { GetContactUs } = require("./apis/admin/Form/getContactUs");
const { AddContactUs } = require("./apis/user/addContactsUs");
const { AddNews } = require("./apis/admin/News/AddNews");
const { newsPicUpload, staffPicUpload, facilityPicUpload, galleryPicUpload, departmentPicUpload, eventPicUpload, activityPicUpload } = require("./multer/multer");
const { DeleteNews } = require("./apis/admin/News/deleteNews");
const { GetNews } = require("./apis/user/getNews");
const { GetStaff } = require("./apis/user/getStaff");
const { AddStaff } = require("./apis/admin/Staff/addStaff");
const { DeleteStaff } = require("./apis/admin/Staff/deleteStaff");
const { AddFacility } = require("./apis/admin/Facilities/addFacility");
const { DeleteFacility } = require("./apis/admin/Facilities/deleteFacility");
const { GetFacility } = require("./apis/user/getFacility");
const { AddGalleryImg } = require("./apis/admin/Gallery/addGalleryImg");
const { DeleteGalleryImg } = require("./apis/admin/Gallery/deleteGalleryImg");
const { GetGalleryImg } = require("./apis/user/getGalleryImg");
const { AddDepartment } = require("./apis/admin/Department/addDepartment");
const { DeleteDepartment } = require("./apis/admin/Department/deleteDepartment");
const { GetDepartment } = require("./apis/user/getDepartment");
const { GetEvent } = require("./apis/user/getEvent");
const { AddEvent } = require("./apis/admin/Events/addEvent");
const { DeleteEvent } = require("./apis/admin/Events/deleteEvent");
const { GetActivity } = require("./apis/user/getActivity");
const { AddActivity } = require("./apis/admin/Activity/addActivity");
const { DeleteActivity } = require("./apis/admin/Activity/deleteActivity");
const { LoginApi } = require("./apis/admin/login");
const Logout = require("./apis/admin/logout");
const Session = require("./apis/admin/session");
const { UpdateCredentials } = require("./apis/admin/updateCredentials");
const { GetCounts } = require("./apis/admin/getCounts");
require('dotenv').config();

//initialize app
const app = express();

//initialize PORT No
const PORTS = 8001;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Configure express-session middleware
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true
// }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            // sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 //oneDay
        }
    })
);

app.use("/images/newsPics", express.static("images/newsPics"));
app.use("/images/staffPics", express.static("images/staffPics"));
app.use("/images/activityPics", express.static("images/activityPics"));
app.use("/images/departmentPics", express.static("images/departmentPics"));
app.use("/images/eventPics", express.static("images/eventPics"));
app.use("/images/facilityPics", express.static("images/facilityPics"));
app.use("/images/galleryPics", express.static("images/galleryPics"));

//callback to connect MongoDB
connectDB();

//! Admin APIs

//? Counts
app.post('/getCounts', GetCounts);

//? Authentication
app.post('/login', LoginApi);
app.post('/logout', Logout);
app.post('/session', Session);
app.post('/updateCredentials', UpdateCredentials);

//? Inquiries
app.post('/getAdmissioninquiry', GetAdmissionInquiry);
app.post('/getContactUs', GetContactUs);

//? News
app.post('/addNews', newsPicUpload.single('newsPic'), AddNews);
app.post('/deleteNews', DeleteNews);

//? Staff
app.post('/addStaff', staffPicUpload.single('staffPic'), AddStaff);
app.post('/deleteStaff', DeleteStaff);

//? Facility
app.post('/addFacility', facilityPicUpload.array('facilityPics', 3), AddFacility);
app.post('/deleteFacility', DeleteFacility);

//? Gallery
app.post('/addGallery', galleryPicUpload.single('imageName'), AddGalleryImg);
app.post('/deleteGallery', DeleteGalleryImg);

//? Department
app.post('/addDepartment', departmentPicUpload.single('image'), AddDepartment);
app.post('/deleteDepartment', DeleteDepartment);

//? Event
app.post('/addEvent', eventPicUpload.array('eventImgs', 5), AddEvent);
app.post('/deleteEvent', DeleteEvent);

//? Activity
app.post('/addActivity', activityPicUpload.single('activityVideo'), AddActivity);
app.post('/deleteActivity', DeleteActivity);

//! User APIs
app.post('/addAdmissionInquiry', AddAdmissionInquiry);
app.post('/addContactUs', AddContactUs);
app.post('/getNews', GetNews);
app.post('/getStaff', GetStaff);
app.post('/getFacility', GetFacility);
app.post('/getGallery', GetGalleryImg);
app.post('/getDepartment', GetDepartment);
app.post('/getEvent', GetEvent);
app.post('/getActivity', GetActivity);

//Activate Server
app.listen(process.env.PORT ||PORTS, () => {
    console.log("Server Started on port: ", PORTS);
});
