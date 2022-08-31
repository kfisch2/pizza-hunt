const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// subdocument
const ReplySchema = new Schema(
  {
    // we need a unique identifier instead of the default _id field
    // imported Types to include Types.ObjectId
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // nested directly in comments, not referred to like the Pizza Schema
    // the virtual we are specifying?
    replies: [ReplySchema],
  },
  {
    toJSON: {
      // replies
      virtuals: true,
      // dateFormat util
      getters: true,
    },
    id: false,
  }
);
CommentSchema.virtual("replyCount").get(function () {
  // reduce() tallies up total of every comment with its replies
  // takes two parameters: an accumulator and currentValue
  // as .reduce() walks through the array, it passes accumulating total and current val of comment
  // into the function, with the return of the function revising the total for the next interation through arr
  // .reduce() is great for getting sum of multiple values
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
