import express from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/User.js';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

//INITIALIZING OUR ROUTER
const router = express.Router();


//@route  POST/api/users
//@desc   Register user
//@access Public
router.post('/',[
 check('name', 'Name is required').not().isEmpty(),
 check('email','Enter a valid email').isEmail(),
 check('password', 'Enter a password with 6 or more characters').isLength({min:6})
],
async (req, res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    
    try {

    //See if user exist 
    let user = await User.findOne({ email })
    if(user){
        res.status(400).json({errors:[{msg :"User already exists"}]})
    }

    //Get users gravatar
    const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    })


    user = new User({
        name,
        email,
        avatar,
        password
    });

    //Encrypt Password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

    //Return jsonwebtoken
    const payload ={
        user:{
            id: user.id
        }
    }
    jsonwebtoken.sign(payload, process.env.JWTS, {expiresIn: 360000}, (err, token)=>{
        if(err) throw err;
        res.json({ token });
    } )



    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});




export default router;