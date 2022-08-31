const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // this option allos us to format the timestamp value
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // tells mongoose that it should use getter functions we've specified
      getters: true
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// create the pizza model with PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
