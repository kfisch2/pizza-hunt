const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'You need to name your pizza!',
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // this option allos us to format the timestamp value
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      // possible options for this field
      // enum = enumerable which means a set of data that can be iterated over (e.g. for... in loops)
      enum: ['Personal', 'Small', 'Large', 'Extra large'],
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
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);

    // reduce() tallies up total of every comment with its replies
  // takes two parameters: an accumulator and currentValue
  // as .reduce() walks through the array, it passes accumulating total and current val of comment
  // into the function, with the return of the function revising the total for the next interation through arr
  // .reduce() is great for getting sum of multiple values
});

// create the pizza model with PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
