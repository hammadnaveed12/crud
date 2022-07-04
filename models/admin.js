import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
id:{
    type:String
},
    img:
    {
        type:String
    }
});





export default mongoose.model("Admin",adminSchema);