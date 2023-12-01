const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// getting-started.js
const mongoose = require('mongoose');

app.delete('/api/book/:id',async (req, res) => {
  console.log("Delete: " + req.params.id);

  let book = await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Define a Mongoose schema for a book with title, cover, and author fields
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
})

// Create a Mongoose model named 'my_books' based on the book schema
const bookModel = mongoose.model('my_books', bookSchema);

// PUT endpoint to update a book by its ID
app.put('/api/book/:id', async (req, res) => {
  // Log the update attempt with the book's ID
  console.log("Update: " + req.params.id);

  // Find the book by ID and update its content with the request body data
  let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
  // Send the updated book as a response
  res.send(book);
})

// POST endpoint to create a new book
app.post('/api/book', (req, res) => {
  // Log the data received in the request body
  console.log(req.body);

  // Create a new book in the database using the data from the request body
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
  .then(() => { 
    // Send a success message if the book is created
    res.send("Book Created");
  })
  .catch(() => { 
    // Send an error message if the book creation fails
    res.send("Book NOT Created");
  });
})

// Default route to respond with 'Hello World!'
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// GET endpoint to retrieve all books from the database
app.get('/api/books', async (req, res) => {
  // Retrieve all books from the database
  let books = await bookModel.find({});
  
  // Send the list of books as a JSON response
  res.json(books);
})

// GET endpoint to retrieve a single book by its ID
app.get('/api/book/:identifier', async (req, res) => {
  // Log the book ID requested
  console.log(req.params.identifier);

  // Find the book by ID in the database
  let book = await bookModel.findById(req.params.identifier);
  
  // Send the found book as a response
  res.send(book);
})

// Start the app and make it listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
