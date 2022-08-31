const router = require('express').Router();
// destructuring method names out of pizza-controller.js
const {
  getAllPizza,
  getOnePizza,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller')

// set up all GET and POST at /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// set up GET one, PUT, and DELETE at /api/pizzas/:id

router
  .route('/:id')
  .get(getOnePizza)
  .put(updatePizza)
  .delete(deletePizza);


module.exports = router;