const express = require('express');
const user =require('../models/usermodel')
const router = express.Router();


router
.route('/rating')
.patch(async(req,res)=>{
    const {_id,rating}=req.body
    console.log(req.body)
    if(!rating.companyname || !rating.training || ! rating.environment || !rating.epf || !rating.health || !rating.teamsprit || !rating.policies){
        return res.json({
          status:'fail',
          message:'All Rating are required'
        })

    }
    user.findByIdAndUpdate(_id,{$push:{"rating":rating}},{new:true})
    .then((user)=>{
        return res.json({
            status:'sucess',
            message:'Thank you for rating',
            user:{name:user.name,
                email:user.email,
                _id:user._id,
                rating:user.rating}
    })
    }).catch((err)=>{
        console.log(err)
    // Rating.create({companyname,training,environment,epf,health,teamsprit,policies})
    // .then(()=>{
    //     return res.json({
    //         status:'sucess',
    //         message:'Thank you for rating'
    //     })
  })


})
module.exports = router;
