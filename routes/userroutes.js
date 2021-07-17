const express=require('express');
const router=express.Router();
const User=require('./../models/usermodel.js');

router.route('/register').post((req,res)=>{
      console.log("inside the register");
      const user=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
      });
      user.save().then(()=>{
            console.log('user registered');
            res.status(200).json("Ok")
      }).catch(err=>{
            console.log(err);
            res.status(403).json({msg:err});
      });
});

router.get("/:username",(req,res)=>{
      User.findOne({
            username:req.params.username
      },
      (err,result)=>{
            if(err) return res.status(403).send("Error");
            const msg={
                  data:result,
                  username:req.params.username
            }
            res.status(200).send(msg)
      }
      )
})

router.post("/login",(req,res)=>{
      User.findOne(
            {
            username:req.body.username
      },
      (err,result)=>{
            if(err) return res.status(500).send("Something went wrong");
            if(result==null){
                  res.status(403).send("Username incorrect")
            }
            if(result.password===req.body.password){
                  res.status(200).send("Ok")
            }else{
                  res.status(403).send("Password is incorrect")
            }
      }
      )
})

router.patch("/update/:username",(req,res)=>{
      User.findOneAndUpdate(
            {username:req.params.username},
            {$set:{password:req.body.password}},
            (err,result) =>{
                  if(err) return res.status(500).send("Something went wrong");
                  const msg={
                        msg:"password successfully updated",
                        username:req.params.username
                  };
                  res.json(msg);
            }
      )
});

router.delete("/delete/:username",(req,res)=>{
      User.findOneAndDelete(
            {username:req.params.username},
            (err,result)=>{
                  if(err) return res.status(500).send("Something wrong");
                  const msg={
                        msg:"User successfully deleted",
                        username:req.params.username
                  }
                  res.send(msg);
            },
            
      )
})

module.exports=router;