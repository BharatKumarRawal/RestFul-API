const mongoose = require("mongoose");
const validator = require("validator");

//defining schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },

  phone: {
    type: Number,
    min: 10,

    required: true,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
});

//create a new collection using model

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
