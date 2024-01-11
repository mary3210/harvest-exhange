const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
const userController = require("./controllers/user-controller");
const listingController = require("./controllers/listing-controller")

const app = express();
const CLIENT_URL = "http://localhost:3000" ;

require("dotenv").config();
require("./config/db.connection");

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use("/user", userController);
app.use("/listing", listingController)

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};


const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});


//add more fields from passage.console later
app.post("/auth", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});

app.use(express.static('../frontend/build'));
const path = require('path');
app.get('*', (req, res) => { 
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`listening on port ${PORT}`);
});
