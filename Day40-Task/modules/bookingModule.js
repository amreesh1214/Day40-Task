const mongo = require('../connect');

// to create rooms
module.exports.createRoom=async(req,res)=>{
    try{
        const insertedResponse=await mongo.selectedDb.collection('rooms').insertOne(req.body);
        res.send(insertedResponse);
    }
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    };
}

// to get all created rooms
module.exports.getAllRooms=async(req,res)=>{
    try{
        const getResponse=await mongo.selectedDb.collection('rooms').find().toArray();
        res.send(getResponse)
    }
    catch{
        res.send( {
        statusCode: 500,
        message: "Internal server error"
        } )  
    }
}

// to create customers booking and check already booked or not.
module.exports.roomBooking=async(req,res)=>{
    try{
    const existUser=await mongo.selectedDb.collection('booking').find({$and:[{date:req.body.date},{start_time:req.body.start_time},{end_time:req.body.end_time},{roomId:req.body.roomId}]}).count()>0;
    if(existUser){
        res.send("The Rooms you're looking for are already booked." )
    }
    else{
    const insertedResponse=await mongo.selectedDb.collection('booking').insertOne(req.body);
    res.send(insertedResponse);
    }
}
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    };
}

// to get all customers
module.exports.getAllCustomers=async(req,res)=>{
    try{
        const getResponse=await mongo.selectedDb.collection('booking').find().toArray();
        res.send(getResponse)
    }
    catch{
        res.send( {
        statusCode: 500,
        message: "Internal server error"
        } )  
    }
}

// to get all booked rooms with customers data
module.exports.getAllBookedRooms=async(req,res)=>{
    try{
        const getBookedRooms=await mongo.selectedDb.collection('rooms').aggregate([
            {
                $lookup:{
                    from:'booking',
                    localField:'roomId',
                    foreignField:'roomId',
                    as:"Cutomers_Booked_by"
                }
            }
        ]).toArray();
        res.send(getBookedRooms);
    }
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    };
}

// to get all customers with rooms data
module.exports.getAllBookedCustomers=async(req,res)=>{
    try{
        const getBookedCustomers=await mongo.selectedDb.collection('booking').aggregate([
            {
                $lookup:{
                    from:'rooms',
                    localField:'roomId',
                    foreignField:'roomId',
                    as:"Booked_Rooms"
                }
            }
        ]).toArray();
        res.send(getBookedCustomers);
    }
    catch{
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
};


