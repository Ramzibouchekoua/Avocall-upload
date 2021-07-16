const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true, minLength: 5 },
  phone: { type: String},
  name: { type: String,required: true},
  role: { type: String},
  address: { type: String},
  specialization: { type: String},
  bankId: { type: String},
  class: { type: String},
});

module.exports= User= mongoose.model("user",userSchema)