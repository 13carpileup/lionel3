const express = require("express");
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/user/:username', function(req, res) {
    fs.readFile('../reOrganizedData/' + req.params.username + '/timetable.txt', 'utf-8', function (err, f) {
        if (err) {
            return console.error(err);
        }
        console.log("file open");
        res.send(f);
        console.log("File opened!!");
    });
    

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    
});