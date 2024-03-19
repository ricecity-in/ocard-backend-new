const mongoose = require("mongoose");

// Create a User Data model schema
const dataModelSchema = new mongoose.Schema({
    name: String,
    user_profile: String,
    user_icon: String,
    title: String,
    department: String,
    company: String,
    headline: String,
    email: String,
    websiteurl: String,
    link: String,
    instagram: String,
    linkedin: String,
    facebook: String,
    xcom: String,
    phone: String,
    whatsapp: String,
    telegram: String,
    discord: String,
    upi: String,
    userID: Object
  });
  const dataModel = mongoose.model("Data", dataModelSchema);
  module.exports=dataModel;