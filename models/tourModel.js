/*
{
  "user_id": "5f3a8e0b9b6e5d1b30b3a9b5", 
  "name": "Tour to the Grand Canyon",
  "info": "A breathtaking journey through the Grand Canyon, with spectacular views and hiking opportunities.",
  "image": "https://example.com/grand-canyon.jpg",
  "price": "150 USD"
}


{
  "user_id": "5f3a8e0b9b6e5d1b30b3a9b6", 
  "name": "Tour to the Grand Canyon",
  "info": "A breathtaking journey through the Grand Canyon, with spectacular views and hiking opportunities.",
  "image": "https://example.com/grand-canyon.jpg",
  "price": "150 USD"
}



{
    "name" : "Ahmed",
    "email" : "Ahmed232@gmail.com",
    "password" : "Ahmed222@@"
}

*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
