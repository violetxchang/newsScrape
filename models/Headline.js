var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var headlineSchema = new Schema({
  // `title` is required and of type String

  /*Violet, I added a link property since you need to link back to the original article */
  title: {
    type: String,
    required: true,
    unique: true
  },
summary: {
    type: String,
    required: true
},
link: {
  type: String,
  required: true
},
date: String,
saved: {
    type: Boolean,
    default: false
}
});
  
  var Headline=mongoose.model("Headline", headlineSchema)
// Export the Article model
module.exports = Headline;
