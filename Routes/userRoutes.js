const express = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const User =require('../models/usermodel')
const router = express.Router();

router
  .route('/signup')
  .post(async(req,res)=>{
      const {name,email,password}=req.body
      if(!name || ! email || ! password){
        return res.json({
          status:'fail',
          message:'All Field are required'
        })

      }
      if(!validator.isEmail(email)){
        return res.json({
          status:'fail',
          message:'Invalid Email Address'
        })
      }
      if(password.length<8){
        return res.json({
          status:'fail',
          message:'Password must contain 8 character'
        })
      }
      await User.findOne({email:email}).then(async(account)=>{
        if(account){
          return res.json({
            status:'fail',
            message:'USER already exist'
          })
        }else{
          const hashpassword =  await bcrypt.hash(password,12)
           await User.create({ 
            name:name,
            email:email,
            password:hashpassword 
          }).then(()=>{
              return res.json({
              status:'sucess',
              message:'Register Sucessfully'
            })
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
  });

router
  .route('/signin')
  .post(async(req,res)=>{
      const{ email,password}=req.body
      if( ! email || ! password){
        return res.json({
          status:'fail',
          message:'All Field are required'
        })

      }
      await User.findOne({email:email}).then((account)=>{
        if(!account){
          return res.json({
            status:'fail',
            message:"USER doesn't exist"
          })
        }else{
            bcrypt.compare(password,account.password).then((match)=>{
              if(match){
                return res.json({
                  status:'Sucess',
                  message:'sucessfully Logged in',
                  user:{
                    name:account.name,
                    email:account.email,
                    _id:account._id
                  }
                })
              }else{
                return res.json({
                  status:'fail',
                  message:"Invalid Email or password"
                })
              }
            }).catch((err)=>{
            console.log(err)
          })
        }
      }).catch((err)=>{
        console.log(err)
      })

  })
  router
  .route('/googlesignin')
  .post(async(req,res)=>{
      const{ email,name,password}=req.body
      await User.findOne({email:email}).then(async(account)=>{
        if(!account){
                const hashpassword =  await bcrypt.hash(password,12)
                await User.create({ 
                  name:name,
                  email:email,
                  password:hashpassword 
                }).then((newuser)=>{
                    return res.json({
                    status:'sucess',
                    message:'Register Sucessfully',
                    user:{email,name,_id:newuser._id}
                })
          }).catch((err)=>{
            console.log(err)
          })
          
        }else{
            bcrypt.compare(password,account.password).then((match)=>{
              if(match){
                return res.json({
                  status:'Sucess',
                  message:'sucessfully Logged in',
                  user:{
                    name:account.name,
                    email:account.email,
                    _id:account._id
                  }
                })
              }else{
                return res.json({
                  status:'fail',
                  message:"Invalid Email or password"
                })
              }
            }).catch((err)=>{
            console.log(err)
          })
        }
      }).catch((err)=>{
        console.log(err)
      })

  })

module.exports = router;