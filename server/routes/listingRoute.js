const {
    getlisting,
    addlisting,
    getmylisting,
    getListingById,
    updateListing,
    deleteListing
} = require("../controllers/listingController");
const authMiddleware = require("../middleware/jwt");
const express = require("express");
const router = express.Router();

//get list  [tenant,owner]
router.get("/",getlisting);

//get owner listing 
router.get("/mylistings",authMiddleware,getmylisting);

// Add this route
router.get('/:id', getListingById);

//add listing [owner]
router.post("/",authMiddleware,addlisting);



//update listing [owner]
router.put("/:id",authMiddleware,updateListing);

//delete listing [owner]
router.delete("/:id",authMiddleware,deleteListing);

module.exports= router;