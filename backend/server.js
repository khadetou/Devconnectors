import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import users from './routes/users.js';
import profiles from './routes/profiles.js';
import posts from './routes/posts.js';
import auth from './routes/auth.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import path from 'path';

 //DOTENV AND EXPRESS CONFIG
const app = express();
dotenv.config();
const {PORT, NODE_ENV} = process.env;

 //CONNECTION TO DATABASE
connectDB();


//INIT MIDDLEWARE BY DEFAULT IMPLEMENTED IN EXPRESS ALLOW US
//TO HAVE ACCESS TO REQ.BODY
app.use(express.json({extended: false}))



//DEFINE ROUTES
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/posts', posts)
app.use('/api/auth', auth)



const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//SERVE STATIC ASSET IN PRODUCTION
if(NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,'frontend/build')))

    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })

}

app.use(notFound);
app.use(errorHandler);

//SETTING UP PORT  
const PORTV = PORT || 5000;

app.listen(PORTV, () => console.log(`Server started on port ${PORTV} on ${NODE_ENV} mode`.underline.bold.green));