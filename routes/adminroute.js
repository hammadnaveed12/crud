import express from "express"
import Admin from "../models/admin.js";

const router = express.Router();


// router.get("/",(req,res)=>{
//     res.render("index");
// })



router.post("/add", async (req,res)=>{

    const newProduct = new Admin(req.body)
    
    try{
        const ad = await newProduct.save();
        res.redirect("/")

    }catch(err){
res.status(500).json(err)
    }
});


router.get("/",function(req,res)
{
	Admin.find({},function(err,data)
		{
			if(err)
				console.log(err);
			else
				res.render("index",{Admin:data});
		})
}); 

router.get("/delete/:id", async (req,res)=>{
    
    try{
          await Admin.findByIdAndDelete(req.params.id);
        // res.status(200).json("Donut has been deleted");
       res.redirect("/")
        
    }catch(err){
res.status(500).json(err)
    }
});

router.post("/update/:id", async (req,res)=>{
    
    try{
        const updtaeDonut = await Admin.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.redirect("/")
        
    }catch(err){
res.status(500).json(err)
    }
});

export default router