import express from 'express';
import auth from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import {check, validationResult} from 'express-validator';

//INITIALIZING OUR ROUTER
const router = express.Router();


//@route  GET/api/Profiles/me
//@desc   Get current users profile
//@access Private
router.get('/me',auth, asyncHandler(async (req, res)=>{
    const profile = await Profile.findOne({user: req.user.id }).populate('User', ['name', 'avatar']);

    if(!profile){
        return res.status(400).json({msg: 'There is no profile for this user'})
    }
    res.json(profile);
}))



//@route  Post/api/Profiles
//@desc   Create or Update our user profile
//@access Private

router.post('/', [auth, 
check('status', 'Status is required').not().isEmpty(),
check('skills', 'skills is required').not().isEmpty(),
] ,asyncHandler(async(req, res)=>{

    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    const {company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin} = req.body;

    //Build profile object 
    const profileFields = {};
    profileFields.user = req.user.id;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills= skills.split(',').map(skill =>skill.trim())
    }

    //Build social object
    profileFields.social= {}

    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    let profile = await Profile.findOne({user: req.user.id});
    
    if(profile){
        //Update
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true});

            return res.json(profile);
    }
  
    //Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
}));

export default router;