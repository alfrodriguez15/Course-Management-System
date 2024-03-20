/*
 * Project 2
 * app back-end JavaScript source code
 *
 * Author: Jennifer Hoang
 * Version: 1.0
 */

// Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Set the web server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) =>
  res.send('<h1>MERN Example 2: Server</h1>') // Home web page
);

// Connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://course-ms:cs4704@course-ms.u8bdkip.mongodb.net/?retryWrites=true&w=majority&appName=course-ms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

// Create routes for database access
const tableSchema = require("./model");
const router = express.Router();
app.use('/db', router);
router.route('/find').get((req, res) => {
  tableSchema.find().then(function (items) {
    res.json(items);
  });
});
router.route('/find/:caption').get(function (req, res) {
  tableSchema.find({ caption: req.params.caption }, function (err, items) {
    res.json(items);
  });
});

// Added support for post requests. A document is found based on its id. The id is the value of _id property of the document.
router.route('/update/:id').post((req, res) => {
  tableSchema.findById(req.params.id).then(function (items) {

    items.fileContent = req.body.fileContent
    items.save().then(items => {
      res.json('Items updated!');
    })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

// Added support for post requests. A new document is created based on the request body.
router.route('/create').post((req, res) => {
  tableSchema.create({ fileName: req.body.fileName, fileContent: req.body.fileContent }).then(function (items) {

    res.json(items);
  });
});
// Export the app to be used in bin/www.js
const port = 3001
app.listen(port, () => console.log(`App listening on port ${port}!`))