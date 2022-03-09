const express = require('express');
const router = express.Router();
// third party library, so we'll have to npm install it.
const { v4: uuidv4 } = require('uuid');

// fs = file system. node comes with this!
const fs = require('fs');

// Functions to read/write data file
function readShoes() {
  // "read the text file at data/shoes.json." Read it
  // synchronously.
  const shoesData = fs.readFileSync('./data/shoes.json');
  // "it's text right now, so use JSON.parse to turn
  // this into JSON."
  const parsedShoes = JSON.parse(shoesData);
  return parsedShoes;
}

function writeShoes(data) {
  // "my data is a JS object. I need to write it to
  // a text file though, so convert this into text and
  // write to data/shoes.json."
  const stringifiedData = JSON.stringify(data);
  fs.writeFileSync('./data/shoes.json', stringifiedData);
}

// GET all shoes
router.get('/', (req, res) => {
  const shoes = readShoes();
  let filteredShoes = shoes;

  // If the client requested a specific color,
  // filter our array to just those shoes
  if (req.query.color) {
    filteredShoes = shoes.filter((shoe) => shoe.color === req.query.color);
  }
  // Respond with the filtered array of shoes
  // note: if I leave status(200) out, it will default to 200
  res.status(200).json(filteredShoes);
});

// GET a single shoe
router.get('/:shoeId', (req, res) => {
  const shoes = readShoes();

  // Find the individual shoe that was requested
  // (The shoe whose id matches the id from the URL req.params.shoeId)
  const individualShoe = shoes.find((shoe) => shoe.id === req.params.shoeId);

  // If it doesn't exist, send a 404 not found
  if (!individualShoe) {
    return res.status(404).send('Shoe not found');
  }

  // Respond with that individual shoe
  res.json(individualShoe);
});

// POST create a new shoe
router.post('/', (req, res) => {
  // 1. Read the latest shoes data from the JSON file
  //    into a JSON object we can play with.
  const shoes = readShoes();

  // Using { brand, model, color } create a new shoe in array
  const { brand, model, color } = req.body;

  if (!brand) {
    return res.status(400).json({
      message: 'Brand is required',
    });
  }

  if (!model) {
    return res.status(400).json({
      message: 'Model is required',
    });
  }

  if (!color) {
    return res.status(400).json({
      message: 'Color is required',
    });
  }

  // 2. Create a new shoe object.
  //    NOTE: we still don't know how to write to a
  //    database yet, so we're going to fake it by
  //    creating a unique ID ourselves.
  const newShoe = {
    id: uuidv4(),
    brand,
    model,
    color,
  };

  // 3. Insert the new shoe into the shoes array
  shoes.push(newShoe);

  // 4. Write the updated shoes array the the file
  writeShoes(shoes);

  // Respond
  res.status(201).json(newShoe);
});

// DELETE a single shoe
router.delete('/:shoeId', (req, res) => {
  console.log(`TODO: Delete note with the ID ${req.params.shoeId}`);

  const shoes = readShoes();
  updatedShoes = shoes.filter((shoe) => shoe.id !== req.params.shoeId);
  writeShoes(updatedShoes);

  // Respond with a message that the note has been deleted
  res.status(204).send('You deleted shoe ' + req.params.id);
});

module.exports = router;
