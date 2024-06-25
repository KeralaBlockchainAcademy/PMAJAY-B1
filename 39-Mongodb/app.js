const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());


mongoose.connect(
  "mongodb://localhost:27017/USER"
);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

const sampleSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: String, required: true },
  field3: { type: String, required: true },
});

const sample = mongoose.model('sample', sampleSchema);

// Create a new document
app.post('/submit-form', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const details = await sample.create(data);
    res.status(201).send(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all documents
app.get('/details', async (req, res) => {
  try {
    const details = await sample.find();
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a document by ID
app.put('/update-details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const options = { new: true };

    const updatedDetails = await sample.findByIdAndUpdate(id, updatedData, options);

    if (updatedDetails) {
      res.status(200).json(updatedDetails);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a document by ID
app.delete('/delete-details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDetails = await sample.findByIdAndDelete(id);

    if (deletedDetails) {
      res.status(200).json({ message: 'Document deleted successfully' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
