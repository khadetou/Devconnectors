import express from 'express';


const app = express();


app.get('/', (req, res) => {
    res.send('API Running ...')
});


//SETTING UP PORT   
const {PORT} = process.env;
const PORTV = PORT || 5000;

app.listen(PORTV, () => console.log(`Server started on port ${PORTV}`));