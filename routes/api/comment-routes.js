const router = require("express").Router();

const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

// route for adding comment
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// route for deleting comment
// /api/comment/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;
