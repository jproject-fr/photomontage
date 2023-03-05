const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();

// Serve the static files from the build folder
app.use(express.static(path.join(__dirname, '.')));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
});

// Handle posting scores
app.post('/api/write-score', (req, res) => {
    // Extract the form data from the request body
    const score = req.body['score'];

    // Do something with the form data
    console.log(score);

    // Write the form data to a file
    fs.appendFile('scores.txt', score + "\n", err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
        } else {
            res.send('Score data written to file');
        }
    });
});

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
