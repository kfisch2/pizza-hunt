const { Pizza } = require("../models");

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
    // we populate a field in MongoDB rather than 'join' as we did in SQL
    // chain populate to query with key path and the value of the field we want populated
      .populate({
        path: "comments",
        // tells Mongoose we don't care about __v field, so the '-' in front says "don't return"
        // if we didn't include the '-' then it would return ONLY the __v field 
        // __v is the versionKey ???????? WHAT DOES THIS MEAN?
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1})
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get one pizza by id
  getOnePizza({ params }, res) {
    // destructured params out of the request
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza with this id found" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },
  //update pizza by id
  updatePizza({ params, body }, res) {
    // third param. {new:true} returns the new version of the doc., rather than the original doc.
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza with that id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza with that id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
