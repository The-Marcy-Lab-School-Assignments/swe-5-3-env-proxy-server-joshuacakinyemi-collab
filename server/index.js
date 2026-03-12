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
    // We'll secure this value soon!
    const response = await fetch(process.env.URL);
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // send the fetched data to the client
    res.send(data);
  } catch (error) {
    // or send an error. 503 means the service is unavailable
    res.status(503).send(error);
  }
}

const findGif = async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    const response = await fetch(process.env.URL);
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    const gifs = data.find(gif => gif.title === searchTerm);

    if (!gifs) {
      res.status(404).send({ message: `No quote with the name ${searchTerm}` });
      return
    }

    res.send(gifs);
  } catch (error) {
    res.status(503).send(error);
  }
}

app.get('/api/gifs', serveGifs);
app.get('/api/gifs', findGif);

//////////////////////////
// Listener
//////////////////////////

app.listen(port, () => console.log(`listening at http://localhost:${port}`)); 