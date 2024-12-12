const Listing = require("../models/Listing");

//get all listings 
const getlisting = async(req,res)=>{

    try{
        const Listings = await Listing.find()
        .populate('ownerId', 'name') // Get the owner's name
        .select('title description location price ownerId image aminites createdAt'); // Select required fields
    
        const Price = await Listings.map( Listing=>({
            ...Listing.toObject(),
            price:`${Listing.price} INR`,
        }));

        return res.status(200).json(Price);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"server error !"});

    }
   
};

// Add this new controller function
const getListingById = async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id)
        .populate('ownerId', 'name email contact') // Ensure phone is included in the User model
        .select('title description location price ownerId image aminites createdAt');
  
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }
  
      return res.status(200).json(listing);
    } catch (err) {
      console.error('Error fetching listing:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Add to exports
  module.exports = {
    // ... other exports
    getListingById,
  };

//add a listing by owner 
const addlisting = async(req,res)=>{

    try{
        console.log(req.user.role);
        if(!req.user || req.user.role !== 'owner'){
            return res.status(403).json({message:"only owner can add property !"});
        }

        const Listings = await Listing.create({
            ...req.body,
            ownerId:req.user.id, //associate loged in owner 
        });
        
        return res.status(200).json({message:"Your Property added sucessfully!"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"server error!"});
    }
};

//getlisting by owner 

const getmylisting = async(req,res)=>{

    try{

       // First check if user is authenticated
       if(!req.user) {
        return res.status(401).json({message: "Authentication required"});
    }

    // Then check if user is an owner
    if(req.user.role !== 'owner'){
        return res.status(403).json({message:"only owner can see their property!"});
    } 


        const property = await Listing.find({ownerId:req.user.id});
        if(!property) return res.status(404).json({messag:"Property Not Found !"});

        return res.status(200).json({
            message: "Properties retrieved successfully",
            data: property
        });

    }
    catch(err){

        console.error(err.message);
        return res.status(500).json({ message: 'Server error' });

    }

};


//update a listing 

const updateListing = async(req,res)=>{

    try{
        const property = await Listing.findById(req.params.id);

         // Check if the property exists
        if(!property) return res.status(404).json({message:"property not found !"});
    
        // Ensure that only the owner can update their own property
        if(property.ownerId.toString() !== req.user.id){
            return res.status(403).json({message:"you cannot update this property !"});
        }
        
       //update the list
        const updateProperty = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true , runValidators:true}

        );

        if (!updateProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        return res.status(200).json(updateProperty);
    
    }
    catch(err){

        console.log(err);
        return res.status(500).json({message:"server error!"});

    }
   

};

//delete listing 
const deleteListing = async(req,res)=>{

    try{
        const property = await Listing.findById(req.params.id);

          // Check if the property exists
       if(!property){
           return res.status(404).json({message:"property not found !"});
       }
   
       // Ensure that only the owner can delete their own property
       if(property.ownerId.toString() !== req.user.id){
        return res.status(403).json({message:"you cannot delete this property !"});
       }
       //delete the list
       await property.deleteOne({ _id: property._id });
       return res.status(200).json({message:"property deleted !"});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"server error !"});
    }
   

};

module.exports = {getlisting, getmylisting ,getListingById, addlisting , updateListing , deleteListing};