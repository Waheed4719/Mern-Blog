const mongoose = require('mongoose')
const Post = require('./../models/Posts')
const multer = require('multer')
const uuidv4 = require('uuid/v4')






module.exports = {

 
    create_Post(req,res){
        const {post,user} = req.body
        
        
        const {title,content,image} = post
        if(!title || !content ){
            return res.status(400).json({success:false,error: "invalid request!"})
        }
        else{

            const newPost = Post()   
            newPost.user = user._id
            newPost.title = title
            newPost.content = content 
            newPost.image = image
            newPost.save().then(post=>res.json(post)).catch(error=>{
                if(error.code === 11000){
                    res.status(400).json({error: "Duplicate title or content"})
                }
                else{
                    res.status(404).json(error)
                }
                
            })
        }

    },

    viewPosts(req,res){
        Post.find()
        .sort({id:'1'})
        .populate('user')
        .then(post=>{
                io.emit("posts",post)
            res.status(200).json(post)})
        .catch(error=> console.log(error))
    },

    viewSinglePost(req,res){
        console.log(req.params.id)
        Post.findOne({_id: req.params.id})
        .then(post=> {
            if(post){
                res.json(post) 
            }
            else{
                res.status(404).json({error:"No Post Found"})
            }
        })
        .catch(error => res.json(error))
    },

    deletePost(req,res){
        Post.findByIdAndDelete({_id: req.query.id})
        .then(json => {
            res.json({
                deleted_post : json,
            })
        })
        .catch(error=> res.status(401).json(error))
    },


    updatePost(req,res){
        post = req.query 
        Post.findByIdAndUpdate({_id: req.query.id},{$set: {post}})
        .then(update => res.status(200).json({message: "Update successful",update}))
        .catch(error=> res.status(400).res.json(error))
    }

   

}