import express from 'express';
import {check, validationResult} from 'express-validator';
import auth from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Post from '../models/Post.js';



//INITIALIZING OUR ROUTER
const router = express.Router();


//@route  POST/api/Post
//@desc   Create a post 
//@access Public
router.post('/',[auth, [
    check('text', 'Text is require').not().isEmpty()
]],asyncHandler( async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post ({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    })

    const post = await newPost.save();
    
    res.json(post);
}))

//@route  GET/api/Post
//@desc   Get all posts 
//@access Private

router.get('/',auth, asyncHandler(async (req, res)=>{

    const posts = await Post.find().sort({date : -1})
    res.json(posts);
}));


//@route  GET/api/Post/:id
//@desc   Get post by id 
//@access Private

router.get('/:id',auth, asyncHandler(async (req, res)=>{

    const posts = await Post.findById(req.params.id);
    //Check if post exist

    if(!posts) return res.status(404).json({msg: 'Post not found'})

    res.json(posts);
}));


//@route  DELETE/api/Post
//@desc   Get all posts 
//@access Private

router.delete('/:id',auth, asyncHandler(async (req, res)=>{

    const post = await Post.findById(req.params.id)
    //Check if post exist
    if(!post) return res.status(404).json({msg: 'Post not found'})
    //Check User
    console.log(req)
    if(post.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'Not authorized'})
    }
  
    await post.remove();
    res.json(post);
}));


//@route  PUT/api/Post/like/:id
//@desc   Like a post 
//@access Private

router.put('/likes/:id', auth,asyncHandler(async(req, res)=>{
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
        return res.status(400).json({msg: "Post already liked"})
    }

    post.likes.unshift({user: req.user.id});

    await post.save();
    

    res.json(post.likes);
}))


//@route  PUT/api/Post/unlikes/:id
//@desc   Like a post 
//@access Private

router.put('/unlikes/:id', auth,asyncHandler(async(req, res)=>{
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
        return res.status(400).json({msg: "Post has not yet been liked"})
    }

    ///Get the remove index
   
    const removeIndex = post.likes.map(comment=> comment.user.toString()).indexOf(req.user.id) ;

    post.likes.splice(removeIndex, 1)

    await post.save();
   

    res.json(post.comments);
}))



//@route  POST/api/Post/comment/:id
//@desc   Comment on a post 
//@access Public
router.post('/comment/:id',[auth, [
    check('text', 'Text is require').not().isEmpty()
]],asyncHandler( async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);


    const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    }
  
    post.comments.unshift(newComment);
  
    await post.save();
  

    res.json(post.comments);
}));


//@route  POST/api/Post/comment/:id/:comment_id
//@desc   Delete comment
//@access Private

router.delete('/comment/:id/:comment_id',auth, asyncHandler( async (req, res)=>{
    const post = await Post.findById(req.params.id);

    //Pull out comment 
    const comment = post.comments.find(comment=> comment.id ===req.params.comment_id);

    //Make sure comment exist 
    if(!comment){
        res.status(404).json({msg: 'Comment does not exist '})
    }

    //Check user
    if(comment.user.toString() !== req.user.id){
        res.status(404).json({msg: 'User not authorized '})
    }

     ///Get the remove index
   
     const removeIndex = post.comments.map(like=> like.user.toString()).indexOf(req.user.id) ;

     post.comments.splice(removeIndex, 1)
 
     await post.save();

     res.json(post.comments)
}))

export default router;