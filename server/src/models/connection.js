const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    roomID:{
        type:String,
        required:true,
    },

    summary:{
        type:String,
        required:true,
    },

    keyPoints:{
        type:[String],
        default:[],
    },

    actionItems:{
        type:[String],
        default:[],
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Summary",summarySchema);