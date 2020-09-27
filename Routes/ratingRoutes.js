const express = require('express');
const Rating =require('../models/ratingmodel')
const router = express.Router();


router
.route('/rating')
.post(async(req,res)=>{
    const {companyname,training,environment,epf,health,teamsprit,policies}=req.body
    console.log(req.body)
    if(!companyname || !training || ! environment || !epf || !health || ! teamsprit || ! policies){
        return res.json({
          status:'fail',
          message:'All Rating are required'
        })

    }
    Rating.create({companyname,training,environment,epf,health,teamsprit,policies})
    .then(()=>{
        return res.json({
            status:'sucess',
            message:'Thank you for rating'
        })
    })


})
module.exports = router;
