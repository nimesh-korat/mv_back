const multer = require("multer");

//news pic storage
const newsPicStorage = multer.diskStorage({

    //path to store the news
    destination: (req, file, cb) => {
        cb(null, "./images/newsPics");
    },

    //filename to give to the news
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const newsPicUpload = multer({ storage: newsPicStorage });

//staff pic storage
const staffPicStorage = multer.diskStorage({

    //path to store the staff
    destination: (req, file, cb) => {
        cb(null, "./images/staffPics");
    },

    //filename to give to the staff
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const staffPicUpload = multer({ storage: staffPicStorage });

//facility pic storage
const facilityPicStorage = multer.diskStorage({

    //path to store the facility
    destination: (req, file, cb) => {
        cb(null, "./images/facilityPics");
    },

    //filename to give to the facility
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const facilityPicUpload = multer({ storage: facilityPicStorage });

//gallery pic storage
const galleryPicStorage = multer.diskStorage({

    //path to store the gallery
    destination: (req, file, cb) => {
        cb(null, "./images/galleryPics");
    },

    //filename to give to the gallery
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const galleryPicUpload = multer({ storage: galleryPicStorage });

//department pic storage
const departmentPicStorage = multer.diskStorage({

    //path to store the department
    destination: (req, file, cb) => {
        cb(null, "./images/departmentPics");
    },

    //filename to give to the department
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const departmentPicUpload = multer({ storage: departmentPicStorage });

//event pic storage
const eventPicStorage = multer.diskStorage({

    //path to store the event
    destination: (req, file, cb) => {
        cb(null, "./images/eventPics");
    },

    //filename to give to the event
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const eventPicUpload = multer({ storage: eventPicStorage });

//activity pic storage
const activityPicStorage = multer.diskStorage({

    //path to store the activity
    destination: (req, file, cb) => {
        cb(null, "./images/activityPics");
    },

    //filename to give to the activity
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const activityPicUpload = multer({ storage: activityPicStorage });

module.exports = { newsPicUpload, staffPicUpload, facilityPicUpload, galleryPicUpload, departmentPicUpload, eventPicUpload, activityPicUpload };