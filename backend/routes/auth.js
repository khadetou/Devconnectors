import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import {check, validationResult} from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';



//INITIALIZING OUR ROUTER
const router = express.Router();


//@route  GET/api/Auth
//@desc   Get user
//@access Public
router.get('/',auth, async (req, res)=>{
    
    try {

        const user = await  User.findById(req.user.id).select('-password');
        res.json(user)

    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server Error');

    }

})


//@route  POST/api/Auth
//@desc   Login as user
//@access Public
router.post('/',[
    check('email','Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
   ],
   async (req, res)=>{
       const errors = validationResult(req)
   
       if(!errors.isEmpty()){
           return res.status(400).json({errors: errors.array()});
       }
       const {email, password} = req.body;
       
       try {
   
       //CHEK IF THE USER EXIST
       let user = await User.findOne({ email })
       if(!user){
           res.status(400).json({errors:[{msg :"Invalid Credentials"}]})
       }
   
       //CHECK IF THE PASSWORD EXIST
        const isMatch = await bcryptjs.compare(password, user.password);

       if(!isMatch){
        res.status(400).json({errors:[{msg :"Invalid Credentials"}]})
       }


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