const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone_number: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    gender: {
      type: String,
      required: [true, "Please add a gender"],
    },
    date_of_birth: {
      type: Date,
      required: [true, "Please add a date of birth"],
    },
    membership_status: {
      type: String,
      required: [true, "Please add a membership status"],
    },
  },
  {
    timestamps: true,
  }
);

// static signup method
userSchema.statics.signup = async function (name, email, password, phone_number, gender, date_of_birth, membership_status) {
  // validation
  if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
    throw Error("Please add all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (!validator.isMobilePhone(phone_number)) {
    throw Error("Phone number not valid");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashedPassword,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
