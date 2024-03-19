const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userModelSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    type: String,
    isApproved: Boolean,
    dataID: { type: Schema.Types.ObjectId, ref: 'Data' }

})

const userModel = mongoose.model("user", userModelSchema);
module.exports=userModel;