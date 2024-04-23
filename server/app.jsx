const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));

app.use('/public', express.static(path.join(__dirname, './public')));

const uri = 'mongodb+srv://ranasahil78922:HUssTPeFLapDSBgE@clust.lousblf.mongodb.net/?retryWrites=true&w=majority&appName=Clust';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './public/image'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const itemSchema = new mongoose.Schema({
  image: String,
  file: String,
  video: String
});

const Item = mongoose.model('Item', itemSchema, 'image');

app.use(bodyParser.json());
app.use(cors());

app.post('/api', upload.any(), async (req, res) => {

  try {
    const fileData = req.files;
    const images = [];
    const files = [];
    const videos = [];

    fileData.forEach(file => {
      if (file.mimetype.startsWith('image')) {
        images.push(file.path);
      } else if (file.mimetype.startsWith('video')) {
        videos.push(file.path);
      } else {
        files.push(file.path);
      }
    });
    const newItem = new Item({
      image: images.length > 0 ? images[0] : null,
      file: files.length > 0 ? files[0] : null,
      video: videos.length > 0 ? videos[0] : null
    });
    const insertedItem = await newItem.save();
    console.log('Inserted item:', insertedItem);
    res.json({ message: "Upload successful" });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
