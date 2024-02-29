const express=require ('express');
const bookingModule=require('../modules/bookingModule');
const router=express.Router();

router.post('/create-room',bookingModule.createRoom);
router.post('/create-booking',bookingModule.roomBooking)
router.get('/rooms',bookingModule.getAllRooms);
router.get('/customers',bookingModule.getAllCustomers);
router.get('/list-rooms',bookingModule.getAllBookedRooms)
router.get('/list-customers',bookingModule.getAllBookedCustomers)

module.exports=router;