//////////////////////////
// Imports
//////////////////////////

const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');

//////////////////////////
// Constants
//////////////////////////

const port = 8080;
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}
const app = express();

//////////////////////////
// Middleware/Controllers
//////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

const serveStatic = express.static(pathToFrontend);

app.use(logRoutes);
app.use(serveStatic);

const serveGifs = async (req, res, next) => {

  try {
    const { searchTerm } = req.query;
    const url = searchTerm
      ? `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=9&rating=g`
      : `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=9&rating=g`;

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    res.send(data);
  } catch (error) {
    res.status(503).send({ message: error.message });
  }
}

app.get('/api/gifs', serveGifs);


//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 