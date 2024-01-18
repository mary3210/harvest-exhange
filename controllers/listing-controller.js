const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Listing } = require("../models");
const Passage = require("@passageidentity/passage-node");
require("dotenv").config();

const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
});

// retrieve information from all listings
router.get("/", async (req, res) => {
  try {
    //if filter is kept as an empty object, shows all listings
    let filter = {};
    //destructing the listing object
    let { location, distance, category, subtypes, minprice, maxprice} = req.query;
    //if searching for zipcode and distance, example: url = http://localhost:3000/listing?zipCode=76120&distance=50 
    // api turns zipcode into longitude and latitude
    //store lat & long into zipinfo
    // filter then adds a key called zipCoords containing the distance away from said coordinates
    if (location && distance) {
        await fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${location}&outFields=Addr_type&f=json&token=${process.env.GEOCODE_API_KEY}`)
        .then((res) => res.json())
        .then( (json) => {
            const zipInfo = (json.candidates[0].location);
            filter.zipCoords = { 
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [zipInfo.x, zipInfo.y]
                    },
                    $maxDistance: (Number(distance) * 1609.344)
                }
            }
        })
    }

    if ((minprice && Number(minprice) >= 0) || (maxprice && Number(maxprice) >=0)) {
        filter.price = {
          ...(minprice && {$gte: Number(minprice)}),
          ...(maxprice && {$lte: Number(maxprice)})
        }
    }

// filtering price - says the max price of the collection and the starting price of the collection
// const filteredPrice = Listing.aggregate([ 
//   { "$group": { 
//       "_id": null,
//       "max": { "$max": "$price" }, 
//       "min": { "$min": "$price" } 
//   }}
// ])


    //checks if filter object has zipcoords and category. If category exists in the req.query(url) add category key along with value from the query
    filter = {
        ...filter,
        ...(category && {category: category}),
        ...(subtypes && {subtypes: subtypes})
    };

    //search listing by whatever is in filter
    const allListing = await Listing.find(filter);
    // console.log(allListing);
    res.status(200).json(allListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from one Listing by their Listing ID
router.get("/:id", async (req, res) => {
  try {
    const getOneListing = await Listing.findOne({ _id: req.params.id });
    
    res.status(200).json(getOneListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrieve information from all Listings by their user ID
router.get("/user/:id", async (req, res) => {
  try {
    const getUserListings = await Listing.find({ userID: req.params.id });
    res.status(200).json(getUserListings);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// creates user listing
router.post("/", async (req, res) => {
    try {
        const userID = await passage.authenticateRequest(req);
        if (userID) {
            // user is authenticated
            const getUser = await User.findOne({passage_id: userID});
            if (getUser) { 
                req.body.userID = getUser._id;
                const location = req.body.location;
                fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${location}&outFields=Addr_type&f=json&token=${process.env.GEOCODE_API_KEY}`)
                .then((res) => {
                  if (res.status === 200) {
                    console.log(res.json)
                    return res.json();
                  } else {
                    throw new Error('geolocation api failed to return valid json');
                  }
                })
                .then( async (json) => {
                    const zipInfo = (json.candidates[0].location);
                    req.body.zipCoords = { type: "Point", coordinates: [zipInfo.x, zipInfo.y]};
                    const newListing = await Listing.create(req.body);
                    res.status(200).json(newListing);
                }).catch((err) => {
                    res.status(400).json({ error: err.message });
                });
            } else {
                // logic to get meta data from passage and create listing
                res.status(400).json({ error: "The user is not logged in to post things" });
            };
        }
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//edit Listing for user
router.put("/:id", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
        // const { email, phone, user_metadata } = await passage.user.get(userID);
        // const identifier = email ? email : phone;
        const getUser = await User.findOne({passage_id: userID});
        if (getUser) {
          if (req.body.location){
            await fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${req.body.location}&outFields=Addr_type&f=json&token=${process.env.GEOCODE_API_KEY}`)
            .then((res) => 
              res.json()
            )
            .then(async (json) => {
              console.log(json);
              const zipInfo = (json.candidates[0].location);
              req.body.zipCoords = { type: "Point", coordinates: [zipInfo.x, zipInfo.y] };
            });
          };
          const updatedListing = await Listing.findOneAndUpdate({
              _id: req.params.id,
              userID: getUser._id
            },
            req.body,
            { new: true, runValidators: true }
          );
          res.status(201).json(updatedListing);
        }
    } else {
        res.status(400).json({ error: "The user is not logged in to post things" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//delete Listing for user
router.delete("/:id", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    console.log(userID)
    if (userID) {
        // user is authenticated
        // const { email, phone, user_metadata } = await passage.user.get(userID);
        // const identifier = email ? email : phone;
        const getUser = await User.findOne({passage_id: userID});
        console.log(getUser)
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedListing);
    }
    // const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    // res.status(200).json(deletedListing);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});


module.exports = router;
