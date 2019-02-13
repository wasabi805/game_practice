const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log( `Server running on port ${port}` );
});
