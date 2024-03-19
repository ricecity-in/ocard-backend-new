const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel= require("./model/userModel")
const dataModel= require("./model/dataModel")

mongoose.connect("mongodb+srv://username:connectat123@cluster0.s2v90zc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

const app = express();
app.use(express.json());
app.use(cors())

app.post("/register", async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const user = await userModel.findOne({ email: email });
      if (user) {
          return res.json("User already exists");
      }

      // Create a new user
      const newUser = await userModel.create({ name, email, password, type: "client", isApproved: false });

      // Create new data associated with the user
      const newData = await dataModel.create({ name, email, userID: newUser._id });

      // Update the user with the dataID
      await userModel.findByIdAndUpdate(newUser._id, { dataID: newData._id });

      // Send success response
      res.json("Success");
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json("Internal server error");
  }
});


app.post("/login", (req, res)=>{
    const {email, password}=req.body;
    userModel.findOne({email : email})
    .then(user=>{
        if(user){
            console.log("user: ", user)
            if(user.password == password){
                res.json({msg:"Success", type:user.type, email, id: user._id})
            }
            else{
                res.json("Wrong Password")
            }
        }
        else{
            res.json("User Not Found")
        }
    })
})

// GET all userdata
app.get("/api/myform/:id", async (req, res) => {
    const id = req.params.id;
    try {
      console.log("Fetching user data...", id);
      const userdata = await userModel.findById(id).populate('dataID');
      if (!userdata) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(userdata);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }); 

  // form endpoint
app.post("/api/admin/form", async (req, res) => {
    const {
      name,
      user_profile,
      user_icon,
      title,
      department,
      company,
      headline,
      email,
      websiteurl,
      link,
      instagram,
      linkedin,
      facebook,
      xcom,
      phone,
      whatsapp,
      telegram,
      discord,
      upi,
    } = req.body;
    try {
      const userdata = new dataModel({
        name,
        user_profile,
        user_icon,
        title,
        department,
        company,
        headline,
        email,
        websiteurl,
        link,
        instagram,
        linkedin,
        facebook,
        xcom,
        phone,
        whatsapp,
        telegram,
        discord,
        upi,
      });
      await userdata.save();
      res.status(201).json({ message: "User Data inserted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error to data enter" });
    }
  });

  app.put("/api/form/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id-/api/form/:id: ", id);
    // const updatedData = req.body; // Data sent from the client for updating
    const {
      name,
      user_profile,
      user_icon,
      title,
      department,
      company,
      headline,
      email,
      websiteurl,
      link,
      instagram,
      linkedin,
      facebook,
      xcom,
      phone,
      whatsapp,
      telegram,
      discord,
      upi,
    } = req.body;
    try {
      const update_userdata = await dataModel.findByIdAndUpdate(
        id,
        {
          // $set: updatedData,
          name,
          user_profile,
          user_icon,
          title,
          department,
          company,
          headline,
          email,
          websiteurl,
          link,
          instagram,
          linkedin,
          facebook,
          xcom,
          phone,
          whatsapp,
          telegram,
          discord,
          upi,
        },
        { new: true }
      );
  
      if (!update_userdata) {
        res.status(404).json({ message: "Backend: Document not found" });
      }
  
      res.status(200).json({ message: "Backend:User Data updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Backend: Error to data enter" });
    }
  });

app.listen(5000, ()=>{
    console.log("Server is Running at 5000")
})