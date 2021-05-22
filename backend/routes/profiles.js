import express from 'express';
import auth from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import {check, validationResult} from 'express-validator';
import request from 'request';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

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


//@route  GET/api/Profiles
//@desc   Get all profiles
//@access Public

router.get('/', asyncHandler(async (req, res)=>{

    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);

}));


//@route  GET/api/Profiles/user/:user_id
//@desc   Get all profiles by user_id
//@access Public

router.get('/user/:user_id', asyncHandler(async (req, res)=>{

    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
    
    if(!profile) return res.status(400).json({msg: 'There is no profile for this user'});

    res.json(profile);

}));



//@route  DELETE/api/Profiles
//@desc   Delete profile, user & post
//@access Public

router.delete('/', auth, asyncHandler(async (req, res)=>{

    //Remove post
    await Post.deleteMany({user: req.user.id});

    //Remove profile
    await Profile.findOneAndRemove({user: req.user.id});

    //Remove user
    await User.findOneAndRemove({_id: req.user.id});


    res.json({msg: 'User deleted'});

}));

//@route  PUT/api/Profile/experience
//@desc   Add profile experience
//@access Private

router.put('/experience',[auth,
     [
     check('title','Title is required')
     .not()
     .isEmpty(),
     check('company','Company is required')
     .not()
     .isEmpty(),
     check('from','From date is required')
     .not()
     .isEmpty(),
    ]], asyncHandler(async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {title, company, location, from, to, current, description}= req.body;

        const newExp ={
            title,
            company,
            location,
            from, 
            to,
            current,
            description
        }

        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);

        await profile.save();
        
        res.json(profile);
}))


//@route  DELETE/api/Profile/experience/:exp_id
//@desc   Delete experience from profile
//@access Private

router.delete('/experience/:exp_id', auth, asyncHandler(async (req, res)=>{

    const profile = await Profile.findOne({user: req.user.id});

    //Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile)

}))




//@route  PUT/api/Profile/education
//@desc   Add profile education
//@access Private

router.put('/education',[auth,
    [
    check('school','School is required')
    .not()
    .isEmpty(),
    check('degree','Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy','Field of study is required')
    .not()
    .isEmpty(),
    check('from','From date is required')
    .not()
    .isEmpty(),
   ]], asyncHandler(async (req, res)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({errors: errors.array()})
       }
       const {school, degree, fieldofstudy, from, to, current, description}= req.body;

       const newEdu ={
           school,
           degree,
           fieldofstudy,
           from, 
           to,
           current,
           description
       }

       const profile = await Profile.findOne({user: req.user.id});
       profile.education.unshift(newEdu);

       await profile.save();
       
       res.json(profile);
}))


//@route  DELETE/api/Profile/education/:edu_id
//@desc   Delete education from profile
//@access Private

router.delete('/education/:edu_id', auth, asyncHandler(async (req, res)=>{

   const profile = await Profile.findOne({user: req.user.id});

   //Get remove index
   const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

   profile.education.splice(removeIndex, 1);

   await profile.save();

   res.json(profile)

}));



//@route  GET/api/Profile/github/:username
//@desc   Get user repos from github
//@access Public
router.get('/github/:username', asyncHandler( (req, res)=>{
    const options ={
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT}&client_secret=${process.env.GITHUB_SECRET}`,

        method: 'GET',
        
        headers: {'user-agent': 'node.js'}
    };

    request(options, (error, response, body)=>{
        if(error) console.error(error);

        if(response.statusCode !==200){
            res.status(404).json({msg: 'No github profile found'})
        }

        res.json(JSON.parse(body));
    })
}))

export default router;