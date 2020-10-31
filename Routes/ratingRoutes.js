const express = require('express');
const user =require('../models/usermodel')
const router = express.Router();
const _ = require('loadsh')


router
.route('/rating')
.patch(async(req,res)=>{
    const {_id,rating}=req.body
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

router
.route('/ratingstore')
.get(async(req,res)=>{
  let store=[]
  let finalrating={}
  const alluser = await  user.find({},{'_id':0}).select('rating');
  alluser.forEach((item)=>{
    store=store.concat(item['rating'])
  })
  var grouped = _.mapValues(_.groupBy(store, 'companyname'),clist => clist.map(store => _.omit(store, 'companyname')))
  Object.keys(grouped).forEach((companyname)=>{
    let avgadd=0
    grouped[companyname].forEach((item)=>{
     avgadd = avgadd +((item.training + item.environment + item.health + item.teamsprit + item.policies ) / 5)
    })
    finalrating[companyname] =avgadd/grouped[companyname].length
  })
  return res.json({
    status:'sucess',
    companyratings:finalrating
  })

})
module.exports = router;
