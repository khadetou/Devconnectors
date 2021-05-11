import express from 'express';


//INITIALIZING OUR ROUTER
const router = express.Router();


//@route  GET/api/Post
//@desc   Test route
//@access Public
router.get('/',(req, res)=>res.send('Post route'))



export default router;