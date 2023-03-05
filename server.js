const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

const port = process.env.PORT || 3000;


// server-side Node.js code
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/write-score') {
        console.log("write 1");
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            const parsedData = JSON.parse(data);
            fs.appendFile('scores.txt', parsedData.data, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error writing file');
                } else {
                    res.statusCode = 200;
                    res.end('File written successfully');
                }
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
}).listen(3000);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
