import mongoose from 'mongoose';
// const { Schema } = mongoose;
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople:{
        type:Number,
        require:true,

    },
    desc: {
        type: String,
        required: true,
    },
    roomNumber: [
        {number:Number,
            unavilableDates:
                {type:[Date]}
            }],
},
{timestamps:true}
   
    


);

export default mongoose.model("Room", RoomSchema);